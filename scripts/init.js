// Copyright (c) 2019 The Brave Authors. All rights reserved.
// Copyright (c) 2025 The Secretariat Browser Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.
//
// NOTE: Secretariat is derived from Brave Browser
// Original: https://github.com/brave/brave-browser

const fs = require('fs')
const Log = require('../lib/logging')
const path = require('path')
const { spawnSync } = require('child_process')
const util = require('../lib/util')

Log.progress('Performing initial checkout of brave-core (foundation for Secretariat)')

const braveCoreDir = path.resolve(__dirname, '..', 'src', 'brave')
const braveCoreRef = util.getProjectVersion('brave-core')

if (!fs.existsSync(path.join(braveCoreDir, '.git'))) {
  Log.status(`Cloning brave-core [${braveCoreRef}] into ${braveCoreDir}...`)
  Log.status(`NOTE: brave-core will be rebranded to Secretariat during build`)
  fs.mkdirSync(braveCoreDir)
  util.runGit(braveCoreDir, ['clone', util.getNPMConfig(['projects', 'brave-core', 'repository', 'url']), '.'])
  util.runGit(braveCoreDir, ['checkout', braveCoreRef])
}
const braveCoreSha = util.runGit(braveCoreDir, ['rev-parse', 'HEAD'])
Log.progress(`brave-core (Secretariat base) at ${braveCoreDir} is at commit ID ${braveCoreSha}`)

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
