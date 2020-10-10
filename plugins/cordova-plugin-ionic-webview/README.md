<!--
# license: Licensed to the Apache Software Foundation (ASF) under one
#         or more contributor license agreements.  See the NOTICE file
#         distributed with this work for additional information
#         regarding copyright ownership.  The ASF licenses this file
#         to you under the Apache License, Version 2.0 (the
#         "License"); you may not use this file except in compliance
#         with the License.  You may obtain a copy of the License at
#
#           http://www.apache.org/licenses/LICENSE-2.0
#
#         Unless required by applicable law or agreed to in writing,
#         software distributed under the License is distributed on an
#         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#         KIND, either express or implied.  See the License for the
#         specific language governing permissions and limitations
#         under the License.
-->

<!-- TODO: remove beta in README.md and CONTRIBUTING.md -->

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&identifier=104773211)](https://dependabot.com)
[![npm](https://img.shields.io/npm/v/cordova-plugin-ionic-webview.svg)](https://www.npmjs.com/package/cordova-plugin-ionic-webview)

# Ionic Web View for Cordova

A Web View plugin for Cordova, focused on providing the highest performance experience for Ionic apps (but can be used with any Cordova app).

This plugin uses WKWebView on iOS and the latest evergreen webview on Android. Additionally, this plugin makes it easy to use HTML5 style routing that web developers expect for building single-page apps.

Note: This repo and its documentation are for `cordova-plugin-ionic-webview` @ `4.x`, which uses the new features that may not work with all apps. See [Requirements](#plugin-requirements) and [Migrating to 4.x](#migrating-to-4x).

2.x documentation can be found [here](https://github.com/ionic-team/cordova-plugin-ionic-webview/blob/2.x/README.md).

:book: **Documentation**: [https://beta.ionicframework.com/docs/building/webview][ionic-webview-docs]

:mega: **Support/Questions?** Please see our [Support Page][ionic-support] for general support questions. The issues on GitHub should be reserved for bug reports and feature requests.

:sparkling_heart: **Want to contribute?** Please see [CONTRIBUTING.md](https://github.com/ionic-team/cordova-plugin-ionic-webview/blob/master/CONTRIBUTING.md).

## Configuration

This plugin has several configuration options that can be set in `config.xml`.

### Android and iOS Preferences

Preferences available for both iOS and Android

#### Hostname

`<preference name="Hostname" value="app" />`

Default value is `localhost`.

Example `ionic://app` on iOS, `http://app` on Android.

If you change it, you'll need to add a new `allow-navigation` entry in the `config.xml` for the configured url (i.e `<allow-navigation href="http://app/*"/>` if `Hostname` is set to `app`).
This is only needed for the Android url when using `http://`, `https://` or a custom scheme. All `ionic://` urls are whitelisted by the plugin.

### Android Preferences

Preferences only available Android platform

#### Scheme

```xml
<preference name="Scheme" value="https" />
```

Default value is `http`

Configures the Scheme the app uses to load the content.

#### ResolveServiceWorkerRequests

```xml
<preference name="ResolveServiceWorkerRequests" value="true" />
```

Default value is `false`

Enable to resolve requests made by Service Workers through the local server.

#### MixedContentMode

```xml
<preference name="MixedContentMode" value="2" />
```

Configures the WebView's behavior when an origin attempts to load a resource from a different origin.

Default value is `0` (`MIXED_CONTENT_ALWAYS_ALLOW`), which allows loading resources from other origins.

Other possible values are `1` (`MIXED_CONTENT_NEVER_ALLOW`) and `2` (`MIXED_CONTENT_COMPATIBILITY_MODE`)


[Android documentation](https://developer.android.com/reference/android/webkit/WebSettings.html#setMixedContentMode(int))


### iOS Preferences

Preferences only available for iOS platform

#### iosScheme

```xml
<preference name="iosScheme" value="httpsionic" />
```

Default value is `ionic`

Configures the Scheme the app uses to load the content.

Values like `http`, `https` or `file` are not valid and will use default value instead.

If you change it, you'll need to add a new `allow-navigation` entry in the `config.xml` for the configured scheme (i.e `<allow-navigation href="httpsionic://*"/>` if `iosScheme` is set to `httpsionic`).

#### WKSuspendInBackground

 ```xml
<preference name="WKSuspendInBackground" value="false" />
```

Default value is `true` (suspend).

Set to false to stop WKWebView suspending in background too eagerly.

#### KeyboardAppearanceDark

```xml
<preference name="KeyboardAppearanceDark" value="false" />
```

Whether to use a dark styled keyboard on iOS

#### ScrollEnabled

```xml
<preference name="ScrollEnabled" value="true" />
```

Ionic apps work better if the WKWebView is not scrollable, so the scroll is disabled by default, but can be enabled with this preference. This only affects the main ScrollView of the WKWebView, so only affects the body, not other scrollable components.

## Plugin Requirements

* **Cordova CLI**: 7.1.0+
* **iOS**: iOS 11+ and `cordova-ios` 4+
* **Android**: Android 4.4+ and `cordova-android` 6.4+

## Migrating to 4.x

1. Remove and re-add the Web View plugin:

    ```
    cordova plugin rm cordova-plugin-ionic-webview
    cordova plugin add cordova-plugin-ionic-webview@latest
    ```

1. Apps are now served from HTTP on Android by default.

    * The default origin for requests from the Android WebView is `http://localhost`. If `Hostname` and `Scheme` preferences are set, then origin will be `schemeValue://HostnameValue`.

1. Apps are now served from `ionic://` scheme on iOS by default.

    * The default origin for requests from the iOS WebView is `ionic://localhost`. If `Hostname` and `iosScheme` preferences are set, then origin will be `iosSchemeValue://HostnameValue`.

1. The WebView is not able to display images, videos or other files from file or content protocols or if it doesn't have protocol at all. For those cases use `window.Ionic.WebView.convertFileSrc()` to get the proper url.

1. Replace any usages of `window.Ionic.normalizeURL()` with `window.Ionic.WebView.convertFileSrc()`.

    * For Ionic Angular projects, there is an [Ionic Native wrapper](https://beta.ionicframework.com/docs/native/ionic-webview):

        ```
        npm install @ionic-native/ionic-webview@beta
        ```

[ionic-homepage]: https://ionicframework.com
[ionic-docs]: https://ionicframework.com/docs
[ionic-webview-docs]: https://beta.ionicframework.com/docs/building/webview
[ionic-support]: https://ionicframework.com/support
