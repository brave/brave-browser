const path = require('path')
const config = require('../lib/config')
const util = require('../lib/util')
const {braveTopLevelPaths, ethereumRemoteClientPaths} = require('./l10nUtil')

const pullL10n = (options) => {
  const cmdOptions = config.defaultOptions
  cmdOptions.cwd = config.projects['brave-core'].dir
  if (options.extension) {
    if (options.extension === 'ethereum-remote-client') {
      ethereumRemoteClientPaths.forEach((sourceStringPath) => {
        util.run('python', ['script/pull-l10n.py', '--source_string_path', sourceStringPath], cmdOptions)
      })
      return
    }
    console.error('Unknown extension: ', options.extension)
    process.exit(1)
  }

  braveTopLevelPaths.forEach((sourceStringPath) => {
    if (!options.grd_path || sourceStringPath.endsWith(path.sep + options.grd_path))
      util.run('python', ['script/pull-l10n.py', '--source_string_path', sourceStringPath], cmdOptions)
  })
}

module.exports = pullL10n
