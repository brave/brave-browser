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

var fs = require('fs');
var xml = require('cordova-common').xmlHelpers;

var DEFAULT_ORIENTATION = 'default';

/** Wraps an AndroidManifest file */
class AndroidManifest {
    constructor (path) {
        this.path = path;
        this.doc = xml.parseElementtreeSync(path);
        if (this.doc.getroot().tag !== 'manifest') {
            throw new Error('AndroidManifest at ' + path + ' has incorrect root node name (expected "manifest")');
        }
    }

    getVersionName () {
        return this.doc.getroot().attrib['android:versionName'];
    }

    setVersionName (versionName) {
        this.doc.getroot().attrib['android:versionName'] = versionName;
        return this;
    }

    getVersionCode () {
        return this.doc.getroot().attrib['android:versionCode'];
    }

    setVersionCode (versionCode) {
        this.doc.getroot().attrib['android:versionCode'] = versionCode;
        return this;
    }

    getPackageId () {
        return this.doc.getroot().attrib.package;
    }

    setPackageId (pkgId) {
        this.doc.getroot().attrib.package = pkgId;
        return this;
    }

    getActivity () {
        var activity = this.doc.getroot().find('./application/activity');
        return {
            getName: function () {
                return activity.attrib['android:name'];
            },
            setName: function (name) {
                if (!name) {
                    delete activity.attrib['android:name'];
                } else {
                    activity.attrib['android:name'] = name;
                }
                return this;
            },
            getOrientation: function () {
                return activity.attrib['android:screenOrientation'];
            },
            setOrientation: function (orientation) {
                if (!orientation || orientation.toLowerCase() === DEFAULT_ORIENTATION) {
                    delete activity.attrib['android:screenOrientation'];
                } else {
                    activity.attrib['android:screenOrientation'] = orientation;
                }
                return this;
            },
            getLaunchMode: function () {
                return activity.attrib['android:launchMode'];
            },
            setLaunchMode: function (launchMode) {
                if (!launchMode) {
                    delete activity.attrib['android:launchMode'];
                } else {
                    activity.attrib['android:launchMode'] = launchMode;
                }
                return this;
            }
        };
    }

    getDebuggable () {
        return this.doc.getroot().find('./application').attrib['android:debuggable'] === 'true';
    }

    setDebuggable (value) {
        var application = this.doc.getroot().find('./application');
        if (value) {
            application.attrib['android:debuggable'] = 'true';
        } else {
            // The default value is "false", so we can remove attribute at all.
            delete application.attrib['android:debuggable'];
        }
        return this;
    }

    /**
     * Writes manifest to disk syncronously. If filename is specified, then manifest
     *   will be written to that file
     *
     * @param   {String}  [destPath]  File to write manifest to. If omitted,
     *   manifest will be written to file it has been read from.
     */
    write (destPath) {
        fs.writeFileSync(destPath || this.path, this.doc.write({ indent: 4 }), 'utf-8');
    }
}

module.exports = AndroidManifest;
