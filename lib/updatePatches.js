const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')

const updatePatches = (options) => {
  config.update(options)

  const diffArgs = ['diff', '--full-index', '--ignore-space-at-eol']
  let diff = util.run('git', diffArgs, { cwd: config.projects.chrome.dir })
  fs.writeFileSync(path.join(config.projects.muon.dir, 'patches', 'master_patch.patch'), diff.stdout)
}

module.exports = updatePatches
