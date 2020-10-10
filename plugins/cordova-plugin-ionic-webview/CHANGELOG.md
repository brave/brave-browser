## [4.2.1](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v4.2.0...v4.2.1) (2020-04-28)


### Bug Fixes

* **ios:** release userAgentLock for IAB compat ([#558](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/558)) ([4c027f3](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/4c027f3e1dadf790b1d699936b90b670b401db9e)), closes [#551](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/551)

# [4.2.0](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v4.1.3...v4.2.0) (2020-04-14)


### Bug Fixes

* **ionassethandler.m:** fix startPath is getting null ([#463](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/463)) ([0bf16f1](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/0bf16f1b73b853f40781c5de83964457cc4493d5))
* **ios:** avoid app scrolling to top on keyboard hide ([#533](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/533)) ([7974eb4](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/7974eb4160f5e83cf4b3e98905beba1f874464a6))
* **ios:** Replace deprecated APIs ([#539](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/539)) ([27b9021](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/27b9021d5d76b3e6dc6bfc83ab46b98cd301e694))


### Features

* **android:** proxy service worker requests through local server ([#452](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/452)) ([c672175](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/c672175b7527d64b077f7715b2ff145325524add))
* **ios:** implement custom userAgent handling ([#537](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/537)) ([8587114](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/85871147ba8e5b23b693e518bf5ea800cccce8cc))

## [4.1.3](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v4.1.2...v4.1.3) (2019-10-30)


### Bug Fixes

* **android:** return proper mimeType for .mjs files ([#455](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/455)) ([173a313](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/173a313))
* **ios:** mitigate media memory usage ([#459](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/459)) ([cbd526d](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/cbd526d))
* **ios:** remove itms-services private scheme ([#464](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/464)) ([d7d2600](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/d7d2600))

## [4.1.2](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v4.1.1...v4.1.2) (2019-09-25)


### Bug Fixes

* **android:** allow schemes that start by https ([#437](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/437)) ([fab9d1f](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/fab9d1f))
* **Android:** return proper mimeType for wasm files ([0eb8a37](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/0eb8a37))
* **ios:** make programmatically focus work on iOS 13 ([#438](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/438)) ([7a514b0](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/7a514b0)), closes [#435](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/435)

## [4.1.1](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v4.1.0...v4.1.1) (2019-06-26)


### Bug Fixes

* **ios:** show error message when app fails to load ([#382](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/382)) ([cb1f026](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/cb1f026))

# [4.1.0](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v4.0.1...v4.1.0) (2019-06-10)


### Features

* **ios:** Add WKSuspendInBackground preference ([#356](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/356)) ([3613602](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/3613602))

## [4.0.1](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v4.0.0...v4.0.1) (2019-03-26)


### Bug Fixes

* **ios:** Fix autofocus on iOS 12.2 ([#334](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/334)) ([cb4c491](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/cb4c491)), closes [#330](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/330)
* account port on resolving uri path ([#321](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/321)) ([fdfe8aa](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/fdfe8aa))

# [4.0.0](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v3.1.2...v4.0.0) (2019-02-18)


### Features

* **ios:** Make iOS app Scheme configurable with a preference ([#307](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/307)) ([d52d37e](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/d52d37e)), closes [#282](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/282)
* **ios:** Remove WKSuspendInBackground preference ([#309](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/309)) ([73b6659](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/73b6659)), closes [#286](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/286)


### BREAKING CHANGES

* **ios:** Remove the WKSuspendInBackground preference, so app relying on that prefere will
not behave as expected

## [3.1.2](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v3.1.1...v3.1.2) (2019-02-04)


### Bug Fixes

* **Android:** Handle Range Requests for proper media file handling ([#298](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/298)) ([6f18248](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/6f18248)), closes [#248](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/248) [#205](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/205) [#141](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/141)

## [3.1.1](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v3.1.0...v3.1.1) (2019-01-18)


### Bug Fixes

* **ios:** Remove unused code ([#281](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/281)) ([fc7ea27](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/fc7ea27))

# [3.1.0](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v3.0.0...v3.1.0) (2019-01-17)


### Bug Fixes

* **ios:** Fix video playback of files with uppercase extension ([#264](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/264)) ([2c4b225](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/2c4b225)), closes [#260](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/260)
* Set engines to require Cordova CLI 7.1.0 or newer ([#276](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/276)) ([40f42e1](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/40f42e1)), closes [#263](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/263)
* Use a single scheme for all files ([#270](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/270)) ([3d1bcdd](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/3d1bcdd)), closes [#258](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/258)


### Features

* **Android:** Make app Scheme configurable with a preference ([#274](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/274)) ([18d9f2c](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/18d9f2c)), closes [#269](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/269) [#255](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/255)

# [3.0.0](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v2.3.1...v3.0.0) (2019-01-03)


### Bug Fixes

* **iOS:** Remove unused code ([#247](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/247)) ([bceb17a](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/bceb17a))


### Features

* Allows configuration of Mixed Content Mode ([#240](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/240)) ([486d412](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/486d412)), closes [#231](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/231)
* **Android:** Implement ionic-file and ionic-content urls ([#242](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/242)) ([8ef0c30](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/8ef0c30)), closes [#204](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/204) [#183](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/183)
* **iOS:** Remove GCDWebServer ([#244](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/244)) ([0dee0cf](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/0dee0cf))
* **WebViewLocalServer.java:** return 404 error code when a local file is not found ([#217](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/217)) ([f7a551e](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/f7a551e)), closes [#216](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/216)


### BREAKING CHANGES

* **iOS:** Sets deployment-target to 11, so will only work on iOS 11+

* Address changes
* changes the default from 1 (never) to 0 (always)
* **WebViewLocalServer.java:** Until now, the Android part of the plugin was returning a 200 http code even though
the requested file didn't exist. This behavior was inconsistent with the historical behavior of the
iOS webView. This change makes them both work in the same manner but introduces a breaking change
for the current Android users that are expecting a 200 http code no matter what and are testing the
not found error just by checking if the body is null.

## [2.3.1](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v2.3.0...v2.3.1) (2018-12-06)


### Bug Fixes

* Handle convertFileSrc when using ionic:// scheme ([#236](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/236)) ([89ce899](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/89ce899))

# [2.3.0](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v2.2.5...v2.3.0) (2018-12-05)


### Features

* **ios:** Add URLSchemeHandler for iOS 11+ ([#221](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/221)) ([4a973f4](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/4a973f4))

## [2.2.5](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v2.2.4...v2.2.5) (2018-11-20)


### Bug Fixes

* Add option for Dark keyboard appearance ([#44](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/44)) ([6c0fe56](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/6c0fe56))

## [2.2.4](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v2.2.3...v2.2.4) (2018-11-20)


### Bug Fixes

* fix keyboard displacement bug in iOS 12 WKWebView ([#201](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/201)) ([a670568](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/a670568))

## [2.2.3](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v2.2.2...v2.2.3) (2018-11-09)


### Bug Fixes

* Remove main and fix description ([d52db66](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/d52db66))

## [2.2.2](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v2.2.1...v2.2.2) (2018-11-09)

### Bug Fixes

* Add more server checks before loading urls or reloading ([#211](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/211)) ([60eff2f](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/60eff2f))

## [2.2.1](https://github.com/ionic-team/cordova-plugin-ionic-webview/compare/v2.2.0...v2.2.1) (2018-11-07)


### Bug Fixes

* Show error page if server is not running ([#207](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/207)) ([6a2e07e](https://github.com/ionic-team/cordova-plugin-ionic-webview/commit/6a2e07e))

<a name="2.2.0"></a>
### 2.2.0 (2018-10-04)

* Fix issue where two apps running on the same port could conflict with each other ([#169](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/165) & [#186](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/186))
* Add kitkat support (API 19) ([#144](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/144)) [@leo6104](https://github.com/leo6104)
* Fix issue where local server was being used if launch URL is external ([#169](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/169))

<a name="2.1.4"></a>
### 2.1.4 (2018-09-13)

* Allow Ionic Deploy `DisableDeploy` preference to disable loading of deploy updates ([#172](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/172))

<a name="2.1.3"></a>
### 2.1.3 (2018-09-06)

* Make server path relative ([#164](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/164))

<a name="2.1.2"></a>
### 2.1.2 (2018-09-05)

* Return 404 response when file doesn't exist ([#162](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/162))
* Load local assets if the app is a freshly installed binary ([#155](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/155))
* Reset stored server path on new binary ([#161](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/161))

<a name="2.1.1"></a>
### 2.1.1 (2018-09-04)

* Allow range requests for local files ([#154](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/154))

<a name="2.1.0"></a>
### 2.1.0 (2018-08-23)

* Add support for `cordova-android` 6 ([#150](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/150))

<a name="2.0.3"></a>
### 2.0.3 (2018-08-14)

* Fix nil reference by setting up the server URL before routes are set up. ([#135](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/135)) [@matejkramny](https://github.com/matejkramny)
* Resolve issue when app is launched in background. ([#124](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/124)) [@ghenry22](https://github.com/ghenry22)

<a name="2.0.2"></a>
### 2.0.2 (2018-07-30)

* Immediately load new server base path upon setting it. ([#132](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/132))

<a name="2.0.1"></a>
### 2.0.1 (2018-07-25)

* Avoid "not modified" response on iOS by always overriding last modified date. ([#127](https://github.com/ionic-team/cordova-plugin-ionic-webview/pull/127))

<a name="2.0.0"></a>
### 2.0.0 (2018-07-23)

* **BREAKING**: HTTP server now runs for iOS **and** Android, instead of just iOS. The server is configured the same for both platforms.
* **BREAKING**: HTTP server now loads the app from a base href of `/`. The app URL behaves like `http://localhost:8080/index.html` instead of `http://localhost:8080/Users/.../index.html`.
* **BREAKING**: HTTP server is configured to run in HTML5 routing mode (push state) by default.
* **BREAKING**: File access through the Web View must be served by the HTTP server to avoid security errors in the Web View. Loading files via `file://` is not allowed by the Web View. The HTTP server will serve files via the `_file_` prefix, e.g. `http://localhost:8080/_file_/Users/.../file.png`.
* `window.Ionic.normalizeURL()` has been deprecated. Use `window.Ionic.WebView.convertFileSrc()`.
* iOS update HTTP server to latest upstream version (GCDwebserve 3.4.2)
* iOS update HTTP server to restart sockets with error state when resuming from background
* iOS enable HTTP server to continue running in background if the webview is running.
* iOS enable Webview to continue running in background. Requires background mode capability enabled in xcode + valid use case as per app store requirements. If your app is not performing valid background tasks it will still be suspended by the OS as usual. As long as valid background tasks are running the webview will continue to function as expected.
* iOS add config.xml options:
    * WKSuspendInBackground - defaults to true, if set to false then the webview and HTTP server will continue to run when the app is in the background or screen is locked
    * WKPort - defaults to 8080, define the port that the HTTP server will listen on
    * WKBind - defaults to localhost, if set to 127.0.0.1 then this IP will be used instead of the localhost hostname for the HTTP server

See [Github releases](https://github.com/ionic-team/cordova-plugin-ionic-webview/releases) for earlier changes.
