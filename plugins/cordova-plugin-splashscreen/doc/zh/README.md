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

# cordova-plugin-splashscreen

[![Build Status](https://travis-ci.org/apache/cordova-plugin-splashscreen.svg)](https://travis-ci.org/apache/cordova-plugin-splashscreen)

這個外掛程式顯示和隱藏在應用程式啟動期間的初始螢幕。

## 安裝

    // npm hosted (new) id
    cordova plugin add cordova-plugin-splashscreen
    // you may also install directly from this repo
    cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git
    

## 支援的平臺

  * 亞馬遜火 OS
  * Android 系統
  * 黑莓 10
  * iOS
  * Windows Phone 7 和 8
  * Windows 8
  * Windows
  * 瀏覽器

## 方法

  * splashscreen.show
  * splashscreen.hide

### Android 的怪癖

在你的`config.xml`，您需要添加以下優惠:

    <preference name="SplashScreen" value="foo" />
    <preference name="SplashScreenDelay" value="10000" />
    <preference name="SplashMaintainAspectRatio" value="true|false" />
    

美孚在哪裡閃屏檔，最好是 9 修補程式檔的名稱。 請確保您的 splashcreen 檔添加到 res/xml 目錄下相應的資料夾。 第二個參數表示多久閃屏會顯示以毫秒為單位。 它將預設為 3000 毫秒。 有關更多資訊，請參見 [圖示和啟動畫面](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html)。

"SplashMaintainAspectRatio"首選項是可選的。 如果設置為 true，可繪製的初始螢幕不會拉伸以適合螢幕，但相反只是"覆蓋"螢幕，像 CSS"背景-大小: 蓋"。 這是非常有用的不能以任何方式，例如當他們包含文本或風景畸變閃屏圖像時。 此設置適用于有大利潤 (安全區)，可以安全地裁剪不同長寬比與螢幕上的圖像。

該外掛程式重新載入初始可繪製只要方向發生變化，所以您可以指定不同的畫板為縱向和橫向方向。

### 瀏覽器的怪癖

你可以用你的`config.xml`下列優先選項:

    <platform name="browser">
        <preference name="SplashScreen" value="images/browser/splashscreen.jpg" /> <!-- defaults to "img/logo.png" -->
        <preference name="SplashScreenDelay" value="10000" /> <!-- defaults to "3000" -->
        <preference name="SplashScreenBackgroundColor" value="green" /> <!-- defaults to "#464646" -->
        <preference name="ShowSplashScreen" value="false" /> <!-- defaults to "true" -->
        <preference name="SplashScreenWidth" value="600" /> <!-- defaults to "170" -->
        <preference name="SplashScreenHeight" value="300" /> <!-- defaults to "200" -->
    </platform>
    

### iOS 的怪癖

  * `FadeSplashScreen`(預設為`true`的布林值): 設置為`false` ，以防止出現閃屏衰落和退出其顯示狀態發生變化時。
    
        <preference name="FadeSplashScreen" value="false"/>
        

  * `FadeSplashScreenDuration`(float，預設為`2`): 指定的閃屏秒數淡出效果來執行。
    
        <preference name="FadeSplashScreenDuration" value="4"/>
        

  * `ShowSplashScreenSpinner`(boolean, `true`的布林值): 設置為`false`來隱藏初始螢幕微調框。
    
        <preference name="ShowSplashScreenSpinner" value="false"/>
        

## splashscreen.hide

解雇的閃屏。

    navigator.splashscreen.hide();
    

### 黑莓 10，WP8，iOS 怪癖

`config.xml` 檔 `AutoHideSplashScreen` 設置必須是 `假` 的。 若要延遲兩秒鐘隱藏的閃屏，`deviceready` 事件處理常式中添加一個計時器，如下所示：

        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);
    

## splashscreen.show

顯示初始螢幕。

    navigator.splashscreen.show();
    

您的應用程式無法調用 `navigator.splashscreen.show()`，直到該應用程式已啟動，且觸發了 `deviceready` 事件。 但是，由於通常的閃屏為了是可見的在您的應用程式啟動之前，這似乎會打敗閃屏的目的。 提供一些配置在 `config.xml` 中的會自動 `show` 初始螢幕您的應用程式啟動後立即和之前它已經完全起步並收到 `deviceready` 事件。 做這種配置的詳細資訊，請參閱 [圖示和啟動畫面](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html)。 出於此原因，不太可能您需要調用 `navigator.splashscreen.show()`，使初始螢幕可見為應用程式啟動。