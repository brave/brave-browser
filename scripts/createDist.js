const program = require('commander');
const path = require('path')
const config = require('../lib/config')
const util = require('../lib/util')

program
  .version(process.env.npm_package_version)
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .parse(process.argv)

config.update(program)
config.buildConfig = 'Release'

let options = config.defaultOptions
const args = util.buildArgsToString(config.buildArgs())
util.run('gn', ['gen', config.outputDir, '--args="' + args + '"'], options)
util.run('ninja', ['-C', config.outputDir, 'create_dist'], options)