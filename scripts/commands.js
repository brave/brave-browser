/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const program = require('commander');
const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')
const build = require('../lib/build')
const versions = require('../lib/versions')
const start = require('../lib/start')
const updatePatches = require('../lib/updatePatches')
const pullL10n = require('../lib/pullL10n')
const pushL10n = require('../lib/pushL10n')
const chromiumRebaseL10n = require('../lib/chromiumRebaseL10n')
const createDist = require('../lib/createDist')
const upload = require('../lib/upload')
const test = require('../lib/test')

const parsedArgs = program.parseOptions(process.argv)

program
  .version(process.env.npm_package_version)

program
  .command('versions')
  .action(versions)

program
  .command('build')
  .option('-C <build_dir>', 'build config (out/Debug, out/Release')
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .option('--mac_signing_identifier <id>', 'The identifier to use for signing')
  .option('--mac_signing_keychain <keychain>', 'The identifier to use for signing', 'login')
  .option('--debug_build <debug_build>', 'keep debugging symbols')
  .option('--official_build <official_build>', 'force official build settings')
  .option('--brave_google_api_key <brave_google_api_key>')
  .option('--brave_google_api_endpoint <brave_google_api_endpoint>')
  .option('--channel <target_chanel>', 'target channel to build', /^(beta|dev|nightly|release)$/i, 'release')
  .option('--ignore_compile_failure', 'Keep compiling regardless of error')
  .arguments('[build_config]')
  .action(build)

program
  .command('create_dist')
  .option('-C <build_dir>', 'build config (out/Debug, out/Release')
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .option('--mac_signing_identifier <id>', 'The identifier to use for signing')
  .option('--mac_installer_signing_identifier <id>', 'The identifier to use for signing the installer')
  .option('--mac_signing_keychain <keychain>', 'The identifier to use for signing', 'login')
  .option('--debug_build <debug_build>', 'keep debugging symbols')
  .option('--official_build <official_build>', 'force official build settings')
  .option('--brave_google_api_key <brave_google_api_key>')
  .option('--brave_google_api_endpoint <brave_google_api_endpoint>')
  .option('--channel <target_chanel>', 'target channel to build', /^(beta|dev|nightly|release)$/i, 'release')
  .option('--build_omaha', 'build omaha stub/standalone installer')
  .option('--tag_ap <ap>', 'ap for stub/standalone installer')
  .option('--skip_signing', 'skip signing dmg')
  .arguments('[build_config]')
  .action(createDist)

program
  .command('upload')
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .action(upload)

program
  .command('start')
  .allowUnknownOption(true)
  .option('--v [log_level]', 'set log level to [log_level]', parseInt, '0')
  .option('--vmodule [modules]', 'verbose log from specific modules')
  .option('--user_data_dir_name [base_name]', 'set user data directory base name to [base_name]')
  .option('--no_sandbox', 'disable the sandbox')
  .option('--disable_brave_extension', 'disable loading the Brave extension')
  .option('--disable_brave_rewards_extension', 'disable loading the Brave Rewards extension')
  .option('--disable_pdfjs_extension', 'disable loading the PDFJS extension')
  .option('--disable_webtorrent_extension', 'disable loading the WebTorrent extension')
  .option('--ui_mode <ui_mode>', 'which built-in ui appearance mode to use', /^(dark|light)$/i)
  .option('--show_component_extensions', 'show component extensions in chrome://extensions')
  .option('--enable_brave_update', 'enable brave update')
  .option('--channel <target_chanel>', 'target channel to start', /^(beta|dev|nightly|release)$/i, 'release')
  .option('--official_build <official_build>', 'force official build settings')
  // See https://github.com/brave/brave-browser/wiki/Rewards#flags for more information
  .option('--rewards [options]', 'options for rewards')
  .option('--brave_ads_testing', 'ads testing')
  .option('--brave_ads_production', 'ads production')
  .option('--brave_ads_staging', 'ads staging')
  .option('--brave_ads_debug', 'ads debug')
  .option('--single_process', 'use a single process')
  .option('--network_log', 'log network activity to network_log.json')
  .option('--output_path [pathname]', 'use the Brave binary located at [pathname]')
  .arguments('[build_config]')
  .action(start.bind(null, parsedArgs.unknown))

program
  .command('pull_l10n')
  .action(pullL10n)

program
  .command('push_l10n')
  .action(pushL10n)

program
  .command('chromium_rebase_l10n')
  .action(chromiumRebaseL10n)

program
  .command('update_patches')
  .action(updatePatches)

program
  .command('cibuild')
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .action((options) => {
    options.official_build = true
    build('Release', options)
  })

program
  .command('test <suite>')
  .option('--v [log_level]', 'set log level to [log_level]', parseInt, '0')
  .option('--filter <filter>', 'set test filter')
  .option('--output <output>', 'set test output (results) file path')
  .option('--disable_brave_extension', 'disable loading the Brave extension')
  .option('--single_process', 'uses a single process to run tests to help with debugging')
  .option('--test_launcher_jobs <test_launcher_jobs>', 'Number of jobs to launch')
  .arguments('[build_config]')
  .action(test)

program
  .command('lint')
  .action(util.lint)

program
  .parse(process.argv)
