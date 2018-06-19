/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const path = require('path')
const fs = require('fs')

const srcDir = path.resolve(path.join(__dirname, '..', 'src'))

// Brave string paths
const braveStringsPath = path.resolve(path.join(srcDir, 'brave', 'app', 'brave_strings.grd'))
const braveSettingsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'settings_brave_strings.grdp'))
const braveComponentsStringsPath = path.resolve(path.join(srcDir, 'brave', 'app', 'components_brave_strings.grd'))
const braveExtensionMessagesPath = path.resolve(path.join(srcDir, 'brave', 'vendor', 'brave-extension', 'app', '_locales', 'en_US', 'messages.json'))
const braveSpecificGeneratedResourcesPath = path.resolve(path.join(srcDir, 'brave', 'app', 'brave_generated_resources.grd'))
const braveComponentsResourcesPath = path.resolve(path.join(srcDir, 'brave', 'components', 'resources', 'brave_components_resources.grd'))

const braveGeneratedResourcesPath = path.resolve(path.join(srcDir, 'brave', 'app', 'generated_resources.grd'))
const braveBookmarksPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'bookmarks_strings.grdp'))
const braveMediaRouterPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'media_router_strings.grdp'))
const braveSettingsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'settings_strings.grdp'))
const braveMdExtensionsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'md_extensions_strings.grdp'))

// Chromium string paths
const chromiumStringsPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'chromium_strings.grd'))
const chroimumSettingsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'settings_chromium_strings.grdp'))
const chromiumComponentsStringsPath = path.resolve(path.join(srcDir, 'components', 'components_chromium_strings.grd'))

const chromiumGeneratedResourcesPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'generated_resources.grd'))
const chromiumBookmarksPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'bookmarks_strings.grdp'))
const chromiumMediaRouterPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'media_router_strings.grdp'))
const chromiumSettingsStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'settings_strings.grdp'))
const chromiumMdExtensionsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'md_extensions_strings.grdp'))

module.exports.getSourceStringPaths = () => {
  return [
    braveStringsPath,
    braveComponentsStringsPath,
    braveExtensionMessagesPath,
    braveSpecificGeneratedResourcesPath,
    braveComponentsResourcesPath,
    braveGeneratedResourcesPath,
    // No strings for now, uncomment if strings are added
    // path.resolve(path.join(srcDir, 'brave', 'browser', 'resources', 'brave_extension.grd')),
    // path.resolve(path.join(srcDir, 'brave', 'common', 'extensions', 'api', 'brave_api_resources.grd')),
  ]
}

module.exports.rebaseBraveStringFilesOnChromiumL10nFiles = (path) =>
  Object.entries({
    [chromiumStringsPath]: braveStringsPath,
    [chroimumSettingsPartPath]: braveSettingsPartPath,
    [chromiumComponentsStringsPath]: braveComponentsStringsPath,
    [chromiumGeneratedResourcesPath]: braveGeneratedResourcesPath,
    [chromiumBookmarksPartPath]: braveBookmarksPartPath,
    [chromiumMediaRouterPartPath]: braveMediaRouterPartPath,
    [chromiumSettingsStringsPartPath]: braveSettingsStringsPartPath,
    [chromiumMdExtensionsPartPath]: braveMdExtensionsPartPath
  }).forEach(([sourcePath, destPath]) =>
    fs.writeFileSync(destPath,
      fs.readFileSync(sourcePath, 'utf8')
        .replace(/settings_chromium_strings.grdp/g, 'settings_brave_strings.grdp')
        .replace(/The Chromium Authors/g, 'Brave Software Inc')
        .replace(/Google Chrome/g, 'Brave')
        .replace(/Chromium/g, 'Brave')
        .replace(/Chrome/g, 'Brave')
        .replace(/Google/g, 'Brave'), 'utf8'))
