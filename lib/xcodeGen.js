const config = require('../lib/config')
const util = require('../lib/util')

const xcodeGen = (buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  util.generateXcodeWorkspace(options.filter)
}

module.exports = xcodeGen
