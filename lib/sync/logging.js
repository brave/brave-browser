// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const os = require('os')
const chalk = require('chalk')
const logUpdate = require('log-update')
const GitPatcher = require('../gitPatcher')

let divider
function setLineLength () {
  divider = Array(process.stdout.columns || 32).join('-')
}
setLineLength()
process.stdout.on('resize', setLineLength)

const progressStyle = chalk.bold.inverse

function progressLog (message) {
  console.log(progressStyle(message))
}

function errorLog (message) {
  console.error(progressStyle(message))
}

function logUpdateStatus (projectUpdateStatus) {
  const statusLines = Object.values(projectUpdateStatus).map(entry => 
    `${chalk.bold(entry.name)} (${entry.ref}): ${chalk.green.italic(entry.phase)}`
  )
  logUpdate(statusLines.join(os.EOL))
}

function logAllPatchStatus(allPatchStatus, patchGroupName) {
  if (!allPatchStatus.length) {
    console.log(chalk.bold.italic(`There were no ${patchGroupName} code patch updates to apply.`))
  } else {
    const successfulPatches = []
    const failedPatches = []
    for (const patchStatus of allPatchStatus) {
      if (!patchStatus.error) {
        successfulPatches.push(patchStatus)
      } else {
        failedPatches.push(patchStatus)
      }
    }
    console.log(chalk.bold(`There were ${allPatchStatus.length} ${patchGroupName} code patch updates to apply.`))
    if (successfulPatches.length) {
      console.log(chalk.green(`${successfulPatches.length} successful patches:`))
      successfulPatches.forEach(logPatchStatus)
    }
    if (failedPatches.length) {
      console.log(chalk.red(`${failedPatches.length} failed patches:`))
      failedPatches.forEach(logPatchStatus)
    }
  }
}

function logPatchStatus ({ reason, path, patchPath, error, warning }) {
  const success = !error
  const statusColor = success ? chalk.green : chalk.red
  console.log(statusColor.bold.underline(path || patchPath))
  console.log(`  - Patch applied because: ${GitPatcher.patchApplyReasonMessages[reason]}`)
  if (error) {
    console.log(chalk.red(`  - Error - ${error.message}`))
  }
  if (warning) {
    console.warn(chalk.yellow(`  - Warning - ${warning}`))
  }
  if (error)  {
    if (error.stdout) {
      console.log(chalk.blue(error.stdout))
    }
    if (error.stderr) {
      console.error(chalk.red(error.stderr))
    }
  }
  console.log(divider)
}

module.exports = {
  progressLog,
  errorLog,
  logUpdateStatus,
  logAllPatchStatus
}