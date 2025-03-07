// Copyright (c) 2025 The iiBrowe Authors. All rights reserved.
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
const ibroweCoreDir = path.resolve(__dirname, '..', 'src', 'ibrowe')
const ibrowePatchesDir = path.resolve(__dirname, '..', 'src', 'ibrowe', 'patches')
const braveCoreRef = util.getProjectVersion('brave-core')
const ibroweCoreRef = util.getProjectVersion('ibrowe-core')

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

util.run(npmCommand, ['install'], { cwd: braveCoreDir })

util.run(npmCommand, ['run', 'sync' ,'--', '--init'].concat(process.argv.slice(2)), {
  cwd: braveCoreDir,
  env: process.env,
  stdio: 'inherit',
  shell: true,
  git_cwd: '.', })

if (!fs.existsSync(path.join(ibroweCoreDir, '.git'))) {
  Log.status(`Cloning brave-core [${ibroweCoreRef}] into ${ibroweCoreDir}...`)
  fs.mkdirSync(ibroweCoreDir)
  util.runGit(ibroweCoreDir, ['clone', util.getNPMConfig(['projects', 'ibrowe-core', 'repository', 'url']), '.'])
  util.runGit(ibroweCoreDir, ['checkout', ibroweCoreRef])
}

// Apply Patches from /src/ibrowe/patches to /src/brave
if (fs.existsSync(ibrowePatchesDir)) {
  const patches = fs.readdirSync(ibrowePatchesDir).filter(file => file.endsWith('.patch'))

  if (patches.length > 0) {
    Log.progress(`Applying patches...`)

    let appliedPatches = 0
    console.log(`\nThere are ${patches.length} iBrowe code patch updates to apply.\n`)

    patches.forEach(patch => {
      const patchPath = path.join(ibrowePatchesDir, patch)
      Log.status(`Applying patch: ${patch}`)

      // Get modified file paths from the patch
      const patchContent = fs.readFileSync(patchPath, 'utf8')
      const modifiedFiles = [...patchContent.matchAll(/^--- a\/(.*?)$/gm)].map(match => match[1])

      const result = spawnSync('git', ['apply', '--reject', '--whitespace=fix', patchPath], {
        cwd: braveCoreDir,
        stdio: 'pipe',
        shell: true
      })

      if (result.status === 0) {
        appliedPatches++

        modifiedFiles.forEach(file => {
          console.log(`\x1b[32m${file}\x1b[0m`) // Green color for applied files
          console.log(` - Patch applied because: The target file was modified since the patch was last applied.`)
          console.log('---------------------------------------------------------------------')
        })
      } else {
        console.log(`\x1b[31m${patch}\x1b[0m`) // Red color for failed patches
        console.log(` - ❌ Failed to apply patch: ${patch}`)
        console.log('---------------------------------------------------------------------')
      }
    })

    console.log(`\n${appliedPatches} successful patches applied.`)
  } else {
    Log.status('No patches found in /src/ibrowe/patches')
  }
} else {
  Log.status('Patch directory /src/ibrowe/patches does not exist')
}

