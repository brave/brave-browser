// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const program = require('commander')
const config = require('../lib/config')
const util = require('../lib/util')
const { progressLog, errorLog } = require('../lib/sync/logging')

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
  .option('--no_update', 'do not reset brave or chromium working tree, (but do re-apply patches, sync DEPS and run hooks unless further overridden)')
  .option('--no_patches', 'do not apply patches')
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
    util.submoduleSync()
  }

  if (program.init) {
    util.buildGClientConfig()
  }

  if (!program.no_update) {
    util.gclientSync(program.init || program.all)
  }
  
  if (!program.no_patches) {
    await util.applyPatches()
  }

  util.gclientRunhooks()
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
