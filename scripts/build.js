const program = require('commander');
const util = require('./util')
const path = require('path')
const fs = require('fs-extra')

program
  .version(process.env.npm_package_version)
  .option('-C <buildConfig>', 'build config (Debug/Release')
  .parse(process.argv)

const buildConfig = program.buildConfig || util.defaultBuildConfig
const outputDir = path.join(util.srcDir, 'out', program.buildConfig || util.defaultBuildConfig)
const component = buildConfig === 'Release' ? 'static_library' : 'shared_library'

const defaultBuildOptions = Object.assign(util.defaultOptions, { })

const updateGnArgs = (options = defaultBuildOptions) => {
  fs.ensureDirSync(outputDir)
  fs.copySync(path.join(util.resourcesDir, 'args.gn.' + buildConfig), path.join(outputDir, 'args.gn'))
}

const buildNode = (options = defaultBuildOptions) => {
  fs.copySync(path.join(util.resourcesDir, 'node_config.gypi'), path.join(util.nodeDir, 'config.gypi'))

  options.env.GYP_INCLUDE_LAST = 'electron/node.gypi'
  options.env.GYP_CHROMIUM_NO_ACTION = 0
  util.run('gyp_chromium', ['-D', 'component=' + component, path.join(util.nodeDir, 'node.gyp')], options)

  util.run('ninja', ['-C', outputDir, 'node'])
}

const buildMuon = (options = defaultBuildOptions) => {
  util.run('gn', ['gen', outputDir], options)
  util.run('ninja', ['-C', outputDir, 'electron'], options)
}

console.log('updating args.gn...')
updateGnArgs()

console.log('building node...')
buildNode()

console.log('building muon...')
buildMuon()



