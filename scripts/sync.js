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
  .option('--submodule_sync', 'run submodule sync')
  .option('--init', 'initialize all dependencies')
  .option('--all', 'update all projects')
projectNames.forEach((project) => {
  project = project.replace('-', '_')
  program.option('--' + project + '_ref <ref>', project + ' ref to checkout')
})

program.parse(process.argv)
config.update(program)

if (program.init || program.submodule_sync) {
  util.submoduleSync({verbose: config.gClientVerbose})
}

if (program.init) {
  util.buildGClientConfig({verbose: config.gClientVerbose})
}

if (program.init) {
  util.gclientSync({verbose: config.gClientVerbose})
}

let updatedVersion = false

projectNames.forEach((project) => {
  if (program.init || program.all || program[project.replace('-', '_') + '_ref']) {
    updatedVersion = true
    util.setDepVersion(config.projects[project].dir, config.projects[project].ref)
  }
})

if (updatedVersion || program.init || program.run_sync) {
  util.gclientSync({verbose: config.gClientVerbose})
}

if (updatedVersion || program.init || program.run_hooks) {
  util.gclientRunhooks({verbose: config.gClientVerbose})
}
