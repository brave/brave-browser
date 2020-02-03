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
  path.join('components', 'third_party', 'adblock', 'lists', 'adblock_korea_contrib'),
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

const listNtpBackgrounds = (metadataFile) => {
  const metadata = fs.readFileSync(metadataFile).toString()
  let images = []
  // Hack to import this TypeScript file in Node:
  eval(metadata.replace('export const images: NewTab.Image[]', 'images'))
  return images
}

const getValidatedComponentField = (component, fieldName) => {
    const fieldValue = component[fieldName]
    if (!fieldValue) {
       console.error('Missing' + fieldName + ' for background image ' + component['name'])
       process.exit(1)
    }
    return fieldValue
}

const generateNtpBackgroundsLicense = (preamble, components) => {
  let componentNotices = ''

  for (let component of components) {
    if (componentNotices.length != 0) {
      componentNotices += '\n'
    }

    const fileName = getValidatedComponentField(component, 'source')
    const authorName = getValidatedComponentField(component, 'author')
    const authorLink = getValidatedComponentField(component, 'link')
    const originalUrl = getValidatedComponentField(component, 'originalUrl')
    const license = getValidatedComponentField(component, 'license')
    if ((license != 'used with permission') &&
        (license.substr(0, 8) != 'https://') && (license.substr(0, 7) != 'http://')) {
      console.error('Invalid license for background image ' + component['name'] + '. It needs to be a URL or the string "used with permission".')
      process.exit(1)
    }

    componentNotices += 'File: ' + fileName + '\n' +
                        'Author: ' + authorName + ' (' + authorLink + ')\n' +
                        'URL: ' + originalUrl + '\n' +
                        'License: ' + license + '\n'
  }

  return preamble + '\n\n' + componentNotices
}

const licensing = {
  updateLicenses: () => {
    console.log('regenerating LICENSE files...')
    const braveComponentsDir = path.join(config.projects['brave-core'].dir, 'components')
    const braveComponentsThirdPartyDir = path.join(braveComponentsDir, 'third_party')

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

    const braveNtpDataDir = path.join(braveComponentsDir, 'brave_new_tab_ui', 'data')
    let ntpBackgroundsPreamble = 'These licenses do not apply to any of the code shipped with the Brave Browser and instead apply to background images used on the new tab page. The Brave Browser and such data files are separate and independent works.'
    const ntpBackgrounds = listNtpBackgrounds(path.join(braveNtpDataDir, 'backgrounds.ts'))
    let ntpBackgroundsLicense = generateNtpBackgroundsLicense(ntpBackgroundsPreamble, ntpBackgrounds)
    fs.writeFileSync(path.join(braveNtpDataDir, 'LICENSE'), ntpBackgroundsLicense)
    console.log('  - ' + ntpBackgrounds.length + ' sub-components added in brave_new_tab_ui/data/LICENSE')
  }
}

module.exports = licensing
