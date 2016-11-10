const path = require('path')

const defaultChromeRef = process.env.npm_package_config_chrome_ref
const defaultMuonRef = process.env.npm_package_config_muon_ref
const defaultPatchesRef = process.env.npm_package_config_patches_ref
const defaultNodeRef = process.env.npm_package_config_node_ref
const defaultBuildConfig = 'Release'

const Config = function () {
  this.chromeRef = defaultChromeRef
  this.muonRef = defaultMuonRef
  this.patchesRef = defaultPatchesRef
  this.nodeRef = defaultNodeRef
  this.buildConfig = defaultBuildConfig
  this.rootDir = path.join(path.dirname(__filename), '..')
  this.scriptDir = path.join(this.rootDir, 'scripts')
  this.depotToolsDir = path.join(this.rootDir, 'vendor', 'depot_tools')
  this.srcDir = path.join(this.rootDir, 'src')
  this.buildToolsDir = path.join(this.srcDir, 'build')
  this.muonDir = path.join(this.srcDir, 'electron')
  this.nodeDir = path.join(this.muonDir, 'vendor', 'node')
  this.patchesDir = path.join(this.srcDir, 'libchromiumcontent')
  this.resourcesDir = path.join(this.rootDir, 'resources')
  const defaultGClientFile = path.join(this.rootDir, '.gclient')
  this.gClientFile = process.env.MUON_GCLIENT_FILE || defaultGClientFile
}

Object.prototype.update = (options) => {
  if (options.build_config) {
    this.buildConfig = options.build_config
  }

  if (options.gclient_file) {
    this.gClientFile = options.gclient_file
  }

  if (options.muon_ref) {
    this.muonRef = options.muon_ref
  }

  if (options.patches_ref) {
    this.patchesRef = options.patches_ref
  }

  if (options.node_ref) {
    this.nodeRef = options.node_ref
  }
}

Object.defineProperty(Config.prototype, 'defaultOptions', {
  get: function () {
    const env = Object.assign({}, process.env)

    let pathEnv = process.env.PATH.split(path.delimiter)
    pathEnv.push(this.depotToolsDir)
    pathEnv.push(this.buildToolsDir)
    pathEnv = pathEnv.join(path.delimiter)
    env.PATH = pathEnv
    env.GCLIENT_FILE = this.gClientFile

    return {
      env,
      stdio: 'inherit',
      cwd: this.srcDir,
    }
  },
})

Object.defineProperty(Config.prototype, 'component', {
  get: function () { return this.__component || (this.buildConfig === 'Release' ? 'static_library' : 'shared_library') },
  set: function (component) { return this.__component = component },
})

Object.defineProperty(Config.prototype, 'outputDir', {
  get: function () { return this.__outputDir || path.join(this.srcDir, 'out', this.buildConfig) },
  set: function (outputDir) { return this.__outputDir = outputDir },
})

module.exports = new Config
