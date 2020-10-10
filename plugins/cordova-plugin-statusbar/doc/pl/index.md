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

> `StatusBar`Obiekt zawiera kilka funkcji, aby dostosować iOS i Android StatusBar.

## Instalacja

    cordova plugin add cordova-plugin-statusbar
    

## Preferencje

#### config.xml

*   **StatusBarOverlaysWebView** (boolean, domyślnie na wartość true). Na iOS 7 zrobić nakładki stanu lub nie nakładki widoku sieci Web podczas uruchamiania.
    
        <preference name="StatusBarOverlaysWebView" value="true" />
        

*   **StatusBarBackgroundColor** (kolor szesnastkowy ciąg, domyślnie #000000). Na iOS 7 ustawić kolor tła stanu przez ciąg szesnastkowy (#RRGGBB) przy starcie systemu.
    
        <preference name="StatusBarBackgroundColor" value="#000000" />
        

*   **StatusBarStyle** (stan styl paska, domyślnie lightcontent.) Na iOS 7 ustawić styl paska stanu. Dostępne opcje domyślne, lightcontent, blacktranslucent, blackopaque.
    
        <preference name="StatusBarStyle" value="lightcontent" />
        

## Przy starcie

Podczas uruchamiania można użyć funkcji StatusBar.hide poniżej, ale jeśli chcesz StatusBar ukryty w uruchamiania aplikacji, należy zmodyfikować plik Info.plist Twojej aplikacji.

Dodawanie/edycja tych dwóch atrybutów jeśli nie obecny. Ustawianie **"pasek stanu jest początkowo ukryte"** na **"Tak"** i **"Oparte na kontroler stanu paska wygląd"** na **"Nie"**. Jeśli możesz go edytować ręcznie bez Xcode, kluczy i wartości są:

    <key>UIStatusBarHidden</key>
    <true/>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
    

## Metody

Ten plugin definiuje obiekt globalny `StatusBar`.

Chociaż w globalnym zasięgu, to nie dostępne dopiero po `deviceready` imprezie.

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

## Właściwości

*   StatusBar.isVisible

## Uprawnienia

#### config.xml

            <feature name="StatusBar">
                <param name="ios-package" value="CDVStatusBar" onload="true" />
            </feature>
    

# StatusBar.overlaysWebView

Na iOS 7 zrobić statusbar nakładki lub nie nakładka widoku sieci Web.

    StatusBar.overlaysWebView(true);
    

## Opis

Na iOS 7 zestaw do false, aby na pasku stanu pojawia się jak iOS 6. Ustaw kolor tła i styl do korzystania z innych funkcji.

## Obsługiwane platformy

*   iOS

## Szybki przykład

    StatusBar.overlaysWebView(true);
    StatusBar.overlaysWebView(false);
    

# StatusBar.styleDefault

Użyj domyślnego stanu (ciemny tekst, teł światła).

    StatusBar.styleDefault();
    

## Obsługiwane platformy

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleLightContent

Użyj lightContent stanu (światło tekst, ciemne tło).

    StatusBar.styleLightContent();
    

## Obsługiwane platformy

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleBlackTranslucent

Użyj blackTranslucent stanu (światło tekst, ciemne tło).

    StatusBar.styleBlackTranslucent();
    

## Obsługiwane platformy

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleBlackOpaque

Użyj blackOpaque stanu (światło tekst, ciemne tło).

    StatusBar.styleBlackOpaque();
    

## Obsługiwane platformy

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.backgroundColorByName

Na iOS 7 gdy zostanie ustawiona wartość false, StatusBar.statusBarOverlaysWebView można ustawić kolor tła stanu przez nazwę koloru.

    StatusBar.backgroundColorByName("red");
    

Nazwy kolorów obsługiwane są:

    black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
    

## Obsługiwane platformy

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.backgroundColorByHexString

Ustawia kolor tła stanu przez ciąg szesnastkowy.

    StatusBar.backgroundColorByHexString("#C0C0C0");
    

Obsługiwane są również właściwości CSS.

    StatusBar.backgroundColorByHexString("#333"); // => #333333
    StatusBar.backgroundColorByHexString("#FAB"); // => #FFAABB
    

Na iOS 7 gdy zostanie ustawiona wartość false, StatusBar.statusBarOverlaysWebView można ustawić kolor tła stanu przez ciąg szesnastkowy (#RRGGBB).

Na WP7 i WP8 można również określić wartości jako #AARRGGBB, gdzie AA jest wartością alfa

## Obsługiwane platformy

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.hide

Ukryj pasek stanu.

    StatusBar.hide();
    

## Obsługiwane platformy

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.show

Pokazuje pasek stanu.

    StatusBar.show();
    

## Obsługiwane platformy

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.isVisible

Czytać tej właściwość, aby sprawdzić, czy stanu jest widoczne lub nie.

    if (StatusBar.isVisible) {
        // do something
    }
    

## Obsługiwane platformy

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1
