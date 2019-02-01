// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const { EOL } = require('os')
const { runAsync } = require('./util')
const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')

const findPatchFileRegex = /^([ADM])\tpatches\/(.*).patch/

module.exports = async function (refRange, options) {
  config.update(options)

  if (!refRange) {
    console.error('ref_range argument is required!')
    process.exit(1)
  }
  
  const braveDir = config.projects['brave-core'].dir
  const patchDir = path.join(braveDir, 'patches')
  const runOptionsBrave = { cwd: braveDir }
  const runOptionsChrome = { cwd: config.projects.chrome.dir }
  const runOptionsPatch = { cwd: patchDir }

  // get changed patch files
  console.log(`Finding changed patch files in range: ${refRange}`)
  const allChangedFilenames = (await runAsync('git', ['diff', '--name-status', refRange], runOptionsBrave)).split(EOL)
  const patchFileMatches = allChangedFilenames.map(line => findPatchFileRegex.exec(line)).filter(line => line && line.length === 3)
  if (!patchFileMatches.length) {
    console.log('No patch file changes found :-)')
    if (!allChangedFilenames.length) {
      console.log('...no file changes at all in this range! :-o')
    } else {
      console.log('Other file changes:')
      for (const fileChange of allChangedFilenames) {
        console.log(fileChange)
      }
    }
    // still a happy case
    process.exit(0)
  }
  for (const match of patchFileMatches) {
    // 	patches/ui-webui-resources-css-md_colors.css.patch
    console.log(`Processing: ${match[1]} - ${match[2]}`)
    const actionCode = match[1]
    if (!['A', 'D', 'M'].includes(actionCode)) {
      console.error(`Unknown git action code: ${actionCode} in line: ${match[0]}`)
      console.error('This script only knows how to handle patch files which are added, removed or modified.')
      process.exit(1)
    }
    const srcPath = match[2].replace(/-/g, '/')
    const patchPath = `brave/patches/${match[2]}.patch`

    // reset
    console.log(`Resetting: ${srcPath}`)
    await runAsync('git', ['checkout', '--', srcPath], runOptionsChrome)

    if (actionCode === 'D') {
      // patch was deleted, do nothing else
      continue
    }

    // patch was added or modified, re-apply
    console.log(`Applying patch: ${patchPath}`)
    await runAsync('git', ['apply', patchPath], runOptionsChrome)
  }
}
