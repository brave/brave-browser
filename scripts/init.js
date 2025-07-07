// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const fs = require('fs')
const Log = require('../lib/logging')
const path = require('path')
const util = require('../lib/util')

Log.progress('Performing initial checkout of brave-core')

const braveCoreDir = path.resolve(__dirname, '..', 'src', 'brave')
const braveCoreRef = util.getProjectVersion('brave-core')
const args = process.argv.slice(2);
const noHistory = args.find(x=>x.includes('--no-history'));

const braveCoreUrl = util.getNPMConfig(['projects', 'brave-core', 'repository', 'url']);


if (!fs.existsSync(path.join(braveCoreDir, '.git'))) {
  Log.status(`Cloning brave-core [${braveCoreRef}] into ${braveCoreDir}...`)
  fs.mkdirSync(braveCoreDir)

  // check if we want to perform a shallow clone with --no-history
  // check if ref is advertised by github (ls-remote) 
  // If it isn't we need to perform a full clone or download an archive
  const shouldShallowCloneBraveCore = (
    noHistory
      && util
        .runGit('.', ['ls-remote', braveCoreUrl], false, {maxBuffer: 1024 * 1024 * 5})
        .includes(braveCoreRef)
  );

  // we currently need --depth=2 due to a script failing when running a gclient hook
  const shallowCloneArgs = shouldShallowCloneBraveCore ? ['--depth=2'] : []
  util.runGit(braveCoreDir, ['clone', braveCoreUrl , '.', ...shallowCloneArgs])
  util.runGit(braveCoreDir, ['checkout', braveCoreRef])
}
const braveCoreSha = util.runGit(braveCoreDir, ['rev-parse', 'HEAD'])
Log.progress(`brave-core repo at ${braveCoreDir} is at commit ID ${braveCoreSha}`)

let npmCommand = 'npm'
if (process.platform === 'win32') {
  npmCommand += '.cmd'
}

util.run(npmCommand, ['install'], { cwd: braveCoreDir })

util.run(npmCommand, ['run', 'sync' ,'--', '--init'].concat(process.argv.slice(2)), {
  cwd: braveCoreDir,
  env: process.env,
  stdio: 'inherit',
  shell: true,
  git_cwd: '.', })
