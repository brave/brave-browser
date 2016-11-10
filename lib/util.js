const path = require('path')
const spawnSync = require('child_process').spawnSync
const config = require('./config')

const runGClient = (args, options = {}) => {
  options.cwd = options.cwd || config.rootDir
  options = mergeWithDefault(options)
  options.env.GCLIENT_FILE = config.gClientFile
  util.run('gclient', args, options)
}

const mergeWithDefault = (options) => {
  return Object.assign({}, config.defaultOptions, options)
}

const util = {
  run: (cmd, args = [], options = {}) => {
    console.log(cmd, args.join(' '))
    const prog = spawnSync(cmd, args, options)
    if (prog.status !== 0) {
      console.error(prog.error)
      process.exit(1)
    }
  },

  submoduleSync: (options = { cwd: config.rootDir }) => {
    options = mergeWithDefault(options)
    util.run('git', ['submodule', 'sync'], options)
    util.run('git', ['submodule', 'update', '--init', '--recursive'], options)
  },

  gclientSync: (options = {}) => {
    runGClient(['sync', '--force', '--nohooks', '--with_branch_heads'], options)
  },

  gclientRunhooks: (options = {}) => {
    runGClient(['runhooks'], options)
  },

  fetch: (options = {}) => {
    options = mergeWithDefault(options)
    util.run('git', ['fetch', 'origin'], options)
  },

  fetchTags: (options = {}) => {
    options = mergeWithDefault(options)
    util.run('git', ['fetch', 'origin', '--tags'], options)
  },

  setVersion: (version, options = {}) => {
    util.run('git', ['reset', '--hard', version], options)
  },

  setDepVersion: (dir, version) => {
    const options = { cwd: dir }
    util.fetch(options)
    util.fetchTags(options)
    util.setVersion(version, options)
  },

  setChromeVersion: () => {
    util.setVersion(config.chromeRef, { cwd: config.srcDir })
  },

  setMuonVersion: () => {
    util.setDepVersion(config.muonDir, config.muonRef)
    util.run('npm', ['install'], { cwd: config.muonDir })
  },

  setNodeVersion: () => {
    util.setDepVersion(config.nodeDir, config.nodeRef)
  },

  setPatchesVersion: () => {
    util.setDepVersion(config.patchesDir, config.patchesRef)
  },
}

module.exports = util
