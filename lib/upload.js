const config = require('../lib/config')
const util = require('../lib/util')

const upload = (options) => {
  config.update(options)

  const cmdOptions = config.defaultOptions
  cmdOptions.cwd = config.projects.muon.dir
  util.run('python', ['script/upload.py', '-v', 'v' + config.releaseTag], cmdOptions)
}

module.exports = upload
