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

이 플러그인은 표시 하 고 응용 프로그램 실행 하는 동안 시작 화면을 숨깁니다.

## 설치

    cordova plugin add cordova-plugin-splashscreen
    

## 지원 되는 플랫폼

*   아마존 화재 운영 체제
*   안 드 로이드
*   블랙베리 10
*   iOS
*   Windows Phone 7과 8
*   윈도우 8

## 메서드

*   splashscreen.show
*   splashscreen.hide

### 안 드 로이드 단점

당신의 config.xml에 다음 환경 설정에 추가 해야 합니다.

    <preference name="SplashScreen" value="foo" />
    <preference name="SplashScreenDelay" value="10000" />
    

여기서 foo splashscreen 파일, 선호 9 패치 파일의 이름입니다. 적절 한 폴더 아래 res/xml 디렉토리에 splashcreen 파일을 추가 해야 합니다. 두 번째 매개 변수는 splashscreen 얼마나 밀리초 단위로 표시 됩니다 나타냅니다. 3000 ms 기본값으로 사용 됩니다. 자세한 내용은 [아이콘 및 시작 화면을][1] 참조 하십시오.

 [1]: http://cordova.apache.org/docs/en/edge/config_ref_images.md.html

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
    

응용 프로그램 시작 및 `deviceready` 이벤트는 발생 될 때까지 응용 프로그램이 `navigator.splashscreen.show()`을 호출할 수 없습니다. 하지만 그 스플래시 스크린의 목적 것 같다 일반적으로 시작 화면이 당신의 애플 리 케이 션 시작 하기 전에 표시 될 운명이 다, 이후. `config.xml에서` 몇 가지 구성을 제공 하 자동으로 스플래시 `표시` 화면 애플 리 케이 션 출시 직후와 그것은 완벽 하 게 시작 하 고 `deviceready` 이벤트를 받은 전에. 이 구성 하 고 자세한 내용은 [아이콘 및 시작 화면을][1] 참조 하십시오. 이러한 이유로, 그것은 가능성이 시작 화면은 응용 프로그램 시작에 대 한 표시 되도록 `navigator.splashscreen.show()`를 호출 해야입니다.
