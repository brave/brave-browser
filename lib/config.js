'use strict'

const path = require('path')

const defaultBuildConfig = 'Release'

const packages = require('../package')

const getNPMConfig = (path) => {
  const key = path.join('_')
  const npm_prefix = 'npm_config_projects_'
  const package_prefix = 'npm_package_config_projects_'
  return process.env[npm_prefix + key] || process.env[package_prefix + key]
}

const Config = function () {
  this.buildConfig = defaultBuildConfig
  this.projectNames = []
  this.projects = {}
  this.rootDir = path.join(path.dirname(__filename), '..')
  this.scriptDir = path.join(this.rootDir, 'scripts')
  this.depotToolsDir = path.join(this.rootDir, 'vendor', 'depot_tools')
  this.srcDir = path.join(this.rootDir, getNPMConfig(['chrome', 'dir']))
  this.buildToolsDir = path.join(this.srcDir, 'build')
  this.resourcesDir = path.join(this.rootDir, 'resources')
  this.defaultGClientFile = path.join(this.rootDir, '.gclient')
  this.gClientFile = process.env.MUON_GCLIENT_FILE || this.defaultGClientFile
  this.buildProjects()
}

Config.prototype.buildProjects = function () {
  for (let name in packages.config.projects) {
    this.projectNames.push(name)
  }

  this.projectNames.forEach((projectName) => {
    this.projects[projectName] = {
      ref: getNPMConfig([projectName, 'repository', 'ref']),
      url: getNPMConfig([projectName, 'repository', 'url']),
      gclientName: getNPMConfig([projectName, 'dir']),
      dir: path.join(this.rootDir, getNPMConfig([projectName, 'dir'])),
      custom_deps: packages.config.projects[projectName].custom_deps
    }
  })
}

Config.prototype.update = function (options) {
  if (options.C) {
    this.buildConfig = path.split(options.C).last
    this.__outputDir = options.C
  }

  if (options.gclient_file && options.gclient_file !== 'default') {
    this.gClientFile = options.gclient_file
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
    env.PATH = this.appendPath(env.PATH, this.depotToolsDir)
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
