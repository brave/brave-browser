const path = require('path')
const spawnSync = require('child_process').spawnSync
const config = require('./config')
const fs = require('fs-extra')

const runGClient = (args, options = {}) => {
  if (config.gClientVerbose) args.push('--verbose')
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
    const chromeComponentsDir = path.join(config.srcDir, 'components')
    const chromeAppDir = path.join(config.srcDir, 'chrome', 'app')
    const braveAppDir = path.join(config.projects['brave-core'].dir, 'app')
    fs.copySync(path.join(braveAppDir, 'brave_strings.grd'), path.join(chromeAppDir, 'brave_strings.grd'))
    fs.copySync(path.join(braveAppDir, 'settings_brave_strings.grdp'), path.join(chromeAppDir, 'settings_brave_strings.grdp'))
    fs.copySync(path.join(braveAppDir, 'components_brave_strings.grd'), path.join(config.srcDir, 'components', 'components_brave_strings.grd'))
    fs.copySync(path.join(braveAppDir, 'theme', 'brave'), path.join(chromeAppDir, 'theme', 'brave'))
    fs.copySync(path.join(braveAppDir, 'theme', 'default_100_percent', 'brave'), path.join(chromeAppDir, 'theme', 'default_100_percent', 'brave'))
    fs.copySync(path.join(braveAppDir, 'theme', 'default_200_percent', 'brave'), path.join(chromeAppDir, 'theme', 'default_200_percent', 'brave'))
    fs.copySync(path.join(braveAppDir, 'vector_icons', 'brave'), path.join(chromeAppDir, 'vector_icons', 'brave'))
    // Copy XTB files for app/brave_strings.grd => chromium_strings.grd
    fs.copySync(path.join(braveAppDir, 'resources'), path.join(chromeAppDir, 'resources'))
    // Copy XTB files for brave/app/components_brave_strings.grd => components/components_chromium_strings.grd
    fs.copySync(path.join(braveAppDir, 'strings'), path.join(chromeComponentsDir, 'strings'))
  },

  buildTarget: (options = config.defaultOptions) => {
    console.log('building ' + config.buildTarget + '...')

    const args = util.buildArgsToString(config.buildArgs())
    util.run('gn', ['gen', config.outputDir, '--args="' + args + '"'], options)
    util.run('ninja', ['-C', config.outputDir, config.buildTarget], options)
  },

  submoduleSync: (options = {}) => {
    if (!options.cwd) options.cwd = config.rootDir // default cwd `./src` may not exist yet
    options = mergeWithDefault(options)
    util.run('git', ['submodule', 'sync'], options)
    util.run('git', ['submodule', 'update', '--init', '--recursive'], options)
    util.run('git', ['-C', config.depotToolsDir, 'clean', '-fxd'], options)
    util.run('git', ['-C', config.depotToolsDir, 'reset', '--hard', 'HEAD'], options)
  },

  gclientSync: (options = {}) => {
    runGClient(['sync', '--force', '--nohooks', '--with_branch_heads'], options)
  },

  gclientRunhooks: (options = {}) => {
    runGClient(['runhooks'], options)
  },

  fetch: (options = {}) => {
    if (!options.cwd) options.cwd = config.rootDir
    options = mergeWithDefault(options)
    util.run('git', ['-C', options.git_cwd, 'fetch', '--all', '--tags'], options)
  },

  setVersion: (version, options = {}) => {
    if (!options.cwd) options.cwd = config.rootDir
    util.run('git', ['-C', options.git_cwd, 'clean', '-f'], options)
    util.run('git', ['-C', options.git_cwd, 'reset', '--hard', version], options)
  },

  setDepVersion: (dir, version) => {
    const options = { git_cwd: dir }
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
