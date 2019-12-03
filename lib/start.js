const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')
const { parseNetworkLog } = require('../lib/networkAudit')

const start = (passthroughArgs, buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  let braveArgs = [
    '--enable-logging',
    '--v=' + options.v,
  ]
  if (options.vmodule) {
    braveArgs.push('--vmodule=' + options.vmodule);
  }
  if (options.no_sandbox) {
    braveArgs.push('--no-sandbox')
  }
  if (options.disable_brave_extension) {
    braveArgs.push('--disable-brave-extension')
  }
  if (options.disable_brave_rewards_extension) {
    braveArgs.push('--disable-brave-rewards-extension')
  }
  if (options.disable_pdfjs_extension) {
    braveArgs.push('--disable-pdfjs-extension')
  }
  if (options.disable_webtorrent_extension) {
    braveArgs.push('--disable-webtorrent-extension')
  }
  if (options.ui_mode) {
    braveArgs.push(`--ui-mode=${options.ui_mode}`)
  }
  if (!options.enable_brave_update) {
    // This only has meaning with MacOS and official build.
    braveArgs.push('--disable-brave-update')
  }
  if (options.enable_smart_tracking_protection) {
    braveArgs.push('--enable-smart-tracking-protection')
  }
  if (options.single_process) {
    braveArgs.push('--single-process')
  }
  if (options.show_component_extensions) {
    braveArgs.push('--show-component-extension-options')
  }
  if (options.rewards) {
    braveArgs.push(`--rewards=${options.rewards}`)
  }
  if (options.brave_ads_testing) {
    braveArgs.push('--brave-ads-testing')
  }
  if (options.brave_ads_debug) {
    braveArgs.push('--brave-ads-debug')
  }
  if (options.brave_ads_production) {
    braveArgs.push('--brave-ads-production')
  }
  if (options.brave_ads_staging) {
    braveArgs.push('--brave-ads-staging')
  }
  braveArgs = braveArgs.concat(passthroughArgs)

  let user_data_dir
  if (options.user_data_dir_name) {
    if (process.platform === 'darwin') {
      user_data_dir = path.join(process.env.HOME, 'Library', 'Application\\ Support', 'BraveSoftware', options.user_data_dir_name)
    } else if (process.platform === 'win32') {
      user_data_dir = path.join(process.env.LocalAppData, 'BraveSoftware', options.user_data_dir_name)
    } else {
      user_data_dir = path.join(process.env.HOME, '.config', 'BraveSoftware', options.user_data_dir_name)
    }
    braveArgs.push('--user-data-dir=' + user_data_dir);
  }
  const networkLogFile = path.resolve(path.join(__dirname, '..', 'network_log.json'))
  if (options.network_log) {
    braveArgs.push(`--log-net-log=${networkLogFile}`)
    braveArgs.push(`--net-log-capture-mode=Everything`)
    if (user_data_dir) {
      // clear the data directory before doing a network test
      fs.removeSync(user_data_dir.replace('\\', ''))
      if (fs.existsSync(networkLogFile)) {
        fs.unlinkSync(networkLogFile)
      }
      if (fs.existsSync('network-audit-results.json')) {
        fs.unlinkSync('network-audit-results.json')
      }
    }
  }

  let cmdOptions = {
    stdio: 'inherit',
    timeout: options.network_log ? 120000 : undefined,
    continueOnFail: options.network_log ? true : false,
    shell: process.platform === 'darwin' ? true : false,
    killSignal: options.network_log && process.env.RELEASE_TYPE ? 'SIGKILL' : 'SIGTERM'
  }

  if (options.network_log) {
    console.log('Network audit started. Logging requests for the next 2min or until you quit Brave...')
  }

  let outputPath = options.output_path
  if (!outputPath) {
    if (process.platform === 'darwin') {
      let outputDir = config.outputDir
      if (config.shouldSign()) {
        outputDir = path.join(outputDir, config.mac_signing_output_prefix)
      }
      outputPath = path.join(outputDir,
                             'Brave\\ Browser\\ Development.app', 'Contents', 'MacOS',
                             'Brave\\ Browser\\ Development')
    } else if (process.platform === 'win32') {
      outputPath = path.join(config.outputDir, 'brave.exe')
    } else {
      outputPath = path.join(config.outputDir, 'brave')
    }
  }
  util.run(outputPath, braveArgs, cmdOptions)

  if (options.network_log) {
    parseNetworkLog(networkLogFile)
  }
}

module.exports = start
