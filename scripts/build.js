const program = require('commander');
const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')

program
  .version(process.env.npm_package_version)
  .option('-C <build_dir>', 'build config (out/Debug, out/Release')
  .option('--muon', 'build muon')
  .option('--node', 'build node')
  .option('--chromedriver', 'build chromedriver')
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .option('--electron_google_api_key <electron_google_api_key>')
  .option('--electron_google_api_endpoint <electron_google_api_endpoint>')
  .option('--no_branding_update', 'don\'t copy BRANDING to the chrome theme dir')
  .arguments('[build_config]')
  .action(function (buildConfig) {
    config.buildConfig = buildConfig
  })
  .parse(process.argv)

config.update(program)

if (program.chromedriver) {
  util.buildChromedriver()
  return
}

if (!program.no_branding_update) {
  util.updateBranding()
}

if (!program.muon) {
  util.buildNode()
}

if (!program.node) {
  util.buildMuon()
}
