
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

// Add custom flag handling
const hasCustomFlag = process.argv.includes('--custom-build')
if (hasCustomFlag) {
  Log.progress('Custom build mode enabled')
}

if (!fs.existsSync(path.join(braveCoreDir, '.git'))) {
  Log.status(`Cloning brave-core [${braveCoreRef}] into ${braveCoreDir}...`)
  fs.mkdirSync(braveCoreDir)
  util.runGit(braveCoreDir, ['clone', util.getNPMConfig(['projects', 'brave-core', 'repository', 'url']), '.'])
  util.runGit(braveCoreDir, ['checkout', braveCoreRef])
}
const braveCoreSha = util.runGit(braveCoreDir, ['rev-parse', 'HEAD'])
Log.progress(`brave-core repo at ${braveCoreDir} is at commit ID ${braveCoreSha}`)

let npmCommand = 'npm'
if (process.platform === 'win32') {
  npmCommand += '.cmd'
}

// Add error handling for npm install
try {
  util.run(npmCommand, ['install'], { cwd: braveCoreDir })
} catch (error) {
  Log.error(`Failed to install npm dependencies: ${error.message}`)
  process.exit(1)
}

// Prepare sync arguments
let syncArgs = ['run', 'sync', '--', '--init']
if (hasCustomFlag) {
  syncArgs.push('--custom-flag')  // Add your custom flag to the sync process
}
syncArgs = syncArgs.concat(process.argv.slice(2).filter(arg => arg !== '--custom-build'))

util.run(npmCommand, syncArgs, {
  cwd: braveCoreDir,
  env: process.env,
  stdio: 'inherit',
  shell: true,
  git_cwd: '.', 
})

Log.progress('Initialization complete!')