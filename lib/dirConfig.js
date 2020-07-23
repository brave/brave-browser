const path = require('path')
const util = require('../lib/util')

const DirConfig = function() {
  this.rootDir = path.join(path.dirname(__filename), '..'),
  this.depotToolsDir = path.join(this.rootDir, 'vendor', 'depot_tools')
  this.srcDir = path.join(this.rootDir, 'src')
  this.braveCoreDir = path.join(this.srcDir, 'brave')
}

module.exports = new DirConfig
