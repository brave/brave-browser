const program = require('commander');
const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')

program
  .version(process.env.npm_package_version)
  .option('-C <build_config>', 'build config (Debug/Release')
  .option('--muon', 'build muon')
  .option('--node', 'build node')
  .option('--no_args_update', 'don\'t copy args.gn to the output dir')
  .option('--no_branding_update', 'don\'t copy BRANDING to the chrome theme dir')
  .parse(process.argv)

config.update(program)

const updateBranding = () => {
  console.log('update branding...')
  const braveThemeDir = path.join(config.srcDir, 'chrome', 'app', 'theme', 'brave')
  fs.ensureDirSync(braveThemeDir)
  fs.copySync(path.join(config.resourcesDir, 'BRANDING'), path.join(braveThemeDir, 'BRANDING'))
}

const updateGnArgs = (options = config.defaultOptions) => {
  console.log('updating args.gn...')
  fs.ensureDirSync(config.outputDir)
  fs.copySync(path.join(config.resourcesDir, 'args.gn.' + config.buildConfig), path.join(config.outputDir, 'args.gn'))
}

const buildNode = (options = config.defaultOptions) => {
  console.log('building node...')
  fs.copySync(path.join(config.resourcesDir, 'node_config.gypi'), path.join(config.projects.node.dir, 'config.gypi'))

  options.env.GYP_INCLUDE_LAST = 'electron/node.gypi'
  options.env.GYP_CHROMIUM_NO_ACTION = 0
  options.env.PATH = config.appendPath(options.env.PATH, config.buildToolsDir)
  util.run('gyp_chromium', ['-D', 'component=' + config.component, path.join(config.projects.node.dir, 'node.gyp')], options)

  util.run('ninja', ['-C', config.outputDir, 'node'], options)
}

const buildMuon = (options = config.defaultOptions) => {
  console.log('building muon...')
  util.run('gn', ['gen', config.outputDir], options)
  util.run('ninja', ['-C', config.outputDir, 'electron'], options)
}

updateBranding()

if (!program.no_args_update) {
  updateGnArgs()
}

if (!program.build_muon) {
  buildNode()
}

if (!program.build_node) {
  buildMuon()
}




