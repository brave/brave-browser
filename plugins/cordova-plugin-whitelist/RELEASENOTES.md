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

### 1.3.3 (Nov 06, 2017)
* [CB-12847](https://issues.apache.org/jira/browse/CB-12847) added `bugs` entry to `package.json`.

### 1.3.2 (Feb 28, 2017)
* [CB-12236](https://issues.apache.org/jira/browse/CB-12236) Fixed `RELEASENOTES` for `cordova-plugin-whitelist`

### 1.3.1 (Dec 07, 2016)
* [CB-12224](https://issues.apache.org/jira/browse/CB-12224) Updated version and RELEASENOTES.md for release 1.3.1
* [CB-11917](https://issues.apache.org/jira/browse/CB-11917) - Remove pull request template checklist item: "iCLA has been submitted…"
* Edit package.json license to match SPDX id
* [CB-11832](https://issues.apache.org/jira/browse/CB-11832) Incremented plugin version.

### 1.3.0 (Sep 08, 2016)
* [CB-11795](https://issues.apache.org/jira/browse/CB-11795) Add 'protective' entry to cordovaDependencies
* Updated installation section
* Plugin uses `Android Log class` and not `Cordova LOG class`
* Add pull request template.
* [CB-10866](https://issues.apache.org/jira/browse/CB-10866) Adding engine info to `package.json`
* [CB-10996](https://issues.apache.org/jira/browse/CB-10996) Adding front matter to README.md

### 1.2.2 (Apr 15, 2016)
* add note about redirects
* [CB-10624](https://issues.apache.org/jira/browse/CB-10624) remove error message from `whitelist.js`, which leaves it empty

### 1.2.1 (Jan 15, 2016)
* [CB-10194](https://issues.apache.org/jira/browse/CB-10194) info tag prints for ios when not applicable

### 1.2.0 (Nov 18, 2015)
* removed **iOS** engine check from `plugin.xml`
* [CB-10035](https://issues.apache.org/jira/browse/CB-10035) Updated `RELEASENOTES` to be newest to oldest
* [CB-9972](https://issues.apache.org/jira/browse/CB-9972) - Remove **iOS** whitelist
* Updated the text, it should read 4.0.x and greater, since this plugin will be required for `cordova-android 5.0`
* Fixing contribute link.
* Updated `plugin.xml <info>` tag to remove warning about not needing this plugin if you are using the **iOS 9 SDK**
* [CB-9738](https://issues.apache.org/jira/browse/CB-9738) - Disable whitelist use when runtime environment is **iOS 9**
* [CB-9740](https://issues.apache.org/jira/browse/CB-9740) - Add `<info>` tag describing whitelist plugin not needed on `cordova-ios` and cordova-android 3.x`
* [CB-9568](https://issues.apache.org/jira/browse/CB-9568) - Update whitelist plugin to allow all network access by default
* [CB-9337](https://issues.apache.org/jira/browse/CB-9337) - enable use of `<access>` tags for native code network requests

### 1.1.0 (Jun 17, 2015)
* [CB-9128](https://issues.apache.org/jira/browse/CB-9128) cordova-plugin-whitelist documentation translation: cordova-plugin-whitelist
* fix npm md issue
* Usage of CDVURLRequestFilter protocol.
* [CB-9089](https://issues.apache.org/jira/browse/CB-9089) - iOS whitelist plugin does not compile
* [CB-9090](https://issues.apache.org/jira/browse/CB-9090) - Enable whitelist plugin for cordova-ios 4.0.0
* Fixed error in Content-Security-Policy example

### 1.0.0 (Mar 25, 2015)
* [CB-8739](https://issues.apache.org/jira/browse/CB-8739) added missing license headers
* Add @Override to CustomConfigXmlParser methods
* Change ID to cordova-plugin-whitelist rather than reverse-DNS-style
* Tweak CSP examples in README
* [CB-8660](https://issues.apache.org/jira/browse/CB-8660) remove extra commas from package.json
