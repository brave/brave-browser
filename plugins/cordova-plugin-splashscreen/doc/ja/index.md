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

このプラグインが表示され、アプリケーションの起動中にスプラッシュ スクリーンを非表示にします。

## インストール

    cordova plugin add cordova-plugin-splashscreen
    

## サポートされているプラットフォーム

*   アマゾン火 OS
*   アンドロイド
*   ブラックベリー 10
*   iOS
*   Windows Phone 7 と 8
*   Windows 8

## メソッド

*   splashscreen.show
*   splashscreen.hide

### Android の癖

あなたの config.xml を以下の設定を追加する必要があります。

    <preference name="SplashScreen" value="foo" />
    <preference name="SplashScreenDelay" value="10000" />
    

Foo ができれば 9 パッチファイル splashscreen ファイルの名前です。 解像度/xml ディレクトリの適切なフォルダーの下に splashcreen ファイルを追加することを確認します。 2 番目のパラメーターは、スプラッシュ ・ スクリーンがの表示時間 (ミリ秒単位) を表します。 デフォルトでは 3000 ミリ秒です。 詳細については、[アイコンとスプラッシュ画面][1] を参照してください。

 [1]: http://cordova.apache.org/docs/en/edge/config_ref_images.md.html

## splashscreen.hide

スプラッシュ スクリーンを閉じます。

    navigator.splashscreen.hide();
    

### ブラックベリー 10、WP8、iOS の気まぐれ

`config.xml` ファイルの `AutoHideSplashScreen` の設定は `false` である必要があります。 遅延を 2 秒間スプラッシュ スクリーンを非表示に `deviceready` イベント ハンドラーで、次のようタイマーを追加します。

        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);
    

## splashscreen.show

スプラッシュ画面が表示されます。

    navigator.splashscreen.show();
    

アプリが開始され、`deviceready` イベントが発生するまで、アプリケーションは `navigator.splashscreen.show()` を呼び出すことはできません。 しかし、以来、通常スプラッシュ画面アプリ開始前に表示するものですと思われる、スプラッシュ スクリーンの目的の敗北します。 `config.xml` にいくつかの構成を提供するは自動的に `表示` スプラッシュ画面、アプリを起動後すぐに、それが完全に起動し、`deviceready` イベントを受信する前に。 詳細についてはこの構成を行うには、[アイコンとスプラッシュ画面][1] を参照してください。 この理由のためにアプリ起動時のスプラッシュ スクリーンを確認 `navigator.splashscreen.show()` をコールする必要がある可能性が高いです。
