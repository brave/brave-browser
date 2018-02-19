const config = require('../lib/config')
const util = require('../lib/util')
const {getGRDFiles} = require('./l10nUtil')

const pushL10n = (options) => {
  // Get rid of local copied xtb and grd changes
  const runOptions = { cwd: config.projects.chrome.dir }
  let args = ['checkout', '--', '*.xtb']
  util.run('git', args, runOptions)
  args = ['checkout', '--', '*.grd']
  util.run('git', args, runOptions)

  getGRDFiles().forEach((grdPath) => {
    const cmdOptions = config.defaultOptions
    cmdOptions.cwd = config.projects.antimuon.dir
    util.run('python', ['script/push-l10n.py', '--grd_path', grdPath], cmdOptions)
  })
}

module.exports = pushL10n
