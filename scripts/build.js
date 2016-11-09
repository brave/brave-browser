const program = require('commander');
const util = require('./util')
const path = require('path')
const fs = require('fs-extra')

program
  .version(process.env.npm_package_version)
  .option('-C <buildConfig>', 'build config (Debug/Release')
  .parse(process.argv)

const buildConfig = program.buildConfig || util.defaultBuildConfig
const outputDir = path.join('out', program.buildConfig || util.defaultBuildConfig)
const component = buildConfig === 'Release' ? 'static_library' : 'shared_library'


console.log('generating node ninja files...')
fs.copySync(path.join(util.resourcesDir, 'node_config.gypi'), path.join(util.muonDir, 'vendor', 'node', 'config.gypi'))
const options = util.defaultOptions
options.env.GYP_INCLUDE_LAST = 'electron/node.gypi'
options.env.GYP_CHROMIUM_NO_ACTION = '0'
util.run('gyp_chromium', ['-I', 'electron/vendor/node/config.gypi', '-D', 'component=' + component, 'electron/vendor/node/node.gyp'], options)

console.log('building node...')
util.run('ninja', ['-C', outputDir, 'node'])

console.log('gn gen...')
util.run('gn', ['gen', outputDir])

