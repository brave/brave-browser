const config = require('../lib/config')
const util = require('../lib/util')

const createDist = (options) => {
  config.update(options)
  config.buildConfig = 'Release'

  let cmdOptions = config.defaultOptions
  const args = util.buildArgsToString(config.buildArgs())

  if (process.platform === 'win32') {
    util.buildNodeShared()
  }

  util.run('gn', ['gen', config.outputDir, '--args="' + args + '"'], cmdOptions)
  util.run('ninja', ['-C', config.outputDir, 'create_dist'], cmdOptions)
}

module.exports = createDist
