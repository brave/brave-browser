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

이 플러그인은 표시 하 고 응용 프로그램 실행 하는 동안 시작 화면을 숨깁니다.

## 설치

    // npm hosted (new) id
    cordova plugin add cordova-plugin-splashscreen
    // you may also install directly from this repo
    cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git
    

## 지원 되는 플랫폼

  * 아마존 화재 운영 체제
  * 안 드 로이드
  * 블랙베리 10
  * iOS
  * Windows Phone 7과 8
  * 윈도우 8
  * 윈도우
  * 브라우저

## 메서드

  * splashscreen.show
  * splashscreen.hide

### 안 드 로이드 단점

`Config.xml`에 다음 환경 설정에 추가 해야 합니다.

    <preference name="SplashScreen" value="foo" />
    <preference name="SplashScreenDelay" value="10000" />
    <preference name="SplashMaintainAspectRatio" value="true|false" />
    

여기서 foo splashscreen 파일, 선호 9 패치 파일의 이름입니다. 적절 한 폴더 아래 res/xml 디렉토리에 splashcreen 파일을 추가 해야 합니다. 두 번째 매개 변수는 splashscreen 얼마나 밀리초 단위로 표시 됩니다 나타냅니다. 3000 ms 기본값으로 사용 됩니다. 자세한 내용은 [아이콘 및 시작 화면을](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html) 참조 하십시오.

"SplashMaintainAspectRatio" 취향은 선택 사항입니다. Drawable, 시작 화면 설정 화면에 맞게 확장 되지 하지만 대신 단순히 "커버" CSS 같은 화면 "배경-크기: 덮개". 시작 화면 이미지 예: 풍경 또는 텍스트를 포함 하는 경우 어떤 식으로든에서 왜곡 될 수 없는 경우에 매우 유용 합니다. 이 설정은 큰 여백 (안전 지역) 안전 하 게 다른 종횡비와 화면에 자를 수 있는 이미지에 가장 적합 합니다.

플러그인 다시 로드 스플래시 drawable 방향이 변경 될 때마다 세로 및 가로 방향에 대 한 다른 drawables를 지정할 수 있도록 합니다.

### 브라우저 만지면

`Config.xml`에 다음 기본 설정을 사용할 수 있습니다.

    <platform name="browser">
        <preference name="SplashScreen" value="images/browser/splashscreen.jpg" /> <!-- defaults to "img/logo.png" -->
        <preference name="SplashScreenDelay" value="10000" /> <!-- defaults to "3000" -->
        <preference name="SplashScreenBackgroundColor" value="green" /> <!-- defaults to "#464646" -->
        <preference name="ShowSplashScreen" value="false" /> <!-- defaults to "true" -->
        <preference name="SplashScreenWidth" value="600" /> <!-- defaults to "170" -->
        <preference name="SplashScreenHeight" value="300" /> <!-- defaults to "200" -->
    </platform>
    

### iOS 단점

  * `FadeSplashScreen` (부울 `true`로 기본값): 시작 화면 표시 상태로 변경 될 때 밖으로 퇴색 하지 않도록 하려면 `false` 로 설정.
    
        <preference name="FadeSplashScreen" value="false"/>
        

  * `FadeSplashScreenDuration` (부동, `2`기본값): 시작 화면에 대 한 초 페이드 효과를 실행 하는 지정 합니다.
    
        <preference name="FadeSplashScreenDuration" value="4"/>
        

  * `ShowSplashScreenSpinner` (부울 `true`로 기본값): 스플래시 화면 회전자를 숨기려면 `false` 로 설정.
    
        <preference name="ShowSplashScreenSpinner" value="false"/>
        

## splashscreen.hide

시작 화면을 닫습니다.

    navigator.splashscreen.hide();
    

### 블랙베리 10, WP8, iOS 특질

`config.xml` 파일의 `AutoHideSplashScreen` 설정을 `false` 여야 합니다. 2 초 동안 시작 화면을 숨기고 지연, `deviceready` 이벤트 처리기에서 다음과 같은 타이머를 추가:

        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);
    

## splashscreen.show

시작 화면을 표시합니다.

    navigator.splashscreen.show();
    

응용 프로그램 시작 및 `deviceready` 이벤트는 발생 될 때까지 응용 프로그램이 `navigator.splashscreen.show()`을 호출할 수 없습니다. 하지만 그 스플래시 스크린의 목적 것 같다 일반적으로 시작 화면이 당신의 애플 리 케이 션 시작 하기 전에 표시 될 운명이 다, 이후. `config.xml에서` 몇 가지 구성을 제공 하 자동으로 스플래시 `표시` 화면 애플 리 케이 션 출시 직후와 그것은 완벽 하 게 시작 하 고 `deviceready` 이벤트를 받은 전에. 이 구성 하 고 자세한 내용은 [아이콘 및 시작 화면을](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html) 참조 하십시오. 이러한 이유로, 그것은 가능성이 시작 화면은 응용 프로그램 시작에 대 한 표시 되도록 `navigator.splashscreen.show()`를 호출 해야입니다.