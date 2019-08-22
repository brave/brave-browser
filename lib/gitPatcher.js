// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const path = require('path')
const fs = require('fs-extra')
const os = require('os')
const util = require('../lib/util')
const calculateFileChecksum = require('../lib/calculateFileChecksum')

const extPatch = 'patch'
const extPatchInfo = 'patchinfo'
const encodingPatchInfo = 'utf8'
// Increment schema version if we make breaking changes
// to the Patch Info file format.
const patchInfoSchemaVersion = 1
const applyArgs = [ '--ignore-space-change', '--ignore-whitespace' ]

const patchApplyReasons = {
  NO_PATCH_INFO: 0,
  PATCH_INFO_OUTDATED: 1,
  PATCH_CHANGED: 2,
  PATCH_REMOVED: 3,
  SRC_CHANGED: 4
}

const patchApplyReasonMessages = [
  `No corresponding .${extPatchInfo} file was found.`,
  `The corresponding .${extPatchInfo} file was unreadable or not in the correct schema version of ${patchInfoSchemaVersion}.`,
  `The .${extPatch} file was modified since last applied.`,
  `The .${extPatch} file was removed since last applied.`,
  `The target file was modified since the patch was last applied.`
]

// Intrepret `--numstat -z` line format
// https://regex101.com/r/jP1JEP/1
const regexGitApplyNumStats = /^((\d|-)+\s+){2}/

module.exports = class GitPatcher {
  constructor (patchDirPath, repoPath, logProgress = true) {
    this.patchDirPath = patchDirPath
    this.repoPath = repoPath
    this.shouldLogProgress = logProgress
  }

  logProgressLine(...messages) {
    if (this.shouldLogProgress) {
      console.log(...messages)
    }
  }

  logProgress(message) {
    if (this.shouldLogProgress) {
      process.stdout.write(message)
    }
  }

  async resetNonPatchedChanges (onChangeFound, repoPathFilter) {
    // 1. iterate changes in working dir
    // 2. is there a corresponding patch file
    //   - yes? do nothing
    //   - no? ask to reset

    // Validate
    if (typeof onChangeFound !== 'function') {
      throw new Error('onChangeFound must be a function')
    }
    const patchDirExists = await fs.exists(this.patchDirPath)
    if (!patchDirExists) {
      return
    }

    // Get files changes, filtered to non-patched and also files we care about
    this.logProgressLine('Getting modified paths from git...')
    let modifiedPaths = await util.gitGetModifiedPaths(this.repoPath)
    this.logProgressLine(`Got ${modifiedPaths.length} modified paths.`)
    if (typeof repoPathFilter === 'function') {
      // ignore paths requested in param
      modifiedPaths = modifiedPaths.filter(repoPathFilter)
    }
    // ignore patched paths
    const patchInfoPaths = (await fs.readdir(this.patchDirPath))
      .filter(s => s.endsWith(`.${extPatchInfo}`))
      .map(p => path.join(this.patchDirPath, p))
    this.logProgress(os.EOL + 'Getting all patched paths...')
    const ops = []
    const patchedPaths = []
    for (const patchInfoPath of patchInfoPaths) {
      const op = this.getPatchInfo(patchInfoPath).then(patchInfo => {
        this.logProgress('.')
        patchedPaths.push(...patchInfo.appliesTo.map(a => a.path))
      })
      ops.push(op)
    }
    await Promise.all(ops)
    this.logProgressLine(`Got ${patchedPaths.length} patched paths.`)
    if (patchedPaths.length) {
      modifiedPaths = modifiedPaths.filter(p => !patchedPaths.includes(p))
      this.logProgressLine(`Filtered to ${modifiedPaths.length} modified non-patched paths to reset.`)
    }
    // Ask for reset for each
    const filesToReset = []
    for (const p of modifiedPaths) {
      const diffContent = await util.runGitAsync(this.repoPath, ['diff', '--color=always', '--', p])
      const shouldReset = await onChangeFound(p, diffContent)
      if (shouldReset) {
        filesToReset.push(p)
      }
    }
    this.logProgressLine(`Resetting ${filesToReset.length} files:`, filesToReset)
    if (filesToReset.length) {
      await this.resetRepoFiles(filesToReset)
    }
    return
  }

  async applyPatches () {
    // STRATEGY:
    // 1. iterate .patch files in dir
    // corresponding .patchinfo file?
    //  - no? add to TO_PATCH list
    //  - yes? check hash of patch file and each chromium file. different? add to TOPATCH list.
    // 2. iterate .patchinfo files in dir
    // corresponding .patch file?
    // - no? add to TO_RESET list
    // 3. iterate TO_PATCH list
    // - reset chromium file
    // - apply patch
    // - create .patchinfo file
    // 4. iterate TO_RESET list
    // - reset chromium file
    // - delete .patchinfo file
    
    const [patchDirExists, repoDirExists] = await Promise.all([
      fs.exists(this.patchDirPath),
      fs.exists(this.repoPath)
    ])
    if (!patchDirExists) {
      return []
    }
    if (!repoDirExists) {
      throw new Error(`Could not apply patches. Repo at path "${this.repoPath}" does not exist.`)
    }
    const allFilenames = await fs.readdir(this.patchDirPath)
    const patchFilenames = allFilenames.filter(s => s.endsWith(`.${extPatch}`))
    const patchInfoFilenames = allFilenames.filter(s => s.endsWith(`.${extPatchInfo}`))

    const patchesToApply = []
    const patchInfosObsolete = []

    for (const filename of patchFilenames) {
      const patchInfoFilename = filename.slice(0, extPatch.length * -1) + extPatchInfo
      const hasPatchInfo = patchInfoFilenames.includes(patchInfoFilename)
      const fullPath = path.join(this.patchDirPath, filename)
      const patchInfoFullPath = path.join(this.patchDirPath, patchInfoFilename)
      const needsPatchReason = (!hasPatchInfo)
        ? patchApplyReasons.NO_PATCH_INFO
        : (await this.isPatchStale(fullPath, patchInfoFullPath))
      if (needsPatchReason !== null) {
        patchesToApply.push({
          patchPath: fullPath,
          patchInfoPath: path.join(this.patchDirPath, patchInfoFilename),
          reason: needsPatchReason
        })
      }
    }

    for (const filename of patchInfoFilenames) {
      const patchFilename = filename.slice(0, extPatchInfo.length * -1) + extPatch
      const hasPatch = patchFilenames.includes(patchFilename)
      if (!hasPatch) {
        const fullPath = path.join(this.patchDirPath, filename)
        patchInfosObsolete.push(fullPath)
      }
    }
    const pathStatuses = []
    try {
      if (patchesToApply.length) {
        const appliedPathsStatuses = await this.performApplyForPatches(patchesToApply)
        pathStatuses.push(...appliedPathsStatuses)
      }
      if (patchInfosObsolete.length) {
        const resetStatuses = await this.handleObsoletePatchInfos(patchInfosObsolete)
        pathStatuses.push(...resetStatuses)
      }
    } catch (err) {
      console.error(err)
      console.error('There was an error applying added, modified or removed patches. Please consider running `init` to reset and re-apply all patches.')
    }
    return pathStatuses
  }

  async getPatchInfo (patchInfoPath) {
    try {
      const patchInfoRaw = await fs.readFile(patchInfoPath, encodingPatchInfo)
      const patchInfo = JSON.parse(patchInfoRaw)
      return patchInfo
    } catch (err) {
      err.message = `Error reading Patch Info file at path "${patchInfoPath}": ${err.message}`
      throw err
    }
  }

  async isPatchStale (patchPath, patchInfoPath) {
    const patchInfo = await this.getPatchInfo(patchInfoPath)
    // Validate
    // Always stale if schema has changed
    // Always stale if invalid file
    if (!patchInfo || patchInfo.schemaVersion !== patchInfoSchemaVersion) {
      return patchApplyReasons.PATCH_INFO_OUTDATED
    }
    const { patchChecksum, appliesTo } = patchInfo
    // Detect if patch file changed since patch was applied
    const currentPatchChecksum = await calculateFileChecksum(patchPath)
    if (currentPatchChecksum !== patchChecksum) {
      return patchApplyReasons.PATCH_CHANGED
    }
    // Detect if any of the files the patch applies to have changed
    for (const {path: localPath, checksum} of appliesTo) {
      const fullPath = path.join(this.repoPath, localPath)
      const currentChecksum = await calculateFileChecksum(fullPath)
      if (currentChecksum !== checksum) {
        return patchApplyReasons.SRC_CHANGED
      }
    }
    // Nothing was changed
    return null
  }

  async performApplyForPatches (patchesToApply) {
    // The actual apply cannot be done in parallel with other write ops,
    // but everything else can.
    // First, find out which files the patch applies to, so we know
    // which files to reset.
    const prepOps = []
    this.logProgress(os.EOL + 'Getting patch data...')
    for (const patchData of patchesToApply) {
      prepOps.push(
        this.getAppliesTo(patchData.patchPath)
        .then((appliesTo) => ({
          appliesTo,
          ...patchData
        }))
        .catch((err) => ({
          error: new Error('Could not read data from patch file: ' + err.message),
          ...patchData
        }))
        .then((data) => {
          this.logProgress('.')
          return data
        })
      )
    }
    
    const patchSets = await Promise.all(prepOps)
    this.logProgress(os.EOL + 'Resetting...')
    // Reset all repo files
    const allRepoPaths = patchSets.filter(p => !p.error).reduce(
      (allPaths, set) => allPaths.concat(set.appliesTo.map(s => s.path)),
      []
    )
    try {
      await this.resetRepoFiles(allRepoPaths)
    } catch {
      console.warn('There were some failures during git reset of specific repo paths: ', allRepoPaths.join(' '))
    }
    this.logProgressLine('done.')
    this.logProgress('Applying patches:')
    // Apply patches (in series)
    for (const patchData of patchSets) {
      const { patchPath } = patchData
      this.logProgress('.')
      try {
        await util.runGitAsync(this.repoPath, ['apply', patchPath, ...applyArgs])
      } catch (err) {
        patchData.error = err
      }
    }
    this.logProgressLine('All patch apply done.')
    // Create Patch Info file using post-patch repo file cheksums
    // (in parallel)
    const patchInfoOps = []
    for (const { appliesTo, patchPath, patchInfoPath } of patchSets.filter(p => !p.error)) {
      patchInfoOps.push(this.writePatchInfo(patchInfoPath, appliesTo, patchPath))
    }
  
    await Promise.all(patchInfoOps)
  
    // Provide status to caller
    return patchSets.reduce(
      (all, { appliesTo, patchPath, error, reason }) => {
        if (appliesTo && appliesTo.length) {
          return all.concat(appliesTo.map(
            ({ path }) => ({
              path,
              patchPath,
              error,
              reason
            })
          ))
        } else {
          return all.concat([{
            patchPath,
            error,
            reason
          }])
        }
      },
      []
    )
  }

  async getAppliesTo (patchPath) {
    const applyStatArgs = ['apply', patchPath, '--numstat', '-z', ...applyArgs]
    // Check which files patch applies to
    return ( await util.runGitAsync(this.repoPath, applyStatArgs) )
    .split(os.EOL)
    .filter(s => s)
    // Intrepret `--numstat -z` line format
    .map(s => ({
      path: s.replace(regexGitApplyNumStats, '').replace(/\0/g, '')
    }))
  }

  async writePatchInfo (patchInfoPath, appliesTo, patchPath) {
    for (const appliesToFile of appliesTo) {
      appliesToFile.checksum = await calculateFileChecksum(path.join(this.repoPath, appliesToFile.path))
    }
    const patchInfo = {
      schemaVersion: patchInfoSchemaVersion,
      patchChecksum: await calculateFileChecksum(patchPath),
      appliesTo
    }
    await fs.writeFile(patchInfoPath, JSON.stringify(patchInfo), { encoding: encodingPatchInfo })
  }

  resetRepoFiles (filePaths) {
    return util.runGitAsync(this.repoPath, ['checkout', ...filePaths])
  }

  async handleObsoletePatchInfos (patchInfosObsolete) {
    const ops = []
    const allPaths = []
    const allStatuses = []
    for (const patchInfoPath of patchInfosObsolete) {
      const patchInfo = await this.getPatchInfo(patchInfoPath)
      // remove patchinfo file
      const removeOp = fs.unlink(patchInfoPath)
        // Handle error removing patch info, not fatal error
        .catch(err => {
          this.logProgressLine(`Warning: Could not remove obsolete PatchInfo file at path ${patchInfoPath}: "${err.message}"`)
        })
      ops.push(removeOp)
      allPaths.push(...patchInfo.appliesTo.map(s => s.path))
      allStatuses.push(...patchInfo.appliesTo.map(({path}) => ({
        path,
        patchPath: patchInfoPath.replace(/(.patchinfo)$/, `.${extPatch}`),
        reason: patchApplyReasons.PATCH_REMOVED  
      })))
    }
    let resetWasSuccessful = true
    // Don't worry about errors with resetting obsolete patch files,
    // some paths probably don't exist anymores
    const resetOp = this.resetRepoFiles(allPaths)
      .catch(() => {
        resetWasSuccessful = false
      })
    ops.push(resetOp)
    await Promise.all(ops)
    return allStatuses.map(statusIn => {
      const status = {
        ...statusIn,
      }
      if (!resetWasSuccessful) {
        status.warning = 'Some resets failed'
      }
      return status
    })
  }
}

module.exports.patchApplyReasons = patchApplyReasons
module.exports.patchApplyReasonMessages = patchApplyReasonMessages
