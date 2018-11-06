const path = require('path')
const fs = require('fs-extra')
const config = require('../lib/config')
const util = require('../lib/util')

const updatePatches = (options) => {
  config.update(options)

  const patchDir = path.join(config.projects['brave-core'].dir, 'patches')

  const runOptionsChrome = { cwd: config.projects.chrome.dir }
  const runOptionsPatch = { cwd: patchDir }

  const desiredReplacementSeparator = '-'
  const patchExtension = '.patch'

  console.log('updatePatches writing files to: ' + patchDir)

  // grab Modified (and later Deleted) files but not Created (since we copy those)
  const modifiedDiffArgs = ['diff', '--diff-filter=M', '--name-only', '--ignore-space-at-eol']
  const modifiedDiff = util.run('git', modifiedDiffArgs, runOptionsChrome)
  const modifiedFileList = modifiedDiff.stdout.toString()
    .split('\n')
    .filter(s => s.length > 0 &&
            !s.startsWith('chrome/app/theme/default') &&
            !s.startsWith('chrome/app/theme/brave') &&
            !s.startsWith('chrome/app/theme/chromium') &&
            !s.endsWith('.png') && !s.endsWith('.xtb') &&
            !s.endsWith('.grd') && !s.endsWith('.grdp') &&
            !s.includes('google_update_idl'))

  // copy array
  let substitutedFileList = modifiedFileList.slice()

  // replacing forward slashes and adding the patch extension to get nice filenames
  // since git on Windows doesn't use backslashes, this is sufficient
  substitutedFileList = substitutedFileList.map(s => s.replace(/\//g, desiredReplacementSeparator) + patchExtension)

  // grab every existing patch file in the dir (at this point, patchfiles for now-unmodified files live on)
  const existingFileArgs = ['ls-files', '--exclude-standard']
  let existingFileOutput = util.run('git', existingFileArgs, runOptionsPatch)
  let existingFileList = existingFileOutput.stdout.toString().split('\n').filter(s => s.length > 0)

  // Add files here we specifically want to keep around regardless
  const exclusionList = []

  // Subtract to find which patchfiles no longer have diffs, yet still exist
  const minuhend = existingFileList
  const subtrahend = substitutedFileList.concat(exclusionList)
  const difference = minuhend.filter(x => !subtrahend.includes(x))

  const cruftList = difference

  // When splitting one large diff into a per-file diff, there are a few ways
  // you can go about it. Because different files can have the same name
  // (by being located in different directories), you need to avoid collisions.
  // Mirroring the directory structure seems undesirable.
  // Prefixing with numbers works but is O(n) volatile for O(1) additions
  // We choose here to flatten the directory structure by replacing separators
  // In practice this will avoid collisions. Should a pathological case ever
  // appear, you can quickly patch this by changing the separator, even
  // to something longer

  let n = modifiedFileList.length

  for (let i = 0; i < n; i++) {
    const old = modifiedFileList[i]
    const revised = substitutedFileList[i]

    const singleDiffArgs = ['diff', '--src-prefix=a/', '--dst-prefix=b/', '--full-index', old]
    let singleDiff = util.run('git', singleDiffArgs, runOptionsChrome)

    const contents = singleDiff.stdout.toString()
    const filename = revised

    fs.writeFileSync(path.join(patchDir, filename), contents)

    console.log('updatePatches wrote ' + (1 + i) + '/' + n + ': ' + filename)
  }

  // regular rm patchfiles whose target is no longer modified
  let m = cruftList.length
  for (let i = 0; i < m; i++) {
    let filename = cruftList[i]
    let fullpath = path.join(patchDir, filename)

    fs.removeSync(fullpath)

    console.log('updatePatches *REMOVED* ' + (1 + i) + '/' + m + ': ' + filename)
  }
}

module.exports = updatePatches
