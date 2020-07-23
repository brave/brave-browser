const Log = require('./logging')
const { spawnSync } = require('child_process')

const getNPMConfig = (path) => {
  const key = path.join('_').replace('-', '_')
  const npm_prefix = 'npm_config_'
  const package_config_prefix = 'npm_package_config_'
  const package_prefix = 'npm_package_'
  return process.env[npm_prefix + key] ||
    process.env[package_config_prefix + key] ||
    process.env[package_prefix + key]
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
