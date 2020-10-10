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

> `StatusBar`개체 iOS와 안 드 로이드 상태 표시줄을 사용자 지정 하려면 몇 가지 기능을 제공 합니다.

## 설치

    cordova plugin add cordova-plugin-statusbar
    

## 환경 설정

#### config.xml

*   **StatusBarOverlaysWebView** (boolean, 기본값: true)입니다. IOS 7, 시작 시 상태 표시줄 오버레이 또는 WebView 중첩 되지 확인 합니다.
    
        <preference name="StatusBarOverlaysWebView" value="true" />
        

*   **StatusBarBackgroundColor** (색상 16 진수 문자열 기본값: #000000). Ios 7, 시작 시 16 진수 문자열 (#RRGGBB) 상태 표시줄의 배경색을 설정 합니다.
    
        <preference name="StatusBarBackgroundColor" value="#000000" />
        

*   **StatusBarStyle** (상태 표시줄 스타일, 기본값: lightcontent). Ios 7, 상태 표시줄 스타일을 설정 합니다. 사용 가능한 옵션 기본, lightcontent, blacktranslucent, blackopaque.
    
        <preference name="StatusBarStyle" value="lightcontent" />
        

## 시작 시 숨기기

런타임 동안 아래의 StatusBar.hide 함수를 사용할 수 있습니다 하지만 당신이 원하는 응용 프로그램 시작 시 숨겨진 상태 표시줄, 응용 프로그램의 Info.plist 파일 수정 해야 합니다.

추가 편집이 두 특성이 없는 경우. **"상태 표시줄 처음 숨겨진"** **"YES"** 로 설정 하 고 **"뷰 컨트롤러 기반 상태 표시줄 모양"** **"NO"**로 설정 합니다. Xcode, 열쇠 없이 수동으로 편집 하는 경우 값은:

    <key>UIStatusBarHidden</key>
    <true/>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
    

## 메서드

이 플러그인 글로벌 `StatusBar` 개체를 정의합니다.

전역 범위에 있지만 그것은 불가능까지 `deviceready` 이벤트 후.

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

## 속성

*   StatusBar.isVisible

## 사용 권한

#### config.xml

            <feature name="StatusBar">
                <param name="ios-package" value="CDVStatusBar" onload="true" />
            </feature>
    

# StatusBar.overlaysWebView

IOS 7, 오버레이 또는 하지 WebView 중첩 상태 표시줄을 확인 합니다.

    StatusBar.overlaysWebView(true);
    

## 설명

7 iOS, iOS 6 처럼 나타나는 상태 표시줄을 false로 설정 합니다. 다른 함수를 사용 하 여에 맞게 스타일과 배경 색상을 설정 합니다.

## 지원 되는 플랫폼

*   iOS

## 빠른 예제

    StatusBar.overlaysWebView(true);
    StatusBar.overlaysWebView(false);
    

# StatusBar.styleDefault

기본 상태 표시줄 (어두운 텍스트, 밝은 배경에 대 한)를 사용 합니다.

    StatusBar.styleDefault();
    

## 지원 되는 플랫폼

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleLightContent

LightContent 상태 표시줄 (어두운 배경에 대 한 가벼운 텍스트)을 사용 합니다.

    StatusBar.styleLightContent();
    

## 지원 되는 플랫폼

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleBlackTranslucent

BlackTranslucent 상태 표시줄 (어두운 배경에 대 한 가벼운 텍스트)을 사용 합니다.

    StatusBar.styleBlackTranslucent();
    

## 지원 되는 플랫폼

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleBlackOpaque

BlackOpaque 상태 표시줄 (어두운 배경에 대 한 가벼운 텍스트)을 사용 합니다.

    StatusBar.styleBlackOpaque();
    

## 지원 되는 플랫폼

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.backgroundColorByName

Ios 7, StatusBar.statusBarOverlaysWebView을 false로 설정 하면 설정할 수 있는 상태 표시줄의 배경색 색상 이름으로.

    StatusBar.backgroundColorByName("red");
    

지원 되는 색 이름입니다.

    black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
    

## 지원 되는 플랫폼

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.backgroundColorByHexString

16 진수 문자열 상태 표시줄의 배경색을 설정합니다.

    StatusBar.backgroundColorByHexString("#C0C0C0");
    

CSS 대표 속성 지원 됩니다.

    StatusBar.backgroundColorByHexString("#333"); // => #333333
    StatusBar.backgroundColorByHexString("#FAB"); // => #FFAABB
    

Ios 7, StatusBar.statusBarOverlaysWebView을 false로 설정 하면 설정할 수 있는 상태 표시줄의 배경색 16 진수 문자열 (#RRGGBB)에 의해.

WP7 및 WP8에 당신은 또한 #AARRGGBB, AA는 알파 값으로 값을 지정할 수 있습니다.

## 지원 되는 플랫폼

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.hide

숨기기 상태 표시줄.

    StatusBar.hide();
    

## 지원 되는 플랫폼

*   iOS
*   안 드 로이드
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.show

상태 표시줄을 표시합니다.

    StatusBar.show();
    

## 지원 되는 플랫폼

*   iOS
*   안 드 로이드
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.isVisible

이 속성을 상태 표시줄 표시 되는 경우 읽기.

    if (StatusBar.isVisible) {
        // do something
    }
    

## 지원 되는 플랫폼

*   iOS
*   안 드 로이드
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1
