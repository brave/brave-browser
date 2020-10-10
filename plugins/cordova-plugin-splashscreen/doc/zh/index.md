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

# cordova-plugin-splashscreen

這個外掛程式顯示和隱藏在應用程式啟動期間的初始螢幕。

## 安裝

    cordova plugin add cordova-plugin-splashscreen
    

## 支援的平臺

*   亞馬遜火 OS
*   Android 系統
*   黑莓 10
*   iOS
*   Windows Phone 7 和 8
*   Windows 8

## 方法

*   splashscreen.show
*   splashscreen.hide

### Android 的怪癖

在你的 config.xml，您需要添加以下優惠：

    <preference name="SplashScreen" value="foo" />
    <preference name="SplashScreenDelay" value="10000" />
    

美孚在哪裡閃屏檔，最好是 9 修補程式檔的名稱。 請確保您的 splashcreen 檔添加到 res/xml 目錄下相應的資料夾。 第二個參數表示多久閃屏會顯示以毫秒為單位。 它將預設為 3000 毫秒。 有關更多資訊，請參見 [圖示和啟動畫面][1]。

 [1]: http://cordova.apache.org/docs/en/edge/config_ref_images.md.html

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
    

您的應用程式無法調用 `navigator.splashscreen.show()`，直到該應用程式已啟動，且觸發了 `deviceready` 事件。 但是，由於通常的閃屏為了是可見的在您的應用程式啟動之前，這似乎會打敗閃屏的目的。 提供一些配置在 `config.xml` 中的會自動 `show` 初始螢幕您的應用程式啟動後立即和之前它已經完全起步並收到 `deviceready` 事件。 做這種配置的詳細資訊，請參閱 [圖示和啟動畫面][1]。 出於此原因，不太可能您需要調用 `navigator.splashscreen.show()`，使初始螢幕可見為應用程式啟動。
