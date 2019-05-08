const path = require('path')
const program = require('commander');
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')

const projectNames = config.projectNames.filter((project) => config.projects[project].ref)

program
  .version(process.env.npm_package_version)
  .option('--gclient_file <file>', 'gclient config file location')
  .option('--gclient_verbose', 'verbose output for gclient')
  .option('--run_hooks', 'run gclient hooks')
  .option('--run_sync', 'run gclient sync')
  .option('--target_os <target_os>', 'target OS')
  .option('--submodule_sync', 'run submodule sync')
  .option('--init', 'initialize all dependencies')
  .option('--all', 'update all projects')
projectNames.forEach((name) => {
  let project = config.projects[name]
  program.option('--' + project.arg_name + '_ref <ref>', name + ' ref to checkout')
})

program.parse(process.argv)
config.update(program)

if (program.init || program.submodule_sync) {
  util.submoduleSync()
}

if (program.init) {
  util.buildGClientConfig()
}

if (program.init) {
  util.gclientSync(true)
}

let updatedVersion = false

projectNames.forEach((name) => {
  let project = config.projects[name]
  if (program.init || program.all || program[project.arg_name + '_ref']) {
    updatedVersion = true
    util.setDepVersion(project.dir, project.ref)
  }
})

if (updatedVersion || program.init || program.run_sync) {
  util.gclientSync()
}

if (updatedVersion || program.init || program.run_hooks) {
  const core_dir = config.projects['brave-core'].dir
  util.run('python', [path.join(core_dir, 'script', 'apply-patches.py')])
  util.gclientRunhooks()
}
