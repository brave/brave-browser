const program = require('commander');
const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')
const build = require('../lib/build')
const versions = require('../lib/versions')
const start = require('../lib/start')
const updatePatches = require('../lib/updatePatches')
const createDist = require('../lib/createDist')

program
  .version(process.env.npm_package_version)

program
  .command('versions')
  .action(versions)

program
  .command('build')
  .option('-C <build_dir>', 'build config (out/Debug, out/Release')
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .option('--debug_build <debug_build>', 'keep debugging symbols')
  .option('--official_build <official_build>', 'force official build settings')
  .option('--antimuon_google_api_key <antimuon_google_api_key>')
  .option('--antimuon_google_api_endpoint <antimuon_google_api_endpoint>')
  .option('--no_branding_update', 'don\'t copy BRANDING to the chrome theme dir')
  .arguments('[build_config]')
  .action(build)

program
  .command('create_dist')
  .option('--mac_signing_identifier', 'The identifier to use for signing')
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .option('--debug_build <debug_build>', 'keep debugging symbols')
  .option('--official_build <official_build>', 'force official build settings')
  .action(createDist)

program
  .command('start')
  .option('--v [log_level]', 'set log level to [log_level]', parseInt, '0')
  .option('--user_data_dir_name [base_name]', 'set user data directory base name to [base_name]', 'brave-development')
  .option('--no_sandbox', 'disable the sandbox')
  .arguments('[build_config]')
  .action(start)

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
  .parse(process.argv)

