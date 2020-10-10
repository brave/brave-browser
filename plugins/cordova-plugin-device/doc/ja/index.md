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

このプラグインをグローバル定義します `device` オブジェクトは、デバイスのハードウェアとソフトウェアについて説明します。 それは後まで利用可能なオブジェクトがグローバル スコープでは、 `deviceready` イベント。

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(device.cordova);
    }
    

## インストール

    cordova plugin add cordova-plugin-device
    

## プロパティ

*   device.cordova
*   device.model
*   device.platform
*   device.uuid
*   device.version

## device.cordova

デバイスで実行されているコルドバのバージョンを取得します。

### サポートされているプラットフォーム

*   アマゾン火 OS
*   アンドロイド
*   ブラックベリー 10
*   ブラウザー
*   Firefox の OS
*   iOS
*   Tizen
*   Windows Phone 7 と 8
*   Windows 8

## device.model

`device.model`、デバイスのモデルまたは製品の名前を返します。値は、デバイスの製造元によって設定され、同じ製品のバージョン間で異なる可能性があります。

### サポートされているプラットフォーム

*   アンドロイド
*   ブラックベリー 10
*   ブラウザー
*   iOS
*   Tizen
*   Windows Phone 7 と 8
*   Windows 8

### 簡単な例

    // Android:    Nexus One       returns "Passion" (Nexus One code name)
    //             Motorola Droid  returns "voles"
    // BlackBerry: Torch 9800      returns "9800"
    // Browser:    Google Chrome   returns "Chrome"
    //             Safari          returns "Safari"
    // iOS:     for the iPad Mini, returns iPad2,5; iPhone 5 is iPhone 5,1. Http://theiphonewiki.com/wiki/index.php?title=Models を参照してください//var モデル = device.model;
    

### Android の癖

*   生産コード名は[モデル名][1]の代わりに[製品名][2]を取得します。 たとえば、ネクサス 1 つを返します `Passion` 、Motorola のドロイドを返します`voles`.

 [1]: http://developer.android.com/reference/android/os/Build.html#MODEL
 [2]: http://developer.android.com/reference/android/os/Build.html#PRODUCT

### Tizen の癖

*   たとえば、ベンダーによって割り当てられているデバイスのモデルを返します`TIZEN`

### Windows Phone 7 と 8 癖

*   製造元によって指定されたデバイスのモデルを返します。たとえば、三星フォーカスを返します`SGH-i917`.

## device.platform

デバイスのオペレーティング システム名を取得します。

    var string = device.platform;
    

### サポートされているプラットフォーム

*   アンドロイド
*   ブラックベリー 10
*   Browser4
*   Firefox の OS
*   iOS
*   Tizen
*   Windows Phone 7 と 8
*   Windows 8

### 簡単な例

    // Depending on the device, a few examples are:
    //   - "Android"
    //   - "BlackBerry 10"
    //   - Browser:         returns "MacIntel" on Mac
    //                      returns "Win32" on Windows
    //   - "iOS"
    //   - "WinCE"
    //   - "Tizen"
    var devicePlatform = device.platform;
    

### Windows Phone 7 の癖

Windows Phone 7 デバイスとプラットフォームを報告します。`WinCE`.

### Windows Phone 8 癖

Windows Phone 8 デバイスとプラットフォームを報告します。`Win32NT`.

## device.uuid

デバイスのユニバーサル ・ ユニーク識別子 ([UUID][3]を取得します。).

 [3]: http://en.wikipedia.org/wiki/Universally_Unique_Identifier

    var string = device.uuid;
    

### 説明

UUID を生成する方法の詳細は、デバイスの製造元によって決定され、デバイスのプラットフォームやモデルに固有です。

### サポートされているプラットフォーム

*   アンドロイド
*   ブラックベリー 10
*   iOS
*   Tizen
*   Windows Phone 7 と 8
*   Windows 8

### 簡単な例

    //アンドロイド: ランダムな 64 ビットの整数 (を文字列として返します、再び ！）/デバイスの最初の起動時に生成される整数/////ブラックベリー: デバイスのピン番号を返します//これは 9 桁の一意な整数 (を文字列としても ！)////iPhone: (UIDevice クラスのドキュメントから言い換え）//識別複数のハードウェアから作成されたハッシュ値の文字列を返します。。
    //それはすべてのデバイスに対して一意であることが保証され、接続することはできません//ユーザー アカウント。
    //Windows Phone 7: デバイス + 現在のユーザーのハッシュを返します//ユーザーが定義されていない場合 guid が生成され、アプリがアンインストールされるまで保持されます//Tizen: デバイスの IMEI を返します （国際モバイル機器アイデンティティまたは IMEI は番号です//すべての GSM および UMTS の携帯電話に固有です。
    var deviceID = device.uuid;
    

### iOS の気まぐれ

`uuid`IOS で、デバイスに固有ではないインストールごと、アプリケーションごとに異なります。 削除、アプリを再インストールした場合に変更と多分またときアップグレード iOS の, またはもアップグレードするアプリ (iOS の 5.1 で明らかに） バージョンごと。 `uuid`は信頼性の高い値ではありません。

### Windows Phone 7 と 8 癖

`uuid`のために Windows Phone 7 には、権限が必要です `ID_CAP_IDENTITY_DEVICE` 。 Microsoft はすぐにこのプロパティを廃止して可能性があります。 機能が利用できない場合、アプリケーションはデバイスへのアプリケーションのインストールの持続期間のために保持されている永続的な guid を生成します。

## device.version

オペレーティング システムのバージョンを取得します。

    var string = device.version;
    

### サポートされているプラットフォーム

*   アンドロイド 2.1 +
*   ブラックベリー 10
*   ブラウザー
*   iOS
*   Tizen
*   Windows Phone 7 と 8
*   Windows 8

### 簡単な例

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
