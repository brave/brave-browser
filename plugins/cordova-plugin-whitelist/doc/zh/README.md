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

這個外掛程式實現一個用於導航在科爾多瓦 4.0 應用程式 web 視圖的白名單策略

## 支援的科爾多瓦平臺

  * Android 4.0.0 或以上
  * iOS 4.0.0 或以上

## 導航白名單

控制 web 視圖本身可以導航到的 Url。適用于頂級導航只。

怪癖: 在 Android 上它也適用于 iframe 的非-結計畫。

預設情況下，只有到`file://` Url 導航允許。若要允許其他其他 Url，必須將`<allow-navigation>`標籤添加到您的`config.xml`:

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
    

## 科爾多瓦-外掛程式-白名單

控制應用程式允許讓系統打開的 Url。 預設情況下，沒有外部 Url 允許。

在 android 系統，這相當於發送類型 BROWSEABLE 的意圖。

此白名單並不適用于只超連結和對`window.open ()`調用的外掛程式.

在`config.xml`中添加`<allow-intent>`標籤，像這樣:

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
    

## 網路請求白名單

網路請求的控制項 (圖像，XHRs 等) 允許 (通過科爾多瓦本機掛鉤)。

注意: 我們建議你使用內容的安全性原則 (見下文)，這是更安全。 此白名單大多是為 webviews 不支援 CSP 的歷史。

在`config.xml`中添加`<access>`標記，像這樣:

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
    

沒有任何`<access>`標籤，只到`file://` Url 允許請求。 但是，預設的科爾多瓦應用程式包括`<access origin="*">` ，預設情況。

怪癖: Android 還允許對 HTTPs://ssl.gstatic.com/accessibility/javascript/android/ 請求預設情況下，因為這是對講正常所需。

### 內容安全政策

網路請求的控制項 (圖像，XHRs 等) 允許 (通過 web 視圖直接)。

對 Android 和 iOS，網路請求白名單 (見上文) 是不能夠過濾所有類型的請求 (例如`<video>` & Websocket 未被阻止)。 那麼，除了白名單中，你應使用[內容安全性原則](http://content-security-policy.com/) `< 元 >`標記您的所有頁面。

在 android 系統，對 CSP 系統 web 視圖的支援開始奇巧 (但是是上使用 web 視圖人行橫道上的所有版本可用)。

下面是一些示例 CSP 聲明為`.html`頁面:

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