const program = require('commander');
const util = require('./util')
const path = require('path')

program
  .version(process.env.npm_package_version)
  .option('-C <buildConfig>', 'build config (Debug/Release')
  .parse(process.argv)

const outputDir = path.join('out', program.buildConfig || util.defaultBuildConfig)
util.run('gn', ['gen', outputDir], { cwd: util.muonDir })
