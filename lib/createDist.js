const config = require('../lib/config')
const licensing = require('../lib/licensing')
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
  licensing.updateLicenses()
  fs.removeSync(path.join(config.outputDir, 'dist'))
  config.buildTarget = 'create_dist'
  util.buildTarget()
}

module.exports = createDist
