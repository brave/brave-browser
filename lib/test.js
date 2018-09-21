const path = require('path')

const config = require('../lib/config')
const util = require('../lib/util')

const test = (suite, buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  const braveArgs = [
    '--enable-logging',
    '--v=' + options.v,
  ]

  if (options.filter) {
    braveArgs.push('--gtest_filter=' + options.filter)
  }

  if (options.output) {
    braveArgs.push('--gtest_output=xml:' + options.output)
  }

  if (options.disable_brave_extension) {
    braveArgs.push('--disable-brave-extension')
  }

  if (options.single_process) {
    braveArgs.push('--single_process')
  }

  // Build the tests
  util.run('ninja', ['-C', config.outputDir, suite], config.defaultOptions)

  let testBinary;
  if (process.platform === 'win32') {
    testBinary = `${suite}.exe`
  } else {
    testBinary = suite
  }

  // Run the tests
  util.run(path.join(config.outputDir, testBinary), braveArgs, config.defaultOptions)
}

module.exports = test
