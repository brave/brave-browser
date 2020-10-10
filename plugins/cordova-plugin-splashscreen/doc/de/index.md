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

Dieses Plugin zeigt und verbirgt einen Splash-Screen beim Start der Anwendung.

## Installation

    cordova plugin add cordova-plugin-splashscreen
    

## Unterstützte Plattformen

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   iOS
*   Windows Phone 7 und 8
*   Windows 8

## Methoden

*   SplashScreen.Show
*   SplashScreen.Hide

### Android Eigenarten

Sie müssen in der config.xml folgende Einstellungen vornehmen:

    <preference name="SplashScreen" value="foo" />
    <preference name="SplashScreenDelay" value="10000" />
    

Wo Foo ist der Name der Datei Splashscreen, vorzugsweise eine 9-Patch-Datei. Stellen Sie sicher, Splashcreen Dateien zu Ihrem res/xml-Verzeichnis unter den entsprechenden Ordnern hinzuzufügen. Der zweite Parameter stellt dar, wie lange das Splashscreen in Millisekunden angezeigt werden. Es wird standardmäßig auf 3000 ms. Weitere Informationen finden Sie unter [Symbole und Splash-Screens][1].

 [1]: http://cordova.apache.org/docs/en/edge/config_ref_images.md.html

## SplashScreen.Hide

Schließen Sie den Splash-Screen.

    navigator.splashscreen.hide();
    

### BlackBerry 10, WP8, iOS Eigenarten

Die Datei `config.xml` `AutoHideSplashScreen` Einstellung muss `false` sein. Verstecken des Begrüßungsbildschirms für zwei Sekunden Verzögerung, fügen Sie einen Timer wie die folgende in der `deviceready`-Ereignishandler:

        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);
    

## SplashScreen.Show

Zeigt den Begrüßungsbildschirm.

    navigator.splashscreen.show();
    

Ihre Anwendung kann nicht `navigator.splashscreen.show()` aufrufen, bis die app begonnen hat und das `deviceready`-Ereignis ausgelöst hat. Aber da in der Regel der Splash-Screen soll sichtbar sein, bevor die Anwendung gestartet wurde, scheint die Niederlage der Zweck des Begrüßungsbildschirms. Somit einige Konfiguration in der Datei `config.xml` werden automatisch die Splash `show` sofort nach Ihrer app-Start und Bildschirm bevor es voll begonnen hat, und das `deviceready`-Ereignis empfangen. Weitere Informationen zu dieser Konfiguration finden Sie unter [Symbole und Splash-Screens][1]. Aus diesem Grund ist es unwahrscheinlich, dass Sie `navigator.splashscreen.show()` damit den Splash-Screen sichtbar ist für app-Start aufrufen müssen.
