const path = require('path')
const config = require('../lib/config')
const updatePatches = require('../lib/updatePatches')

const chromiumPathFilter = (s) => s.length > 0 &&
  !s.startsWith('chrome/app/theme/default') &&
  !s.startsWith('chrome/app/theme/brave') &&
  !s.startsWith('chrome/app/theme/chromium') &&
  !s.endsWith('.png') && !s.endsWith('.xtb') &&
  !s.endsWith('.grd') && !s.endsWith('.grdp') &&
  !s.endsWith('.svg') &&
  !s.endsWith('new_tab_page_view.xml') &&
  !s.endsWith('channel_constants.xml') &&
  !s.includes('google_update_idl')

module.exports = function RunCommand (options) {
  config.update(options)

  const chromiumDir = config.projects.chrome.dir
  const v8Dir = path.join(config.projects.chrome.dir, 'v8')
  const devtoolsFrontendSrcDir = path.join(chromiumDir, 'third_party', 'devtools-frontend', 'src')
  const patchDir = path.join(config.projects['brave-core'].dir, 'patches')
  const v8PatchDir = path.join(patchDir, 'v8')
  const devtoolsFrontendSrcPatchDir = path.join(patchDir, 'devtools-frontend-src')

  Promise.all([
    // chromium
    updatePatches(chromiumDir, patchDir, chromiumPathFilter),
    // v8
    updatePatches(v8Dir, v8PatchDir),
    // third_party/devtools-frontend/src
    updatePatches(devtoolsFrontendSrcDir, devtoolsFrontendSrcPatchDir)
  ])
  .then(() => {
    console.log('Done.')
  })
  .catch(err => {
    console.error('Error updating patch files:')
    console.error(err)
  })
}
