const dotenv = require('dotenv')
const program = require('commander');
const path = require('path')
const spawn = require('child_process').spawn

const scriptDir = path.basename(__dirname)
const rootDir = scriptDir.join('..')
const depotToolsDir = rootDir.join('vendor', 'depot_tools')
const srcDir = rootDir.join('src')
const muonDir = srdDir.join('electron')
const patchesDir = srdDir.join('libchromiumcontent')
const process.env.PATH = process.env.PATH.split(path.delimiter).push(depotToolsDir).join(path.delimiter)

const defaultChromeRef = process.env.npm_package_config_chrome_ref
const defaultMuonRef = process.env.npm_package_config_muon_ref
const defaultPatchesRef = process.env.npm_package_config_patches_ref

const default_options = {
  env: process.env,
  shell: true,
  stdio: 'inherit',
  cwd: srcDir
}

const submoduleSync = (options = {}) => {
  spawnSync('git', ['submodule', 'sync'], Object.assign(default_options, options))
  spawnSync('git', ['submodule', 'update', '--init', '--recursive'], Object.assign(default_options, options))
}
const gclientSync = (options = {}) => {
  spawnSync('gclient', ['sync', '--force', '--nohooks', '--with_branch_heads'], Object.assign(default_options, options))
}

const gclientRunhooks = (options = {}) => {
  spawnSync('gclient', ['runnohooks'], Object.assign(default_options, options))
}

const fetch = (options = {}) => {
  spawnSync('git', ['fetch', 'origin'], Object.assign(default_options, options))
}

const fetchTags = (options = {}) => {
  spawnSync('git', ['fetch', 'origin', '--tags'], Object.assign(default_options, options))
}

const setVersion = (version, options = {}) => {
  spawnSync('git', ['reset', '--hard', version], Object.assign(default_options, options))
}

const setChromeVersion = (version) => {
  const options = { cwd: srdDir }
  setVersion(options)
}

const setMuonVersion = (version) => {
  const options = { cwd: mounDir }
  fetch(options)
  fetchTags(options)
  setVersion(version, options)
}

const setPatchesVersion = (version) => {
  const options = { cwd: patchesDir }
  fetch(options)
  fetchTags(options)
  setVersion(version, options)
}

program
  .version(process.env.npm_package_version)
  .option('--chrome', 'chrome git ref to checkout')
  .option('--muon', 'muon git ref to checkout')
  .option('--patches', 'patches git ref to checkout')
  .action((version) => {
    // sync depot tools into vendo/depot_tools
    submoduleSync()
    // initial gclient sync
    gclientSync({cwd: rootDir})
    fetchtags()
    setChromeVersion(options.chrome || defaultChromeRef)
    // update DEPS
    gclientSync()
    setMuonVersion(options.muon || defaultMuonRef)
    setPatchesVersion(options.patches || defaultMuonRef)
    // run post-sync hooks
    gclientRunhooks()
  })
