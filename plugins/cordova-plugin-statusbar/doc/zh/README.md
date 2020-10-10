<!---
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

# cordova-plugin-statusbar

[![Build Status](https://travis-ci.org/apache/cordova-plugin-statusbar.svg)](https://travis-ci.org/apache/cordova-plugin-statusbar)

# StatusBar

> `StatusBar`物件提供了一些功能，自訂的 iOS 和 Android 狀態列。

## 安裝

    cordova plugin add cordova-plugin-statusbar
    

## 首選項

#### config.xml

  * **StatusBarOverlaysWebView**（布林值，預設值為 true）。在 iOS 7，使狀態列覆蓋或不覆蓋 web 視圖在啟動時。
    
        <preference name="StatusBarOverlaysWebView" value="true" />
        

  * **StatusBarBackgroundColor**(顏色十六進位字串，預設值為 #000000)。IOS 7 和 Android 5，由十六進位字串 (#RRGGBB) 在啟動時設置狀態列的背景色。
    
        <preference name="StatusBarBackgroundColor" value="#000000" />
        

  * **狀態列**（狀態列樣式，預設值為 lightcontent）。在 iOS 7，設置的狀態橫條圖樣式。可用的選項預設，lightcontent，blacktranslucent，blackopaque。
    
        <preference name="StatusBarStyle" value="lightcontent" />
        

### Android 的怪癖

Android 的 5 + 準則指定使用不同的顏色比您主要的應用程式狀態欄顏色 (不像很多 iOS 7 + 應用程式的統一狀態列顏色)，所以你可能想要設置在運行時顯示狀態列顏色而不是通過`StatusBar.backgroundColorByHexString`或`StatusBar.backgroundColorByName`。 一個的方式做到這一點將是:

```js
if (cordova.platformId == 'android') {
    StatusBar.backgroundColorByHexString("#333");
}
```

## 在啟動時隱藏

在運行時期間，你可以使用 StatusBar.hide 函數下面，但如果你想要顯示狀態列隱藏在應用程式啟動時，你必須修改你的應用程式的 Info.plist 檔。

添加編輯這兩個屬性，如果不存在。 將**"狀態列最初隱藏"**設置為**"YES"**和**"視圖基於控制器的狀態列外觀"**設置為**"否"**。 如果您手動編輯它沒有 Xcode，鍵和值是：

    <key>UIStatusBarHidden</key>
    <true/>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
    

## 方法

這個外掛程式定義全域 `StatusBar` 物件。

雖然在全球範圍內，它不可用直到 `deviceready` 事件之後。

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(StatusBar);
    }
    

  * StatusBar.overlaysWebView
  * StatusBar.styleDefault
  * StatusBar.styleLightContent
  * StatusBar.styleBlackTranslucent
  * StatusBar.styleBlackOpaque
  * StatusBar.backgroundColorByName
  * StatusBar.backgroundColorByHexString
  * StatusBar.hide
  * StatusBar.show

## 屬性

  * StatusBar.isVisible

## 許可權

#### config.xml

            <feature name="StatusBar">
                <param name="ios-package" value="CDVStatusBar" onload="true" />
            </feature>
    

# StatusBar.overlaysWebView

在 iOS 7，使狀態列覆蓋或不覆蓋 web 視圖。

    StatusBar.overlaysWebView(true);
    

## 說明

在 iOS 7，設置為 false，使狀態列出現像 iOS 6。設置樣式和背景顏色，適合使用其他函數。

## 支援的平臺

  * iOS

## 快速的示例

    StatusBar.overlaysWebView(true);
    StatusBar.overlaysWebView(false);
    

# StatusBar.styleDefault

使用預設狀態列 （淺色背景深色文本）。

    StatusBar.styleDefault();
    

## 支援的平臺

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.styleLightContent

使用 lightContent 狀態列 （深色背景光文本）。

    StatusBar.styleLightContent();
    

## 支援的平臺

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.styleBlackTranslucent

使用 blackTranslucent 狀態列 （深色背景光文本）。

    StatusBar.styleBlackTranslucent();
    

## 支援的平臺

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.styleBlackOpaque

使用 blackOpaque 狀態列 （深色背景光文本）。

    StatusBar.styleBlackOpaque();
    

## 支援的平臺

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.backgroundColorByName

在 iOS 7，當您將 StatusBar.statusBarOverlaysWebView 設置為 false，你可以設置狀態列的背景色的顏色名稱。

    StatusBar.backgroundColorByName("red");
    

支援的顏色名稱是：

    black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
    

## 支援的平臺

  * iOS
  * Android 5+
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.backgroundColorByHexString

由十六進位字串設置狀態列的背景色。

    StatusBar.backgroundColorByHexString("#C0C0C0");
    

此外支援 CSS 速記屬性。

    StatusBar.backgroundColorByHexString("#333"); // => #333333
    StatusBar.backgroundColorByHexString("#FAB"); // => #FFAABB
    

在 iOS 7，當將 StatusBar.statusBarOverlaysWebView 設置為 false，您可以設置狀態列的背景色由十六進位字串 （#RRGGBB）。

WP7 和 WP8 您還可以指定值為 #AARRGGBB，其中 AA 是 Alpha 值

## 支援的平臺

  * iOS
  * Android 5+
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.hide

隱藏狀態列。

    StatusBar.hide();
    

## 支援的平臺

  * iOS
  * Android 系統
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.show

顯示狀態列。

    StatusBar.show();
    

## 支援的平臺

  * iOS
  * Android 系統
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.isVisible

讀取此屬性，以查看狀態列是否可見。

    if (StatusBar.isVisible) {
        // do something
    }
    

## 支援的平臺

  * iOS
  * Android 系統
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1