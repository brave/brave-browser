const path = require('path')
const spawnSync = require('child_process').spawnSync
const config = require('./config')
const fs = require('fs')

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
      console.log(prog.stdout && prog.stdout.toString())
      console.error(prog.stderr && prog.stderr.toString())
      process.exit(1)
    }
    return prog
  },

  buildGClientConfig: () => {
    function replacer(key, value) {
      return value;
    }

    let solutions = config.projectNames.map((projectName) => {
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
