const program = require('commander');
const path = require('path')
const config = require('../lib/config')
const util = require('../lib/util')

program
  .version(process.env.npm_package_version)
  .option('--v [log_level]', 'set log level to [log_level]', parseInt, '0')
  .option('--user_data_dir [base_name]', 'set user data directory base name to [base_name]', 'brave-development')
  .option('--node_env [env]', 'set the node env to [env]', 'development')
  .arguments('[build_config]')
  .action(function (buildConfig) {
    config.buildConfig = buildConfig
  })
  .parse(process.argv)

config.update(program)

const braveArgs = [
  '--user-data-dir=' + program.user_data_dir,
  '--enable-logging',
  '--v=' + program.v,
  path.join(config.projects.browser_laptop.dir)
]

let options = {
  env: {
    npm_package_config_port: 8080,
    NODE_ENV: program.node_env
  },
  stdio: 'inherit',
  shell: true
}

if (process.platform === 'darwin') {
  util.run(path.join(config.outputDir, 'Brave.app', 'Contents', 'MacOS', 'Brave'), braveArgs, options)
} else if (process.platform === 'win32') {
  util.run(path.join(config.outputDir, 'brave.exe'), braveArgs, options)
} else {
  util.run(path.join(config.outputDir, 'brave'), braveArgs, options)
}
