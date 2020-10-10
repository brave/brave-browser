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

const fs = require('fs');
const path = require('path');
const propertiesParser = require('properties-parser');
const events = require('cordova-common').events;

class GradlePropertiesParser {
    /**
    * Loads and Edits Gradle Properties File.
    *
    * @param {String} platformDir is the path of the Android platform directory
    */
    constructor (platformDir) {
        this._defaults = {
            // 10 seconds -> 6 seconds
            'org.gradle.daemon': 'true',

            // to allow dex in process
            'org.gradle.jvmargs': '-Xmx2048m',

            // Android X
            'android.useAndroidX': 'false',
            'android.enableJetifier': 'false'

            // Shaves another 100ms, but produces a "try at own risk" warning. Not worth it (yet):
            // 'org.gradle.parallel': 'true'
        };

        this.gradleFilePath = path.join(platformDir, 'gradle.properties');
    }

    configure (userConfigs) {
        events.emit('verbose', '[Gradle Properties] Preparing Configuration');

        this._initializeEditor();

        events.emit('verbose', '[Gradle Properties] Appending default configuration properties');
        this._configureProperties(this._defaults);

        events.emit('verbose', '[Gradle Properties] Appending custom configuration properties');
        this._configureProperties(userConfigs);

        this._save();
    }

    /**
     * Initialize the properties editor for parsing, setting, etc.
     */
    _initializeEditor () {
        // Touch empty gradle.properties file if missing.
        if (!fs.existsSync(this.gradleFilePath)) {
            events.emit('verbose', '[Gradle Properties] File missing, creating file with Cordova defaults.');
            fs.writeFileSync(this.gradleFilePath, '', 'utf-8');
        }

        // Create an editor for parsing, getting, and setting configurations.
        this.gradleFile = propertiesParser.createEditor(this.gradleFilePath);
    }

    /**
     * Validate that defaults or user configuration properties are set and
     * set the missing items.
     */
    _configureProperties (properties) {
        // Iterate though the properties and set only if missing.
        Object.keys(properties).forEach(key => {
            const value = this.gradleFile.get(key);

            if (!value) {
                // Handles the case of adding missing defaults or new properties that are missing.
                events.emit('verbose', `[Gradle Properties] Appending configuration item: ${key}=${properties[key]}`);
                this.gradleFile.set(key, properties[key]);
            } else if (value !== properties[key]) {
                if (this._defaults[key] && this._defaults[key] !== properties[key]) {
                    let shouldEmit = true;
                    if (key === 'org.gradle.jvmargs') {
                        shouldEmit = this._isJVMMemoryLessThanRecommended(properties[key], this._defaults[key]);
                    }

                    if (shouldEmit) {
                        // Since the value does not match default, we will notify the discrepancy with Cordova's recommended value.
                        events.emit('info', `[Gradle Properties] Detected Gradle property "${key}" with the value of "${properties[key]}", Cordova's recommended value is "${this._defaults[key]}"`);
                    }
                } else {
                    // When the current value exists but does not match the new value or does matches the default key value, the new value it set.
                    events.emit('verbose', `[Gradle Properties] Updating Gradle property "${key}" with the value of "${properties[key]}"`);
                }

                // We will set the new value in either case.
                this.gradleFile.set(key, properties[key]);
            }
        });
    }

    _isJVMMemoryLessThanRecommended (memoryValue, recommendedMemoryValue) {
        const UNIT = 2;
        const SIZE = 1;
        const regex = /-Xmx+([0-9]+)+([mMgGkK])/;

        const recommendedCapture = regex.exec(recommendedMemoryValue);
        const recommendedBase = this._getBaseJVMSize(recommendedCapture[SIZE], recommendedCapture[UNIT]);
        const memoryCapture = regex.exec(memoryValue);
        const memoryBase = this._getBaseJVMSize(memoryCapture[SIZE], memoryCapture[UNIT]);

        return memoryBase < recommendedBase;
    }

    _getBaseJVMSize (size, unit) {
        const KILOBYTE = 1024;
        const MEGABYTE = 1048576;
        const GIGABYTE = 1073741824;

        switch (unit.toLowerCase()) {
        case 'k': return size * KILOBYTE;
        case 'm': return size * MEGABYTE;
        case 'g': return size * GIGABYTE;
        }

        events.emit('warn', `[Gradle Properties] Unknown memory size unit (${unit})`);
        return null;
    }

    /**
     * Saves any changes that has been made to the properties file.
     */
    _save () {
        events.emit('verbose', '[Gradle Properties] Updating and Saving File');
        this.gradleFile.save();
    }
}

module.exports = GradlePropertiesParser;
