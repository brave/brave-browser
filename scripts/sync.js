const path = require('path')
const program = require('commander');
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')

program
  .version(process.env.npm_package_version)
  .option('--chrome_ref <ref>', 'chrome git ref to checkout')
  .option('--muon_ref <ref>', 'muon git ref to checkout')
  .option('--patches_ref <ref>', 'patches git ref to checkout')
  .option('--node_ref <ref>', 'node git ref to checkout')
  .option('--gclient_file <file>', 'gclient config file location')
  .option('--run_hooks', 'run gclient hooks')
  .option('--run_sync', 'run gclient sync')
  .option('--submodule_sync', 'run submodule sync')
  .option('--init', 'initialize all dependencies')
  .parse(process.argv)

config.update(program)

if (program.init || program.submodule_sync) {
  util.submoduleSync()
}

if (program.init) {
  util.gclientSync()
}

if (program.init || program.chrome_ref) {
  util.setChromeVersion()
}

if (program.init || program.muon_ref) {
  util.setMuonVersion()
}

if (program.init || program.patches_ref) {
  util.setPatchesVersion()
}

if (program.init || program.node_ref) {
  util.setNodeVersion()
}

if (program.init || program.run_sync) {
  util.gclientSync()
}

if (program.init || program.run_hooks) {
  util.gclientRunhooks()
}
