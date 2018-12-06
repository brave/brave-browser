/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const path = require('path')
const fs = require('fs')
const util = require('../lib/util')

const baseDir = path.resolve(path.join(__dirname, '..'))
const braveDir = path.join(baseDir, 'src', 'brave')
const braveVendorDir = path.join(braveDir, 'vendor')
const syncDir = path.join(braveDir, 'components', 'brave_sync', 'extension')

/**
 * Runs npm audit on a given directory located at pathname
 */
function npmAudit (pathname) {
  if (fs.existsSync(path.join(pathname, 'package.json')) &&
    fs.existsSync(path.join(pathname, 'package-lock.json'))) {
    console.log('Auditing', pathname)
    util.run('npm', ['audit'], { cwd: pathname })
  } else {
    console.log('Skipping audit of', pathname)
  }
}

npmAudit(baseDir)
npmAudit(braveDir)
fs.readdirSync(braveVendorDir).forEach((dir) => {
  npmAudit(path.join(braveVendorDir, dir))
})
fs.readdirSync(syncDir).forEach((dir) => {
  npmAudit(path.join(syncDir, dir))
})
