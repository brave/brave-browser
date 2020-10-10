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

/**
 * @todo update coho to update this line.
 * @todo use `package.json` instead but first
 *  figure out how this fit in with the platform-centered workflow structure.
 *  This workflow would not have the `package.json` file.
 */
// Coho updates this line
const VERSION = '9.0.0';

var path = require('path');

var AndroidProject = require('./lib/AndroidProject');
var PluginManager = require('cordova-common').PluginManager;

var CordovaLogger = require('cordova-common').CordovaLogger;
var selfEvents = require('cordova-common').events;
var ConfigParser = require('cordova-common').ConfigParser;
const prepare = require('./lib/prepare').prepare;

var PLATFORM = 'android';

function setupEvents (externalEventEmitter) {
    if (externalEventEmitter) {
        // This will make the platform internal events visible outside
        selfEvents.forwardEventsTo(externalEventEmitter);
        return externalEventEmitter;
    }

    // There is no logger if external emitter is not present,
    // so attach a console logger
    CordovaLogger.get().subscribe(selfEvents);
    return selfEvents;
}

/**
 * Class, that acts as abstraction over particular platform. Encapsulates the
 *   platform's properties and methods.
 *
 * Platform that implements own PlatformApi instance _should implement all
 *   prototype methods_ of this class to be fully compatible with cordova-lib.
 *
 * The PlatformApi instance also should define the following field:
 *
 * * platform: String that defines a platform name.
 * @class Api
 */
class Api {
    constructor (platform, platformRootDir, events) {
        this.platform = PLATFORM;
        this.root = path.resolve(__dirname, '..');

        setupEvents(events);

        const appMain = path.join(this.root, 'app', 'src', 'main');
        const appRes = path.join(appMain, 'res');

        this.locations = {
            root: this.root,
            www: path.join(appMain, 'assets', 'www'),
            res: appRes,
            platformWww: path.join(this.root, 'platform_www'),
            configXml: path.join(appRes, 'xml', 'config.xml'),
            defaultConfigXml: path.join(this.root, 'cordova', 'defaults.xml'),
            strings: path.join(appRes, 'values', 'strings.xml'),
            manifest: path.join(appMain, 'AndroidManifest.xml'),
            build: path.join(this.root, 'build'),
            javaSrc: path.join(appMain, 'java')
        };
    }

    /**
     * Gets a CordovaPlatform object, that represents the platform structure.
     *
     * @return  {CordovaPlatform}  A structure that contains the description of
     *   platform's file structure and other properties of platform.
     */
    getPlatformInfo () {
        var result = {};
        result.locations = this.locations;
        result.root = this.root;
        result.name = this.platform;
        result.version = Api.version();
        result.projectConfig = this._config;

        return result;
    }

    /**
     * Updates installed platform with provided www assets and new app
     *   configuration. This method is required for CLI workflow and will be called
     *   each time before build, so the changes, made to app configuration and www
     *   code, will be applied to platform.
     *
     * @param {CordovaProject} cordovaProject A CordovaProject instance, that defines a
     *   project structure and configuration, that should be applied to platform
     *   (contains project's www location and ConfigParser instance for project's
     *   config).
     *
     * @return  {Promise}  Return a promise either fulfilled, or rejected with
     *   CordovaError instance.
     */
    prepare (cordovaProject, prepareOptions) {
        cordovaProject.projectConfig = new ConfigParser(cordovaProject.locations.rootConfigXml || cordovaProject.projectConfig.path);

        return prepare.call(this, cordovaProject, prepareOptions);
    }

    /**
     * Installs a new plugin into platform. This method only copies non-www files
     *   (sources, libs, etc.) to platform. It also doesn't resolves the
     *   dependencies of plugin. Both of handling of www files, such as assets and
     *   js-files and resolving dependencies are the responsibility of caller.
     *
     * @param  {PluginInfo}  plugin  A PluginInfo instance that represents plugin
     *   that will be installed.
     * @param  {Object}  installOptions  An options object. Possible options below:
     * @param  {Boolean}  installOptions.link: Flag that specifies that plugin
     *   sources will be symlinked to app's directory instead of copying (if
     *   possible).
     * @param  {Object}  installOptions.variables  An object that represents
     *   variables that will be used to install plugin. See more details on plugin
     *   variables in documentation:
     *   https://cordova.apache.org/docs/en/4.0.0/plugin_ref_spec.md.html
     *
     * @return  {Promise}  Return a promise either fulfilled, or rejected with
     *   CordovaError instance.
     */
    addPlugin (plugin, installOptions) {
        var project = AndroidProject.getProjectFile(this.root);
        var self = this;

        installOptions = installOptions || {};
        installOptions.variables = installOptions.variables || {};
        // Add PACKAGE_NAME variable into vars
        if (!installOptions.variables.PACKAGE_NAME) {
            installOptions.variables.PACKAGE_NAME = project.getPackageName();
        }

        return Promise.resolve().then(function () {
            return PluginManager.get(self.platform, self.locations, project).addPlugin(plugin, installOptions);
        }).then(function () {
            if (plugin.getFrameworks(this.platform).length === 0) return;
            selfEvents.emit('verbose', 'Updating build files since android plugin contained <framework>');
            // This should pick the correct builder, not just get gradle
            require('./lib/builders/builders').getBuilder().prepBuildFiles();
        }.bind(this))
            // CB-11022 Return truthy value to prevent running prepare after
            .then(() => true);
    }

    /**
     * Removes an installed plugin from platform.
     *
     * Since method accepts PluginInfo instance as input parameter instead of plugin
     *   id, caller shoud take care of managing/storing PluginInfo instances for
     *   future uninstalls.
     *
     * @param  {PluginInfo}  plugin  A PluginInfo instance that represents plugin
     *   that will be installed.
     *
     * @return  {Promise}  Return a promise either fulfilled, or rejected with
     *   CordovaError instance.
     */
    removePlugin (plugin, uninstallOptions) {
        var project = AndroidProject.getProjectFile(this.root);

        if (uninstallOptions && uninstallOptions.usePlatformWww === true) {
            uninstallOptions.usePlatformWww = false;
        }

        return PluginManager.get(this.platform, this.locations, project)
            .removePlugin(plugin, uninstallOptions)
            .then(function () {
                if (plugin.getFrameworks(this.platform).length === 0) return;

                selfEvents.emit('verbose', 'Updating build files since android plugin contained <framework>');
                require('./lib/builders/builders').getBuilder().prepBuildFiles();
            }.bind(this))
            // CB-11022 Return truthy value to prevent running prepare after
            .then(() => true);
    }

    /**
     * Builds an application package for current platform.
     *
     * @param  {Object}  buildOptions  A build options. This object's structure is
     *   highly depends on platform's specific. The most common options are:
     * @param  {Boolean}  buildOptions.debug  Indicates that packages should be
     *   built with debug configuration. This is set to true by default unless the
     *   'release' option is not specified.
     * @param  {Boolean}  buildOptions.release  Indicates that packages should be
     *   built with release configuration. If not set to true, debug configuration
     *   will be used.
     * @param   {Boolean}  buildOptions.device  Specifies that built app is intended
     *   to run on device
     * @param   {Boolean}  buildOptions.emulator: Specifies that built app is
     *   intended to run on emulator
     * @param   {String}  buildOptions.target  Specifies the device id that will be
     *   used to run built application.
     * @param   {Boolean}  buildOptions.nobuild  Indicates that this should be a
     *   dry-run call, so no build artifacts will be produced.
     * @param   {String[]}  buildOptions.archs  Specifies chip architectures which
     *   app packages should be built for. List of valid architectures is depends on
     *   platform.
     * @param   {String}  buildOptions.buildConfig  The path to build configuration
     *   file. The format of this file is depends on platform.
     * @param   {String[]} buildOptions.argv Raw array of command-line arguments,
     *   passed to `build` command. The purpose of this property is to pass a
     *   platform-specific arguments, and eventually let platform define own
     *   arguments processing logic.
     *
     * @return {Promise<Object[]>} A promise either fulfilled with an array of build
     *   artifacts (application packages) if package was built successfully,
     *   or rejected with CordovaError. The resultant build artifact objects is not
     *   strictly typed and may conatin arbitrary set of fields as in sample below.
     *
     *     {
     *         architecture: 'x86',
     *         buildType: 'debug',
     *         path: '/path/to/build',
     *         type: 'app'
     *     }
     *
     * The return value in most cases will contain only one item but in some cases
     *   there could be multiple items in output array, e.g. when multiple
     *   arhcitectures is specified.
     */
    build (buildOptions) {
        var self = this;

        return require('./lib/check_reqs').run().then(function () {
            return require('./lib/build').run.call(self, buildOptions);
        }).then(function (buildResults) {
            // Cast build result to array of build artifacts
            return buildResults.paths.map(function (apkPath) {
                return {
                    buildType: buildResults.buildType,
                    buildMethod: buildResults.buildMethod,
                    path: apkPath,
                    type: path.extname(apkPath).replace(/\./g, '')
                };
            });
        });
    }

    /**
     * Builds an application package for current platform and runs it on
     *   specified/default device. If no 'device'/'emulator'/'target' options are
     *   specified, then tries to run app on default device if connected, otherwise
     *   runs the app on emulator.
     *
     * @param   {Object}  runOptions  An options object. The structure is the same
     *   as for build options.
     *
     * @return {Promise} A promise either fulfilled if package was built and ran
     *   successfully, or rejected with CordovaError.
     */
    run (runOptions) {
        var self = this;
        return require('./lib/check_reqs').run().then(function () {
            return require('./lib/run').run.call(self, runOptions);
        });
    }

    /**
     * Cleans out the build artifacts from platform's directory, and also
     * cleans out the platform www directory if called without options specified.
     *
     * @return  {Promise}  Return a promise either fulfilled, or rejected with
     *   CordovaError.
     */
    clean (cleanOptions) {
        var self = this;
        // This will lint, checking for null won't
        if (typeof cleanOptions === 'undefined') {
            cleanOptions = {};
        }

        return require('./lib/check_reqs').run().then(function () {
            return require('./lib/build').runClean.call(self, cleanOptions);
        }).then(function () {
            return require('./lib/prepare').clean.call(self, cleanOptions);
        });
    }

    /**
     * Performs a requirements check for current platform. Each platform defines its
     *   own set of requirements, which should be resolved before platform can be
     *   built successfully.
     *
     * @return  {Promise<Requirement[]>}  Promise, resolved with set of Requirement
     *   objects for current platform.
     */
    requirements () {
        return require('./lib/check_reqs').check_all();
    }

    /**
     * Installs platform to specified directory and creates a platform project.
     *
     * @param  {String}  destination Destination directory, where insatll platform to
     * @param  {ConfigParser}  [config] ConfgiParser instance, used to retrieve
     *   project creation options, such as package id and project name.
     * @param  {Object}  [options]  An options object. The most common options are:
     * @param  {String}  [options.customTemplate]  A path to custom template, that
     *   should override the default one from platform.
     * @param  {Boolean}  [options.link]  Flag that indicates that platform's
     *   sources will be linked to installed platform instead of copying.
     * @param {EventEmitter} [events] An EventEmitter instance that will be used for
     *   logging purposes. If no EventEmitter provided, all events will be logged to
     *   console
     *
     * @return {Promise<PlatformApi>} Promise either fulfilled with PlatformApi
     *   instance or rejected with CordovaError.
     */
    static createPlatform (destination, config, options, events) {
        events = setupEvents(events);
        var result;
        try {
            result = require('../../lib/create').create(destination, config, options, events).then(function (destination) {
                return new Api(PLATFORM, destination, events);
            });
        } catch (e) {
            events.emit('error', 'createPlatform is not callable from the android project API.');
            throw (e);
        }
        return result;
    }

    /**
     * Updates already installed platform.
     *
     * @param  {String}  destination Destination directory, where platform installed
     * @param  {Object}  [options]  An options object. The most common options are:
     * @param  {String}  [options.customTemplate]  A path to custom template, that
     *   should override the default one from platform.
     * @param  {Boolean}  [options.link]  Flag that indicates that platform's
     *   sources will be linked to installed platform instead of copying.
     * @param {EventEmitter} [events] An EventEmitter instance that will be used for
     *   logging purposes. If no EventEmitter provided, all events will be logged to
     *   console
     *
     * @return {Promise<PlatformApi>} Promise either fulfilled with PlatformApi
     *   instance or rejected with CordovaError.
     */
    static updatePlatform (destination, options, events) {
        events = setupEvents(events);
        var result;
        try {
            result = require('../../lib/create').update(destination, options, events).then(function (destination) {
                return new Api(PLATFORM, destination, events);
            });
        } catch (e) {
            events.emit('error', 'updatePlatform is not callable from the android project API, you will need to do this manually.');
            throw (e);
        }
        return result;
    }

    static version () {
        return VERSION;
    }
}

module.exports = Api;
