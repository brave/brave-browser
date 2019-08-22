// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const path = require('path')
const os = require('os')
const readline = require('readline')
const program = require('commander')
const fs = require('fs-extra')
const chalk = require('chalk')
const config = require('../lib/config')
const util = require('../lib/util')
const GitPatcher = require('../lib/gitPatcher')
const chromiumRepoPathFilter = require('../lib/chromiumPathFilter')
program
  .version(process.env.npm_package_version)

async function RunCommand () {
  program.parse(process.argv)
  config.update(program)
  
  const coreRepoPath = config.projects['brave-core'].dir
  const patchesPath = path.join(coreRepoPath, 'patches')
  const v8PatchesPath = path.join(patchesPath, 'v8')
  const chromiumRepoPath = config.projects['chrome'].dir
  const v8RepoPath = path.join(chromiumRepoPath, 'v8')
  const chromiumPatcher = new GitPatcher(patchesPath, chromiumRepoPath)
  const v8Patcher = new GitPatcher(v8PatchesPath, v8RepoPath)
  
  const rl = readline.createInterface(process.stdin, process.stdout)
  function onChangeFound(modifiedPath, diffContent) {
    console.log(chalk.blue('---------'))
    console.log(diffContent)
    return new Promise(resolve => {
      rl.question(`Reset file at: ${modifiedPath}? y/[n]`, answer => {
        resolve(answer.length && answer.toLowerCase()[0] === 'y')
      })
    })
  }

  const chromiumPatchStatus = await chromiumPatcher.resetNonPatchedChanges(onChangeFound, chromiumRepoPathFilter)
  const v8PatchStatus = await v8Patcher.resetNonPatchedChanges(onChangeFound)
}

console.log('Brave reset non-patched files starting')
RunCommand()
.then(() => {
  console.log('Brave reset complete')
  process.exit(0)
})
.catch((err) => {
  console.error('Brave reset ERROR:')
  console.error(err)
})
