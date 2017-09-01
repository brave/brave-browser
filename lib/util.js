const path = require('path')
const spawnSync = require('child_process').spawnSync
const config = require('./config')
const fs = require('fs-extra')

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
    const continueOnFail = options.continueOnFail
    delete options.continueOnFail

    const prog = spawnSync(cmd, args, options)
    if (prog.status !== 0) {
      if (!continueOnFail) {
        console.log(prog.stdout && prog.stdout.toString())
        console.error(prog.stderr && prog.stderr.toString())
        process.exit(1)
      }
    }
    return prog
  },

  installPrereqs: () => {
    const options = config.defaultOptions
    options.cwd = config.rootDir
    options.continueOnFail = true
    if (util.run('python', ['-c', '"import jinja2"'], options).status !== 0) {
      options.cwd = path.join(config.rootDir, 'vendor/jinja')
      if (process.platform === 'win32') {
        util.run('python', ['setup.py', 'install'], options)
      } else {
        util.run('sudo', ['python', 'setup.py', 'install'], options)
      }
    }
  },

  buildGClientConfig: () => {
    function replacer(key, value) {
      return value;
    }

    let solutions = config.projectNames.filter((projectName) => config.projects[projectName].ref).map((projectName) => {
      let project = config.projects[projectName]
      return {
        managed: "%False%",
        name: project.gclientName,
        url: project.url,
        custom_deps: project.custom_deps
      }
    })

    const out = 'solutions = ' + JSON.stringify(solutions, replacer, 2)
      .replace(/"%None%"/g, "None")
      .replace(/"%False%"/g, "False")
    fs.writeFileSync(config.defaultGClientFile, out)
  },

  updateBranding: () => {
    console.log('update branding...')
    const braveThemeDir = path.join(config.srcDir, 'chrome', 'app', 'theme', 'brave')
    fs.ensureDirSync(braveThemeDir)
    fs.copySync(path.join(config.resourcesDir, 'BRANDING'), path.join(braveThemeDir, 'BRANDING'))
  },

  buildNode: (options = config.defaultOptions) => {
    console.log('building node...')
    fs.copySync(path.join(config.resourcesDir, 'node_config.gypi'), path.join(config.projects.node.dir, 'config.gypi'))

    options.env.GYP_CHROMIUM_NO_ACTION = 0
    options.env = config.addPathToEnv(options.env, config.buildToolsDir)
    util.run('python', [path.join(config.buildToolsDir, 'gyp_chromium.py'),
      '-I', 'electron/common.gypi',
      '-I', 'electron/build/node/node.gypi',
      '-D', 'target_arch=' + config.gypTargetArch,
      '-D', 'host_arch=x64',
      '-D', 'buildtype=Custom', // don't apply Dev or Official configs
      '-D', 'component=static_library',
      '-Goutput_dir=' + config.outputDir.split(path.sep).slice(0, -1).join(path.sep),
      path.join(config.projects.node.dir, 'node.gyp')], options)
    util.run('ninja', ['-C', config.outputDir, 'node'], options)
    util.run('ninja', ['-C', config.outputDir, 'libuv'], options)
    util.run('ninja', ['-C', config.outputDir, 'http_parser'], options)
    util.run('ninja', ['-C', config.outputDir, 'cares'], options)
    util.run('ninja', ['-C', config.outputDir, 'zlib'], options)
  },

  buildMuon: (options = config.defaultOptions) => {
    console.log('building muon...')

    const args = util.buildArgsToString(config.buildArgs())
    util.run('gn', ['gen', config.outputDir, '--args="' + args + '"'], options)
    util.run('ninja', ['-C', config.outputDir, 'electron'], options)
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
    util.run('git', ['fetch', '--all', '--tags'], options)
  },

  setVersion: (version, options = {}) => {
    util.run('git', ['clean', '-f'], options)
    util.run('git', ['reset', '--hard', version], options)
  },

  setDepVersion: (dir, version) => {
    const options = { cwd: dir }
    util.fetch(options)
    util.setVersion(version, options)
  },

  buildArgsToString: (buildArgs) => {
    let args = ''
    for (let arg in buildArgs) {
      let val = buildArgs[arg]
      if (typeof val === 'string') {
        val = '"' + val + '"'
      } else {
        val = JSON.stringify(val)
      }
      args += arg + '=' + val + ' '
    }
    return args.replace(/"/g,'\\"')
  }
}

module.exports = util
