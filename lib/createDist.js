const config = require('../lib/config')
const util = require('../lib/util')
const path = require('path')
const fs = require('fs-extra')

const createDist = (buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  if (config.notarize) {
    notarize = config.notarize
    notary_user = config.notary_user
    notary_password = config.notary_password
  }

  util.updateBranding()
  fs.removeSync(path.join(config.outputDir, 'dist'))
  config.buildTarget = 'create_dist'
  util.buildTarget()
  if (config.targetOS === 'android') {
    util.signApp()
  }
}

module.exports = createDist
