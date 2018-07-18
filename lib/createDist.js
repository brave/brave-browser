const config = require('../lib/config')
const util = require('../lib/util')
const path = require('path')
const fs = require('fs-extra')

const createDist = (buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  if (!options.no_branding_update) {
    util.updateBranding()
  }

  fs.removeSync(path.join(config.outputDir, 'dist'))
  config.buildTarget = 'create_dist'
  util.buildTarget()

  renameLinuxDistr(options)
}

const renameLinuxDistr = (options) => {
  if (process.platform === 'linux') {
    fs.readdir(config.outputDir, function(err, items) {
      for (var i=0; i<items.length; i++) {
        var newFileName = '';
        if ((new RegExp(/brave-browser-unstable.*[rpm|dep].*$/)).test(items[i])) {
          newFileName = items[i].replace('unstable', 'dev')
        }
        if (newFileName) {
          fs.renameSync(path.join(config.outputDir, items[i]),
            path.join(config.outputDir, newFileName))
        }
      }
    })
  }
}

module.exports = createDist
