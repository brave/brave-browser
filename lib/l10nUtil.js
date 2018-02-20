const path = require('path')
const srcDir = path.resolve(path.join(__dirname, '..', 'src'))

module.exports.getSourceStringPaths = () => {
  return [
    path.resolve(path.join(srcDir, 'brave', 'vendor', 'brave-extension', 'app', '_locales', 'en_US', 'messages.json')),
    path.resolve(path.join(srcDir, 'brave', 'app', 'brave_strings.grd')),
    path.resolve(path.join(srcDir, 'brave', 'app', 'components_brave_strings.grd')),
    path.resolve(path.join(srcDir, 'brave', 'components', 'resources', 'brave_components_resources.grd'))
    // No strings for now, uncomment if strings are added
    // path.resolve(path.join(srcDir, 'brave', 'browser', 'resources', 'brave_extension.grd')),
    // path.resolve(path.join(srcDir, 'brave', 'common', 'extensions', 'api', 'brave_api_resources.grd')),
  ]

}
