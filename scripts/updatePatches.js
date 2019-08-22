const path = require('path')
const config = require('../lib/config')
const updatePatches = require('../lib/updatePatches')
const chromiumPathFilter = require('../lib/chromiumPathFilter')

module.exports = function RunCommand (options) {
  config.update(options)

  const chromiumDir = config.projects.chrome.dir
  const v8Dir = path.join(config.projects.chrome.dir, 'v8')
  const patchDir = path.join(config.projects['brave-core'].dir, 'patches')
  const v8PatchDir = path.join(patchDir, 'v8')

  Promise.all([
    // chromium
    updatePatches(chromiumDir, patchDir, chromiumPathFilter),
    // v8
    updatePatches(v8Dir, v8PatchDir)
  ])
  .then(() => {
    console.log('Done.')
  })
  .catch(err => {
    console.error('Error updating patch files:')
    console.error(err)
  })
}
