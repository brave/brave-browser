/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const path = require('path')
const fs = require('fs')
const util = require('../lib/util')

const baseDir = path.resolve(path.join(__dirname, '..'))
const braveDir = path.join(baseDir, 'src', 'brave')
const braveVendorDir = path.join(braveDir, 'vendor')
const syncDir = path.join(braveDir, 'components', 'brave_sync', 'extension', 'brave-sync')
const auditScript = path.join(braveDir, 'script', 'audit_deps.py')

/**
 * Runs npm audit on a given directory located at pathname
 */
function npmAudit (pathname) {
  if (fs.existsSync(path.join(pathname, 'package.json')) &&
    fs.existsSync(path.join(pathname, 'package-lock.json')) &&
    fs.existsSync(path.join(pathname, 'node_modules'))) {
    console.log('Auditing', pathname)
    let cmdOptions = {
      cwd: pathname,
      shell: process.platform === 'win32'
    }
    util.run('python', [auditScript], cmdOptions)
  } else {
    console.log('Skipping audit of "' + pathname + '" (no package.json or node_modules directory found)')
  }
}

npmAudit(baseDir)
npmAudit(braveDir)
npmAudit(syncDir)
fs.readdirSync(braveVendorDir).forEach((dir) => {
  npmAudit(path.join(braveVendorDir, dir))
})
