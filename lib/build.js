const config = require('../lib/config')
const util = require('../lib/util')
const path = require('path')
const fs = require('fs-extra')

const touchOverriddenFiles = (filter) => {
  console.log('touch original files overridden by chromium_src...')

  // Return true when original file of |file| should be touched.
  const applyFileFilter = (file) => {
    // Exclude test files
    if (file.indexOf('browsertest') > -1 || file.indexOf('unittest') > -1) { return false }

    // Only includes cc and h files.
    const ext = path.extname(file)
    if (ext !== '.cc' && ext !== '.h' && ext !== '.mm') { return false }

    // Touch all overridden files.
    if (filter === '*') { return true }

    return file.match(filter)
  }

  const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        filelist = walkSync(path.join(dir, file), filelist)
      } else if (applyFileFilter(file)) {
        filelist = filelist.concat(path.join(dir, file))
      }
    })
    return filelist
  }

  const chromiumSrcDir = path.join(config.srcDir, 'brave', 'chromium_src')
  var sourceFiles = walkSync(chromiumSrcDir)

  // Touch original files by updating mtime.
  const chromiumSrcDirLen = chromiumSrcDir.length
  sourceFiles.forEach(file => {
    const targetOriginalFile = path.join(config.srcDir, file.slice(chromiumSrcDirLen))
    const date = new Date()
    fs.utimesSync(targetOriginalFile, date, date)
    console.log(targetOriginalFile + ' is touched.')
  })
}

const build = (buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)

  if (options.touch_overridden_files) {
    touchOverriddenFiles(options.touch_overridden_files)
  }

  if (!options.no_branding_update) {
    util.updateBranding()
  }

  util.buildTarget()
}

module.exports = build
