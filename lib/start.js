const path = require('path')
const config = require('../lib/config')
const util = require('../lib/util')

const start = (buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  const braveArgs = [
    '--user-data-dir=' + options.user_data_dir,
    '--enable-logging',
    '--debug=5858',
    '--source-root=' + path.join(__dirname, '..', 'src', 'browser-laptop'),
    '--v=' + options.v,
  ]
  if (options.no_sandbox) {
    braveArgs.push('--no-sandbox')
  }
  braveArgs.push(path.join(config.projects.browser_laptop.dir))

  let cmdOptions = {
    env: Object.assign(process.env, {
      npm_package_config_port: 8080,
      NODE_ENV: options.node_env
    }),
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
