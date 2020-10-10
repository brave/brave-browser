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

# cordova-plugin-device

이 플러그인 정의 전역 `device` 개체, 디바이스의 하드웨어 및 소프트웨어에 설명 합니다. 개체는 전역 범위에서 비록 그것은 후까지 사용할 수 있는 `deviceready` 이벤트.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(device.cordova);
    }
    

## 설치

    cordova plugin add cordova-plugin-device
    

## 속성

*   device.cordova
*   device.model
*   device.platform
*   device.uuid
*   device.version

## device.cordova

코르도바는 장치에서 실행 중인 버전을 얻을.

### 지원 되는 플랫폼

*   아마존 화재 운영 체제
*   안 드 로이드
*   블랙베리 10
*   브라우저
*   Firefox 운영 체제
*   iOS
*   Tizen
*   Windows Phone 7과 8
*   윈도우 8

## device.model

`device.model`소자의 모델 또는 제품의 이름을 반환 합니다. 값 장치 제조업체에서 설정 되 고 동일 제품의 버전 간에 다를 수 있습니다.

### 지원 되는 플랫폼

*   안 드 로이드
*   블랙베리 10
*   브라우저
*   iOS
*   Tizen
*   Windows Phone 7과 8
*   윈도우 8

### 빠른 예제

    // Android:    Nexus One       returns "Passion" (Nexus One code name)
    //             Motorola Droid  returns "voles"
    // BlackBerry: Torch 9800      returns "9800"
    // Browser:    Google Chrome   returns "Chrome"
    //             Safari          returns "Safari"
    // iOS:     for the iPad Mini, returns iPad2,5; iPhone 5 is iPhone 5,1. Http://theiphonewiki.com/wiki/index.php?title=Models 참조 / / var 모델 = device.model;
    

### 안 드 로이드 단점

*   어떤은 종종 프로덕션 코드 이름 대신 [제품 모델 이름][1], [제품 이름][2] 을 가져옵니다. 예를 들어 넥서스 하나 반환 합니다 `Passion` , 모토로라 Droid를 반환 합니다`voles`.

 [1]: http://developer.android.com/reference/android/os/Build.html#MODEL
 [2]: http://developer.android.com/reference/android/os/Build.html#PRODUCT

### Tizen 특수

*   예를 들어, 공급 업체에 의해 할당 된 디바이스 모델을 반환 합니다.`TIZEN`

### Windows Phone 7, 8 특수

*   제조업체에서 지정 하는 장치 모델을 반환 합니다. 예를 들어 삼성 포커스를 반환 합니다.`SGH-i917`.

## device.platform

장치의 운영 체제 이름을 얻을.

    var string = device.platform;
    

### 지원 되는 플랫폼

*   안 드 로이드
*   블랙베리 10
*   Browser4
*   Firefox 운영 체제
*   iOS
*   Tizen
*   Windows Phone 7과 8
*   윈도우 8

### 빠른 예제

    // Depending on the device, a few examples are:
    //   - "Android"
    //   - "BlackBerry 10"
    //   - Browser:         returns "MacIntel" on Mac
    //                      returns "Win32" on Windows
    //   - "iOS"
    //   - "WinCE"
    //   - "Tizen"
    var devicePlatform = device.platform;
    

### Windows Phone 7 단점

Windows Phone 7 장치 보고 플랫폼으로`WinCE`.

### Windows Phone 8 단점

Windows Phone 8 장치 보고 플랫폼으로`Win32NT`.

## device.uuid

소자의 보편적으로 고유 식별자 ([UUID][3] 를 얻을합니다).

 [3]: http://en.wikipedia.org/wiki/Universally_Unique_Identifier

    var string = device.uuid;
    

### 설명

UUID 생성 방법의 자세한 내용은 장치 제조업체에 의해 결정 됩니다 및 소자의 플랫폼 이나 모델.

### 지원 되는 플랫폼

*   안 드 로이드
*   블랙베리 10
*   iOS
*   Tizen
*   Windows Phone 7과 8
*   윈도우 8

### 빠른 예제

    / / 안 드 로이드: (문자열로 다시!) 임의의 64 비트 정수를 반환 합니다 / / 정수 장치의 첫 번째 부팅에서 생성 / / / / 블랙베리: 디바이스의 핀 번호를 반환 합니다 / / 이것은 9 자리 고유 정수 (문자열로 비록!) / / / / 아이폰: (UIDevice 클래스 설명서에서 읊 었) / / 문자열 여러 하드웨어에서 생성 하는 해시 값을 식별 하는 반환 합니다.
    / 그것은 모든 장치에 대 한 고유 해야 보장 되 고 묶일 수 없습니다 / / / 사용자 계정에.
    / / Windows Phone 7: 장치 + 현재 사용자의 해시를 반환 합니다 / / 사용자 정의 되지 않은 경우 guid 생성 되 고 응용 프로그램을 제거할 때까지 유지 됩니다 / / Tizen: 반환 장치 IMEI (국제 모바일 기기 식별 또는 IMEI 숫자입니다 / / 모든 GSM와 UMTS 휴대 전화 고유.
    var deviceID = device.uuid;
    

### iOS 특질

`uuid`ios 장치에 고유 하지 않습니다 하지만 각 설치에 대 한 응용 프로그램 마다 다릅니다. 삭제 하 고 다시 애플 리 케이 션을 설치 하는 경우 변경 가능 하 게 또한 iOS를 업그레이드 하거나 때 버전 (iOS 5.1에에서 명백한) 당 응용 프로그램 업그레이드도 하 고. `uuid`은 신뢰할 수 있는 값이 아닙니다.

### Windows Phone 7, 8 특수

`uuid`Windows Phone 7 필요 허가 `ID_CAP_IDENTITY_DEVICE` . Microsoft는 곧이 속성을 세웁니다 가능성이 것입니다. 기능을 사용할 수 없는 경우 응용 프로그램 장치에 응용 프로그램의 설치 하는 동안 유지 하는 영구 guid를 생성 합니다.

## device.version

운영 체제 버전을 얻을.

    var string = device.version;
    

### 지원 되는 플랫폼

*   안 드 로이드 2.1 +
*   블랙베리 10
*   브라우저
*   iOS
*   Tizen
*   Windows Phone 7과 8
*   윈도우 8

### 빠른 예제

    // Android:    Froyo OS would return "2.2"
    //             Eclair OS would return "2.1", "2.0.1", or "2.0"
    //             Version can also return update level "2.1-update1"
    //
    // BlackBerry: Torch 9800 using OS 6.0 would return "6.0.0.600"
    //
    // Browser:    Returns version number for the browser
    //
    // iPhone:     iOS 3.2 returns "3.2"
    //
    // Windows Phone 7: returns current OS version number, ex. on Mango returns 7.10.7720
    // Tizen: returns "TIZEN_20120425_2"
    var deviceVersion = device.version;
