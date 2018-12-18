/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */


/**
 * This file manages the following:
 * - Lists of files needed to be translated (Which is all top level GRD and JSON files)
 * - All mappings for auto-generated Brave files from the associated Chromium files.
 * - Top level global string replacements, such as replacing Chromium with Brave
 */

const path = require('path')
const fs = require('fs')

const srcDir = path.resolve(path.join(__dirname, '..', 'src'))

// chromium_strings.grd and any of its parts files that we track localization for in transifex
// These map to brave/app/resources/chromium_strings*.xtb
const chromiumStringsPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'chromium_strings.grd'))
const braveStringsPath = path.resolve(path.join(srcDir, 'brave', 'app', 'brave_strings.grd'))
const chromiumSettingsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'settings_chromium_strings.grdp'))
const braveSettingsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'settings_brave_strings.grdp'))

// component_chromium_strings.grd and any of its parts files that we track localization for in transifex
// These map to brave/app/strings/components_chromium_strings*.xtb
const chromiumComponentsStringsPath = path.resolve(path.join(srcDir, 'components', 'components_chromium_strings.grd'))
const braveChromiumComponentsStringsPath = path.resolve(path.join(srcDir, 'brave', 'app', 'components_brave_strings.grd'))

// generated_resources.grd and any of its parts files that we track localization for in transifex
// There is also chromeos_strings.grdp but we don't need to track it here
// These map to brave/app/resources/generated_resoruces*.xtb
const chromiumGeneratedResourcesPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'generated_resources.grd'))
const braveGeneratedResourcesPath = path.resolve(path.join(srcDir, 'brave', 'app', 'generated_resources.grd'))
const chromiumBookmarksPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'bookmarks_strings.grdp'))
const braveBookmarksPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'bookmarks_strings.grdp'))
const chromiumMediaRouterPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'media_router_strings.grdp'))
const braveMediaRouterPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'media_router_strings.grdp'))
const chromiumSettingsStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'settings_strings.grdp'))
const braveSettingsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'settings_strings.grdp'))
const chromiumMdExtensionsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'md_extensions_strings.grdp'))
const braveMdExtensionsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'md_extensions_strings.grdp'))
const chromiumPrintingStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'printing_strings.grdp'))
const bravePrintingStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'printing_strings.grdp'))
const chromiumProfileSettingsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'profiles_strings.grdp'))
const braveProfileSettingsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'profiles_strings.grdp'))
const chromiumFileManagerStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'file_manager_strings.grdp'))
const braveFileManagerStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'file_manager_strings.grdp'))
const chromiumNuxStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'nux_strings.grdp'))
const braveNuxStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'nux_strings.grdp'))
const chromiumVRStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'vr_strings.grdp'))
const braveVRStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'vr_strings.grdp'))
const chromiumOnboardingWelcomeStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'onboarding_welcome_strings.grdp'))
const braveOnboardingWelcomeStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'onboarding_welcome_strings.grdp'))

// The following are not generated files but still need to be tracked so they get sent to transifex
// These xtb files don't need to be copied anywhere.
// brave_generated_resources.grd maps to brave/app/resources/brave_generated_resources*.xtb,
// brave_components_strings.grd maps to brave/components/resources/strings/brave_components_resources*.xtb
// messages.json localization is handled inside of brave-extension.
const braveSpecificGeneratedResourcesPath = path.resolve(path.join(srcDir, 'brave', 'app', 'brave_generated_resources.grd'))
const braveComponentsStringsPath = path.resolve(path.join(srcDir, 'brave', 'components', 'resources', 'brave_components_strings.grd'))
const braveExtensionMessagesPath = path.resolve(path.join(srcDir, 'brave', 'vendor', 'brave-extension', 'app', '_locales', 'en_US', 'messages.json'))
const braveRewardsExtensionMessagesPath = path.resolve(path.join(srcDir, 'brave', 'components', 'brave_rewards', 'resources', 'extension', 'brave_rewards', '_locales', 'en_US', 'messages.json'))

// When adding new grd or grd files, never add a grdp part path without a parent grd path.
// Group them with a leading and trailing newline to keep this file organized.

// Add all mappings here whether it is a GRD or a GRDP.
// Brave specific only grd and grdp files should not be added here.
const chromiumToAutoGeneratedBraveMapping = {
  [chromiumStringsPath]: braveStringsPath,
  [chromiumSettingsPartPath]: braveSettingsPartPath,
  [chromiumComponentsStringsPath]: braveChromiumComponentsStringsPath,
  [chromiumGeneratedResourcesPath]: braveGeneratedResourcesPath,
  [chromiumBookmarksPartPath]: braveBookmarksPartPath,
  [chromiumMediaRouterPartPath]: braveMediaRouterPartPath,
  [chromiumSettingsStringsPartPath]: braveSettingsStringsPartPath,
  [chromiumMdExtensionsPartPath]: braveMdExtensionsPartPath,
  [chromiumPrintingStringsPartPath]: bravePrintingStringsPartPath,
  [chromiumProfileSettingsPartPath]: braveProfileSettingsPartPath,
  [chromiumFileManagerStringsPartPath]: braveFileManagerStringsPartPath,
  [chromiumNuxStringsPartPath]: braveNuxStringsPartPath,
  [chromiumVRStringsPartPath]: braveVRStringsPartPath,
  [chromiumOnboardingWelcomeStringsPartPath]: braveOnboardingWelcomeStringsPartPath
}

// Same as with chromiumToAutoGeneratedBraveMapping but maps in the opposite direction
module.exports.autoGeneratedBraveToChromiumMapping = Object.keys(chromiumToAutoGeneratedBraveMapping)
    .reduce((obj, key) => ({ ...obj, [chromiumToAutoGeneratedBraveMapping[key]]: key }), {})

// All paths which are not generated
module.exports.braveNonGeneratedPaths = [
  braveSpecificGeneratedResourcesPath, braveComponentsStringsPath, braveExtensionMessagesPath, braveRewardsExtensionMessagesPath
]

// All paths which are generated
module.exports.braveAutoGeneratedPaths = Object.values(chromiumToAutoGeneratedBraveMapping)

// Brave specific strings and Chromium mapped Brave strings will be here.
// But you only need to add the Brave specific strings manually here.
module.exports.allBravePaths = module.exports.braveNonGeneratedPaths.concat(module.exports.braveAutoGeneratedPaths)

// Get all GRD and JSON paths whether they are generatd or not
// Push and pull scripts for l10n use this.
// Transifex manages files per grd and not per grd or grdp.
// This is because only 1 xtb is created per grd per locale even if it has multiple grdp files.
module.exports.braveTopLevelPaths = module.exports.allBravePaths.filter((x) => ['grd', 'json'].includes(x.split('.').pop()))


// This simply reads Chromium files that are passed to it and replaces branding strings
// with Brave specific branding strings.
// Do not use this for filtering XML, instead use chromium-rebase-l10n.py.
// Only add idempotent replacements here (i.e. don't append replace A with AX here)
module.exports.rebaseBraveStringFilesOnChromiumL10nFiles = async function (path) {
  const ops = Object.entries(chromiumToAutoGeneratedBraveMapping).map(async ([sourcePath, destPath]) => {
    let contents = await new Promise(resolve => fs.readFile(sourcePath, 'utf8', (err, data) => resolve(data)))
    for (const replacement of defaultReplacements) {
      contents = contents.replace(replacement[0], replacement[1])
    }
    await new Promise(resolve => fs.writeFile(destPath, contents, 'utf8', resolve))
  })
  await Promise.all(ops)
}

// Straight-forward string replacement list.
// Consider mapping chromium resource ID to a new brave resource ID
// for whole-message replacements, instead of adding to this list.
const defaultReplacements = [
  [/Automatically send usage statistics and crash reports to Google/g, 'Automatically send crash reports to Google'],
  [/Automatically sends usage statistics and crash reports to Google/g, 'Automatically sends crash reports to Google'],
  [/The Chromium Authors/g, 'Brave Software Inc'],
  [/Google Chrome/g, 'Brave'],
  [/Chromium/g, 'Brave'],
  [/Chrome/g, 'Brave'],
  [/Google/g, 'Brave'],
  [/You're incognito/g, 'This is a private window'],
  [/an incognito/g, 'a private'],
  [/an Incognito/g, 'a Private'],
  [/incognito/g, 'private'],
  [/Incognito/g, 'Private'],
  [/inco\&amp\;gnito/g, '&amp;private'],
  [/Inco\&amp\;gnito/g, '&amp;Private'],
]
