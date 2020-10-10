/**
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

var os = require('os');
var execa = require('execa');
var events = require('cordova-common').events;
var CordovaError = require('cordova-common').CordovaError;

var Adb = {};

function isDevice (line) {
    return line.match(/\w+\tdevice/) && !line.match(/emulator/);
}

function isEmulator (line) {
    return line.match(/device/) && line.match(/emulator/);
}

/**
 * Lists available/connected devices and emulators
 *
 * @param   {Object}   opts            Various options
 * @param   {Boolean}  opts.emulators  Specifies whether this method returns
 *   emulators only
 *
 * @return  {Promise<String[]>}        list of available/connected
 *   devices/emulators
 */
Adb.devices = function (opts) {
    return execa('adb', ['devices'], { cwd: os.tmpdir() }).then(({ stdout: output }) => {
        return output.split('\n').filter(function (line) {
            // Filter out either real devices or emulators, depending on options
            return (line && opts && opts.emulators) ? isEmulator(line) : isDevice(line);
        }).map(function (line) {
            return line.replace(/\tdevice/, '').replace('\r', '');
        });
    });
};

Adb.install = function (target, packagePath, opts) {
    events.emit('verbose', 'Installing apk ' + packagePath + ' on target ' + target + '...');
    var args = ['-s', target, 'install'];
    if (opts && opts.replace) args.push('-r');
    return execa('adb', args.concat(packagePath), { cwd: os.tmpdir() }).then(({ stdout: output }) => {
        // 'adb install' seems to always returns no error, even if installation fails
        // so we catching output to detect installation failure
        if (output.match(/Failure/)) {
            if (output.match(/INSTALL_PARSE_FAILED_NO_CERTIFICATES/)) {
                output += '\n\n' + 'Sign the build using \'-- --keystore\' or \'--buildConfig\'' +
                    ' or sign and deploy the unsigned apk manually using Android tools.';
            } else if (output.match(/INSTALL_FAILED_VERSION_DOWNGRADE/)) {
                output += '\n\n' + 'You\'re trying to install apk with a lower versionCode that is already installed.' +
                    '\nEither uninstall an app or increment the versionCode.';
            }

            return Promise.reject(new CordovaError('Failed to install apk to device: ' + output));
        }
    });
};

Adb.uninstall = function (target, packageId) {
    events.emit('verbose', 'Uninstalling package ' + packageId + ' from target ' + target + '...');
    return execa('adb', ['-s', target, 'uninstall', packageId], { cwd: os.tmpdir() }).then(({ stdout }) => stdout);
};

Adb.shell = function (target, shellCommand) {
    events.emit('verbose', 'Running adb shell command "' + shellCommand + '" on target ' + target + '...');
    var args = ['-s', target, 'shell'];
    shellCommand = shellCommand.split(/\s+/);
    return execa('adb', args.concat(shellCommand), { cwd: os.tmpdir() })
        .then(({ stdout }) => stdout)
        .catch(error => Promise.reject(new CordovaError(`Failed to execute shell command "${shellCommand}" on device: ${error}`)));
};

Adb.start = function (target, activityName) {
    events.emit('verbose', 'Starting application "' + activityName + '" on target ' + target + '...');
    return Adb.shell(target, 'am start -W -a android.intent.action.MAIN -n' + activityName).catch((error) => {
        return Promise.reject(new CordovaError('Failed to start application "' +
            activityName + '"" on device: ' + error));
    });
};

module.exports = Adb;
