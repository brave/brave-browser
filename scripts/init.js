// Copyright (c) 2019 The Brave Authors.
// Licensed under the MPL 2.0: http://mozilla.org/MPL/2.0/

const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const Log = require('../lib/logging')
const util = require('../lib/util')

const braveCoreDir = path.resolve(__dirname, '..', 'src', 'brave')

function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: true,
    ...options
  })

  if (result.error || result.status !== 0) {
    console.error(`Error running command: ${command} ${args.join(' ')}`)
    process.exit(result.status || 1)
  }
}

function ensureBraveCoreRepo() {
  const gitDir = path.join(braveCoreDir, '.git')
  const braveCoreRef = util.getProjectVersion('brave-core')
  const repoUrl = util.getNPMConfig(['projects', 'brave-core', 'repository', 'url'])

  if (!fs.existsSync(gitDir)) {
    Log.status(`Cloning brave-core [${braveCoreRef}] into ${braveCoreDir}...`)
    fs.mkdirSync(braveCoreDir, { recursive: true })

    util.runGit(braveCoreDir, ['clone', repoUrl, '.'])
    util.runGit(braveCoreDir, ['checkout', braveCoreRef])
  }

  const braveCoreSha = util.runGit(braveCoreDir, ['rev-parse', 'HEAD'])
  Log.progress(`brave-core repo at ${braveCoreDir} is at commit ID ${braveCoreSha}`)
}

function installDependencies() {
  let npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  runCommand(npmCommand, ['install'], { cwd: braveCoreDir })
}

function runSyncScript(args) {
  let npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  runCommand(npmCommand, ['run', 'sync', '--', '--init', ...args], {
    cwd: braveCoreDir,
    env: process.env
  })
}

function main() {
  try {
    Log.progress('Starting brave-core setup...')
    ensureBraveCoreRepo()
    installDependencies()
    runSyncScript(process.argv.slice(2))
    Log.progress('Setup complete.')
  } catch (err) {
    console.error('Setup failed:', err)
    process.exit(1)
  }
}

main()
