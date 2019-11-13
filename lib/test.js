const path = require('path')

const config = require('../lib/config')
const util = require('../lib/util')

const test = (suite, buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  const braveArgs = [
    '--enable-logging'
  ]

  // Android doesn't support --v
  if (config.targetOS !== 'android') {
    braveArgs.push('--v=' + options.v)
  }

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

  if (options.test_launcher_jobs) {
    braveArgs.push('--test-launcher-jobs=' + options.test_launcher_jobs)
  }

  // Build the tests
  util.run('ninja', ['-C', config.outputDir, suite], config.defaultOptions)

  const run_brave_installer_unitests = suite === 'brave_unit_tests' && config.targetOS !== 'android'
  if (run_brave_installer_unitests) {
    util.run('ninja', ['-C', config.outputDir, 'brave_installer_unittests'], config.defaultOptions)
  }

  if (config.targetOS === 'ios') {
    util.run(path.join(config.outputDir, "iossim"), [
      path.join(config.outputDir, `${suite}.app`),
      path.join(config.outputDir, `${suite}.app/PlugIns/${suite}_module.xctest`)
    ], config.defaultOptions)
  } else {
    util.run('ninja', ['-C', config.outputDir, "fix_brave_test_install_name"], config.defaultOptions)
    util.run('ninja', ['-C', config.outputDir, "fix_brave_test_install_name_adblock"], config.defaultOptions)

    let testBinary;
    let installerTestBinary;
    if (process.platform === 'win32') {
      testBinary = `${suite}.exe`
      installerTestBinary = 'brave_installer_unittests.exe'
    } else {
      testBinary = suite
      installerTestBinary = 'brave_installer_unittests'
    }

    // Run the tests
    util.run(path.join(config.outputDir, testBinary), braveArgs, config.defaultOptions)

    if (run_brave_installer_unitests) {
      // Replace output file arguments
      if (options.output) {
        braveArgs.splice(braveArgs.indexOf('--gtest_output=xml:' + options.output, 1))
        braveArgs.push('--gtest_output=xml:brave_installer_unittests.xml')
      }

      util.run(path.join(config.outputDir, installerTestBinary), braveArgs, config.defaultOptions)
    }
  }
}

module.exports = test
