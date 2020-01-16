/* Copyright (c) 2019 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

const path = require('path')
const config = require('./config')
const fs = require('fs-extra')

const knownMissing = new Set([
  // Emailed author (henrik@schack.dk) on 2019-11-05.
  path.join('components', 'third_party', 'adblock', 'lists', 'adblock_dk'),
  // https://github.com/gfmaster/adblock-korea-contrib/issues/47
  path.join('components', 'third_party', 'adblock', 'lists', 'adblock-korea-contrib'),
])

const extractLicenseInfo = (directory) => {
  const readmePath = path.join(directory, 'README.chromium')
  if (!fs.existsSync(readmePath)) {
    console.error('Missing README.chromium in ' + directory)
    process.exit(1)
  }

  const readmeContents = fs.readFileSync(readmePath).toString().split('\n')

  let metadata = {
    'slug': path.basename(directory),
    'Name': null,
    'URL': null,
    'License': null,
    'License File': null,
    'License Text': null
  }

  for (const line of readmeContents) {
    for (let field in metadata) {
      if (line.indexOf(field + ':') > -1) {
        metadata[field] = line.substr(field.length + 1).trim()
        break
      }
    }
  }

  if (!metadata['License File']) {
    const licensePath = path.join(directory, 'LICENSE')
    if (fs.existsSync(licensePath)) {
      metadata['License Text'] = fs.readFileSync(licensePath)
    } else if (metadata['License'] === 'unknown') {
      const relativeDir = directory.substr(config.projects['brave-core'].dir.length + 1)
      if (!knownMissing.has(relativeDir)) {
        console.log(knownMissing)
        console.error('Unknown license is not whitelisted: ' + relativeDir)
        process.exit(1)
      }
    } else {
      console.error('Missing LICENSE in ' + directory)
      process.exit(1)
    }
  }

  return metadata
}

const readLicenseText = (filename) => {
  // README.chromium files assume UNIX path separators
  let fullPath = config.srcDir
  for (const piece of filename.split('/')) {
    fullPath = path.join(fullPath, piece)
  }

  if (!fs.existsSync(fullPath)) {
    console.error('License file not found: ' + fullPath)
    process.exit(1)
  }

  return fs.readFileSync(fullPath)
}

const generateExternalComponentLicenseFile = (preamble, components) => {
  let componentNotices = ''
  let licenseText = ''

  let licenses = {}
  for (let component of components) {
    if (componentNotices.length != 0) {
      componentNotices += '\n'
    }

    let licenseId = component['License']
    const licenseText = component['License Text']
    if (licenseText) {
      // Custom license
      licenseId += '-' + component['slug']
    }

    componentNotices += 'Name: ' + component['Name'] + '\n' +
                        'URL: ' + component['URL'] + '\n' +
                        'License: ' + licenseId + '\n'

    if (licenseId === 'unknown') {
      continue
    }

    if (!licenses.hasOwnProperty(licenseId)) {
      if (licenseText) {
        licenses[licenseId] = licenseText
      } else {
        licenses[licenseId] = readLicenseText(component['License File'])
      }
    }
  }

  for (const id of Object.keys(licenses).sort()) {
    licenseText += '--------------------------------------------------------------------------------\n'
    licenseText += id + ':\n\n'
    licenseText += licenses[id] + '\n'
  }

  return preamble + '\n\n' + componentNotices + '\n' + licenseText
}

const listSubComponents = (baseDir) => {
  let subComponents = []
  fs.readdirSync(baseDir).forEach(file => {
    const dirPath = path.join(baseDir, file)
    if (fs.statSync(dirPath).isDirectory()) {
      subComponents.push(extractLicenseInfo(dirPath))
    }
  })
  return subComponents
}

const licensing = {
  updateLicenses: () => {
    console.log('regenerating LICENSE files...')
    const braveComponentsThirdPartyDir = path.join(config.projects['brave-core'].dir, 'components', 'third_party')

    // Brave Ad Block component
    const braveAdBlockDir = path.join(braveComponentsThirdPartyDir, 'adblock')
    const braveAdBlockListsDir = path.join(braveAdBlockDir, 'lists')
    let adblockPreamble = 'These licenses do not apply to any of the code shipped with the Brave Browser, but may apply to lists downloaded after installation for use with the Brave Shields feature. The Brave Browser and such lists are separate and independent works.'

    const adblockComponents = listSubComponents(braveAdBlockListsDir)
    let adblockLicense = generateExternalComponentLicenseFile(adblockPreamble, adblockComponents)
    fs.writeFileSync(path.join(braveComponentsThirdPartyDir, 'adblock', 'LICENSE'), adblockLicense)
    console.log('  - ' + adblockComponents.length + ' sub-components added in adblock/LICENSE')

    // Brave Local Data component
    const braveLocalDataDir = path.join(braveComponentsThirdPartyDir, 'local_data')
    const braveLocalDataListsDir = path.join(braveLocalDataDir, 'lists')
    let localDataPreamble = 'These licenses do not apply to any of the code shipped with the Brave Browser, but may apply to data files downloaded after installation for use with various Brave features. The Brave Browser and such data files are separate and independent works.'

    const localDataComponents = listSubComponents(braveLocalDataListsDir)
    let localDataLicense = generateExternalComponentLicenseFile(localDataPreamble, localDataComponents)
    fs.writeFileSync(path.join(braveComponentsThirdPartyDir, 'local_data', 'LICENSE'), localDataLicense)
    console.log('  - ' + localDataComponents.length + ' sub-components added in local_data/LICENSE')
  }
}

module.exports = licensing
