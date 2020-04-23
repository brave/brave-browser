const path = require('path')
const config = require('../lib/config')
const util = require('../lib/util')
const {braveTopLevelPaths, ethereumRemoteClientPaths} = require('./l10nUtil')

const pushL10n = (options) => {
  const runOptions = { cwd: config.projects.chrome.dir }
  const cmdOptions = config.defaultOptions
  cmdOptions.cwd = config.projects['brave-core'].dir
  if (options.extension) {
    if (options.extension === 'ethereum-remote-client') {
      ethereumRemoteClientPaths.forEach((sourceStringPath) => {
        util.run('python', ['script/push-l10n.py', '--source_string_path', sourceStringPath], cmdOptions)
      })
      return
    }
    console.error('Unknown extension: ', options.extension)
    process.exit(1)
  } else {
    // Get rid of local copied xtb and grd changes
    let args = ['checkout', '--', '*.xtb']
    util.run('git', args, runOptions)
    args = ['checkout', '--', '*.grd*']
    util.run('git', args, runOptions)
    braveTopLevelPaths.forEach((sourceStringPath) => {
      if (!options.grd_path || sourceStringPath.endsWith(path.sep + options.grd_path))
        util.run('python', ['script/push-l10n.py', '--source_string_path', sourceStringPath], cmdOptions)
    })
  }
}

module.exports = pushL10n
