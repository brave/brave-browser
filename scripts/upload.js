const program = require('commander');
const path = require('path')
const config = require('../lib/config')
const util = require('../lib/util')

program
  .version(process.env.npm_package_version)
  .option('--target_arch <target_arch>', 'target architecture', 'x64')
  .parse(process.argv)

config.update(program)

const options = config.defaultOptions
options.cwd = config.projects.muon.dir
util.run('python', ['script/upload.py', '-v', config.electronVersion], options)