const config = require('../lib/config')
const util = require('../lib/util')

const pr = (options) => {
  config.update(options)

  const cmdOptions = config.defaultOptions
  cmdOptions.cwd = config.projects['brave-core'].dir
  // use system python because depot tools fails on upload with TLS error
  cmdOptions.env = config.addPathToEnv(cmdOptions.env, process.env.PATH, true)
  util.run('python', ['script/pr.py', '-v'], cmdOptions)
}

module.exports = pr

