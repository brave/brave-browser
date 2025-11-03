// Copyright (c) 2019 The Brave Authors. All rights reserved.
// Copyright (c) 2025 The Secretariat Browser Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.
//
// NOTE: Secretariat is derived from Brave Browser

const chalk = require('chalk')

let divider
function setLineLength () {
  divider = Array(process.stdout.columns || 32).join('-')
}
setLineLength()
process.stdout.on('resize', setLineLength)

// Secretariat color scheme: mint green, deep brown, cream, salmon
const progressStyle = chalk.bold.inverse
const statusStyle = chalk.hex('#98D8C8').italic  // Mint green
const warningStyle = chalk.hex('#3E2723').bold.bgHex('#FFA07A')  // Deep brown on salmon

const cmdDirStyle = chalk.blue
const cmdCmdStyle = chalk.green
const cmdArrowStyle = chalk.magenta

function progress (message) {
  console.log(progressStyle(message))
}

function status(message) {
  console.log(statusStyle(message))
}

function error (message) {
  console.error(progressStyle(message))
}

function warn (message) {
  console.error(warningStyle(message))
}

function command (dir, cmd, args) {
  console.log(divider)
  if (dir)
    console.log(cmdDirStyle(dir))
  console.log(`${cmdArrowStyle('>')} ${cmdCmdStyle(cmd)} ${args.join(' ')}`)
}

module.exports = {
  progress,
  status,
  error,
  warn,
  command
}
