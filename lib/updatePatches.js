const path = require('path')
const fs = require('fs-extra')
const util = require('../lib/util')

const desiredReplacementSeparator = '-'
const patchExtension = '.patch'



async function writePatchFiles (modifiedPaths, gitRepoPath, patchDirPath) {
  // replacing forward slashes and adding the patch extension to get nice filenames
  // since git on Windows doesn't use backslashes, this is sufficient
  const patchFilenames = modifiedPaths.map(s => s.replace(/\//g, desiredReplacementSeparator) + patchExtension)

  // When splitting one large diff into a per-file diff, there are a few ways
  // you can go about it. Because different files can have the same name
  // (by being located in different directories), you need to avoid collisions.
  // Mirroring the directory structure seems undesirable.
  // Prefixing with numbers works but is O(n) volatile for O(1) additions
  // We choose here to flatten the directory structure by replacing separators
  // In practice this will avoid collisions. Should a pathological case ever
  // appear, you can quickly patch this by changing the separator, even
  // to something longer

  if (modifiedPaths.length) {
    await fs.ensureDir(patchDirPath)
  }

  let writeOpsDoneCount = 0
  let writePatchOps = modifiedPaths.map(async (old, i) => {
    const singleDiffArgs = ['diff', '--src-prefix=a/', '--dst-prefix=b/', '--full-index', old]
    const patchContents = await util.runAsync('git', singleDiffArgs, { cwd: gitRepoPath })
    const patchFilename = patchFilenames[i]
    await fs.writeFile(path.join(patchDirPath, patchFilename), patchContents)

    writeOpsDoneCount++
    const logRepoName = path.basename(gitRepoPath)
    console.log(
      `updatePatches [${logRepoName}] wrote ${writeOpsDoneCount} / ${modifiedPaths.length}: ${patchFilename}`
    )
  })

  await Promise.all(writePatchOps)
  return patchFilenames
}

const readDirPromise = (pathName) => new Promise((resolve, reject) => 
  fs.readdir(pathName, (err, fileList) => {
    if (err) {
      return reject(err)
    }
    return resolve(fileList)
  })
)

async function removeStalePatchFiles (patchFilenames, patchDirPath, keepPatchFilenames) {
  // grab every existing patch file in the dir (at this point, patchfiles for now-unmodified files live on)
  let existingPathFilenames
  try {
    existingPathFilenames = ( (await readDirPromise(patchDirPath)) || [] )
      .filter(s => s.endsWith('.patch'))
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`Path at ${patchDirPath} does not exist.`)
      return
    }
    throw err
  }

  // Subtract to find which patchfiles no longer have diffs, yet still exist
  const validFilenames = patchFilenames.concat(keepPatchFilenames)
  const toRemoveFilenames = existingPathFilenames.filter(x => !validFilenames.includes(x))

   // regular rm patchfiles whose target is no longer modified
  let removedProgress = 0
  for (const filename of toRemoveFilenames) {
    const fullPath = path.join(patchDirPath, filename)
    fs.removeSync(fullPath)
    removedProgress++
    console.log(`updatePatches *REMOVED* ${removedProgress}/${toRemoveFilenames.length}: ${filename}`)
  }
}

/**
 * Detects modifications to a git repo and creates or updates patch files for each modified file.
 * Removes patch files which are no longer relevant.
 *
 * @param {*} gitRepoPath Repo path to look for changes
 * @param {*} patchDirPath Directory to keep .patch files in
 * @param {*} repoPathFilter Filter function for repo file paths to include or exlude (all included by default)
 * @param {*} [keepPatchFilenames=[]] Patch filenames to never delete
 */
async function updatePatches (gitRepoPath, patchDirPath, repoPathFilter, keepPatchFilenames = []) {
  let modifiedPaths = await util.gitGetModifiedPaths(gitRepoPath)
  if (typeof repoPathFilter === 'function') {
    modifiedPaths = modifiedPaths.filter(repoPathFilter)
  }
  const patchFilenames = await writePatchFiles(modifiedPaths, gitRepoPath, patchDirPath)
  await removeStalePatchFiles(patchFilenames, patchDirPath, keepPatchFilenames)
}

module.exports = updatePatches
