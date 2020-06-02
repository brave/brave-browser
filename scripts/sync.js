// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const program = require('commander')
const config = require('../lib/config')
const util = require('../lib/util')
const Log = require('../lib/sync/logging')

const projectNames = config.projectNames.filter((project) => config.projects[project].ref)

program
  .version(process.env.npm_package_version)
  .arguments('[ref]')
  .option('--gclient_file <file>', 'gclient config file location')
  .option('--gclient_verbose', 'verbose output for gclient')
  .option('--run_hooks', 'run gclient hooks')
  .option('--run_sync', 'run gclient sync')
  .option('--target_os <target_os>', 'target OS')
  .option('--target_arch <target_arch>', 'target architecture')
  .option('--target_apk_base <target_apk_base>', 'target Android OS apk (classic, modern, mono)')
  .option('--submodule_sync', 'run submodule sync')
  .option('--init', 'initialize all dependencies')
  .option('--all', 'This flag is deprecated and no longer has any effect')
  .option('--force', 'force reset all projects to origin/ref')
  .option('--create', 'create a new branch if needed for [ref]')
  .option('--no_chromium_update', 'do not check for chromium update')

async function RunCommand () {
  program.parse(process.argv)
  config.update(program)

  if (program.all) {
    Log.warn('The --all flag is deprecated. Will behave as if flag was not passed. Please update your command to `npm run sync` in the future.')
  }

  // Perform initial brave-core clone and checkout
  if (program.init) {
    Log.progress('Performing initial checkout of brave-core')
    util.checkoutBraveCore()
  }

  if (program.init || program.submodule_sync) {
    util.submoduleSync()
  }

  if (program.init) {
    util.buildGClientConfig()
  }

  let braveCoreRef = program.args[0]
  if (!braveCoreRef) {
    braveCoreRef = program.init ? config.getProjectVersion('brave-core') : null
  }

  if (braveCoreRef || program.init || program.force) {
    // we're doing a reset of brave-core so try to stash any changes
    Log.progress('Stashing any local changes')
    util.run('git', ['-C', config.braveCoreDir, 'stash'], {continueOnFail: true})
  }

  if (braveCoreRef) {
    // try to checkout to the right ref if possible
    util.runGit(config.braveCoreDir, ['reset', '--hard', 'HEAD'])
    let prog = util.run('git', ['-C', config.braveCoreDir, 'checkout', braveCoreRef], {continueOnFail: true})
    if (prog.status !== 0 && program.create) {
      util.runGit(config.braveCoreDir, ['checkout', '-b', braveCoreRef])
    }

    if (prog.status !== 0) {
      Log.error('Could not checkout: ' + braveCoreRef)
      Log.error(prog.stdout.toString())
    }
  }

  util.gclientSync(program.init || program.force, program.init, braveCoreRef, !program.no_chromium_update)

  await util.applyPatches()

  util.gclientRunhooks()
}

Log.progress('Brave Browser Sync starting')
RunCommand()
.then(() => {
  Log.progress('Brave Browser Sync complete')
})
.catch((err) => {
  Log.error('Brave Browser Sync ERROR:')
  console.error(err)
  process.exit(1)
})
