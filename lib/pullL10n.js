const config = require('../lib/config')
const util = require('../lib/util')
const {braveTopLevelPaths} = require('./l10nUtil')

const pullL10n = (options) => {
  braveTopLevelPaths.forEach((sourceStringPath) => {
    const cmdOptions = config.defaultOptions
    cmdOptions.cwd = config.projects['brave-core'].dir
    util.run('python', ['script/pull-l10n.py', '--source_string_path', sourceStringPath], cmdOptions)
  })
}

module.exports = pullL10n
