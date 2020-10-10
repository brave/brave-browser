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

# cordova-plugin-device

[![Build Status](https://travis-ci.org/apache/cordova-plugin-device.svg?branch=master)](https://travis-ci.org/apache/cordova-plugin-device)

Ten plugin określa globalne `device` obiekt, który opisuje urządzenia sprzętowe i programowe. Mimo, że obiekt jest w globalnym zasięgu, nie jest dostępne dopiero po `deviceready` zdarzenie.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(device.cordova);
    }
    

## Instalacja

    cordova plugin add cordova-plugin-device
    

## Właściwości

  * device.cordova
  * device.model
  * device.platform
  * device.uuid
  * device.version

## device.cordova

Pobierz wersję Cordova działa na urządzeniu.

### Obsługiwane platformy

  * Amazon Fire OS
  * Android
  * BlackBerry 10
  * Przeglądarka
  * Firefox OS
  * iOS
  * Tizen
  * Windows Phone 7 i 8
  * Windows 8

## device.model

`device.model`Zwraca nazwę modelu lub produktu. Wartość jest zestaw przez producenta urządzenia i mogą się różnić między wersjami tego samego produktu.

### Obsługiwane platformy

  * Android
  * BlackBerry 10
  * Przeglądarka
  * iOS
  * Tizen
  * Windows Phone 7 i 8
  * Windows 8

### Szybki przykład

    // Android:    Nexus One       returns "Passion" (Nexus One code name)
    //             Motorola Droid  returns "voles"
    // BlackBerry: Torch 9800      returns "9800"
    // Browser:    Google Chrome   returns "Chrome"
    //             Safari          returns "Safari"
    // iOS:     for the iPad Mini, returns iPad2,5; iPhone 5 is iPhone 5,1. Zobacz http://theiphonewiki.com/wiki/index.php?title=Models / / modelu var = device.model;
    

### Dziwactwa Androida

  * Pobiera [nazwę produktu](http://developer.android.com/reference/android/os/Build.html#PRODUCT) zamiast [nazwy modelu](http://developer.android.com/reference/android/os/Build.html#MODEL), który często jest nazwą kod produkcji. Na przykład, Nexus One zwraca `Passion` , i zwraca Motorola Droid`voles`.

### Dziwactwa Tizen

  * Zwraca modelu urządzenia przypisane przez dostawcę, na przykład,`TIZEN`

### Windows Phone 7 i 8 dziwactwa

  * Zwraca modelu urządzenia, określonej przez producenta. Na przykład Samsung ostrości zwraca`SGH-i917`.

## device.platform

Uzyskać nazwę systemu operacyjnego urządzenia.

    var string = device.platform;
    

### Obsługiwane platformy

  * Android
  * BlackBerry 10
  * Browser4
  * Firefox OS
  * iOS
  * Tizen
  * Windows Phone 7 i 8
  * Windows 8

### Szybki przykład

    // Depending on the device, a few examples are:
    //   - "Android"
    //   - "BlackBerry 10"
    //   - Browser:         returns "MacIntel" on Mac
    //                      returns "Win32" on Windows
    //   - "iOS"
    //   - "WinCE"
    //   - "Tizen"
    var devicePlatform = device.platform;
    

### Dziwactwa Windows Phone 7

Urządzenia Windows Phone 7 raport platformy jako`WinCE`.

### Windows Phone 8 dziwactwa

Urządzenia Windows Phone 8 raport platformy jako`Win32NT`.

## device.uuid

Się urządzenia uniwersalnie unikatowy identyfikator ([UUID](http://en.wikipedia.org/wiki/Universally_Unique_Identifier)).

    var string = device.uuid;
    

### Opis

Szczegóły jak UUID jest generowane są określane przez producenta urządzenia i są specyficzne dla platformy lub modelu urządzenia.

### Obsługiwane platformy

  * Android
  * BlackBerry 10
  * iOS
  * Tizen
  * Windows Phone 7 i 8
  * Windows 8

### Szybki przykład

    // Android: Returns a random 64-bit integer (as a string, again!)
    //          The integer is generated on the device's first boot
    //
    // BlackBerry: Returns the PIN number of the device
    //             This is a nine-digit unique integer (as a string, though!)
    //
    // iPhone: (Paraphrased from the UIDevice Class documentation)
    //         Returns a string of hash values created from multiple hardware identifies.
    //         It is guaranteed to be unique for every device and can't be tied
    //         to the user account.
    // Windows Phone 7 : Returns a hash of device+current user,
    // if the user is not defined, a guid is generated and will persist until the app is uninstalled
    // Tizen: returns the device IMEI (International Mobile Equipment Identity or IMEI is a number
    // unique to every GSM and UMTS mobile phone.
    var deviceID = device.uuid;
    

### iOS dziwactwo

`uuid`Na iOS nie jest przypisany do urządzenia, ale różni się dla każdej aplikacji, dla każdej instalacji. Zmienia się jeśli możesz usunąć i ponownie zainstalować aplikację, a ewentualnie także po aktualizacji iOS czy nawet uaktualnienia aplikacji dla wersji (widoczny w iOS 5.1). `uuid`Jest nie wiarygodne wartości.

### Windows Phone 7 i 8 dziwactwa

`uuid`Dla Windows Phone 7 wymaga uprawnień `ID_CAP_IDENTITY_DEVICE` . Microsoft będzie prawdopodobnie potępiać ten wkrótce. Jeśli funkcja nie jest dostępna, aplikacja generuje trwałe identyfikator guid, który jest utrzymywany przez czas trwania instalacji aplikacji na urządzeniu.

## device.version

Pobierz wersję systemu operacyjnego.

    var string = device.version;
    

### Obsługiwane platformy

  * Android 2.1 +
  * BlackBerry 10
  * Przeglądarka
  * iOS
  * Tizen
  * Windows Phone 7 i 8
  * Windows 8

### Szybki przykład

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