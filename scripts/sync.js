// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const path = require('path')
const os = require('os')
const program = require('commander')
const fs = require('fs-extra')
const chalk = require('chalk')
const config = require('../lib/config')
const util = require('../lib/util')
const GitPatcher = require('../lib/gitPatcher')
const { progressLog, errorLog, logUpdateStatus, logAllPatchStatus } = require('../lib/sync/logging')

const projectNames = config.projectNames.filter((project) => config.projects[project].ref)

program
  .version(process.env.npm_package_version)
  .option('--gclient_file <file>', 'gclient config file location')
  .option('--gclient_verbose', 'verbose output for gclient')
  .option('--run_hooks', 'run gclient hooks')
  .option('--run_sync', 'run gclient sync')
  .option('--target_os <target_os>', 'target OS')
  .option('--target_arch <target_arch>', 'target architecture')
  .option('--target_apk_base <target_apk_base>', 'target Android OS apk (classic, modern, mono)')
  .option('--submodule_sync', 'run submodule sync')
  .option('--init', 'initialize all dependencies')
  .option('--all', 'update all projects')
projectNames.forEach((name) => {
  let project = config.projects[name]
  program.option('--' + project.arg_name + '_ref <ref>', name + ' ref to checkout')
})

async function RunCommand () {
  program.parse(process.argv)
  config.update(program)

  if (program.init || program.submodule_sync) {
    progressLog('Updating submodules...')
    util.submoduleSync()
    progressLog('Done updating submodules...')
  }

  if (program.init) {
    util.buildGClientConfig()
  }

  progressLog(`Syncing Gclient`)
  util.gclientSync(program.init || program.all)

  progressLog('Applying patches...')
  // Always detect if we need to apply patches, since user may have modified
  // either chromium source files, or .patch files manually
  const coreRepoPath = config.projects['brave-core'].dir
  const patchesPath = path.join(coreRepoPath, 'patches')
  const v8PatchesPath = path.join(patchesPath, 'v8')
  const devtoolsFrontendSrcPatchesPath = path.join(patchesPath, 'devtools-frontend-src')
  const chromiumRepoPath = config.projects['chrome'].dir
  const v8RepoPath = path.join(chromiumRepoPath, 'v8')
  const devtoolsFrontendSrcRepoPath = path.join(config.srcDir, 'third_party', 'devtools-frontend', 'src')
  const chromiumPatcher = new GitPatcher(patchesPath, chromiumRepoPath)
  const v8Patcher = new GitPatcher(v8PatchesPath, v8RepoPath)
  const devtoolsFrontendSrcPatcher = new GitPatcher(devtoolsFrontendSrcPatchesPath, devtoolsFrontendSrcRepoPath)

  const chromiumPatchStatus = await chromiumPatcher.applyPatches()
  const v8PatchStatus = await v8Patcher.applyPatches()
  const devtoolsFrontendSrcStatus = await devtoolsFrontendSrcPatcher.applyPatches()

  // Log status for all patches
  // Differentiate entries for logging
  v8PatchStatus.forEach(s => s.path = path.join('v8', s.path))
  devtoolsFrontendSrcStatus.forEach(s => s.path = path.join('devtoolsFrontendSrc', s.path))
  const allPatchStatus = chromiumPatchStatus.concat(v8PatchStatus).concat(devtoolsFrontendSrcStatus)
  logAllPatchStatus(allPatchStatus, 'Chromium')
  const hasPatchError = allPatchStatus.some(p => p.error)
  // Exit on error in any patch
  if (hasPatchError) {
    console.error(chalk.red.bgBlack('Exiting as not all patches were successful!'))
    process.exit(1)
  }
  progressLog('Done applying patches.')

  progressLog('Running gclient hooks...')
  util.gclientRunhooks()
  progressLog('Done running gclient hooks.')
}

progressLog('Brave Browser Sync starting')
RunCommand()
.then(() => {
  progressLog('Brave Browser Sync complete')
})
.catch((err) => {
  errorLog('Brave Browser Sync ERROR:')
  console.error(err)
  process.exit(1)
})
