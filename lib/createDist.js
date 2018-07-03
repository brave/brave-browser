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
}

const renameLinuxDistr = (options) => {
  if (process.platform === 'linux') {
    const I386_RPM_NAME = 'brave-i386.rpm'
    const I386_DEB_NAME = 'brave-i386.deb'
    const AMD64_RPM_NAME = 'brave-x86_64.rpm'
    const AMD64_DEB_NAME = 'brave-amd64.deb'
    fs.readdir(config.outputDir, function(err, items) {
      for (var i=0; i<items.length; i++) {
        var newFileName = '';
        if ((new RegExp(/^brave-browser-[0-9.-]+.*rpm$/)).test(items[i])) {
          newFileName = (options.target_arch === 'x86') ?
            I386_RPM_NAME : AMD64_RPM_NAME;
        } else if ((new RegExp(/^brave-browser_[0-9.-]+.*deb$/)).test(items[i])) {
          newFileName = (options.target_arch === 'x86') ?
            I386_DEB_NAME : AMD64_DEB_NAME;
        } else if ((new RegExp(/^brave-browser-(unstable|beta).*(rpm|deb)$/)).test(items[i])) {
          fs.unlinkSync(path.join(config.outputDir, items[i]))
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
