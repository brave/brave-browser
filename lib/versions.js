const config = require('../lib/config')

const versions = (buildConfig = config.defaultBuildConfig, options = {}) => {
  config.buildConfig = buildConfig
  config.update(options)

  console.log('chrome ' + config.getProjectRef('chrome'))
  console.log('brave-core ' + config.getProjectRef('brave-core'))
}

module.exports = versions
