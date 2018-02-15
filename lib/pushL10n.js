const path = require('path')
const config = require('../lib/config')
const util = require('../lib/util')

const srcDir = path.resolve(path.join(__dirname, '..', 'src'))
const paths = [
  path.resolve(path.join(srcDir, 'brave', 'app', 'brave_strings.grd')),
  path.resolve(path.join(srcDir, 'brave', 'app', 'components_brave_strings.grd')),
  path.resolve(path.join(srcDir, 'brave', 'components', 'resources', 'brave_components_resources.grd'))
  // No strings for now, uncomment if strings are added
  // path.resolve(path.join(srcDir, 'brave', 'browser', 'resources', 'brave_extension.grd')),
  // path.resolve(path.join(srcDir, 'brave', 'common', 'extensions', 'api', 'brave_api_resources.grd')),
]

const pushL10n = (options) => {
  config.update(options)

  paths.forEach((grdPath) => {
    const cmdOptions = config.defaultOptions
    cmdOptions.cwd = config.projects.antimuon.dir
    util.run('python', ['script/push-l10n.py', '--grd_path', grdPath], cmdOptions)
  })
}

module.exports = pushL10n
