const path = require('path')
const program = require('commander');
const util = require('./util')
const fs = require('fs-extra')

const setChromeVersion = (version) => {
  const options = { cwd: util.srcDir }
  util.setVersion(version, options)
}

const setMuonVersion = (version) => {
  const options = { cwd: util.muonDir }
  util.fetch(options)
  util.fetchTags(options)
  util.setVersion(version, options)
}

const setPatchesVersion = (version) => {
  const options = { cwd: util.patchesDir }
  util.fetch(options)
  util.fetchTags(options)
  util.setVersion(version, options)
}

const updateBranding = () => {
  const braveThemeDir = path.join(util.srcDir, 'chrome', 'app', 'theme', 'brave')
  fs.ensureDirSync(braveThemeDir)
  fs.copySync(path.join(util.resourcesDir, 'BRANDING'), path.join(braveThemeDir, 'BRANDING'))
}

program
  .version(process.env.npm_package_version)
  .option('--chrome <ref>', 'chrome git ref to checkout')
  .option('--muon <ref>', 'muon git ref to checkout')
  .option('--patches <ref>', 'patches git ref to checkout')
  .parse(process.argv)

// sync depot tools into vendo/depot_tools
console.log('Updating submodules...')
util.submoduleSync()
// initial gclient sync
console.log('gclient sync...')
util.gclientSync({cwd: util.rootDir})

console.log('fetching chrome tags...')
util.fetchTags()

const chromeRef = program.chrome || util.defaultChromeRef
console.log('git checkout chrome ' + chromeRef + '...')
setChromeVersion(program.chrome || util.defaultChromeRef)

const muonRef = program.muon || util.defaultMuonRef
console.log('git checkout muon ' + muonRef + '...')
setMuonVersion(muonRef)

const patchesRef = program.patches || util.defaultPatchesRef
console.log('git checkout patches ' + patchesRef + '...')
setPatchesVersion(program.patches || patchesRef)
// update DEPS
console.log('gclient sync...')
util.gclientSync()

// run post-sync hooks
console.log('gclient runhooks...')
util.gclientRunhooks()
console.log('update branding...')
updateBranding()
