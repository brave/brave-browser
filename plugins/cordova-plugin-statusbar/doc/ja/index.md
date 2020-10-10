<!---
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
-->

# cordova-plugin-statusbar

# StatusBar

> `StatusBar`オブジェクトは、iOS と Android ステータス バーをカスタマイズするいくつかの機能を提供します。

## インストール

    cordova plugin add cordova-plugin-statusbar
    

## 基本設定

#### config.xml

*   **StatusBarOverlaysWebView**(ブール値、デフォルトは true)。IOS 7、起動時にステータスバー オーバーレイまたはないオーバーレイ、WebView を作る。
    
        <preference name="StatusBarOverlaysWebView" value="true" />
        

*   **StatusBarBackgroundColor**（色 16 進文字列、デフォルトは ＃ 000000）。Ios 7、起動時に 16 進文字列 (#RRGGBB) でステータス バーの背景色を設定します。
    
        <preference name="StatusBarBackgroundColor" value="#000000" />
        

*   **StatusBarStyle**(ステータス バーのスタイル、既定値は lightcontent)。Ios 7、ステータス バーのスタイルを設定します。使用可能なオプションのデフォルト、lightcontent、blacktranslucent、blackopaque。
    
        <preference name="StatusBarStyle" value="lightcontent" />
        

## 起動時に非表示

実行時に下に、StatusBar.hide 関数を使用できますが、StatusBar アプリ起動時に非表示にする場合は、アプリの Info.plist ファイルを変更する必要があります。

これら 2 つの属性の追加/編集存在しない場合。 **「ステータス バーが非表示最初」** **"YES"**を設定し、 **「ビュー コント ローラー ベースのステータス バーの外観」** **"NO"**にします。 Xcode せず手動で編集する、キーと値は。

    <key>UIStatusBarHidden</key>
    <true/>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
    

## メソッド

このプラグインでは、グローバル `StatusBar` オブジェクトを定義します。

グローバル スコープではあるがそれがないまで `deviceready` イベントの後です。

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(StatusBar);
    }
    

*   StatusBar.overlaysWebView
*   StatusBar.styleDefault
*   StatusBar.styleLightContent
*   StatusBar.styleBlackTranslucent
*   StatusBar.styleBlackOpaque
*   StatusBar.backgroundColorByName
*   StatusBar.backgroundColorByHexString
*   StatusBar.hide
*   StatusBar.show

## プロパティ

*   StatusBar.isVisible

## アクセス許可

#### config.xml

            <feature name="StatusBar">
                <param name="ios-package" value="CDVStatusBar" onload="true" />
            </feature>
    

# StatusBar.overlaysWebView

IOS 7、statusbar オーバーレイまたはない WebView をオーバーレイします。

    StatusBar.overlaysWebView(true);
    

## 解説

IOS 7、iOS の 6 のように表示されるステータスバーを false に設定します。他の関数の使用に合わせてスタイルや背景色を設定します。

## サポートされているプラットフォーム

*   iOS

## 簡単な例

    StatusBar.overlaysWebView(true);
    StatusBar.overlaysWebView(false);
    

# StatusBar.styleDefault

既定ステータス バー (暗いテキスト、淡色の背景) を使用します。

    StatusBar.styleDefault();
    

## サポートされているプラットフォーム

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleLightContent

LightContent ステータスバー (暗い背景の明るいテキスト） を使用します。

    StatusBar.styleLightContent();
    

## サポートされているプラットフォーム

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleBlackTranslucent

BlackTranslucent ステータスバー (暗い背景の明るいテキスト） を使用します。

    StatusBar.styleBlackTranslucent();
    

## サポートされているプラットフォーム

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleBlackOpaque

BlackOpaque ステータスバー (暗い背景の明るいテキスト） を使用します。

    StatusBar.styleBlackOpaque();
    

## サポートされているプラットフォーム

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.backgroundColorByName

Ios 7、StatusBar.statusBarOverlaysWebView を false に設定する場合はステータスバーの背景色の色の名前によって設定できます。

    StatusBar.backgroundColorByName("red");
    

サポートされている色の名前は次のとおりです。

    black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
    

## サポートされているプラットフォーム

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.backgroundColorByHexString

16 進文字列をステータス バーの背景色を設定します。

    StatusBar.backgroundColorByHexString("#C0C0C0");
    

速記の CSS プロパティもサポートされています。

    StatusBar.backgroundColorByHexString("#333"); // => #333333
    StatusBar.backgroundColorByHexString("#FAB"); // => #FFAABB
    

Ios 7、StatusBar.statusBarOverlaysWebView を false に設定する場合はステータスバーの背景色を 16 進文字列 (#RRGGBB) で設定できます。

WP7 と WP8 も指定できます値 #AARRGGBB, AA は、アルファ値として

## サポートされているプラットフォーム

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.hide

ステータスバーを隠します。

    StatusBar.hide();
    

## サポートされているプラットフォーム

*   iOS
*   アンドロイド
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.show

ステータス バーが表示されます。

    StatusBar.show();
    

## サポートされているプラットフォーム

*   iOS
*   アンドロイド
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.isVisible

このプロパティ、ステータスバーが表示されるかどうかをお読みください。

    if (StatusBar.isVisible) {
        // do something
    }
    

## サポートされているプラットフォーム

*   iOS
*   アンドロイド
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1
