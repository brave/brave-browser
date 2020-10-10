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

const execa = require('execa');
var build = require('./build');
var path = require('path');
var Adb = require('./Adb');
var AndroidManifest = require('./AndroidManifest');
var CordovaError = require('cordova-common').CordovaError;
var events = require('cordova-common').events;

/**
 * Returns a promise for the list of the device ID's found
 * @param lookHarder When true, try restarting adb if no devices are found.
 */
module.exports.list = function (lookHarder) {
    return Adb.devices().then(function (list) {
        if (list.length === 0 && lookHarder) {
            // adb kill-server doesn't seem to do the trick.
            // Could probably find a x-platform version of killall, but I'm not actually
            // sure that this scenario even happens on non-OSX machines.
            return execa('killall', ['adb']).then(function () {
                events.emit('verbose', 'Restarting adb to see if more devices are detected.');
                return Adb.devices();
            }, function () {
                // For non-killall OS's.
                return list;
            });
        }
        return list;
    });
};

module.exports.resolveTarget = function (target) {
    return this.list(true).then(function (device_list) {
        if (!device_list || !device_list.length) {
            return Promise.reject(new CordovaError('Failed to deploy to device, no devices found.'));
        }
        // default device
        target = target || device_list[0];

        if (device_list.indexOf(target) < 0) {
            return Promise.reject(new CordovaError('ERROR: Unable to find target \'' + target + '\'.'));
        }

        return build.detectArchitecture(target).then(function (arch) {
            return { target: target, arch: arch, isEmulator: false };
        });
    });
};

/*
 * Installs a previously built application on the device
 * and launches it.
 * Returns a promise.
 */
module.exports.install = function (target, buildResults) {
    return Promise.resolve().then(function () {
        if (target && typeof target === 'object') {
            return target;
        }
        return module.exports.resolveTarget(target);
    }).then(function (resolvedTarget) {
        var apk_path = build.findBestApkForArchitecture(buildResults, resolvedTarget.arch);
        var manifest = new AndroidManifest(path.join(__dirname, '../../app/src/main/AndroidManifest.xml'));
        var pkgName = manifest.getPackageId();
        var launchName = pkgName + '/.' + manifest.getActivity().getName();
        events.emit('log', 'Using apk: ' + apk_path);
        events.emit('log', 'Package name: ' + pkgName);

        return Adb.install(resolvedTarget.target, apk_path, { replace: true }).catch(function (error) {
            // CB-9557 CB-10157 only uninstall and reinstall app if the one that
            // is already installed on device was signed w/different certificate
            if (!/INSTALL_PARSE_FAILED_INCONSISTENT_CERTIFICATES/.test(error.toString())) { throw error; }

            events.emit('warn', 'Uninstalling app from device and reinstalling it again because the ' +
                'installed app already signed with different key');

            // This promise is always resolved, even if 'adb uninstall' fails to uninstall app
            // or the app doesn't installed at all, so no error catching needed.
            return Adb.uninstall(resolvedTarget.target, pkgName).then(function () {
                return Adb.install(resolvedTarget.target, apk_path, { replace: true });
            });
        }).then(function () {
            // unlock screen
            return Adb.shell(resolvedTarget.target, 'input keyevent 82');
        }).then(function () {
            return Adb.start(resolvedTarget.target, launchName);
        }).then(function () {
            events.emit('log', 'LAUNCH SUCCESS');
        });
    });
};
