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

//Replace android strings.
const androidChromeStringsPath = path.resolve(path.join(srcDir, 'chrome', 'android', 'java', 'strings', 'android_chrome_strings.grd'))
const braveAndroidChromeStringsPath = path.resolve(path.join(srcDir, 'brave', 'android', 'java', 'strings', 'android_chrome_strings.grd'))

// component_chromium_strings.grd and any of its parts files that we track localization for in transifex
// These map to brave/app/strings/components_chromium_strings*.xtb
const chromiumComponentsChromiumStringsPath = path.resolve(path.join(srcDir, 'components', 'components_chromium_strings.grd'))
const braveComponentsBraveStringsPath = path.resolve(path.join(srcDir, 'brave', 'components', 'components_brave_strings.grd'))

// components/component_strings.grd and any of its parts files that we track localization for in transifex
// These map to brave/components/component_strings.xtb
const chromiumComponentsStringsPath = path.resolve(path.join(srcDir, 'components', 'components_strings.grd'))
const braveComponentsStringsPath = path.resolve(path.join(srcDir, 'brave', 'components', 'components_strings.grd'))
const chromiumAppModalStringsPartPath = path.resolve(path.join(srcDir, 'components', 'app_modal_strings.grdp'))
const braveAppModalStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'app_modal_strings.grdp'))
const chromiumAutofillAssistantStringsPartPath = path.resolve(path.join(srcDir, 'components', 'autofill_assistant_strings.grdp'))
const braveAutofillAssistantStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'autofill_assistant_strings.grdp'))
const chromiumAutofillPaymentsStringsPartPath = path.resolve(path.join(srcDir, 'components', 'autofill_payments_strings.grdp'))
const braveAutofillPaymentsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'autofill_payments_strings.grdp'))
const chromiumAutofillStringsPartPath = path.resolve(path.join(srcDir, 'components', 'autofill_strings.grdp'))
const braveAutofillStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'autofill_strings.grdp'))
const chromiumBookmarkBarStringsPartPath = path.resolve(path.join(srcDir, 'components', 'bookmark_bar_strings.grdp'))
const braveBookmarkBarStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'bookmark_bar_strings.grdp'))
const chromiumBookmarkComponentStringsPartPath = path.resolve(path.join(srcDir, 'components', 'bookmark_component_strings.grdp'))
const braveBookmarkComponentStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'bookmark_component_strings.grdp'))
const chromiumBrowsingDataStringsPartPath = path.resolve(path.join(srcDir, 'components', 'browsing_data_strings.grdp'))
const braveBrowsingDataStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'browsing_data_strings.grdp'))
const chromiumComponentsSettingsStringsPartPath = path.resolve(path.join(srcDir, 'components', 'components_settings_strings.grdp'))
const braveComponentsSettingsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'components_settings_strings.grdp'))
const chromiumCrashStringsPartPath = path.resolve(path.join(srcDir, 'components', 'crash_strings.grdp'))
const braveCrashStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'crash_strings.grdp'))
const chromiumDialogStringsPartPath = path.resolve(path.join(srcDir, 'components', 'dialog_strings.grdp'))
const braveDialogStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'dialog_strings.grdp'))
const chromiumDomDistillerStringsPartPath = path.resolve(path.join(srcDir, 'components', 'dom_distiller_strings.grdp'))
const braveDomDistillerStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'dom_distiller_strings.grdp'))
const chromiumErrorPageStringsPartPath = path.resolve(path.join(srcDir, 'components', 'error_page_strings.grdp'))
const braveErrorPageStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'error_page_strings.grdp'))
const chromiumFindInPageStringsPartPath = path.resolve(path.join(srcDir, 'components', 'find_in_page_strings.grdp'))
const braveFindInPageStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'find_in_page_strings.grdp'))
const chromiumFlagsStringsPartPath = path.resolve(path.join(srcDir, 'components', 'flags_strings.grdp'))
const braveFlagsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'flags_strings.grdp'))
const chromiumHistoryStringsPartPath = path.resolve(path.join(srcDir, 'components', 'history_strings.grdp'))
const braveHistoryStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'history_strings.grdp'))
const chromiumLoginDialogStringsPartPath = path.resolve(path.join(srcDir, 'components', 'login_dialog_strings.grdp'))
const braveLoginDialogStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'login_dialog_strings.grdp'))
const chromiumMediaMessageCenterStringsPartPath = path.resolve(path.join(srcDir, 'components', 'media_message_center_strings.grdp'))
const braveMediaMessageCenterStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'media_message_center_strings.grdp'))
const chromiumNewOrSadTabStringsPartPath = path.resolve(path.join(srcDir, 'components', 'new_or_sad_tab_strings.grdp'))
const braveNewOrSadTabStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'new_or_sad_tab_strings.grdp'))
const chromiumNtpSnippetsStringsPartPath = path.resolve(path.join(srcDir, 'components', 'ntp_snippets_strings.grdp'))
const braveNtpSnippetsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'ntp_snippets_strings.grdp'))
const chromiumOmniboxStringsPartPath = path.resolve(path.join(srcDir, 'components', 'omnibox_strings.grdp'))
const braveOmniboxStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'omnibox_strings.grdp'))
const chromiumPageInfoStringsPartPath = path.resolve(path.join(srcDir, 'components', 'page_info_strings.grdp'))
const bravePageInfoStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'page_info_strings.grdp'))
const chromiumPasswordManagerStringsPartPath = path.resolve(path.join(srcDir, 'components', 'password_manager_strings.grdp'))
const bravePasswordManagerStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'password_manager_strings.grdp'))
const chromiumPaymentsStringsPartPath = path.resolve(path.join(srcDir, 'components', 'payments_strings.grdp'))
const bravePaymentsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'payments_strings.grdp'))
const chromiumPdfStringsPartPath = path.resolve(path.join(srcDir, 'components', 'pdf_strings.grdp'))
const bravePdfStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'pdf_strings.grdp'))
const chromiumPolicyStringsPartPath = path.resolve(path.join(srcDir, 'components', 'policy_strings.grdp'))
const bravePolicyStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'policy_strings.grdp'))
const chromiumPrintMediaStringsPartPath = path.resolve(path.join(srcDir, 'components', 'print_media_strings.grdp'))
const bravePrintMediaStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'print_media_strings.grdp'))
const chromiumPrintingComponentStringsPartPath = path.resolve(path.join(srcDir, 'components', 'printing_component_strings.grdp'))
const bravePrintingComponentStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'printing_component_strings.grdp'))
const chromiumResetPasswordStringsPartPath = path.resolve(path.join(srcDir, 'components', 'reset_password_strings.grdp'))
const braveResetPasswordStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'reset_password_strings.grdp'))
const chromiumSafeBrowsingStringsPartPath = path.resolve(path.join(srcDir, 'components', 'safe_browsing_strings.grdp'))
const braveSafeBrowsingStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'safe_browsing_strings.grdp'))
const chromiumSecurityInterstitialsStringsPartPath = path.resolve(path.join(srcDir, 'components', 'security_interstitials_strings.grdp'))
const braveSecurityInterstitialsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'security_interstitials_strings.grdp'))
const chromiumSecurityStateStringsPartPath = path.resolve(path.join(srcDir, 'components', 'security_state_strings.grdp'))
const braveSecurityStateStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'security_state_strings.grdp'))
const chromiumSslErrorsStringsPartPath = path.resolve(path.join(srcDir, 'components', 'ssl_errors_strings.grdp'))
const braveSslErrorsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'ssl_errors_strings.grdp'))
const chromiumSyncUiStringsPartPath = path.resolve(path.join(srcDir, 'components', 'sync_ui_strings.grdp'))
const braveSyncUiStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'sync_ui_strings.grdp'))
const chromiumTranslateStringsPartPath = path.resolve(path.join(srcDir, 'components', 'translate_strings.grdp'))
const braveTranslateStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'translate_strings.grdp'))
const chromiumUndoStringsPartPath = path.resolve(path.join(srcDir, 'components', 'undo_strings.grdp'))
const braveUndoStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'undo_strings.grdp'))
const chromiumVersionUiStringsPartPath = path.resolve(path.join(srcDir, 'components', 'version_ui_strings.grdp'))
const braveVersionUiStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'version_ui_strings.grdp'))
const chromiumManagementStringsPartPath = path.resolve(path.join(srcDir, 'components', 'management_strings.grdp'))
const braveManagementStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'components', 'management_strings.grdp'))

// generated_resources.grd and any of its parts files that we track localization for in transifex
// There is also chromeos_strings.grdp, but we don't need to track it here because it is explicitly skipped in transifex.py
// These map to brave/app/resources/generated_resoruces*.xtb
const chromiumGeneratedResourcesPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'generated_resources.grd'))
const braveGeneratedResourcesPath = path.resolve(path.join(srcDir, 'brave', 'app', 'generated_resources.grd'))
const chromiumBookmarksStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'bookmarks_strings.grdp'))
const braveBookmarksStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'bookmarks_strings.grdp'))
const chromiumAppManagementStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'app_management_strings.grdp'))
const braveAppManagementStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'app_management_strings.grdp'))
const chromiumMediaRouterStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'media_router_strings.grdp'))
const braveMediaRouterStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'media_router_strings.grdp'))
const chromiumGlobalMediaControlsStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'global_media_controls_strings.grdp'))
const braveGlobalMediaControlsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'global_media_controls_strings.grdp'))
const chromiumProfilesStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'profiles_strings.grdp'))
const braveProfilesStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'profiles_strings.grdp'))
const chromiumOsSettingsStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'os_settings_strings.grdp'))
const braveOsSettingsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'os_settings_strings.grdp'))
const chromiumSettingsStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'settings_strings.grdp'))
const braveSettingsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'settings_strings.grdp'))
const chromiumExtensionsStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'extensions_strings.grdp'))
const braveExtensionsStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'extensions_strings.grdp'))
const chromiumWelcomeStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'welcome_strings.grdp'))
const braveWelcomeStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'welcome_strings.grdp'))
const chromiumPrintingStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'printing_strings.grdp'))
const bravePrintingStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'printing_strings.grdp'))
const chromiumVrStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'vr_strings.grdp'))
const braveVrStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'vr_strings.grdp'))
const chromiumXrConsentUiStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'xr_consent_ui_strings.grdp'))
const braveXrConsentUiStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'xr_consent_ui_strings.grdp'))
const chromiumSupervisedUserErrorPageStringsPartPath = path.resolve(path.join(srcDir, 'chrome', 'app', 'supervised_user_error_page_strings.grdp'))
const braveSupervisedUserErrorPageStringsPartPath = path.resolve(path.join(srcDir, 'brave', 'app', 'supervised_user_error_page_strings.grdp'))

// The following are not generated files but still need to be tracked so they get sent to transifex
// These xtb files don't need to be copied anywhere.
// brave_generated_resources.grd maps to brave/app/resources/brave_generated_resources*.xtb,
// brave_components_strings.grd maps to brave/components/resources/strings/brave_components_resources*.xtb
// messages.json localization is handled inside of brave-extension.
const braveSpecificGeneratedResourcesPath = path.resolve(path.join(srcDir, 'brave', 'app', 'brave_generated_resources.grd'))
const braveResourcesComponentsStringsPath = path.resolve(path.join(srcDir, 'brave', 'components', 'resources', 'brave_components_strings.grd'))
const braveExtensionMessagesPath = path.resolve(path.join(srcDir, 'brave', 'components', 'brave_extension', 'extension', 'brave_extension', '_locales', 'en_US', 'messages.json'))
const braveRewardsExtensionMessagesPath = path.resolve(path.join(srcDir, 'brave', 'components', 'brave_rewards', 'resources', 'extension', 'brave_rewards', '_locales', 'en_US', 'messages.json'))

// When adding new grd or grd files, never add a grdp part path without a parent grd path.
// Group them with a leading and trailing newline to keep this file organized.

// Add all mappings here whether it is a GRD or a GRDP.
// Brave specific only grd and grdp files should not be added here.
const chromiumToAutoGeneratedBraveMapping = {
  [chromiumStringsPath]: braveStringsPath,
  [chromiumSettingsPartPath]: braveSettingsPartPath,
  [chromiumComponentsChromiumStringsPath]: braveComponentsBraveStringsPath,
  [chromiumComponentsStringsPath]: braveComponentsStringsPath,
  [chromiumAppModalStringsPartPath]: braveAppModalStringsPartPath,
  [chromiumAutofillAssistantStringsPartPath]: braveAutofillAssistantStringsPartPath,
  [chromiumAutofillPaymentsStringsPartPath]: braveAutofillPaymentsStringsPartPath,
  [chromiumAutofillStringsPartPath]: braveAutofillStringsPartPath,
  [chromiumBookmarkBarStringsPartPath]: braveBookmarkBarStringsPartPath,
  [chromiumBookmarkComponentStringsPartPath]: braveBookmarkComponentStringsPartPath,
  [chromiumBrowsingDataStringsPartPath]: braveBrowsingDataStringsPartPath,
  [chromiumComponentsSettingsStringsPartPath]: braveComponentsSettingsStringsPartPath,
  [chromiumCrashStringsPartPath]: braveCrashStringsPartPath,
  [chromiumDialogStringsPartPath]: braveDialogStringsPartPath,
  [chromiumDomDistillerStringsPartPath]: braveDomDistillerStringsPartPath,
  [chromiumErrorPageStringsPartPath]: braveErrorPageStringsPartPath,
  [chromiumFindInPageStringsPartPath]: braveFindInPageStringsPartPath,
  [chromiumFlagsStringsPartPath]: braveFlagsStringsPartPath,
  [chromiumHistoryStringsPartPath]: braveHistoryStringsPartPath,
  [chromiumLoginDialogStringsPartPath]: braveLoginDialogStringsPartPath,
  [chromiumMediaMessageCenterStringsPartPath]: braveMediaMessageCenterStringsPartPath,
  [chromiumNewOrSadTabStringsPartPath]: braveNewOrSadTabStringsPartPath,
  [chromiumNtpSnippetsStringsPartPath]: braveNtpSnippetsStringsPartPath,
  [chromiumOmniboxStringsPartPath]: braveOmniboxStringsPartPath,
  [chromiumPageInfoStringsPartPath]: bravePageInfoStringsPartPath,
  [chromiumPasswordManagerStringsPartPath]: bravePasswordManagerStringsPartPath,
  [chromiumPaymentsStringsPartPath]: bravePaymentsStringsPartPath,
  [chromiumPdfStringsPartPath]: bravePdfStringsPartPath,
  [chromiumPolicyStringsPartPath]: bravePolicyStringsPartPath,
  [chromiumPrintMediaStringsPartPath]: bravePrintMediaStringsPartPath,
  [chromiumPrintingComponentStringsPartPath]: bravePrintingComponentStringsPartPath,
  [chromiumResetPasswordStringsPartPath]: braveResetPasswordStringsPartPath,
  [chromiumSafeBrowsingStringsPartPath]: braveSafeBrowsingStringsPartPath,
  [chromiumSecurityInterstitialsStringsPartPath]: braveSecurityInterstitialsStringsPartPath,
  [chromiumSecurityStateStringsPartPath]: braveSecurityStateStringsPartPath,
  [chromiumSslErrorsStringsPartPath]: braveSslErrorsStringsPartPath,
  [chromiumSyncUiStringsPartPath]: braveSyncUiStringsPartPath,
  [chromiumTranslateStringsPartPath]: braveTranslateStringsPartPath,
  [chromiumUndoStringsPartPath]: braveUndoStringsPartPath,
  [chromiumVersionUiStringsPartPath]: braveVersionUiStringsPartPath,
  [chromiumManagementStringsPartPath]: braveManagementStringsPartPath,
  [chromiumGeneratedResourcesPath]: braveGeneratedResourcesPath,
  [chromiumBookmarksStringsPartPath]: braveBookmarksStringsPartPath,
  [chromiumAppManagementStringsPartPath]: braveAppManagementStringsPartPath,
  [chromiumMediaRouterStringsPartPath]: braveMediaRouterStringsPartPath,
  [chromiumGlobalMediaControlsStringsPartPath]: braveGlobalMediaControlsStringsPartPath,
  [chromiumProfilesStringsPartPath]: braveProfilesStringsPartPath,
  [chromiumOsSettingsStringsPartPath]: braveOsSettingsStringsPartPath,
  [chromiumSettingsStringsPartPath]: braveSettingsStringsPartPath,
  [chromiumExtensionsStringsPartPath]: braveExtensionsStringsPartPath,
  [chromiumWelcomeStringsPartPath]: braveWelcomeStringsPartPath,
  [chromiumPrintingStringsPartPath]: bravePrintingStringsPartPath,
  [chromiumVrStringsPartPath]: braveVrStringsPartPath,
  [chromiumXrConsentUiStringsPartPath]: braveXrConsentUiStringsPartPath,
  [chromiumSupervisedUserErrorPageStringsPartPath]: braveSupervisedUserErrorPageStringsPartPath,
  [androidChromeStringsPath]: braveAndroidChromeStringsPath
}

// Same as with chromiumToAutoGeneratedBraveMapping but maps in the opposite direction
module.exports.autoGeneratedBraveToChromiumMapping = Object.keys(chromiumToAutoGeneratedBraveMapping)
    .reduce((obj, key) => ({ ...obj, [chromiumToAutoGeneratedBraveMapping[key]]: key }), {})

// All paths which are not generated
module.exports.braveNonGeneratedPaths = [
  braveSpecificGeneratedResourcesPath, braveResourcesComponentsStringsPath, braveExtensionMessagesPath, braveRewardsExtensionMessagesPath
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

// ethereum-remote-client path relative to the Brave paths
module.exports.ethereumRemoteClientPaths = [
  '../../../ethereum-remote-client/app/_locales/en/messages.json',
  '../../../ethereum-remote-client/brave/app/_locales/en/messages.json'
]

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
  [/Chrome Web Store/g, 'Web Store'],
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
  [/People/g, 'Profiles'],
  // 'people' but only in the context of profiles, not humans.
  [/(?<!authenticate )people(?! with slow connections?)/g, 'profiles'],
  [/(Person)(?!\w)/g, 'Profile'],
  [/(person)(?!\w)/g, 'profile'],
  [/Bookmarks Bar\n/g, 'Bookmarks\n'],
  [/Bookmarks bar\n/g, 'Bookmarks\n'],
  [/bookmarks bar\n/g, 'bookmarks\n'],
]
