const dotenv = require('dotenv')
const program = require('commander');
const path = require('path')
const spawnSync = require('child_process').spawnSync
const fs = require('fs-extra')

const scriptDir = path.dirname(__filename)
const rootDir = path.join(scriptDir, '..')
const depotToolsDir = path.join(rootDir, 'vendor', 'depot_tools')
const srcDir = path.join(rootDir, 'src')
const muonDir = path.join(srcDir, 'electron')
const patchesDir = path.join(srcDir, 'libchromiumcontent')
const resourcesDir = path.join(rootDir, 'resources')

let shell_path = process.env.PATH.split(path.delimiter)
shell_path.push(depotToolsDir)
shell_path = shell_path.join(path.delimiter)
process.env.PATH = shell_path

const defaultChromeRef = process.env.npm_package_config_chrome_ref
const defaultMuonRef = process.env.npm_package_config_muon_ref
const defaultPatchesRef = process.env.npm_package_config_patches_ref

const default_options = {
  env: process.env,
  shell: true,
  stdio: 'inherit',
  cwd: srcDir
}

const run = (command, arguments, options) => {
  const prog = spawnSync(command, arguments, options)
  if (prog.status !== 0) {
    process.exit(1)
  }
}
const submoduleSync = (options = {}) => {
  run('git', ['submodule', 'sync'], Object.assign(default_options, options))
  run('git', ['submodule', 'update', '--init', '--recursive'], Object.assign(default_options, options))
}
const gclientSync = (options = {}) => {
  run('gclient', ['sync', '--force', '--nohooks', '--with_branch_heads'], Object.assign(default_options, options))
}

const gclientRunhooks = (options = {}) => {
  run('gclient', ['runnohooks'], Object.assign(default_options, options))
}

const fetch = (options = {}) => {
  run('git', ['fetch', 'origin'], Object.assign(default_options, options))
}

const fetchTags = (options = {}) => {
  run('git', ['fetch', 'origin', '--tags'], Object.assign(default_options, options))
}

const setVersion = (version, options = {}) => {
  run('git', ['reset', '--hard', version], Object.assign(default_options, options))
}

const setChromeVersion = (version) => {
  const options = { cwd: srcDir }
  setVersion(version, options)
}

const setMuonVersion = (version) => {
  const options = { cwd: muonDir }
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

const updateBranding = () => {
  const braveThemeDir = path.join(srcDir, 'chrome', 'app', 'theme', 'brave')
  fs.ensureDirSync(braveThemeDir)
  fs.copySync(path.join(resourcesDir, 'BRANDING'), path.join(braveThemeDir, 'BRANDING'))
}

program
  .version(process.env.npm_package_version)
  .option('--chrome <ref>', 'chrome git ref to checkout')
  .option('--muon <ref>', 'muon git ref to checkout')
  .option('--patches <ref>', 'patches git ref to checkout')
  .parse(process.argv)

// sync depot tools into vendo/depot_tools
console.log('Updating submodules...')
submoduleSync()
// initial gclient sync
console.log('gclient sync...')
gclientSync({cwd: rootDir})

console.log('fetching chrome tags...')
fetchTags()

const chromeRef = program.chrome || defaultChromeRef
console.log('git checkout chrome ' + chromeRef + '...')
setChromeVersion(program.chrome || defaultChromeRef)

const muonRef = program.muon || defaultMuonRef
console.log('git checkout muon ' + muonRef + '...')
setMuonVersion(muonRef)

const patchesRef = program.patches || defaultPatchesRef
console.log('git checkout patches ' + patchesRef + '...')
setPatchesVersion(program.patches || patchesRef)
// update DEPS
console.log('gclient sync...')
gclientSync()

// run post-sync hooks
console.log('gclient runhooks...')
gclientRunhooks()
console.log('update branding...')
updateBranding()
