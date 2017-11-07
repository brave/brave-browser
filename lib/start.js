const path = require('path')
const config = require('../lib/config')
const util = require('../lib/util')

const start = (buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  const braveArgs = [
    '--user-data-dir-name=' + options.user_data_dir_name,
    '--enable-logging'
    '--v=' + options.v,
  ]
  if (options.no_sandbox) {
    braveArgs.push('--no-sandbox')
  }
  braveArgs.push(path.join(config.projects.browser_laptop.dir))

  let cmdOptions = {
    stdio: 'inherit',
    shell: true
  }

  if (process.platform === 'darwin') {
    util.run(path.join(config.outputDir, 'Brave.app', 'Contents', 'MacOS', 'Brave'), braveArgs, cmdOptions)
  } else if (process.platform === 'win32') {
    util.run(path.join(config.outputDir, 'brave.exe'), braveArgs, cmdOptions)
  } else {
    util.run(path.join(config.outputDir, 'brave'), braveArgs, cmdOptions)
  }
}

module.exports = start
