const config = require('../lib/config')
const util = require('../lib/util')
const {braveTopLevelPaths} = require('./l10nUtil')

const pushL10n = (options) => {
  // Get rid of local copied xtb and grd changes
  const runOptions = { cwd: config.projects.chrome.dir }
  let args = ['checkout', '--', '*.xtb']
  util.run('git', args, runOptions)
  args = ['checkout', '--', '*.grd*']
  util.run('git', args, runOptions)

  braveTopLevelPaths.forEach((sourceStringPath) => {
    const cmdOptions = config.defaultOptions
    cmdOptions.cwd = config.projects['brave-core'].dir
    util.run('python', ['script/push-l10n.py', '--source_string_path', sourceStringPath], cmdOptions)
  })
}

module.exports = pushL10n
