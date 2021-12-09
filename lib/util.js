const fs = require('fs')
const Log = require('./logging')
const { spawnSync } = require('child_process')

// This is the valid way of retrieving configuration values for NPM <= 6, with
// npm_package_config_* still working up to NPM 7, but no longer for NPM >= 8.
// See https://github.com/npm/rfcs/blob/main/implemented/0021-reduce-lifecycle-script-environment.md
const getNPMConfigFromEnv = (path) => {
  const key = path.join('_')
  // Npm <= 6 did not preserve dashes in package.json keys
  const keyNoDashes = key.replace('-', '_')
  const npm_prefix = 'npm_config_'
  const package_config_prefix = 'npm_package_config_'
  const package_prefix = 'npm_package_'
  return process.env[npm_prefix + keyNoDashes] ||
    process.env[package_config_prefix + keyNoDashes] ||
    process.env[package_config_prefix + key] ||
    process.env[package_prefix + keyNoDashes] ||
    process.env[package_prefix + key]
}

// From NPM >= 8, we need to inspect the package.json file, which should
// be available via the 'npm_package_json' environment variable.
const getNPMConfigFromPackageJson = (path) => {
  let packages = { config: {} }
  if (fs.existsSync(process.env['npm_package_json'])) {
    packages = require(process.env['npm_package_json'])
  }

  let obj = packages.config
  for (var i = 0, len = path.length; i < len; i++) {
    if (!obj) {
      return obj
    }
    obj = obj[path[i]]
  }
  return obj
}

const getNPMConfig = (path) => {
  return getNPMConfigFromEnv(path) || getNPMConfigFromPackageJson(path)
}


const getProjectVersion = (projectName) => {
  return getNPMConfig(['projects', projectName, 'tag']) || getNPMConfig(['projects', projectName, 'branch'])
}

const run = (cmd, args = [], options = {}) => {
  const { continueOnFail, ...cmdOptions } = options
  Log.command(cmdOptions.cwd, cmd, args)
  const prog = spawnSync(cmd, args, cmdOptions)
  if (prog.status !== 0) {
    if (!continueOnFail) {
      console.log(prog.stdout && prog.stdout.toString())
      console.error(prog.stderr && prog.stderr.toString())
      process.exit(1)
    }
  }
  return prog
}

const runGit = (repoPath, gitArgs, continueOnFail = false) => {
  let prog = run('git', gitArgs, { cwd: repoPath, continueOnFail })

  if (prog.status !== 0) {
    return null
  } else {
    return prog.stdout.toString().trim()
  }
}

module.exports = {
  getNPMConfig,
  getProjectVersion,
  run,
  runGit
}
