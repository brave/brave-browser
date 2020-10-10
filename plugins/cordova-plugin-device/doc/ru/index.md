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

Этот плагин определяет глобальный объект `device`, который описывает оборудование и программное обеспечение устройства. Несмотря на то что объект в глобальной области видимости, он не доступен до того момента пока не произойдет событие `deviceready`.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(device.cordova);
    }
    

## Установка

    cordova plugin add cordova-plugin-device
    

## Параметры

*   device.cordova
*   device.model
*   device.platform
*   device.uuid
*   device.version

## device.cordova

Возвращает версию Cordova, работающую на устройстве.

### Поддерживаемые платформы

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   Обозреватель
*   Firefox OS
*   iOS
*   Tizen
*   Windows Phone 7 и 8
*   Windows 8

## device.model

Свойство `device.model` возвращает имя устройства модели или продукта. Значение устанавливается производителем устройства и могут отличаться в разных версиях одного и того же продукта.

### Поддерживаемые платформы

*   Android
*   BlackBerry 10
*   Обозреватель
*   iOS
*   Tizen
*   Windows Phone 7 и 8
*   Windows 8

### Краткий пример

    // Android:    Nexus One       returns "Passion" (Nexus One code name)
    //             Motorola Droid  returns "voles"
    // BlackBerry: Torch 9800      returns "9800"
    // Browser:    Google Chrome   returns "Chrome"
    //             Safari          returns "Safari"
    // iOS:     for the iPad Mini, returns iPad2,5; iPhone 5 is iPhone 5,1. See http://theiphonewiki.com/wiki/index.php?title=Models
    //
    var model = device.model;
    

### Особенности Android

*   Возвращает [имя продукта][1] , а не [имя модели][2], которое часто является производственным кодом. Например, Nexus One из них возвращает `Passion` , и Motorola Droid возвращает `voles`.

 [1]: http://developer.android.com/reference/android/os/Build.html#PRODUCT
 [2]: http://developer.android.com/reference/android/os/Build.html#MODEL

### Особенности Tizen

*   Возвращает модель устройства, назначенного вендором, например,`TIZEN`

### Особенности Windows Phone 7 и 8

*   Возвращает модель устройства, указанной заводом-изготовителем. Например Samsung Focus возвращает `SGH-i917`.

## device.platform

Получите имя операционной системы устройства.

    var string = device.platform;
    

### Поддерживаемые платформы

*   Android
*   BlackBerry 10
*   Браузером4
*   Firefox OS
*   iOS
*   Tizen
*   Windows Phone 7 и 8
*   Windows 8

### Краткий пример

    // Depending on the device, a few examples are:
    //   - "Android"
    //   - "BlackBerry 10"
    //   - Browser:         returns "MacIntel" on Mac
    //                      returns "Win32" on Windows
    //   - "iOS"
    //   - "WinCE"
    //   - "Tizen"
    var devicePlatform = device.platform;
    

### Особенности Windows Phone 7

Windows Phone 7 устройства сообщают платформу как `WinCE`.

### Особенности Windows Phone 8

Устройства Windows Phone 8 сообщают платформу как `Win32NT`.

## device.uuid

Возвращает универсальный уникального идентификатора ([UUID][3] устройства).

 [3]: http://en.wikipedia.org/wiki/Universally_Unique_Identifier

    var string = device.uuid;
    

### Описание

Подробная информация о том как UUID генерируется, определяются изготовителем устройства и являются специфическими для платформы или модели устройства.

### Поддерживаемые платформы

*   Android
*   BlackBerry 10
*   iOS
*   Tizen
*   Windows Phone 7 и 8
*   Windows 8

### Краткий пример

    // Android: Возвращает случайное 64-разрядное целое число (в виде строки, опять!) 
    // целое число генерируется при первой загрузке устройства 
    //
    // BlackBerry: Возвращает номер PIN устройства 
    // это 9 значный уникальный целочисленный (как строка, хотя!) 
    // 
    // iPhone: (Перефразировано из документации класса UIDevice) 
    // возвращает строку хэш-значения, созданные из нескольких аппаратных определяет.
    // Это значение гарантированно является уникальным для каждого устройства и не может быть привязано 
    // к учетной записи пользователя.
    // Windows Phone 7: Возвращает хэш устройство + текущего пользователя, 
    // если пользователь не определен, формируется guid который и будет сохраняться до тех пор, пока приложение не удалиться 
    // Tizen: возвращает IMEI устройства (Международный идентификатор мобильного оборудования или IMEI это число 
    // уникальное для каждого мобильного телефона GSM и UMTS.
    var deviceID = device.uuid;
    

### Особенности iOS

На iOS `uuid` не является уникальным для устройства, но варьируется для каждого приложения, и для каждой установки. Значение меняется, если удалить и повторно установить приложение, и возможно также когда вы обновите iOS, или даже обновить приложение до следующей версии (очевидно в iOS 5.1). Значение `uuid` не является надежным.

### Особенности Windows Phone 7 и 8

Для Windows Phone 7 `uuid` требует разрешения `ID_CAP_IDENTITY_DEVICE` . Microsoft скорее всего скоро сделает это свойство устаревшим. Если возможность недоступна, приложение создает постоянные guid, который сохраняется на все время установки приложения на устройстве.

## device.version

Возвращает версию операционной системы.

    var string = device.version;
    

### Поддерживаемые платформы

*   Android 2.1 +
*   BlackBerry 10
*   Обозреватель
*   iOS
*   Tizen
*   Windows Phone 7 и 8
*   Windows 8

### Краткий пример

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
