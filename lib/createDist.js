const config = require('../lib/config')
const util = require('../lib/util')
const path = require('path')
const fs = require('fs-extra')

const createDist = (buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  util.updateBranding()
  fs.removeSync(path.join(config.outputDir, 'dist'))
  config.buildTarget = 'create_dist'
  util.buildTarget()
}

module.exports = createDist
