// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const DirConfig = require('../lib/dirConfig')
const fs = require('fs-extra')
const Log = require('../lib/logging')
const path = require('path')
const { spawnSync } = require('child_process')
const util = require('../lib/util')

Log.progress('Performing initial checkout of brave-core')

const braveCoreRef = util.getProjectVersion('brave-core')

if (!fs.existsSync(path.join(DirConfig.braveCoreDir, '.git'))) {
  Log.status(`Cloning brave-core [${braveCoreRef}] into ${DirConfig.braveCoreDir}...`)
  fs.mkdirSync(DirConfig.braveCoreDir)
  util.runGit(DirConfig.braveCoreDir, ['clone', util.getNPMConfig(['projects', 'brave-core', 'repository', 'url']), '.'])
}

util.run('npm', ['install'], { cwd: DirConfig.braveCoreDir })
util.run('npm', ['run', 'sync' ,'--', '--init'].concat(process.argv.slice(1)), {
  cwd: DirConfig.braveCoreDir,
  env: process.env,
  stdio: 'inherit',
  shell: true,
  git_cwd: '.', })
