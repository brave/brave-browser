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
var emulator = require('./emulator');
var device = require('./device');
var PackageType = require('./PackageType');
const { CordovaError, events } = require('cordova-common');

function getInstallTarget (runOptions) {
    var install_target;
    if (runOptions.target) {
        install_target = runOptions.target;
    } else if (runOptions.device) {
        install_target = '--device';
    } else if (runOptions.emulator) {
        install_target = '--emulator';
    }

    return install_target;
}

/**
 * Runs the application on a device if available. If no device is found, it will
 *   use a started emulator. If no started emulators are found it will attempt
 *   to start an avd. If no avds are found it will error out.
 *
 * @param   {Object}  runOptions  various run/build options. See Api.js build/run
 *   methods for reference.
 *
 * @return  {Promise}
 */
module.exports.run = function (runOptions) {
    runOptions = runOptions || {};

    var self = this;
    var install_target = getInstallTarget(runOptions);

    return Promise.resolve().then(function () {
        if (!install_target) {
            // no target given, deploy to device if available, otherwise use the emulator.
            return device.list().then(function (device_list) {
                if (device_list.length > 0) {
                    events.emit('warn', 'No target specified, deploying to device \'' + device_list[0] + '\'.');
                    install_target = device_list[0];
                } else {
                    events.emit('warn', 'No target specified and no devices found, deploying to emulator');
                    install_target = '--emulator';
                }
            });
        }
    }).then(function () {
        if (install_target === '--device') {
            return device.resolveTarget(null);
        } else if (install_target === '--emulator') {
            // Give preference to any already started emulators. Else, start one.
            return emulator.list_started().then(function (started) {
                return started && started.length > 0 ? started[0] : emulator.start();
            }).then(function (emulatorId) {
                return emulator.resolveTarget(emulatorId);
            });
        }
        // They specified a specific device/emulator ID.
        return device.list().then(function (devices) {
            if (devices.indexOf(install_target) > -1) {
                return device.resolveTarget(install_target);
            }
            return emulator.list_started().then(function (started_emulators) {
                if (started_emulators.indexOf(install_target) > -1) {
                    return emulator.resolveTarget(install_target);
                }
                return emulator.list_images().then(function (avds) {
                    // if target emulator isn't started, then start it.
                    for (var avd in avds) {
                        if (avds[avd].name === install_target) {
                            return emulator.start(install_target).then(function (emulatorId) {
                                return emulator.resolveTarget(emulatorId);
                            });
                        }
                    }
                    return Promise.reject(new CordovaError(`Target '${install_target}' not found, unable to run project`));
                });
            });
        });
    }).then(function (resolvedTarget) {
        return new Promise((resolve) => {
            const builder = require('./builders/builders').getBuilder();
            const buildOptions = require('./build').parseBuildOptions(runOptions, null, self.root);

            // Android app bundles cannot be deployed directly to the device
            if (buildOptions.packageType === PackageType.BUNDLE) {
                const packageTypeErrorMessage = 'Package type "bundle" is not supported during cordova run.';
                events.emit('error', packageTypeErrorMessage);
                throw packageTypeErrorMessage;
            }

            resolve(builder.fetchBuildResults(buildOptions.buildType, buildOptions.arch));
        }).then(function (buildResults) {
            if (resolvedTarget && resolvedTarget.isEmulator) {
                return emulator.wait_for_boot(resolvedTarget.target).then(function () {
                    return emulator.install(resolvedTarget, buildResults);
                });
            }

            return device.install(resolvedTarget, buildResults);
        });
    });
};

module.exports.help = function () {
    console.log('Usage: ' + path.relative(process.cwd(), process.argv[1]) + ' [options]');
    console.log('Build options :');
    console.log('    --debug : Builds project in debug mode');
    console.log('    --release : Builds project in release mode');
    console.log('    --nobuild : Runs the currently built project without recompiling');
    console.log('Deploy options :');
    console.log('    --device : Will deploy the built project to a device');
    console.log('    --emulator : Will deploy the built project to an emulator if one exists');
    console.log('    --target=<target_id> : Installs to the target with the specified id.');
    process.exit(0);
};
