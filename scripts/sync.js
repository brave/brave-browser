const path = require('path')
const program = require('commander');
const fs = require('fs-extra')
const chalk = require('chalk')
const config = require('../lib/config')
const util = require('../lib/util')
const GitPatcher = require('../lib/gitPatcher')

const divider = Array(32).join('-')
const projectNames = config.projectNames.filter((project) => config.projects[project].ref)

const progressStyle = chalk.bold.inverse

function progressLog (message) {
  console.log(progressStyle( message))
}

program
  .version(process.env.npm_package_version)
  .option('--gclient_file <file>', 'gclient config file location')
  .option('--gclient_verbose', 'verbose output for gclient')
  .option('--run_hooks', 'run gclient hooks')
  .option('--run_sync', 'run gclient sync')
  .option('--target_os <target_os>', 'target OS')
  .option('--target_arch <target_arch>', 'target architecture')
  .option('--target_apk_base <target_apk_base>', 'target Android OS apk (classic, modern, mono)')
  .option('--submodule_sync', 'run submodule sync')
  .option('--init', 'initialize all dependencies')
  .option('--all', 'update all projects')
projectNames.forEach((name) => {
  let project = config.projects[name]
  program.option('--' + project.arg_name + '_ref <ref>', name + ' ref to checkout')
})

async function RunCommand () {
  program.parse(process.argv)
  config.update(program)
  
  if (program.init || program.submodule_sync) {
    progressLog('Updating submodules...')
    util.submoduleSync()
    progressLog('Done updating submodules...')
  }
  
  if (program.init) {
    util.buildGClientConfig()
  }
  
  if (program.init) {
    progressLog(`Syncing Gclient (with reset)`)
    util.gclientSync(true)
  }
  
  
  progressLog('Updating project repositories...')
  const alwaysReset = program.init ? true : false
  if (alwaysReset) {
    console.log(chalk.italic('A git reset will be performed for all repositories because the "init" param was specified'))
  }
  let wasSomeDepUpdated = alwaysReset ? true : false
  
  await Promise.all(
    projectNames.map(async (name) => {
      let project = config.projects[name]
      if (alwaysReset || program.all || program[project.arg_name + '_ref']) {
        console.log(`Ensuring ${name} repository is at latest version of: ${project.ref}...`)
        const thisDepUpdated = await util.setGitVersion(project.dir, project.ref, alwaysReset)
        console.log(`Repository for ${name} ${thisDepUpdated ? 'required' : 'did not require'} a repository reset.`)
        if (thisDepUpdated) {
          wasSomeDepUpdated = true
        }
      }
    })
  )
  progressLog('Done updating project repositories.')
  
  if (wasSomeDepUpdated || alwaysReset || program.run_sync) {
    progressLog(`Syncing Gclient (${alwaysReset ? '' : 'not '} with reset)`)
    util.gclientSync(alwaysReset)
  }
  
  if (wasSomeDepUpdated || program.init || program.run_hooks) {
    progressLog('Applying patches...')
    // Apply patches if either chromium (the source)
    // or brave-core (the patches) change.
    const coreRepoPath = config.projects['brave-core'].dir
    const patchesPath = path.join(coreRepoPath, 'patches')
    const v8PatchesPath = path.join(patchesPath, 'v8')
    const chromiumRepoPath = config.projects['chrome'].dir
    const v8RepoPath = path.join(chromiumRepoPath, 'v8')
    const chromiumPatcher = new GitPatcher(patchesPath, chromiumRepoPath)

    const v8Patcher = new GitPatcher(v8PatchesPath, v8RepoPath)

    const chromiumPatchStatus = await chromiumPatcher.applyPatches()
    const v8PatchStatus = await v8Patcher.applyPatches()
    // differentiate entries for logging
    v8PatchStatus.forEach(s => s.path = path.join('v8', s.path))
    const allPatchStatus = chromiumPatchStatus.concat(v8PatchStatus)

    logAllPatchStatus(allPatchStatus, 'Chromium')
    progressLog('Done applying patches.')
    const hasPatchError = allPatchStatus.some(p => p.error)
    if (hasPatchError) {
      console.error(chalk.red.bgBlack('Exiting as not all patches were successful!'))
      process.exit(1)
    }
    progressLog('Running gclient hooks...')
    util.gclientRunhooks()
    progressLog('Done running gclient hooks.')
  }
}

progressLog('Brave Browser Sync starting')
RunCommand()
.then(() => {
  progressLog('Brave Browser Sync complete')
})
.catch((err) => {
  console.error(progressStyle('Brave Browser Sync ERROR:'))
  console.error(err)
})

function logAllPatchStatus(allPatchStatus, patchGroupName) {
  if (!allPatchStatus.length) {
    console.log(chalk.bold.italic(`There were no ${patchGroupName} code patch updates to apply.`))
  } else {
    const successfulPatches = []
    const failedPatches = []
    for (const patchStatus of allPatchStatus) {
      if (!patchStatus.error) {
        successfulPatches.push(patchStatus)
      } else {
        failedPatches.push(patchStatus)
      }
    }
    console.log(chalk.bold(`There were ${allPatchStatus.length} ${patchGroupName} code patch updates to apply.`))
    if (successfulPatches.length) {
      console.log(chalk.green(`${successfulPatches.length} successful patches:`))
      successfulPatches.forEach(logPatchStatus)
    }
    if (failedPatches.length) {
      console.log(chalk.red(`${failedPatches.length} failed patches:`))
      failedPatches.forEach(logPatchStatus)
    }
  }
}

function logPatchStatus ({ reason, path, patchPath, error, warning }) {
  const success = !error
  const statusColor = success ? chalk.green : chalk.red
  console.log(statusColor.bold.underline(path || patchPath))
  console.log(`  - Reason: ${GitPatcher.patchApplyReasonMessages[reason]}`)
  if (error) {
    console.log(chalk.red(`  - Error - ${error.message}`))
  }
  if (warning) {
    console.warn(chalk.yellow(`  - Warning - ${warning}`))
  }
  if (error)  {
    if (error.stdout) {
      console.log(chalk.blue(error.stdout))
    }
    if (error.stderr) {
      console.error(chalk.red(error.stderr))
    }
  }
  console.log(divider)
}
