'use strict'

const path = require('path')
const fs = require('fs')

const defaultBuildConfig = 'Release'

const packages = require('../package')

const getNPMConfig = (path) => {
  const key = path.join('_')
  const npm_prefix = 'npm_config_'
  const package_prefix = 'npm_package_config_'
  return process.env[npm_prefix + key] || process.env[package_prefix + key]
}

const Config = function () {
  this.pathEnvVar = process.env.PATH ? 'PATH' : 'Path'
  this.buildConfig = defaultBuildConfig
  this.projectNames = []
  this.projects = {}
  this.rootDir = path.join(path.dirname(__filename), '..')
  this.scriptDir = path.join(this.rootDir, 'scripts')
  this.depotToolsDir = path.join(this.rootDir, 'vendor', 'depot_tools')
  this.srcDir = path.join(this.rootDir, getNPMConfig(['projects', 'chrome', 'dir']))
  this.buildToolsDir = path.join(this.srcDir, 'build')
  this.resourcesDir = path.join(this.rootDir, 'resources')
  this.defaultGClientFile = path.join(this.rootDir, '.gclient')
  this.gClientFile = process.env.MUON_GCLIENT_FILE || this.defaultGClientFile
  this.targetArch = 'x64'
  this.gypTargetArch = 'x64'
  this.googleApiKey = getNPMConfig(['electron_google_api_key']) || 'AIzaSyAQfxPJiounkhOjODEO5ZieffeBv6yft2Q'
  this.googleApiEndpoint = getNPMConfig(['electron_google_api_endpoint']) || 'https://www.googleapis.com/geolocation/v1/geolocate?key='
  this.buildProjects()
  const muonDirPackage = path.join(this.projects.muon.dir, 'package')
  this.electronVersion = getNPMConfig(['electron_version']) || fs.existsSync(muonDirPackage) && require(path.join(this.projects.muon.dir, 'package'))['version']
}

Config.prototype.buildArgs = function () {
  const version = this.electronVersion
  const version_parts = version.split('.')

  return {
    root_extra_deps: [ "//electron" ],
    is_component_build: this.buildConfig !== 'Release',
    enable_nacl: false,
    proprietary_codecs: true,
    ffmpeg_branding: "Chrome",
    clang_use_chrome_plugins: false,
    enable_print_preview: false,
    enable_plugin_installation: false,
    enable_supervised_users: false,
    branding_path_component: "brave",
    enable_widevine: process.platform !== 'linux',
    target_cpu: this.targetArch,
    is_official_build: this.buildConfig === 'Release',
    is_debug: this.buildConfig !== 'Release',
    dcheck_always_on: this.buildConfig !== 'Release',
    enable_nacl: false,
    electron_google_api_key: this.googleApiKey,
    electron_google_api_endpoint: this.googleApiEndpoint,
    electron_product_name: getNPMConfig(['electron_product_name']) || "Muon",
    electron_project_name: getNPMConfig(['electron_project_name']) || "muon",
    electron_version_major: version_parts[0],
    electron_version_minor: version_parts[1],
    electron_version_build: version_parts[2],
  }
}

Config.prototype.buildProjects = function () {
  for (let name in packages.config.projects) {
    this.projectNames.push(name)
  }

  this.projectNames.forEach((projectName) => {
    this.projects[projectName] = {
      ref: getNPMConfig(['projects', projectName, 'repository', 'ref']),
      url: getNPMConfig(['projects', projectName, 'repository', 'url']),
      gclientName: getNPMConfig(['projects', projectName, 'dir']),
      dir: path.join(this.rootDir, getNPMConfig(['projects', projectName, 'dir'])),
      custom_deps: packages.config.projects[projectName].custom_deps
    }
  })
}

Config.prototype.update = function (options) {
  if (options.C) {
    this.buildConfig = path.basename(options.C)
    this.__outputDir = options.C
  }

  if (options.target_arch === 'x86') {
    this.targetArch = options.target_arch
    this.gypTargetArch = 'ia32'
  }

  if (options.target_arch === 'ia32') {
    this.targetArch = 'x86'
    this.gypTargetArch = options.target_arch
  }

  if (options.gclient_file && options.gclient_file !== 'default') {
    this.gClientFile = options.gclient_file
  }

  if (options.electron_google_api_key) {
    this.googleApiKey = options.electron_google_api_key
  }

  if (options.electron_google_api_endpoint) {
    this.googleApiEndpoint = options.electron_google_api_endpoint
  }

  this.projectNames.forEach((projectName) => {
    let ref = options[projectName + '_ref']
    if (ref && ref !== 'default' && ref !== '') {
      this.projects[projectName].ref = ref
    }
  })
}

Config.prototype.appendPath = function (pathEnv, addPath) {
  pathEnv = pathEnv.split(path.delimiter)
  pathEnv.push(addPath)
  pathEnv = pathEnv.join(path.delimiter)
  return pathEnv
}

Object.defineProperty(Config.prototype, 'defaultOptions', {
  get: function () {
    const env = Object.assign({}, process.env)
    env[this.pathEnvVar] = this.appendPath(env[this.pathEnvVar], this.depotToolsDir)
    env.GCLIENT_FILE = this.gClientFile
    env.DEPOT_TOOLS_WIN_TOOLCHAIN = '0'
    env.PYTHONUNBUFFERED = '1'

    return {
      env,
      stdio: 'inherit',
      cwd: this.srcDir,
      shell: true,
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
