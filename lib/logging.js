// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const chalk = require('chalk')

let divider
function setLineLength () {
  divider = Array(process.stdout.columns || 32).join('-')
}
setLineLength()
process.stdout.on('resize', setLineLength)

const progressStyle = chalk.bold.inverse
const statusStyle = chalk.green.italic
const warningStyle = chalk.black.bold.bgYellow

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
