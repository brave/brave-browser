const config = require('../lib/config')
const util = require('../lib/util')

const gnCheck = (buildConfig = config.defaultBuildConfig, options) => {
  // Return true for gn_check for version 1.11.x and 1.12.x
  if (config.braveVersion.startsWith('1.11') || config.braveVersion.startsWith('1.12')) {
    return;
  }
  config.buildConfig = buildConfig
  config.update(options)
  util.run('gn', ['check', config.outputDir, '//brave/*'], config.defaultOptions)
}

module.exports = gnCheck
