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

### 5.0.2 (Jan 24, 2018)
* [CB-13750](https://issues.apache.org/jira/browse/CB-13750) Add build-tools-26.0.2 to travis
* [CB-13737](https://issues.apache.org/jira/browse/CB-13737) (iOS): fix Splash screen images for iPhone X

### 5.0.1 (Dec 27, 2017)
* [CB-13709](https://issues.apache.org/jira/browse/CB-13709) Fix to allow 5.0.0 version install (#144)

### 5.0.0 (Dec 15, 2017)
* [CB-13677](https://issues.apache.org/jira/browse/CB-13677) Remove deprecated platforms

### 4.1.0 (Nov 06, 2017)
* [CB-13473](https://issues.apache.org/jira/browse/CB-13473) (CI) Removed **Browser** builds from AppVeyor
* [CB-12011](https://issues.apache.org/jira/browse/CB-12011) (android) added the possibility to change the spinner color on **Android 5.0**+ apps
* [CB-13028](https://issues.apache.org/jira/browse/CB-13028) (CI) **Browser** builds on Travis and AppVeyor
* [CB-13094](https://issues.apache.org/jira/browse/CB-13094) (android) Don't show splash when activity being finished
* [CB-11487](https://issues.apache.org/jira/browse/CB-11487) (browser) Documented `AutoHideSplashScreen` for **Browser**
* [CB-11488](https://issues.apache.org/jira/browse/CB-11488) (browser) The `hide()` call became non re-entrant after the addition of fade out. This fixes the issue.
* [CB-11487](https://issues.apache.org/jira/browse/CB-11487) (browser) The standard `AutoHideSplashScreen` `config.xml` property is now supported by the **Browser** platform.
* [CB-11486](https://issues.apache.org/jira/browse/CB-11486) (browser) `splashScreenDelay` now feed through `parseInt` to ensure it is an integer by the time it's value is passed in to `setTimeout()` in `hide()`.
* [CB-12847](https://issues.apache.org/jira/browse/CB-12847) added `bugs` entry to `package.json`.

### 4.0.3 (Apr 27, 2017)
* [CB-12622](https://issues.apache.org/jira/browse/CB-12622) Added **Android 6.0** build badge to `README`
* [CB-12685](https://issues.apache.org/jira/browse/CB-12685) added `package.json` to tests folder

### 4.0.2 (Feb 28, 2017)
* [CB-12353](https://issues.apache.org/jira/browse/CB-12353) Corrected merges usage in `plugin.xml`
* [CB-12369](https://issues.apache.org/jira/browse/CB-12369) Add plugin typings from `DefinitelyTyped` 
* [CB-12363](https://issues.apache.org/jira/browse/CB-12363) Added build badges for **iOS 9.3** and **iOS 10.0** 
* [CB-12230](https://issues.apache.org/jira/browse/CB-12230) Removed **Windows 8.1** build badges

### 4.0.1 (Dec 07, 2016)
* [CB-12224](https://issues.apache.org/jira/browse/CB-12224) Updated version and RELEASENOTES.md for release 4.0.1
* [CB-11751](https://issues.apache.org/jira/browse/CB-11751) 'extendedSplashScreen' is undefined Document that splashscreen needs to be disabled on Windows in case of updating entire document body
* [CB-9287](https://issues.apache.org/jira/browse/CB-9287) Not enough Icons and Splashscreens for **Windows 8.1** and Windows Phone 8.1
* [CB-11917](https://issues.apache.org/jira/browse/CB-11917) - Remove pull request template checklist item: "iCLA has been submitted…"
* [CB-11830](https://issues.apache.org/jira/browse/CB-11830) (iOS) Fix doc typos in PR#114
* [CB-11829](https://issues.apache.org/jira/browse/CB-11829) (iOS) Support for CB-9762; docs (CB-11830)
* [CB-11832](https://issues.apache.org/jira/browse/CB-11832) Incremented plugin version.

### 4.0.0 (Sep 08, 2016)
* [CB-11795](https://issues.apache.org/jira/browse/CB-11795) Add 'protective' entry to cordovaDependencies
* [CB-11326](https://issues.apache.org/jira/browse/CB-11326) Prevent crash when initializing plugin after navigating to another URL
* Fix crash on **iOS** when reloading page from remote **Safari**
* Add badges for paramedic builds on Jenkins
* Add pull request template.
* [CB-11179](https://issues.apache.org/jira/browse/CB-11179) Extend the windows-splashscreen docs
* [CB-11159](https://issues.apache.org/jira/browse/CB-11159) Fix flaky splashscreen native tests
* [CB-11156](https://issues.apache.org/jira/browse/CB-11156) Change default `FadeSplashScreenDuration` value
* [CB-8056](https://issues.apache.org/jira/browse/CB-8056) Updated the dependency version, added it to the docs
* [CB-10996](https://issues.apache.org/jira/browse/CB-10996) Adding front matter to README.md
* [CB-8056](https://issues.apache.org/jira/browse/CB-8056) Implement splashscreen for **Windows** platform
* [CB-6498](https://issues.apache.org/jira/browse/CB-6498) Misleading documentation in **Android** Quirks

### 3.2.2 (Apr 15, 2016)
* [CB-10979](https://issues.apache.org/jira/browse/CB-10979) Fix splashscreen **iOS** native tests. Added `jshintignore` for tests/ios
* [CB-10895](https://issues.apache.org/jira/browse/CB-10895) Transparent Splashscreen view sometimes remains
* [CB-10562](https://issues.apache.org/jira/browse/CB-10562) `hide()` not working in latest splashscreen plug in 3.1.0 in **iOS**
* [CB-10688](https://issues.apache.org/jira/browse/CB-10688) Plugin Splashscreen Readme must have examples.
* [CB-10864](https://issues.apache.org/jira/browse/CB-10864) Run **iOS** native tests on Travis

### 3.2.1 (Mar 09, 2016)
* [CB-10764](https://issues.apache.org/jira/browse/CB-10764) Remove emoji in cordova-plugin-splashscreen
* [CB-10650](https://issues.apache.org/jira/browse/CB-10650) Non-index content.src causes Splashscreen to be not displayed on **Browser**
* [CB-10636](https://issues.apache.org/jira/browse/CB-10636) Add JSHint for plugins
* [CB-10606](https://issues.apache.org/jira/browse/CB-10606) fix deprecation warning for interfaceOrientation on **iOS**
* chore: edit package.json license to match SPDX id

### 3.2.0 (Feb 09, 2016)
* [CB-10422](https://issues.apache.org/jira/browse/CB-10422) Splashscreen displays black screen with no image on Android
* [CB-10412](https://issues.apache.org/jira/browse/CB-10412) AutoHideSplashScreen "false" isn't taken in account on iOS
* [CB-9516](https://issues.apache.org/jira/browse/CB-9516) Android SplashScreen - Spinner Does Not Display
* [CB-9094](https://issues.apache.org/jira/browse/CB-9094) Smarter autohide logic on Android
* [CB-8396](https://issues.apache.org/jira/browse/CB-8396) Add AutoHideSplashScreen logic to Android's Splashscreen

### 3.1.0 (Jan 15, 2016)
* [CB-9538](https://issues.apache.org/jira/browse/CB-9538) Implementing `FadeSplashScreen` feature for **Android**
* [CB-9240](https://issues.apache.org/jira/browse/CB-9240) Cordova splash screen plugin **iPad** landscape mode issue
* [CB-10263](https://issues.apache.org/jira/browse/CB-10263) Fix splashscreen plugin filenames for Asset Catalog
* [CB-9374](https://issues.apache.org/jira/browse/CB-9374) **Android** add `SplashShowOnlyFirstTime` as preference
* [CB-10244](https://issues.apache.org/jira/browse/CB-10244) Don't rotate the **iPhone 6 Plus** splash
* [CB-9043](https://issues.apache.org/jira/browse/CB-9043) Fix the **ios** splashscreen being deformed on orientation change
* [CB-10079](https://issues.apache.org/jira/browse/CB-10079) Splashscreen plugin does not honor `SplashScreenDelay` on **iOS**
* [CB-10231](https://issues.apache.org/jira/browse/CB-10231) Fix `FadeSplashScreen` to default to true on **iOS**

### 3.0.0 (Nov 18, 2015)
* [CB-10035](https://issues.apache.org/jira/browse/CB-10035) Updated `RELEASENOTES` to be newest to oldest
* Fixing contribute link.
* [CB-9750](https://issues.apache.org/jira/browse/CB-9750) `FadeSplashDuration` is now in `msecs`
* [CB-8875](https://issues.apache.org/jira/browse/CB-8875) `FadeSplashScreen` was not fading
* [CB-9467](https://issues.apache.org/jira/browse/CB-9467) SplashScreen does not show any image in hosted app on **Windows 10**
* [CB-7282](https://issues.apache.org/jira/browse/CB-7282) Document `AutoHideSplashScreenpreference`
* [CB-9327](https://issues.apache.org/jira/browse/CB-9327) - Splashscreen not receiving `CDVPageLoadNotification`
* WP8: Avoid config `value` of a wrong element.

### 2.1.0 (Jun 17, 2015)
* added missing license headers
* [CB-9128](https://issues.apache.org/jira/browse/CB-9128) cordova-plugin-splashscreen documentation translation: cordova-plugin-splashscreen
* fix npm md issue
* Fixed iOS unit tests.
* [CB-3562](https://issues.apache.org/jira/browse/CB-3562): Disable screen rotation for iPhone when splash screen is shown. (closes #47)
* [CB-8988](https://issues.apache.org/jira/browse/CB-8988): Fix rotation on iOS/iPad (closes #46)
* [CB-8904](https://issues.apache.org/jira/browse/CB-8904): Don't reset the static variable when it's destroyed, otherwise we might as well just have a member variable
* Removed wp7 from `plugin.xml` and package.json
* [CB-8750](https://issues.apache.org/jira/browse/CB-8750) [wp8]: Rewrite resoultion helper
* [CB-8750](https://issues.apache.org/jira/browse/CB-8750) [wp8]: Allow resolution-specific splashscreen images
* [CB-8758](https://issues.apache.org/jira/browse/CB-8758) [wp8]: UnauthorizedAccessException on hide()

### 2.0.0 (Apr 15, 2015)
* give users a way to install the bleeding edge.
* [CB-8746](https://issues.apache.org/jira/browse/CB-8746) gave plugin major version bump
* [CB-8797](https://issues.apache.org/jira/browse/CB-8797) - Splashscreen preferences FadeSplashScreenDuration and FadeSplashScreen (iOS) are missing
* [CB-8836](https://issues.apache.org/jira/browse/CB-8836) - Crashes after animating splashscreen
* [CB-8753](https://issues.apache.org/jira/browse/CB-8753) android: Fix missing import in previous commit
* [CB-8753](https://issues.apache.org/jira/browse/CB-8753) android: Adds `SplashMaintainAspectRatio` preference (close #43)
* [CB-8683](https://issues.apache.org/jira/browse/CB-8683) changed plugin-id to pacakge-name
* [CB-8653](https://issues.apache.org/jira/browse/CB-8653) properly updated translated docs to use new id
* [CB-8653](https://issues.apache.org/jira/browse/CB-8653) updated translated docs to use new id
* [CB-8345](https://issues.apache.org/jira/browse/CB-8345) Make default for splashscreen resource "screen" (which is what template and CLI assume it to be)
* Revert "CB-8345 android: Make "splash" the default resource ID instead of null"
* Use TRAVIS_BUILD_DIR, install paramedic by npm
* [CB-8345](https://issues.apache.org/jira/browse/CB-8345) android: Make "splash" the default resource ID instead of null
* docs: added Windows to supported platforms
* [CB-7964](https://issues.apache.org/jira/browse/CB-7964) Add cordova-plugin-splashscreen support for browser platform
* [CB-8653](https://issues.apache.org/jira/browse/CB-8653) Updated Readme
* [wp8] oops, Added back config parse result checks
* [WP8] code cleanup, minor refactors, comments to clarify some stuff.
* Extend WP8 Splash Screen to respect SplashScreen and SplashScreenDelay preferences from config file
* [CB-8574](https://issues.apache.org/jira/browse/CB-8574) Integrate TravisCI
* [CB-8438](https://issues.apache.org/jira/browse/CB-8438) cordova-plugin-splashscreen documentation translation: cordova-plugin-splashscreen
* [CB-8538](https://issues.apache.org/jira/browse/CB-8538) Added package.json file
* [CB-8397](https://issues.apache.org/jira/browse/CB-8397) Add support to 'windows' for showing the Windows Phone splashscreen

### 1.0.0 (Feb 04, 2015)
* [CB-8351](https://issues.apache.org/jira/browse/CB-8351) ios: Stop using deprecated IsIpad macro
* [CB-3679](https://issues.apache.org/jira/browse/CB-3679) Add engine tag for Android >= 3.6.0 due to use of `preferences`
* [CB-3679](https://issues.apache.org/jira/browse/CB-3679) Make SplashScreen plugin compatible with cordova-android@4.0.x

### 0.3.5 (Dec 02, 2014)
* [CB-7204](https://issues.apache.org/jira/browse/CB-7204) - Race condition when hiding and showing spinner (closes #21)
* [CB-7700](https://issues.apache.org/jira/browse/CB-7700) cordova-plugin-splashscreen documentation translation: cordova-plugin-splashscreen

### 0.3.4 (Oct 03, 2014)
* Finalized iOS splash screen (image name) tests. 176 tests in all, 44 for each type of device (iPad, iPhone, iPhone5, iPhone6, iPhone 6 Plus).
* [CB-7633](https://issues.apache.org/jira/browse/CB-7633) - (Re-fix based on updated unit tests) iPhone 6 Plus support
* Updated iOS tests for locked orientations
* Added more iOS splash screen tests.
* [CB-7633](https://issues.apache.org/jira/browse/CB-7633) - Add support for iPhone 6/6+
* Added failing iPhone 6/6 Plus tests.
* Added 'npm test'
* [CB-7663](https://issues.apache.org/jira/browse/CB-7663) - iOS unit tests for splash screen
* Properly formatted splashscreen preference docs.

### 0.3.3 (Sep 17, 2014)
* [CB-7249](https://issues.apache.org/jira/browse/CB-7249) cordova-plugin-splashscreen documentation translation
* Renamed test dir, added nested `plugin.xml`
* added documentation for manual tests
* [CB-7196](https://issues.apache.org/jira/browse/CB-7196) port splashscreen tests to framework

### 0.3.2 (Aug 06, 2014)
* [CB-6127](https://issues.apache.org/jira/browse/CB-6127) Updated translations for docs
* [CB-7041](https://issues.apache.org/jira/browse/CB-7041) ios: Fix image filename logic when setting the iPad splash screen
* fixes Splashscreen crash on WP8
* Remove outdated doc

### 0.3.1 (Jun 05, 2014)
* documentation translation: cordova-plugin-splashscreen
* Lisa testing pulling in plugins for plugin: cordova-plugin-splashscreen
* Lisa testing pulling in plugins for plugin: cordova-plugin-splashscreen
* Lisa testing pulling in plugins for plugin: cordova-plugin-splashscreen
* Lisa testing pulling in plugins for plugin: cordova-plugin-splashscreen
* [CB-6810](https://issues.apache.org/jira/browse/CB-6810) Add license to CONTRIBUTING.md
* [wp8] updated quirk for  and combined iOS,WP8,BB10 quirks as they are all the same
* [wp] implemented OnInit so splash screen can be shown before cordova page is loaded
* [wp] plugin must be autoloaded for AutoHideSplashScreen preference to work
* [CB-6483](https://issues.apache.org/jira/browse/CB-6483) Use splash screen image from manifest on Windows8
* [CB-6491](https://issues.apache.org/jira/browse/CB-6491) add CONTRIBUTING.md
* Revert "Merge branch 'tizen' of http://github.com/siovene/cordova-plugin-splashscreen"

### 0.3.0 (Apr 17, 2014)
* Add Tizen support to plugin
* [CB-6422](https://issues.apache.org/jira/browse/CB-6422): [windows8] use cordova/exec/proxy
* [CB-4051](https://issues.apache.org/jira/browse/CB-4051): [ios] - Re-fix - Splashscreen rotation problem (closes #13)
* [CB-6460](https://issues.apache.org/jira/browse/CB-6460): Update license headers
* [CB-6465](https://issues.apache.org/jira/browse/CB-6465): Add license headers to Tizen code
* Add NOTICE file

### 0.2.7 (Feb 05, 2014)
* [CB-3562](https://issues.apache.org/jira/browse/CB-3562) Fix aspect ratio on landscape-only iPhone applications
* [CB-4051](https://issues.apache.org/jira/browse/CB-4051) fix for splashscreen rotation problem

### 0.2.6 (Jan 02, 2014)
* [CB-5658](https://issues.apache.org/jira/browse/CB-5658) Add doc/index.md for Splashscreen plugin
* Handle error when splash image is missing.

### 0.2.5 (Dec 4, 2013)
* add ubuntu platform
* Added amazon-fireos platform. Change to use amazon-fireos as a platform if the user agent string contains 'cordova-amazon-fireos'
* [CB-5124](https://issues.apache.org/jira/browse/CB-5124) - Remove splashscreen config.xml values from iOS Configuration Docs, move to plugin docs

### 0.2.4 (Oct 28, 2013)
* [CB-5128](https://issues.apache.org/jira/browse/CB-5128): add repo + issue tag to `plugin.xml` for splashscreen plugin
* [CB-5010](https://issues.apache.org/jira/browse/CB-5010) Incremented plugin version on dev branch.

### 0.2.3 (Oct 9, 2013)
* [CB-4806](https://issues.apache.org/jira/browse/CB-4806) Re-fix Update splashscreen image bounds for iOS 7
* [CB-4934](https://issues.apache.org/jira/browse/CB-4934) plugin-splashscreen should not show by default on Windows8
* [CB-4929](https://issues.apache.org/jira/browse/CB-4929) plugin-splashscreen not loading proxy windows8
* [CB-4915](https://issues.apache.org/jira/browse/CB-4915) Incremented plugin version on dev branch.

### 0.2.2 (Sept 25, 2013)
* [CB-4889](https://issues.apache.org/jira/browse/CB-4889) bumping&resetting version
* [CB-4889](https://issues.apache.org/jira/browse/CB-4889) renaming org.apache.cordova.core.splashscreen to org.apache.cordova.splashscreen
* Rename CHANGELOG.md -> RELEASENOTES.md
* [CB-4806](https://issues.apache.org/jira/browse/CB-4806) Update splashscreen image bounds for iOS 7
* [CB-4752](https://issues.apache.org/jira/browse/CB-4752) Incremented plugin version on dev branch.
