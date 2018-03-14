const path = require('path')

const config = require('../lib/config')
const util = require('../lib/util')

const test = (suite, options) => {
  config.buildConfig = config.defaultBuildConfig
  config.update(options)

  const braveArgs = [
    '--enable-logging',
    '--v=' + options.v,
  ]

  let cmdOptions = {
    stdio: 'inherit',
    shell: true
  }

  // Build the tests
  util.run('ninja', ['-C', config.outputDir, suite], cmdOptions)

  let testBinary;
  if (process.platform === 'win32') {
    testBinary = `${suite}.exe`
  } else {
    testBinary = suite
  }

  // Run the tests
  util.run(path.join(config.outputDir, testBinary), braveArgs, cmdOptions)
}

module.exports = test