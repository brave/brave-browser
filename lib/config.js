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
  this.electronVersion = getNPMConfig(['electron_version']) || (fs.existsSync(muonDirPackage + '.json') && require(muonDirPackage)['version'])
}

Config.prototype.buildArgs = function () {
  const version = this.electronVersion
  const version_parts = version.split('.')

  return {
    root_extra_deps: [ "//electron" ],
    muon_build: true,
    is_component_build: this.buildConfig !== 'Release',
    enable_nacl: false,
    proprietary_codecs: true,
    ffmpeg_branding: "Chrome",
    clang_use_chrome_plugins: false,
    enable_print_preview: false,
    enable_plugin_installation: false,
    // enable_stripping: false,
    enable_supervised_users: false,
    branding_path_component: "brave",
    enable_widevine: process.platform !== 'linux',
    target_cpu: this.targetArch,
    is_official_build: this.buildConfig === 'Release',
    is_debug: this.buildConfig !== 'Release',
    dcheck_always_on: this.buildConfig !== 'Release',
    electron_google_api_key: this.googleApiKey,
    electron_google_api_endpoint: this.googleApiEndpoint,
    electron_product_name: getNPMConfig(['electron_product_name']) || "Muon",
    electron_project_name: getNPMConfig(['electron_project_name']) || "muon",
    electron_version_major: version_parts[0],
    electron_version_minor: version_parts[1],
    electron_version_build: version_parts[2],
  }
}

Config.prototype.appendPath = function (oldPath, addPath) {
  let newPath = oldPath.split(path.delimiter)
  newPath.push(addPath)
  newPath = newPath.join(path.delimiter)
  return newPath
}

Config.prototype.addPathToEnv = function (env, addPath) {
  // cmd.exe uses Path instead of PATH so just set both
  env.Path && (env.Path = this.appendPath(env.Path, addPath))
  env.PATH && (env.PATH = this.appendPath(env.PATH, addPath))
  return env
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
    // don't update refs for projects that have them
    if (!this.projects[projectName].ref)
      return

    let ref = options[projectName + '_ref']
    if (ref && ref !== 'default' && ref !== '') {
      this.projects[projectName].ref = ref
    }
  })
}

Object.defineProperty(Config.prototype, 'defaultOptions', {
  get: function () {
    let env = Object.assign({}, process.env)
    env = this.addPathToEnv(env, this.depotToolsDir)
    env.GCLIENT_FILE = this.gClientFile
    env.DEPOT_TOOLS_WIN_TOOLCHAIN = '0'
    env.PYTHONUNBUFFERED = '1'
    env.TARGET_ARCH = this.gypTargetArch // for electron scripts

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
  get: function () {
    if (this.__outputDir)
      return this.__outputDir
    let baseDir = path.join(this.srcDir, 'out')
    baseDir = this.targetArch == 'x86' ? path.join(baseDir, 'x86') : baseDir
    return path.join(baseDir, this.buildConfig)
  },
  set: function (outputDir) { return this.__outputDir = outputDir },
})

module.exports = new Config
