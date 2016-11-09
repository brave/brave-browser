const path = require('path')
const spawnSync = require('child_process').spawnSync
const fs = require('fs-extra')

const defaultChromeRef = process.env.npm_package_config_chrome_ref
const defaultMuonRef = process.env.npm_package_config_muon_ref
const defaultPatchesRef = process.env.npm_package_config_patches_ref
const defaultBuildConfig = 'Release'
const scriptDir = path.dirname(__filename)
const rootDir = path.join(scriptDir, '..')
const depotToolsDir = path.join(rootDir, 'vendor', 'depot_tools')
const srcDir = path.join(rootDir, 'src')
const buildToolsDir = path.join(srcDir, 'build')
const muonDir = path.join(srcDir, 'electron')
const patchesDir = path.join(srcDir, 'libchromiumcontent')
const resourcesDir = path.join(rootDir, 'resources')

const defaultOptions = {
  env: process.env,
  shell: true,
  stdio: 'inherit',
  cwd: srcDir
}

let shell_path = process.env.PATH.split(path.delimiter)
shell_path.push(depotToolsDir)
shell_path.push(buildToolsDir)
shell_path = shell_path.join(path.delimiter)
process.env.PATH = shell_path

const util = {
  defaultChromeRef,
  defaultMuonRef,
  defaultPatchesRef,
  defaultBuildConfig,
  scriptDir,
  rootDir,
  depotToolsDir,
  srcDir,
  muonDir,
  patchesDir,
  resourcesDir,
  defaultOptions,

  run: (cmd, args, options = defaultOptions) => {
    console.log(cmd, args)
    const prog = spawnSync(cmd, args, options)
    if (prog.status !== 0) {
      console.error(prog.error)
      process.exit(1)
    }
  },

  submoduleSync: (options = {}) => {
    util.run('git', ['submodule', 'sync'], Object.assign(defaultOptions, options))
    util.run('git', ['submodule', 'update', '--init', '--recursive'], Object.assign(defaultOptions, options))
  },

  gclientSync: (options = {}) => {
    util.run('gclient', ['sync', '--force', '--nohooks', '--with_branch_heads'], Object.assign(defaultOptions, options))
  },

  gclientRunhooks: (options = {}) => {
    util.run('gclient', ['runnohooks'], Object.assign(defaultOptions, options))
  },

  fetch: (options = {}) => {
    util.run('git', ['fetch', 'origin'], Object.assign(defaultOptions, options))
  },

  fetchTags: (options = {}) => {
    util.run('git', ['fetch', 'origin', '--tags'], Object.assign(defaultOptions, options))
  },

  setVersion: (version, options = {}) => {
    util.run('git', ['reset', '--hard', version], Object.assign(defaultOptions, options))
  },
}

module.exports = util
