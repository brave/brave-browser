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

このプラグインが表示され、アプリケーションの起動中にスプラッシュ スクリーンを非表示にします。

## インストール

    // npm hosted (new) id
    cordova plugin add cordova-plugin-splashscreen
    // you may also install directly from this repo
    cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git
    

## サポートされているプラットフォーム

  * アマゾン火 OS
  * アンドロイド
  * ブラックベリー 10
  * iOS
  * Windows Phone 7 と 8
  * Windows 8
  * Windows
  * ブラウザー

## メソッド

  * splashscreen.show
  * splashscreen.hide

### Android の癖

あなたの`config.xml`内の次の設定を追加する必要があります。

    <preference name="SplashScreen" value="foo" />
    <preference name="SplashScreenDelay" value="10000" />
    <preference name="SplashMaintainAspectRatio" value="true|false" />
    

Foo ができれば 9 パッチファイル splashscreen ファイルの名前です。 解像度/xml ディレクトリの適切なフォルダーの下に splashcreen ファイルを追加することを確認します。 2 番目のパラメーターは、スプラッシュ ・ スクリーンがの表示時間 (ミリ秒単位) を表します。 デフォルトでは 3000 ミリ秒です。 詳細については、[アイコンとスプラッシュ画面](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html) を参照してください。

"SplashMaintainAspectRatio"の設定はオプションです。 True の場合、スプラッシュ画面描画に設定画面を埋めるために拡大されませんが、代わりに単に「カバー」画面では、CSS のような場合「背景-サイズ: カバー」. これは、たとえば風景またはテキストが含まれている場合、任意の方法でスプラッシュ画面画像が歪むことができない非常に便利です。 この設定は、画面と異なる縦横比で安全にトリミングすることができます大規模なマージン (安全な地域) の画像に適しています。

縦長と横長の異なるドロウアブルを指定できるように、プラグインは向きを変更するたびにスプラッシュ ドロウアブルをリロードします。

### ブラウザーの癖

あなたの`config.xml`で次の設定を使用できます。

    <platform name="browser">
        <preference name="SplashScreen" value="images/browser/splashscreen.jpg" /> <!-- defaults to "img/logo.png" -->
        <preference name="SplashScreenDelay" value="10000" /> <!-- defaults to "3000" -->
        <preference name="SplashScreenBackgroundColor" value="green" /> <!-- defaults to "#464646" -->
        <preference name="ShowSplashScreen" value="false" /> <!-- defaults to "true" -->
        <preference name="SplashScreenWidth" value="600" /> <!-- defaults to "170" -->
        <preference name="SplashScreenHeight" value="300" /> <!-- defaults to "200" -->
    </platform>
    

### iOS の癖

  * `FadeSplashScreen`(ブール値、既定で [ `true`): スプラッシュ画面がフェードインとフェードアウトの表示状態が変更されたときすることを防ぐために`false`に設定します。
    
        <preference name="FadeSplashScreen" value="false"/>
        

  * `FadeSplashScreenDuration`(float, デフォルトは`2`): スプラッシュ画面の秒数のフェードを実行する効果を指定します。
    
        <preference name="FadeSplashScreenDuration" value="4"/>
        

  * `ShowSplashScreenSpinner`(ブール値、既定で [ `true`): スプラッシュ スクリーン スピナーを非表示にするを`false`に設定します。
    
        <preference name="ShowSplashScreenSpinner" value="false"/>
        

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
    

アプリが開始され、`deviceready` イベントが発生するまで、アプリケーションは `navigator.splashscreen.show()` を呼び出すことはできません。 しかし、以来、通常スプラッシュ画面アプリ開始前に表示するものですと思われる、スプラッシュ スクリーンの目的の敗北します。 `config.xml` にいくつかの構成を提供するは自動的に `表示` スプラッシュ画面、アプリを起動後すぐに、それが完全に起動し、`deviceready` イベントを受信する前に。 詳細についてはこの構成を行うには、[アイコンとスプラッシュ画面](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html) を参照してください。 この理由のためにアプリ起動時のスプラッシュ スクリーンを確認 `navigator.splashscreen.show()` をコールする必要がある可能性が高いです。