const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')

const updatePatches = (options) => {
  config.update(options)

  const runOptions = { cwd: config.projects.chrome.dir }
  const patchDir = path.join(config.projects['brave-core'].dir, 'patches')

  console.log('updatePatches writing files to: ' + patchDir)

  // grab Modified (and later Deleted) files but not Created (since we copy those)
  const modifiedDiffArgs = ['diff', '--diff-filter=M', '--name-only', '--ignore-space-at-eol']
  let modifiedDiff = util.run('git', modifiedDiffArgs, runOptions)
  let moddedFileList = modifiedDiff.stdout.toString()
    .split('\n')
    .filter(s => s.length > 0 && !s.startsWith(path.join('chrome', 'app', 'theme')) &&
            !s.endsWith('.xtb') && !s.endsWith('.grd') && !s.endsWith('.grdp') &&
            !s.includes('google_update_idl'))

  let n = moddedFileList.length

  // When splitting one large diff into a per-file diff, there are a few ways
  // you can go about it. Because different files can have the same name
  // (by being located in different directories), you need to avoid collisions.
  // Mirroring the directory structure seems undesirable.
  // Prefixing with numbers works but is O(n) volatile for O(1) additions
  // We choose here to flatten the directory structure by replacing separators
  // In practice this will avoid collisions. Should a pathological case ever
  // appear, you can quickly patch this by changing the separator, even
  // to something longer

  const desiredReplacementSeparator = '-'
  const patchExtension = '.patch'

  for (var i = 0; i < n; i++) {
    const old = moddedFileList[i]
    let revised = old

    //replacing forward slashes
    //since git on Windows doesn't use backslashes, this is sufficient
    revised = revised.replace(/\//g, desiredReplacementSeparator)

    const singleDiffArgs = ['diff', '--src-prefix=a/', '--dst-prefix=b/', '--full-index', old]
    let singleDiff = util.run('git', singleDiffArgs, runOptions)

    const contents = singleDiff.stdout.toString()
    const filename = revised + patchExtension

    fs.writeFileSync(path.join(patchDir, filename), contents)

    console.log('updatePatches wrote ' + (1 + i) + '/' + n + ': ' + filename)
  }
}

module.exports = updatePatches
