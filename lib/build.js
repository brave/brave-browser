const config = require('../lib/config')
const util = require('../lib/util')
const path = require('path')
const fs = require('fs-extra')

const touchOverriddenFiles = () => {
  console.log('touch original files overridden by chromium_src...')

  // Return true when original file of |file| should be touched.
  const applyFileFilter = (file) => {
    // Exclude test files
    if (file.indexOf('browsertest') > -1 || file.indexOf('unittest') > -1) { return false }

    // Only includes cc and h files.
    const ext = path.extname(file)
    if (ext !== '.cc' && ext !== '.h' && ext !== '.mm') { return false }

    return true
  }

  const chromiumSrcDir = path.join(config.srcDir, 'brave', 'chromium_src')
  var sourceFiles = util.walkSync(chromiumSrcDir, applyFileFilter)

  // Touch original files by updating mtime.
  const chromiumSrcDirLen = chromiumSrcDir.length
  sourceFiles.forEach(chromiumSrcFile => {
    var overriddenFile = path.join(config.srcDir, chromiumSrcFile.slice(chromiumSrcDirLen))
    if (!fs.existsSync(overriddenFile)) {
      // Try to check that original file is in gen dir.
      overriddenFile = path.join(config.outputDir, 'gen', chromiumSrcFile.slice(chromiumSrcDirLen))
    }

    if (fs.existsSync(overriddenFile)) {
      // If overriddenFile is older than file in chromium_src, touch it to trigger rebuild.
      if (fs.statSync(chromiumSrcFile).mtimeMs - fs.statSync(overriddenFile).mtimeMs > 0) {
        const date = new Date()
        fs.utimesSync(overriddenFile, date, date)
        console.log(overriddenFile + ' is touched.')
      }
    }
  })
}

const touchOverriddenVectorIconFiles = () => {
  console.log('touch original vector icon files overridden by brave/vector_icons...')

  // Return true when original file of |file| should be touched.
  const applyFileFilter = (file) => {
    // Only includes icon files.
    const ext = path.extname(file)
    if (ext !== '.icon') { return false }
    return true
  }

  const braveVectorIconsDir = path.join(config.srcDir, 'brave', 'vector_icons')
  var braveVectorIconFiles = util.walkSync(braveVectorIconsDir, applyFileFilter)

  // Touch original files by updating mtime.
  const braveVectorIconsDirLen = braveVectorIconsDir.length
  braveVectorIconFiles.forEach(braveVectorIconFile => {
    var overriddenFile = path.join(config.srcDir, braveVectorIconFile.slice(braveVectorIconsDirLen))
    if (fs.existsSync(overriddenFile)) {
      // If overriddenFile is older than file in vector_icons, touch it to trigger rebuild.
      if (fs.statSync(braveVectorIconFile).mtimeMs - fs.statSync(overriddenFile).mtimeMs > 0) {
        const date = new Date()
        fs.utimesSync(overriddenFile, date, date)
        console.log(overriddenFile + ' is touched.')
      }
    }
  })
}

/**
 * Checks to make sure the src/chrome/VERSION matches brave-browser's package.json version
 */
const checkVersionsMatch = () => {
  const srcChromeVersionDir = path.resolve(path.join(__dirname, '..', 'src', 'chrome', 'VERSION'))
  const versionData = fs.readFileSync(srcChromeVersionDir, 'utf8')
  const re = /MAJOR=(\d+)\s+MINOR=(\d+)\s+BUILD=(\d+)\s+PATCH=(\d+)/
  const found = versionData.match(re)
  const braveVersionFromChromeFile = `${found[2]}.${found[3]}.${found[4]}`
  if (braveVersionFromChromeFile !== config.braveVersion) {
    console.warn(`Version files do not match!\nsrc/chrome/VERSION: ${braveVersionFromChromeFile}\nbrave-browser package.json version: ${config.braveVersion}`)
    if (config.buildConfig === 'Release') {
      process.exit(1)
    }
  }
}

const build = (buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig
  config.update(options)
  checkVersionsMatch()

  touchOverriddenFiles()
  touchOverriddenVectorIconFiles()
  util.updateBranding()

  util.buildTarget()
}

module.exports = build
