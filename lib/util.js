const path = require('path')
const { spawn, spawnSync } = require('child_process')
const config = require('./config')
const fs = require('fs-extra')
const crypto = require('crypto')
const os = require('os')

const fixPywin32 = (options = {}) => {
  if (process.platform !== 'win32') {
    return
  }
  console.log("Manually installing pywin32 python module")
  util.run('python', ['-m', 'pip', 'install', 'pywin32'], options)
}

const runGClient = (args, options = {}) => {
  if (config.gClientVerbose) args.push('--verbose')
  options.cwd = options.cwd || config.rootDir
  options = mergeWithDefault(options)
  options.env.GCLIENT_FILE = config.gClientFile
  util.run('gclient', args, options)
  fixPywin32(options)
}

const mergeWithDefault = (options) => {
  return Object.assign({}, config.defaultOptions, options)
}

const util = {
  run: (cmd, args = [], options = {}) => {
    console.log(options.cwd + ':', cmd, args.join(' '))
    const continueOnFail = options.continueOnFail
    delete options.continueOnFail

    const prog = spawnSync(cmd, args, options)
    if (prog.status !== 0) {
      if (!continueOnFail) {
        console.log(prog.stdout && prog.stdout.toString())
        console.error(prog.stderr && prog.stderr.toString())
        process.exit(1)
      }
    }
    return prog
  },

  runAsync: (cmd, args = [], options = {}) => {
    let { continueOnFail, verbose, ...cmdOptions } = options
    if (verbose) {
      console.log(cmd, args.join(' '))
    }
    return new Promise((resolve, reject) => {
      const prog = spawn(cmd, args, cmdOptions)
      let stderr = ''
      let stdout = ''
      prog.stderr.on('data', data => {
        stderr += data
      })
      prog.stdout.on('data', data => {
        stdout += data
      })
      prog.on('close', statusCode => {
        const hasFailed = statusCode !== 0
        if (verbose && (!hasFailed || continueOnFail)) {
          console.log(stdout)
          if (stderr) {
            console.error(stderr)
          }
        }
        if (hasFailed) {
          const err = new Error(`Program ${cmd} exited with error code ${statusCode}.`)
          err.stderr = stderr
          err.stdout = stdout
          reject(err)
          if (!continueOnFail) {
            console.log(err.message)
            console.log(stdout)
            console.error(stderr)
            process.exit(1)
          }
          return
        }
        resolve(stdout)
      })
    })
  },

  runGitAsync: function (repoPath, gitArgs, verbose = false, logError = false) {
    return util.runAsync('git', gitArgs, { cwd: repoPath, verbose, continueOnFail: true })
      .catch(err => {
        if (logError) {
          console.error(err.message)
          console.error(`Git arguments were: ${gitArgs.join(' ')}`)
          console.log(err.stdout)
          console.error(err.stderr)
        }
        return Promise.reject(err)
      })
  },

  buildGClientConfig: () => {
    function replacer(key, value) {
      return value;
    }

    let solutions = config.projectNames.filter((projectName) => config.projects[projectName].ref).map((projectName) => {
      let project = config.projects[projectName]
      return {
        managed: "%False%",
        name: project.gclientName,
        url: project.url,
        custom_deps: project.custom_deps
      }
    })

    let cache_dir = process.env.GIT_CACHE_PATH ? ('\ncache_dir = "' + process.env.GIT_CACHE_PATH + '"\n') : '\n'

    let out = 'solutions = ' + JSON.stringify(solutions, replacer, 2)
      .replace(/"%None%"/g, "None").replace(/"%False%"/g, "False") + cache_dir

    if (config.targetOS === 'android') {
      out = out + "target_os = [ 'android' ]"
    } else if (config.targetOS === 'ios') {
      out = out + "target_os = [ 'ios' ]"
    }

    fs.writeFileSync(config.defaultGClientFile, out)
  },

  calculateFileChecksum: (filename) => {
    // adapted from https://github.com/roryrjb/md5-file
    const BUFFER_SIZE = 8192
    const fd = fs.openSync(filename, 'r')
    const buffer = Buffer.alloc(BUFFER_SIZE)
    const md5 = crypto.createHash('md5')

    try {
      let bytesRead
      do {
        bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE)
        md5.update(buffer.slice(0, bytesRead))
      } while (bytesRead === BUFFER_SIZE)
    } finally {
      fs.closeSync(fd)
    }

    return md5.digest('hex')
  },

  // Chromium compares pre-installed midl files and generated midl files from IDL during the build to check integrity.
  // Generated files during the build time and upstream pre-installed files are different because we use different IDL file.
  // So, we should copy our pre-installed files to overwrite upstream pre-installed files.
  // After checking, pre-installed files are copied to gen dir and they are used to compile.
  // So, this copying in every build doesn't affect compile performance.
  updateOmahaMidlFiles: () => {
    console.log('update omaha midl files...')
    const srcDir = path.join(config.projects['brave-core'].dir, 'win_build_output', 'midl', 'google_update')
    const dstDir = path.join(config.srcDir, 'third_party', 'win_build_output', 'midl', 'google_update')
    fs.copySync(srcDir, dstDir)
  },

  // To build w/o much modification of upstream file, bundling mode is used. To build with this mode,
  // widevine header file and cdm lib is needed. So, we use fake cdm lib. It only used by gn checking.
  // Real cdm lib is only donwloaded and installed when user accepts via content settings bubble
  // because we don't ship cdm lib by default.
  // Latest version and download url are inserted to cdm header file and brave-core refers it.
  prepareWidevineCdmBuild: () => {
    const widevineDir = path.join(config.srcDir, 'third_party', 'widevine', 'cdm', 'linux', 'x64')
    fs.ensureDirSync(widevineDir)

    const widevineConfig = {
      widevineDir,
      headerFileContent: '',
      configuredVersion: config.widevineVersion,
      widevineCdmHeaderFilePath: path.join(widevineDir, 'widevine_cdm_version.h'),
      fakeWidevineCdmLibFilePath: path.join(widevineDir, 'libwidevinecdm.so'),
      fakeManifestJson: path.join(widevineDir, 'manifest.json')
    }

    widevineConfig.headerFileContent =
`#ifndef WIDEVINE_CDM_VERSION_H_
#define WIDEVINE_CDM_VERSION_H_
#define WIDEVINE_CDM_VERSION_STRING \"${widevineConfig.configuredVersion}\"
#define WIDEVINE_CDM_DOWNLOAD_URL_STRING \"https://redirector.gvt1.com/edgedl/widevine-cdm/${widevineConfig.configuredVersion}-linux-x64.zip\"
#endif  // WIDEVINE_CDM_VERSION_H_`

    // If version file or fake lib file aren't existed, create them.
    if (!fs.existsSync(widevineConfig.widevineCdmHeaderFilePath) ||
        !fs.existsSync(widevineConfig.fakeWidevineCdmLibFilePath) ||
        !fs.existsSync(widevineConfig.fakeManifestJson)) {
      util.doPrepareWidevineCdmBuild(widevineConfig)
      return
    }

    // Check version file has latest version. If not create it.
    // This can prevent unnecessary build by touched version file.
    const installedHeaderFileContent = fs.readFileSync(widevineConfig.widevineCdmHeaderFilePath, 'utf8')
    if (installedHeaderFileContent !== widevineConfig.headerFileContent) {
      console.log("Current version file includes different version with latest")
      util.doPrepareWidevineCdmBuild(widevineConfig)
    }
  },

  doPrepareWidevineCdmBuild: (widevineConfig) => {
    console.log('prepare widevine cdm build in linux')

    fs.writeFileSync(widevineConfig.widevineCdmHeaderFilePath, widevineConfig.headerFileContent)
    fs.writeFileSync(widevineConfig.fakeWidevineCdmLibFilePath, '')
    fs.writeFileSync(widevineConfig.fakeManifestJson, '{}')

    // During the create_dist, /usr/lib/rpm/elfdeps requires that binaries have an exectuable bit set.
    fs.chmodSync(widevineConfig.fakeWidevineCdmLibFilePath, 0o755)
  },

  signApp: (options = config.defaultOptions) => {
    console.log('signing ...')
    if (process.platform === 'win32') {
      // Sign binaries used for widevine sig file generation.
      // Other binaries will be done during the create_dist.
      // Then, both are merged when archive for installer is created.
      util.signWinBinaries()
    } else {
      util.run('ninja', ['-C', config.outputDir, config.signTarget], options)
    }
  },

  // TODO(bridiver) - this should move to gn and windows should call signApp like other platforms
  signWinBinaries: () => {
    // Copy & sign only binaries for widevine sig file generation.
    // With this, create_dist doesn't trigger rebuild because original binaries is not modified.
    const dir = path.join(config.outputDir, 'signed_binaries')
    if (!fs.existsSync(dir))
      fs.mkdirSync(dir);

    fs.copySync(path.join(config.outputDir, 'brave.exe'), path.join(dir, 'brave.exe'));
    fs.copySync(path.join(config.outputDir, 'chrome.dll'), path.join(dir, 'chrome.dll'));
    fs.copySync(path.join(config.outputDir, 'chrome_child.dll'), path.join(dir, 'chrome_child.dll'));

     const core_dir = config.projects['brave-core'].dir
    util.run('python', [path.join(core_dir, 'script', 'sign_binaries.py'), '--build_dir=' + dir])
  },

  generateWidevineSigFiles: () => {
    if (process.platform !== 'win32')
      return

    const cert = config.sign_widevine_cert
    const key = config.sign_widevine_key
    const passwd = config.sign_widevine_passwd
    const sig_generator = config.signature_generator
    let src_dir = path.join(config.outputDir, 'signed_binaries')

    if (config.skip_signing || process.env.CERT === undefined || process.env.SIGNTOOL_ARGS === undefined)
      src_dir = config.outputDir

    console.log('generate Widevine sig files...')

    util.run('python', [sig_generator, '--input_file=' + path.join(src_dir, 'brave.exe'),
        '--flags=1',
        '--certificate=' + cert,
        '--private_key=' + key,
        '--output_file=' + path.join(config.outputDir, 'brave.exe.sig'),
        '--private_key_passphrase=' + passwd])
    util.run('python', [sig_generator, '--input_file=' + path.join(src_dir, 'chrome.dll'),
        '--flags=0',
        '--certificate=' + cert,
        '--private_key=' + key,
        '--output_file=' + path.join(config.outputDir, 'chrome.dll.sig'),
        '--private_key_passphrase=' + passwd])
    util.run('python', [sig_generator, '--input_file=' + path.join(src_dir, 'chrome_child.dll'),
        '--flags=0',
        '--certificate=' + cert,
        '--private_key=' + key,
        '--output_file=' + path.join(config.outputDir, 'chrome_child.dll.sig'),
        '--private_key_passphrase=' + passwd])
  },

  buildTarget: (options = config.defaultOptions) => {
    console.log('building ' + config.buildTarget + '...')

    if (process.platform === 'win32') util.updateOmahaMidlFiles()
    if (process.platform === 'linux') util.prepareWidevineCdmBuild()

    let num_compile_failure = 1
    if (config.ignore_compile_failure)
      num_compile_failure = 0

    const args = util.buildArgsToString(config.buildArgs())
    util.run('gn', ['gen', config.outputDir, '--args="' + args + '"'], options)

    let ninjaOpts = [
      '-C', config.outputDir, config.buildTarget,
      '-k', num_compile_failure,
      ...config.extraNinjaOpts
    ]
    util.run('ninja', ninjaOpts, options)
  },

  generateXcodeWorkspace: (options = config.defaultOptions) => {
    console.log('generating Xcode workspace for "' + config.xcode_gen_target + '"...')

    const args = util.buildArgsToString(config.buildArgs())
    const genScript = path.join(config.rootDir, 'vendor', 'gn-project-generators', 'xcode.py')

    const genArgs = [
      'gen', config.outputDir + "_Xcode",
      '--args="' + args + '"',
      '--ide=json',
      '--json-ide-script="' + genScript + '"',
      '--filters="' + config.xcode_gen_target + '"'
    ]

    util.run('gn', genArgs, options)
  },

  lint: (options = {}) => {
    if (!options.base) {
      options.base = 'origin/master';
    }
    let cmd_options = config.defaultOptions
    cmd_options.cwd = config.projects['brave-core'].dir
    util.run('vpython', [path.join(config.rootDir, 'scripts', 'lint.py'),
        '--project_root=' + config.srcDir,
        '--base_branch=' + options.base], cmd_options)
  },

  fixDepotTools: (options = {}) => {
    if (process.platform !== 'win32') {
      util.run('git', ['-C', config.depotToolsDir, 'clean', '-fxd'], options)
      util.run('git', ['-C', config.depotToolsDir, 'reset', '--hard', 'HEAD'], options)
      return
    }
    // On Windows:
    // When depot_tools are already installed they redirect git to their own
    // version which resides in a bootstrap-*_bin directory. So when we try to
    // do git clean -fxd we fail because the git executable is in use in that
    // directory. Get around that by using regular git.
    let git_exes = util.run('where', ['git'], {shell: true})
    let git_exe = '"' + git_exes.stdout.toString().split(os.EOL)[0] + '"'
    if (git_exe === '""') git_exe = 'git'
    util.run(git_exe, ['-C', config.depotToolsDir, 'clean', '-fxd'], options)
    util.run(git_exe, ['-C', config.depotToolsDir, 'reset', '--hard', 'HEAD'], options)

    // Get around the error in updating depot_tools on windows due to pylint.bat
    // file transitioning from untracked to a committed file. When
    // update_depot_tools script tries to use git rebase it errors out. This is
    // already fixed upstream, but we need a workaround for
    // now. See https://bugs.chromium.org/p/chromium/issues/detail?id=996359
    // The commit id in git merge-base command below is when pylint.bat was
    // added to git.
    let cmd_options = Object.assign({}, options)
    cmd_options.continueOnFail = true
    let is_fixed = util.run('git',
      ['-C', config.depotToolsDir, 'merge-base', '--is-ancestor', '53297790de09e48c91678367b48528afbc9f71c1', 'HEAD'], cmd_options)
    // If merge-base succeeds the exit code is 0.
    if (!is_fixed.status) return
    console.log("Manually updating depot_tools as a workaround for https://crbug.com/996359")
    util.run('git', ['-C', config.depotToolsDir, 'fetch', 'origin'], options)
    util.run('git', ['-C', config.depotToolsDir, 'checkout', 'origin/master'], options)
    util.run('git', ['-C', config.depotToolsDir, 'reset', '--hard', 'origin/master'], options)
  },

  submoduleSync: (options = {}) => {
    if (!options.cwd) options.cwd = config.rootDir // default cwd `./src` may not exist yet
    options = mergeWithDefault(options)
    util.run('git', ['submodule', 'sync'], options)
    util.run('git', ['submodule', 'update', '--init', '--recursive'], options)
    util.fixDepotTools(options)
  },

  gclientSync: (reset = false, options = {}) => {
    let args = ['sync', '--force', '--nohooks', '--with_branch_heads', '--with_tags']
    if (reset)
      args.push('--upstream')
    runGClient(args, options)
  },

  gclientRunhooks: (options = {}) => {
    runGClient(['runhooks'], options)
  },

  fetch: (gitRepoPath) => {
    return util.runGitAsync(gitRepoPath, ['fetch', '--all', '--tags'])
  },

  setGitVersion: async (gitRepoPath, version, alwaysReset = false) => {
    await util.runGitAsync(gitRepoPath, ['clean', '-f'])
    let shouldReset = alwaysReset
    if (!shouldReset) {
      const headSHA = await util.runGitAsync(gitRepoPath, ['rev-parse', 'HEAD'])
      const targetSHA = await util.runGitAsync(gitRepoPath, ['rev-parse', version])
      shouldReset = (headSHA !== targetSHA)
    }
    if (shouldReset) {
      await util.runGitAsync(gitRepoPath, ['reset', '--hard', version])
    }
    return shouldReset
  },

  buildArgsToString: (buildArgs) => {
    let args = ''
    for (let arg in buildArgs) {
      let val = buildArgs[arg]
      if (typeof val === 'string') {
        val = '"' + val + '"'
      } else {
        val = JSON.stringify(val)
      }
      args += arg + '=' + val + ' '
    }
    return args.replace(/"/g,'\\"')
  },

  walkSync: (dir, filter = null, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        filelist = util.walkSync(path.join(dir, file), filter, filelist)
      } else if (!filter || filter.call(null, file)) {
        filelist = filelist.concat(path.join(dir, file))
      }
    })
    return filelist
  }
}

module.exports = util
