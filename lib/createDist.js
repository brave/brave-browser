const config = require('../lib/config')
const util = require('../lib/util')
const path = require('path')
const fs = require('fs-extra')

const createDist = (options) => {
  config.update(options)
  config.buildConfig = 'Release'

  let cmdOptions = config.defaultOptions
  const args = util.buildArgsToString(config.buildArgs())

  fs.removeSync(path.join(config.outputDir, 'dist'))
  util.run('gn', ['gen', config.outputDir, '--args="' + args + '"'], cmdOptions)
  util.run('ninja', ['-C', config.outputDir, 'create_dist'], cmdOptions)
}

module.exports = createDist

