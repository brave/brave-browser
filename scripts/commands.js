const program = require('commander');
const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')
const build = require('../lib/build')
const versions = require('../lib/versions')
const createDist = require('../lib/createDist')
const publish = require('../lib/publish')
const start = require('../lib/start')
const updatePatches = require('../lib/updatePatches')
const upload = require('../lib/upload')

program
  .version(process.env.npm_package_version)

program
  .command('versions')
  .action(versions)

program
  .command('build')
  .option('-C <build_dir>', 'build config (out/Debug, out/Release')
  .option('--muon', 'build muon')
  .option('--node', 'build node')
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .option('--debug_build <debug_build>', 'keep debugging symbols')
  .option('--official_build <official_build>', 'force official build settings')
  .option('--electron_google_api_key <electron_google_api_key>')
  .option('--electron_google_api_endpoint <electron_google_api_endpoint>')
  .option('--no_branding_update', 'don\'t copy BRANDING to the chrome theme dir')
  .arguments('[build_config]')
  .action(build)

program
  .command('create_dist')
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .option('--debug_build <debug_build>', 'keep debugging symbols')
  .option('--official_build <official_build>', 'force official build settings')
  .action(createDist)

program
  .command('upload')
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .action(upload)

program
  .command('publish')
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .action(publish)

program
  .command('start')
  .option('--v [log_level]', 'set log level to [log_level]', parseInt, '0')
  .option('--user_data_dir [base_name]', 'set user data directory base name to [base_name]', 'brave-development')
  .option('--node_env [env]', 'set the node env to [env]', 'development')
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
    createDist(options)
    upload(options)
  })

program
  .parse(process.argv)
