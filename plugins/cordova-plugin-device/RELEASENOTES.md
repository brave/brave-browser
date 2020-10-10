<!--
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
-->
# Release Notes

### 2.0.2 (Apr 12, 2018)
* [CB-13893](https://issues.apache.org/jira/browse/CB-13893) **iOS** delete `libz.tbd` from device plugin

### 2.0.1 (Dec 27, 2017)
* [CB-13702](https://issues.apache.org/jira/browse/CB-13702) Fix to allow 2.0.0 version install

### 2.0.0 (Dec 15, 2017)
* [CB-13670](https://issues.apache.org/jira/browse/CB-13670) Remove deprecated platforms

### 1.1.7 (Nov 06, 2017)
* [CB-13472](https://issues.apache.org/jira/browse/CB-13472) (CI) Fixed Travis **Android** builds again
* [CB-12895](https://issues.apache.org/jira/browse/CB-12895) setup `eslint` and removed `jshint`
* [CB-13113](https://issues.apache.org/jira/browse/CB-13113) (browser) `device.isVirtual` is always false
* [CB-13028](https://issues.apache.org/jira/browse/CB-13028) (CI) **Browser** builds on Travis and AppVeyor
* [CB-13000](https://issues.apache.org/jira/browse/CB-13000) (CI) Speed up **Android** builds
* [CB-12847](https://issues.apache.org/jira/browse/CB-12847) added `bugs` entry to `package.json`.

### 1.1.6 (Apr 27, 2017)
* [CB-12622](https://issues.apache.org/jira/browse/CB-12622) Added **Android 6.0** build badge to `README`
* [CB-12685](https://issues.apache.org/jira/browse/CB-12685) added `package.json` to tests folder
* [CB-12105](https://issues.apache.org/jira/browse/CB-12105) (browser) Properly detect Edge

### 1.1.5 (Feb 28, 2017)
* [CB-12353](https://issues.apache.org/jira/browse/CB-12353) Corrected merges usage in `plugin.xml`
* [CB-12369](https://issues.apache.org/jira/browse/CB-12369) Add plugin typings from `DefinitelyTyped`
* [CB-12363](https://issues.apache.org/jira/browse/CB-12363) Added build badges for **iOS 9.3** and **iOS 10.0**
* [CB-12230](https://issues.apache.org/jira/browse/CB-12230) Removed **Windows 8.1** build badges

### 1.1.4 (Dec 07, 2016)
* [CB-12224](https://issues.apache.org/jira/browse/CB-12224) Updated version and RELEASENOTES.md for release 1.1.4
* [CB-11917](https://issues.apache.org/jira/browse/CB-11917) - Remove pull request template checklist item: "iCLA has been submitted…"
* [CB-11832](https://issues.apache.org/jira/browse/CB-11832) Incremented plugin version.

### 1.1.3 (Sep 08, 2016)
* [CB-11795](https://issues.apache.org/jira/browse/CB-11795) Add 'protective' entry to cordovaDependencies
* Add badges for paramedic builds on Jenkins
* Add pull request template.
* Readme: Add fenced code blocks with langauage hints
* [CB-10996](https://issues.apache.org/jira/browse/CB-10996) Adding front matter to `README.md`

### 1.1.2 (Apr 15, 2016)
* Use passed device, follow create policy forf `CFUUIDCreate`
* [CB-10631](https://issues.apache.org/jira/browse/CB-10631) Fix for `device.uuid` in **iOS 5.1.1**
* Updating the comment to exclude URL
* [CB-10636](https://issues.apache.org/jira/browse/CB-10636) Add `JSHint` for plugins
* Refactored `deviceInfo` on **iOS** for better readability.

### 1.1.1 (Jan 15, 2016)
* [CB-10238](https://issues.apache.org/jira/browse/CB-10238) **OSX** Move `device-plugin` out from `cordovalib` to the plugin repository
* [CB-9923](https://issues.apache.org/jira/browse/CB-9923) Update `device.platform` documentation for **Browser** platform

### 1.1.0 (Nov 18, 2015)
* [CB-10035](https://issues.apache.org/jira/browse/CB-10035) Updated `RELEASENOTES` to be newest to oldest
* Add `isVirtual` for **Windows Phone 8.x**
* Added basic **Android** support for hardware serial number
* [CB-9865](https://issues.apache.org/jira/browse/CB-9865) Better simulator detection for **iOS**
* Fixing contribute link.
* Added **WP8** implementation
* update to use `TARGET_OS_SIMULATOR` as `TARGET_IPHONE_SIMULATOR` is deprecated.
* update code to use 'isVirtual'
* create test to verify existence and type of new property 'isVirtual'
* add `isSimulator` for **iOS** & **Android** device
* Updated documentation to mention backwards compatibility
* Updated **README** to reflect new behaviour and quirks on **iOS**
* Check user defaults first to maintain backwards compatibility
* Changed `UUID` to use `[UIDevice identifierForVendor]`

### 1.0.1 (Jun 17, 2015)
* [CB-9128](https://issues.apache.org/jira/browse/CB-9128) cordova-plugin-device documentation translation: cordova-plugin-device
* Attempts to corrent npm markdown issue

### 1.0.0 (Apr 15, 2015)
* [CB-8746](https://issues.apache.org/jira/browse/CB-8746) gave plugin major version bump
* [CB-8683](https://issues.apache.org/jira/browse/CB-8683) changed plugin-id to pacakge-name
* [CB-8653](https://issues.apache.org/jira/browse/CB-8653) properly updated translated docs to use new id
* [CB-8653](https://issues.apache.org/jira/browse/CB-8653) updated translated docs to use new id
* Use TRAVIS_BUILD_DIR, install paramedic by npm
* [CB-8653](https://issues.apache.org/jira/browse/CB-8653) Updated Readme
* remove defunct windows8 version
* add travis badge
* Add cross-plugin ios paramedic test running for TravisCI
* [CB-8538](https://issues.apache.org/jira/browse/CB-8538) Added package.json file

### 0.3.0 (Feb 04, 2015)
* Added device.manufacturer property for Android, iOS, Blackberry, WP8
* Support for Windows Phone 8 ANID2 ANID is only supported up to Windows Phone 7.5
* [CB-8351](https://issues.apache.org/jira/browse/CB-8351) Use a local copy of uniqueAppInstanceIdentifier rather than CordovaLib's version
* browser: Fixed a bug that caused an "cannot call method of undefined" error if the browser's user agent wasn't recognized

### 0.2.13 (Dec 02, 2014)
* Changing `device.platform` to always report the platform as "browser".
* [CB-5892](https://issues.apache.org/jira/browse/CB-5892) - Remove deprecated `window.Settings`
* [CB-7700](https://issues.apache.org/jira/browse/CB-7700) cordova-plugin-device documentation translation: cordova-plugin-device
* [CB-7571](https://issues.apache.org/jira/browse/CB-7571) Bump version of nested plugin to match parent plugin

### 0.2.12 (Sep 17, 2014)
* [CB-7471](https://issues.apache.org/jira/browse/CB-7471) cordova-plugin-device documentation translation
* [CB-7552](https://issues.apache.org/jira/browse/CB-7552) device.name docs have not been removed
* [fxos] Fix cordova version
* added status box and documentation to manual tests
* [fxos] Fix cordova version
* added status box and documentation to manual tests
* Added plugin support for the browser
* [CB-7262](https://issues.apache.org/jira/browse/CB-7262) Adds support for universal windows apps.

### 0.2.11 (Aug 06, 2014)
* [FFOS] update DeviceProxy.js
* [CB-6127](https://issues.apache.org/jira/browse/CB-6127) Updated translations for docs
* Use Windows system calls to get better info

### 0.2.10 (Jun 05, 2014)
* [CB-6127](https://issues.apache.org/jira/browse/CB-6127) Spanish and French Translations added. Github close #12
* Changing 1.5 to 2.0
* added firefoxos version - conversion
* added firefoxos version
* [CB-6800](https://issues.apache.org/jira/browse/CB-6800) Add license
* [CB-6491](https://issues.apache.org/jira/browse/CB-6491) add CONTRIBUTING.md

### 0.2.9 (Apr 17, 2014)
* [CB-5105](https://issues.apache.org/jira/browse/CB-5105): [Android, windows8, WP, BlackBerry10] Removed dead code for device.version
* [CB-6422](https://issues.apache.org/jira/browse/CB-6422): [windows8] use cordova/exec/proxy
* [CB-6460](https://issues.apache.org/jira/browse/CB-6460): Update license headers
* Add NOTICE file

### 0.2.8 (Feb 05, 2014)
* Tizen support added

### 0.2.7 (Jan 07, 2014)
* [CB-5737](https://issues.apache.org/jira/browse/CB-5737) Fix exception on close caused by left over telephony code from [CB-5504](https://issues.apache.org/jira/browse/CB-5504)

### 0.2.6 (Jan 02, 2014)
* [CB-5658](https://issues.apache.org/jira/browse/CB-5658) Add doc/index.md for Device plugin
* [CB-5504](https://issues.apache.org/jira/browse/CB-5504) Moving Telephony Logic out of Device

### 0.2.5 (Dec 4, 2013)
* [CB-5316](https://issues.apache.org/jira/browse/CB-5316) Spell Cordova as a brand unless it's a command or script
* [ubuntu] use cordova/exec/proxy
* add ubuntu platform
* Modify Device.platform logic to use amazon-fireos as the platform for Amazon Devices
* 1. Added amazon-fireos platform. 2. Change to use cordova-amazon-fireos as the platform if user agent contains 'cordova-amazon-fireos'

### 0.2.4 (Oct 28, 2013)
* [CB-5128](https://issues.apache.org/jira/browse/CB-5128): added repo + issue tag in plugin.xml for device plugin
* [CB-5085](https://issues.apache.org/jira/browse/CB-5085) device.cordova returning wrong value
* [CB-4915](https://issues.apache.org/jira/browse/CB-4915) Incremented plugin version on dev branch.

### 0.2.3 (Sept 25, 2013)
* [CB-4889](https://issues.apache.org/jira/browse/CB-4889) bumping&resetting version
* [windows8] commandProxy has moved
* [BlackBerry10] removed uneeded permission tags in plugin.xml
* [CB-4889](https://issues.apache.org/jira/browse/CB-4889) renaming org.apache.cordova.core.device to org.apache.cordova.device
* Rename CHANGELOG.md -> RELEASENOTES.md
* updated to use commandProxy for ffos
* add firefoxos support
* [CB-4752](https://issues.apache.org/jira/browse/CB-4752) Incremented plugin version on dev branch. 

### 0.2.1 (Sept 5, 2013)
* removed extraneous print statement
* [CB-4432](https://issues.apache.org/jira/browse/CB-4432) copyright notice change
