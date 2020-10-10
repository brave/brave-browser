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

> Das `StatusBar` Objekt stellt einige Funktionen zum Anpassen des iOS und Android StatusBar.

## Installation

    cordova plugin add cordova-plugin-statusbar
    

## "Einstellungen"

#### config.xml

*   **StatusBarOverlaysWebView** (Boolean, der Standardwert ist True). Stellen Sie auf iOS 7 die Statusbar-Overlay oder keine Überlagerung der WebView beim Start.
    
        <preference name="StatusBarOverlaysWebView" value="true" />
        

*   **StatusBarBackgroundColor** (Farbe hex String, der Standardwert ist #000000). Legen Sie auf iOS 7 die Hintergrundfarbe der Statusbar von eine hexadezimale Zeichenfolge (#RRGGBB) beim Start.
    
        <preference name="StatusBarBackgroundColor" value="#000000" />
        

*   **StatusBarStyle** (Status Bar-Stil, der Standardwert ist Lightcontent). Legen Sie auf iOS 7 den Status-Bar-Stil. Verfügbaren Optionen Standard, Lightcontent, Blacktranslucent, Blackopaque.
    
        <preference name="StatusBarStyle" value="lightcontent" />
        

## Beim Start ausblenden

Während der Laufzeit können Sie die StatusBar.hide-Funktion unten, aber die StatusBar beim Start der app versteckt werden soll, müssen Sie Ihre app Info.plist Datei ändern.

Diese beiden Attribute hinzufügen/bearbeiten, wenn nicht vorhanden. Legen Sie **"Statusleiste ist anfangs ausgeblendet"** auf **"YES"** und **"View Controller-basierte Status Bar aussehen"** auf **"NO"**. Wenn Sie es manuell ohne Xcode bearbeiten, werden die Schlüssel und Werte:

    <key>UIStatusBarHidden</key>
    <true/>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
    

## Methoden

Dieses Plugin wird globales `StatusBar`-Objekt definiert.

Obwohl im globalen Gültigkeitsbereich, steht es nicht bis nach dem `deviceready`-Ereignis.

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

## Eigenschaften

*   StatusBar.isVisible

## Berechtigungen

#### config.xml

            <feature name="StatusBar">
                <param name="ios-package" value="CDVStatusBar" onload="true" />
            </feature>
    

# StatusBar.overlaysWebView

Stellen Sie auf iOS 7 Statusbar überlagern oder nicht überlagert die WebView.

    StatusBar.overlaysWebView(true);
    

## Beschreibung

Auf iOS 7 zu der Statusbar wie iOS 6 erscheinen auf False festgelegt. Legen Sie die Stil und Hintergrund Farbe entsprechend mit den anderen Funktionen.

## Unterstützte Plattformen

*   iOS

## Kurzes Beispiel

    StatusBar.overlaysWebView(true);
    StatusBar.overlaysWebView(false);
    

# StatusBar.styleDefault

Verwenden Sie die Standard-Statusbar (dunkle Text, für helle Hintergründe).

    StatusBar.styleDefault();
    

## Unterstützte Plattformen

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone-8.1

# StatusBar.styleLightContent

Verwenden Sie die LightContent-Statusbar (heller Text, für dunkle Hintergründe).

    StatusBar.styleLightContent();
    

## Unterstützte Plattformen

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone-8.1

# StatusBar.styleBlackTranslucent

Verwenden Sie die BlackTranslucent-Statusbar (heller Text, für dunkle Hintergründe).

    StatusBar.styleBlackTranslucent();
    

## Unterstützte Plattformen

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone-8.1

# StatusBar.styleBlackOpaque

Verwenden Sie die BlackOpaque-Statusbar (heller Text, für dunkle Hintergründe).

    StatusBar.styleBlackOpaque();
    

## Unterstützte Plattformen

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone-8.1

# StatusBar.backgroundColorByName

Auf iOS 7 Wenn Sie StatusBar.statusBarOverlaysWebView auf False festlegen, können Sie die Hintergrundfarbe der Statusbar von Farbnamen festlegen.

    StatusBar.backgroundColorByName("red");
    

Unterstützte Farbnamen sind:

    black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
    

## Unterstützte Plattformen

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone-8.1

# StatusBar.backgroundColorByHexString

Legt die Hintergrundfarbe der Statusbar von eine hexadezimale Zeichenfolge fest.

    StatusBar.backgroundColorByHexString("#C0C0C0");
    

CSS-Kurzschrift-Eigenschaften werden ebenfalls unterstützt.

    StatusBar.backgroundColorByHexString("#333"); // => #333333
    StatusBar.backgroundColorByHexString("#FAB"); // => #FFAABB
    

Auf iOS 7 Wenn Sie StatusBar.statusBarOverlaysWebView auf False festlegen, können Sie die Hintergrundfarbe der Statusbar von eine hexadezimale Zeichenfolge (#RRGGBB) festlegen.

Auf WP7 und WP8 können Sie auch Werte wie #AARRGGBB, angeben wo AA einen alpha-Wert ist

## Unterstützte Plattformen

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone-8.1

# StatusBar.hide

Ausblenden der Statusleiste.

    StatusBar.hide();
    

## Unterstützte Plattformen

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone-8.1

# StatusBar.show

Zeigt die Statusleiste.

    StatusBar.show();
    

## Unterstützte Plattformen

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone-8.1

# StatusBar.isVisible

Lesen Sie diese Eigenschaft, um festzustellen, ob die Statusbar sichtbar oder nicht ist.

    if (StatusBar.isVisible) {
        // do something
    }
    

## Unterstützte Plattformen

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone-8.1
