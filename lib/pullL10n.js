const config = require('../lib/config')
const util = require('../lib/util')
const l10nUtil = require('./l10nUtil')

const pullL10n = (options) => {
  const cmdOptions = config.defaultOptions
  cmdOptions.cwd = config.projects['brave-core'].dir
  if (options.extension) {
    if (options.extension === 'ethereum-remote-client') {
      l10nUtil.getEthereumRemoteClientPaths().forEach((sourceStringPath) => {
        util.run('python', ['script/pull-l10n.py', '--source_string_path', sourceStringPath], cmdOptions)
      })
      return
    }
    console.error('Unknown extension: ', options.extension)
    process.exit(1)
  }

  l10nUtil.getBraveTopLevelPaths().forEach((sourceStringPath) => {
    if (!options.grd_path || sourceStringPath.endsWith(`/${options.grd_path}`))
      util.run('python', ['script/pull-l10n.py', '--source_string_path', sourceStringPath], cmdOptions)
  })
}

module.exports = pullL10n
