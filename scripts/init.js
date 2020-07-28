// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const fs = require('fs')
const Log = require('../lib/logging')
const path = require('path')
const { spawnSync } = require('child_process')
const util = require('../lib/util')

Log.progress('Performing initial checkout of brave-core')

const braveCoreDir = path.resolve(__dirname, '..', 'src', 'brave')
const braveCoreRef = util.getProjectVersion('brave-core')

if (!fs.existsSync(path.join(braveCoreDir, '.git'))) {
  Log.status(`Cloning brave-core [${braveCoreRef}] into ${braveCoreDir}...`)
  fs.mkdirSync(braveCoreDir)
  util.runGit(braveCoreDir, ['clone', util.getNPMConfig(['projects', 'brave-core', 'repository', 'url']), '.'])
  util.runGit(braveCoreDir, ['checkout', braveCoreRef])
}


if (process.platform === 'win32') {
  util.run('npm.cmd', ['install'], { cwd: braveCoreDir })
} else {
  util.run('npm', ['install'], { cwd: braveCoreDir })
}


util.run('npm', ['run', 'sync' ,'--', '--init'].concat(process.argv.slice(2)), {
  cwd: braveCoreDir,
  env: process.env,
  stdio: 'inherit',
  shell: true,
  git_cwd: '.', })
