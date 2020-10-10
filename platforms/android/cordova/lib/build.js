/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

var path = require('path');
var fs = require('fs');
var nopt = require('nopt');

var Adb = require('./Adb');

var builders = require('./builders/builders');
var events = require('cordova-common').events;
const execa = require('execa');
var CordovaError = require('cordova-common').CordovaError;
var PackageType = require('./PackageType');

module.exports.parseBuildOptions = parseOpts;
function parseOpts (options, resolvedTarget, projectRoot) {
    options = options || {};
    options.argv = nopt({
        prepenv: Boolean,
        versionCode: String,
        minSdkVersion: String,
        maxSdkVersion: String,
        targetSdkVersion: String,
        gradleArg: [String, Array],
        keystore: path,
        alias: String,
        storePassword: String,
        password: String,
        keystoreType: String,
        packageType: String
    }, {}, options.argv, 0);

    // Android Studio Build method is the default
    var ret = {
        buildType: options.release ? 'release' : 'debug',
        prepEnv: options.argv.prepenv,
        arch: resolvedTarget && resolvedTarget.arch,
        extraArgs: []
    };

    if (options.argv.versionCode) { ret.extraArgs.push('-PcdvVersionCode=' + options.argv.versionCode); }
    if (options.argv.minSdkVersion) { ret.extraArgs.push('-PcdvMinSdkVersion=' + options.argv.minSdkVersion); }
    if (options.argv.maxSdkVersion) { ret.extraArgs.push('-PcdvMaxSdkVersion=' + options.argv.maxSdkVersion); }
    if (options.argv.targetSdkVersion) { ret.extraArgs.push('-PcdvTargetSdkVersion=' + options.argv.targetSdkVersion); }
    if (options.argv.gradleArg) {
        ret.extraArgs = ret.extraArgs.concat(options.argv.gradleArg);
    }

    var packageArgs = {};

    if (options.argv.keystore) { packageArgs.keystore = path.relative(projectRoot, path.resolve(options.argv.keystore)); }

    ['alias', 'storePassword', 'password', 'keystoreType', 'packageType'].forEach(function (flagName) {
        if (options.argv[flagName]) { packageArgs[flagName] = options.argv[flagName]; }
    });

    var buildConfig = options.buildConfig;

    // If some values are not specified as command line arguments - use build config to supplement them.
    // Command line arguments have precedence over build config.
    if (buildConfig) {
        if (!fs.existsSync(buildConfig)) {
            throw new Error('Specified build config file does not exist: ' + buildConfig);
        }
        events.emit('log', 'Reading build config file: ' + path.resolve(buildConfig));
        var buildjson = fs.readFileSync(buildConfig, 'utf8');
        var config = JSON.parse(buildjson.replace(/^\ufeff/, '')); // Remove BOM
        if (config.android && config.android[ret.buildType]) {
            var androidInfo = config.android[ret.buildType];
            if (androidInfo.keystore && !packageArgs.keystore) {
                if (androidInfo.keystore.substr(0, 1) === '~') {
                    androidInfo.keystore = process.env.HOME + androidInfo.keystore.substr(1);
                }
                packageArgs.keystore = path.resolve(path.dirname(buildConfig), androidInfo.keystore);
                events.emit('log', 'Reading the keystore from: ' + packageArgs.keystore);
            }

            ['alias', 'storePassword', 'password', 'keystoreType', 'packageType'].forEach(function (key) {
                packageArgs[key] = packageArgs[key] || androidInfo[key];
            });
        }
    }

    if (packageArgs.keystore && packageArgs.alias) {
        ret.packageInfo = new PackageInfo(packageArgs.keystore, packageArgs.alias, packageArgs.storePassword,
            packageArgs.password, packageArgs.keystoreType);
    }

    if (!ret.packageInfo) {
        // The following loop is to decide whether to print a warning about generating a signed archive
        // We only want to produce a warning if they are using a config property that is related to signing, but
        // missing the required properties for signing. We don't want to produce a warning if they are simply
        // using a build property that isn't related to signing, such as --packageType
        let shouldWarn = false;
        const signingKeys = ['keystore', 'alias', 'storePassword', 'password', 'keystoreType'];

        for (const key in packageArgs) {
            if (!shouldWarn && signingKeys.indexOf(key) > -1) {
                // If we enter this condition, we have a key used for signing a build,
                // but we are missing some required signing properties
                shouldWarn = true;
            }
        }

        if (shouldWarn) {
            events.emit('warn', '\'keystore\' and \'alias\' need to be specified to generate a signed archive.');
        }
    }

    if (packageArgs.packageType) {
        const VALID_PACKAGE_TYPES = [PackageType.APK, PackageType.BUNDLE];
        if (VALID_PACKAGE_TYPES.indexOf(packageArgs.packageType) === -1) {
            events.emit('warn', '"' + packageArgs.packageType + '" is an invalid packageType. Valid values are: ' + VALID_PACKAGE_TYPES.join(', ') + '\nDefaulting packageType to ' + PackageType.APK);
            ret.packageType = PackageType.APK;
        } else {
            ret.packageType = packageArgs.packageType;
        }
    } else {
        ret.packageType = PackageType.APK;
    }

    return ret;
}

/*
 * Builds the project with the specifed options
 * Returns a promise.
 */
module.exports.runClean = function (options) {
    var opts = parseOpts(options, null, this.root);
    var builder = builders.getBuilder();

    return builder.prepEnv(opts).then(function () {
        return builder.clean(opts);
    });
};

/**
 * Builds the project with the specifed options.
 *
 * @param   {BuildOptions}  options      A set of options. See PlatformApi.build
 *   method documentation for reference.
 * @param   {Object}  optResolvedTarget  A deployment target. Used to pass
 *   target architecture from upstream 'run' call. TODO: remove this option in
 *   favor of setting buildOptions.archs field.
 *
 * @return  {Promise<Object>}            Promise, resolved with built packages
 *   information.
 */
module.exports.run = function (options, optResolvedTarget) {
    var opts = parseOpts(options, optResolvedTarget, this.root);
    var builder = builders.getBuilder();

    return builder.prepEnv(opts).then(function () {
        if (opts.prepEnv) {
            events.emit('verbose', 'Build file successfully prepared.');
            return;
        }
        return builder.build(opts).then(function () {
            var paths;
            if (opts.packageType === PackageType.BUNDLE) {
                paths = builder.findOutputBundles(opts.buildType);
                events.emit('log', 'Built the following bundle(s): \n\t' + paths.join('\n\t'));
            } else {
                paths = builder.findOutputApks(opts.buildType, opts.arch);
                events.emit('log', 'Built the following apk(s): \n\t' + paths.join('\n\t'));
            }

            return {
                paths: paths,
                buildType: opts.buildType
            };
        });
    });
};

/*
 * Detects the architecture of a device/emulator
 * Returns "arm" or "x86".
 */
module.exports.detectArchitecture = function (target) {
    function helper () {
        return Adb.shell(target, 'cat /proc/cpuinfo').then(function (output) {
            return /intel/i.exec(output) ? 'x86' : 'arm';
        });
    }
    function timeout (ms, err) {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject(err), ms);
        });
    }
    // It sometimes happens (at least on OS X), that this command will hang forever.
    // To fix it, either unplug & replug device, or restart adb server.
    return Promise.race([
        helper(),
        timeout(5000, new CordovaError(
            'Device communication timed out. Try unplugging & replugging the device.'
        ))
    ]).catch(err => {
        if (/timed out/.exec('' + err)) {
            // adb kill-server doesn't seem to do the trick.
            // Could probably find a x-platform version of killall, but I'm not actually
            // sure that this scenario even happens on non-OSX machines.
            events.emit('verbose', 'adb timed out while detecting device/emulator architecture. Killing adb and trying again.');
            return execa('killall', ['adb']).then(function () {
                return helper().then(null, function () {
                    // The double kill is sadly often necessary, at least on mac.
                    events.emit('warn', 'adb timed out a second time while detecting device/emulator architecture. Killing adb and trying again.');
                    return execa('killall', ['adb']).then(function () {
                        return helper().then(null, function () {
                            return Promise.reject(new CordovaError('adb timed out a third time while detecting device/emulator architecture. Try unplugging & replugging the device.'));
                        });
                    });
                });
            }, function () {
                // For non-killall OS's.
                return Promise.reject(err);
            });
        }
        throw err;
    });
};

module.exports.findBestApkForArchitecture = function (buildResults, arch) {
    var paths = buildResults.apkPaths.filter(function (p) {
        var apkName = path.basename(p);
        if (buildResults.buildType === 'debug') {
            return /-debug/.exec(apkName);
        }
        return !/-debug/.exec(apkName);
    });
    var archPattern = new RegExp('-' + arch);
    var hasArchPattern = /-x86|-arm/;
    for (var i = 0; i < paths.length; ++i) {
        var apkName = path.basename(paths[i]);
        if (hasArchPattern.exec(apkName)) {
            if (archPattern.exec(apkName)) {
                return paths[i];
            }
        } else {
            return paths[i];
        }
    }
    throw new Error('Could not find apk architecture: ' + arch + ' build-type: ' + buildResults.buildType);
};

function PackageInfo (keystore, alias, storePassword, password, keystoreType) {
    const createNameKeyObject = (name, value) => ({ name, value: value.replace(/\\/g, '\\\\') });

    this.data = [
        createNameKeyObject('key.store', keystore),
        createNameKeyObject('key.alias', alias)
    ];

    if (storePassword) this.data.push(createNameKeyObject('key.store.password', storePassword));
    if (password) this.data.push(createNameKeyObject('key.alias.password', password));
    if (keystoreType) this.data.push(createNameKeyObject('key.store.type', keystoreType));
}

PackageInfo.prototype = {
    appendToProperties: function (propertiesParser) {
        for (const { name, value } of this.data) propertiesParser.set(name, value);

        propertiesParser.save();
    }
};

module.exports.help = function () {
    console.log('Usage: ' + path.relative(process.cwd(), path.join('../build')) + ' [flags] [Signed APK flags]');
    console.log('Flags:');
    console.log('    \'--debug\': will build project in debug mode (default)');
    console.log('    \'--release\': will build project for release');
    console.log('    \'--nobuild\': will skip build process (useful when using run command)');
    console.log('    \'--prepenv\': don\'t build, but copy in build scripts where necessary');
    console.log('    \'--versionCode=#\': Override versionCode for this build. Useful for uploading multiple APKs.');
    console.log('    \'--minSdkVersion=#\': Override minSdkVersion for this build.');
    console.log('    \'--maxSdkVersion=#\': Override maxSdkVersion for this build. (Not Recommended)');
    console.log('    \'--targetSdkVersion=#\': Override targetSdkVersion for this build.');
    console.log('    \'--gradleArg=<gradle command line arg>\': Extra args to pass to the gradle command. Use one flag per arg. Ex. --gradleArg=-PcdvBuildMultipleApks=true');
    console.log('    \'--packageType=<apk|bundle>\': Builds an APK or a bundle');
    console.log('');
    console.log('Signed APK flags (overwrites debug/release-signing.proprties) :');
    console.log('    \'--keystore=<path to keystore>\': Key store used to build a signed archive. (Required)');
    console.log('    \'--alias=\': Alias for the key store. (Required)');
    console.log('    \'--storePassword=\': Password for the key store. (Optional - prompted)');
    console.log('    \'--password=\': Password for the key. (Optional - prompted)');
    console.log('    \'--keystoreType\': Type of the keystore. (Optional)');
    process.exit(0);
};
