const program = require('commander');
const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')

program
  .version(process.env.npm_package_version)
  .option('--C <build_dir>', 'build config (out/Debug, out/Release')
  .option('--muon', 'build muon')
  .option('--node', 'build node')
  .option('--target_arch', 'target architecture', 'x64')
  .option('--electron_google_api_key')
  .option('--electron_google_api_endpoint')
  .option('--no_branding_update', 'don\'t copy BRANDING to the chrome theme dir')
  .arguments('[build_config]')
  .action(function (buildConfig) {
    config.buildConfig = buildConfig
  })
  .parse(process.argv)

config.update(program)

const updateBranding = () => {
  console.log('update branding...')
  const braveThemeDir = path.join(config.srcDir, 'chrome', 'app', 'theme', 'brave')
  fs.ensureDirSync(braveThemeDir)
  fs.copySync(path.join(config.resourcesDir, 'BRANDING'), path.join(braveThemeDir, 'BRANDING'))
}

const buildNode = (options = config.defaultOptions) => {
  console.log('building node...')
  fs.copySync(path.join(config.resourcesDir, 'node_config.gypi'), path.join(config.projects.node.dir, 'config.gypi'))

  options.env.GYP_INCLUDE_LAST = 'electron/build/node/node.gypi'
  options.env.GYP_CHROMIUM_NO_ACTION = 0
  options.env[config.pathEnvVar] = config.appendPath(options.env[config.pathEnvVar], config.buildToolsDir)
  util.run('python', [path.join(config.buildToolsDir, 'gyp_chromium.py'), 
    '-D', 'target_arch=' + config.targetArch, 
    '-D', 'host_arch=x64', 
    '-D', 'buildtype=Custom', // don't apply Dev or Official configs
    '-D', 'component=' + config.component, 
    path.join(config.projects.node.dir, 'node.gyp')], options)
  util.run('ninja', ['-C', config.outputDir, 'node'], options)
}

const buildMuon = (options = config.defaultOptions) => {
  console.log('building muon...')

  const args = util.buildArgsToString(config.buildArgs())
  util.run('gn', ['gen', config.outputDir, '--args="' + args + '"'], options)
  util.run('ninja', ['-C', config.outputDir, 'electron'], options)
}

if (!program.no_branding_update) {
  updateBranding()
}

if (!program.muon) {
  buildNode()
}

if (!program.node) {
  buildMuon()
}




