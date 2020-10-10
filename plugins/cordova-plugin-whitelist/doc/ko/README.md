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

이 플러그인 구현 코르도바 4.0 응용 프로그램 webview를 탐색에 대 한 허용 정책

## 지원된 코르도바 플랫폼

  * 안 드 로이드 4.0.0 이상
  * iOS 4.0.0 이상

## 탐색 허용

WebView 자체가 탐색할 수 있는 Url을 제어 합니다. 최상위 탐색에만 적용 됩니다.

단점: 안 드 로이드에도 적용 됩니다 iframe에 대 한 비-프로토콜인 계획.

기본적으로 탐색 `file://` Url에만 사용할 수 있습니다. 다른 다른 Url을 허용 하려면 `config.xml`에 `< allow-navigation >` 태그를 추가 해야 합니다.

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
    

## 의도 허용

App 시스템 열을 게 허용 되는 Url을 제어 합니다. 기본적으로 외부 Url은 사용할 수 있습니다.

안 드 로이드에이 형식의 BROWSEABLE 의도 보내는 것 같습니다.

이 허용 된 플러그인, 하이퍼링크 및 `window.open ()` 호출에 적용 되지 않습니다..

`Config.xml`에이 같은 `< allow-intent >` 태그를 추가 합니다.

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
    

## 네트워크 요청 허용

요청을 네트워크 컨트롤 (이미지, XHRs, 등) (코르도바 네이티브 후크)를 통해 할 수 있습니다.

참고: 당신이 사용 콘텐츠 보안 정책 (아래 참조), 더 안전한 것이 좋습니다. 이 허용은 CSP를 지원 하지 않는 webviews에 대 한 역사적.

`Config.xml`에이 같은 `< access >` 태그를 추가 합니다.

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
    

어떤 `< access >` 태그 없이 요청 `file://` Url 사용할 수 있습니다. 그러나 기본 코르도바 응용 프로그램을 포함 하는, `< access origin="*" >` 기본적으로.

특질: 안 드 로이드 또한 수 있습니다 요청을 https://ssl.gstatic.com/accessibility/javascript/android/ 기본적으로 필요 제대로 작동 하려면 의견 이므로.

### 콘텐츠 보안 정책

요청을 네트워크 컨트롤 (이미지, XHRs, 등) (webview 직접)를 통해 할 수 있습니다.

안 드 로이드와 iOS에 네트워크 요청 허용 (위 참조)는 모든 종류의 요청 (예: `< 비디오 >` & WebSockets 차단 되지 않습니다)를 필터링 할 수 없습니다. 그래서, 허용, 뿐만 아니라 귀하의 모든 페이지에 [콘텐츠 보안 정책](http://content-security-policy.com/) `< meta >` 태그를 사용 해야 합니다.

안 드 로이드, 시스템 webview 내에서 CSP에 대 한 지원을 KitKat 시작 (하지만 횡단 보도 WebView를 사용 하 여 모든 버전에서 사용할 수).

다음은 `.html` 페이지에 대 한 몇 가지 예제 CSP 선언입니다.

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