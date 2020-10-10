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

# cordova-plugin-whitelist

このプラグイン実装コルドバ 4.0 アプリケーション webview をナビゲートするためのホワイト リスト ポリシー

## サポートされているコルドバのプラットフォーム

  * アンドロイド 4.0.0 以上
  * iOS 4.0.0 以上

## ナビゲーションのホワイト リスト

WebView 自体に移動に Url を制御します。最上位ナビゲーションのみに適用されます。

癖: Android にもに適用されますの iframe 非-[http スキーム。

既定では、ナビゲーション、 `file://`の Url にのみ許可されます。その他の他の Url を許可するように、 `config.xml`に`<allow-navigation>`タグを追加する必要があります。

    <!-- Allow links to example.com -->
    <allow-navigation href="http://example.com/*" />
    
    <!-- Wildcards are allowed for the protocol, as a prefix
         to the host, or as a suffix to the path -->
    <allow-navigation href="*://*.example.com/*" />
    
    <!-- A wildcard can be used to whitelist the entire network,
         over HTTP and HTTPS.
         *NOT RECOMMENDED* -->
    <allow-navigation href="*" />
    
    <!-- The above is equivalent to these three declarations -->
    <allow-navigation href="http://*/*" />
    <allow-navigation href="https://*/*" />
    <allow-navigation href="data:*" />
    

## インテントのホワイト リスト

どの Url を開くようにシステムを聞いて、アプリに許可を制御します。 既定では、外部 Url 許可されません。

人造人間、これは型 BROWSEABLE の意図を送信することに相当します。

このホワイト リストはプラグインのみハイパーリンクおよび`window.open()`への呼び出しには適用されません。.

`Config.xml`内の`<allow-intent>`タグは、このようなを追加します。

    <!-- Allow links to web pages to open in a browser -->
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    
    <!-- Allow links to example.com to open in a browser -->
    <allow-intent href="http://example.com/*" />
    
    <!-- Wildcards are allowed for the protocol, as a prefix
         to the host, or as a suffix to the path -->
    <allow-intent href="*://*.example.com/*" />
    
    <!-- Allow SMS links to open messaging app -->
    <allow-intent href="sms:*" />
    
    <!-- Allow tel: links to open the dialer -->
    <allow-intent href="tel:*" />
    
    <!-- Allow geo: links to open maps -->
    <allow-intent href="geo:*" />
    
    <!-- Allow all unrecognized URLs to open installed apps
         *NOT RECOMMENDED* -->
    <allow-intent href="*" />
    

## ネットワーク要求のホワイト リスト

ネットワーク要求コントロール (画像、XHRs 等) (コルドバ ネイティブ フック) を介して行われることが。

注: より安全なコンテンツ セキュリティ ポリシー (下記参照) を使用してお勧めします。 このホワイト リストほとんどの CSP をサポートしていない web 表示のために歴史的です。

`Config.xml`内のこのような`<access>`タグを追加します。

    <!-- Allow images, xhrs, etc. to google.com -->
    <access origin="http://google.com" />
    <access origin="https://google.com" />
    
    <!-- Access to the subdomain maps.google.com -->
    <access origin="http://maps.google.com" />
    
    <!-- Access to all the subdomains on google.com -->
    <access origin="http://*.google.com" />
    
    <!-- Enable requests to content: URLs -->
    <access origin="content:///*" />
    
    <!-- Don't block any requests -->
    <access origin="*" />
    

`<access>`タグ、なし`file://` Url に要求のみを許可します。 ただし、既定のコルドバ アプリケーションが含まれています`<access origin="*">`デフォルトで。

気まぐれ: アンドロイドも要求できます https://ssl.gstatic.com/accessibility/javascript/android/デフォルトでは、トークが正常に機能するために必要ですので。

### コンテンツのセキュリティ ポリシー

ネットワーク要求コントロール (画像、XHRs 等) (直接 webview) を介して行われることが。

Android と iOS は、ネットワーク要求ホワイト リスト (上記参照) はすべての種類の要求 (例: `< ビデオ >` & Websocket がふさがれていない) をフィルター処理できません。 だから、ホワイト リストに加えてすべてのページに[コンテンツ セキュリティ ポリシー](http://content-security-policy.com/) `< meta >`タグを使用する必要があります。

Android 上システム webview 内 CSP サポート キットカットから始まります (しかし横断歩道 WebView を使用してすべてのバージョンで利用可能です)。

`.Html`ページのいくつかの例 CSP の宣言は次のとおりです。

    <!-- Good default declaration:
        * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
        * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
        * Disables use of eval() and inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
            * Enable inline JS: add 'unsafe-inline' to default-src
            * Enable eval(): add 'unsafe-eval' to default-src
    -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *">
    
    <!-- Allow requests to foo.com -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' foo.com">
    
    <!-- Enable all requests, inline styles, and eval() -->
    <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'">
    
    <!-- Allow XHRs via https only -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' https:">
    
    <!-- Allow iframe to https://cordova.apache.org/ -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; frame-src 'self' https://cordova.apache.org">