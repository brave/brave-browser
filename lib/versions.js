const config = require('../lib/config')
const util = require('../lib/util')

const versions = (buildConfig = config.defaultBuildConfig, options = {}) => {
  config.buildConfig = buildConfig
  config.update(options)

  console.log('chrome ' + config.getProjectRef('chrome'))
  console.log('muon ' + config.getProjectRef('muon'))
  console.log('browser-laptop ' + config.getProjectRef('browser_laptop'))
}

module.exports = versions
