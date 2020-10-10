<!---
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

# cordova-plugin-statusbar

[![Build Status](https://travis-ci.org/apache/cordova-plugin-statusbar.svg)](https://travis-ci.org/apache/cordova-plugin-statusbar)

# StatusBar

> Il `StatusBar` oggetto fornisce alcune funzioni per personalizzare l'iOS e Android StatusBar.

## Installazione

    cordova plugin add cordova-plugin-statusbar
    

## Preferenze

#### config. XML

  * **StatusBarOverlaysWebView** (boolean, default è true). IOS 7, rendono la statusbar sovrapposizione o la non sovrapposizione WebView all'avvio.
    
        <preference name="StatusBarOverlaysWebView" value="true" />
        

  * **StatusBarBackgroundColor** (stringa esadecimale di colore, il valore predefinito è #000000). Su iOS 7 e 5 Android, è possibile impostare il colore di sfondo della barra di stato di una stringa esadecimale (#RRGGBB) all'avvio.
    
        <preference name="StatusBarBackgroundColor" value="#000000" />
        

  * **StatusBarStyle** (status bar in stile, default è lightcontent). IOS 7, impostare lo stile di barra di stato. Predefinita di opzioni disponibili, lightcontent, blacktranslucent, blackopaque.
    
        <preference name="StatusBarStyle" value="lightcontent" />
        

### Stranezze Android

Le linee 5 + Android Guida specificano utilizzando un colore diverso per la barra di stato che l'app principale di colore (a differenza di colore uniforme statusbar di molte applicazioni di iOS 7 +), quindi si consiglia di impostare il colore della barra di stato in fase di esecuzione invece tramite `StatusBar.backgroundColorByHexString` o `StatusBar.backgroundColorByName`. Un modo per farlo sarebbe:

```js
if (cordova.platformId == 'android') {
    StatusBar.backgroundColorByHexString("#333");
}
```

## Nascondendo all'avvio

In fase di esecuzione è possibile utilizzare la funzione di StatusBar.hide qui sotto, ma se si desidera che la barra di stato venga nascosta all'avvio di app, è necessario modificare il file info. plist dell'app.

Aggiungere o modificare questi due attributi, se non presente. Impostare la **"barra di stato è inizialmente nascosto"** a **"YES"** e **"Aspetto di vista basati su controller status bar"** a **"NO"**. Se si modifica manualmente senza Xcode, le chiavi e i valori sono:

    <key>UIStatusBarHidden</key>
    <true/>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
    

## Metodi

Questo plugin definisce globale oggetto `StatusBar`.

Anche se in ambito globale, non è disponibile fino a dopo l'evento `deviceready`.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(StatusBar);
    }
    

  * StatusBar.overlaysWebView
  * StatusBar.styleDefault
  * StatusBar.styleLightContent
  * StatusBar.styleBlackTranslucent
  * StatusBar.styleBlackOpaque
  * StatusBar.backgroundColorByName
  * StatusBar.backgroundColorByHexString
  * StatusBar.hide
  * StatusBar.show

## Proprietà

  * StatusBar.isVisible

## Autorizzazioni

#### config. XML

            <feature name="StatusBar">
                <param name="ios-package" value="CDVStatusBar" onload="true" />
            </feature>
    

# StatusBar.overlaysWebView

IOS 7, rendono la statusbar sovrapposizione o non sovrapporre WebView.

    StatusBar.overlaysWebView(true);
    

## Descrizione

IOS 7, impostato su false per rendere la barra di stato vengono visualizzati come iOS 6. Impostare il colore di sfondo e stile per soddisfare utilizzando altre funzioni.

## Piattaforme supportate

  * iOS

## Esempio rapido

    StatusBar.overlaysWebView(true);
    StatusBar.overlaysWebView(false);
    

# StatusBar.styleDefault

Utilizzare la barra di stato predefinito (testo scuro, per sfondi di luce).

    StatusBar.styleDefault();
    

## Piattaforme supportate

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.styleLightContent

Utilizzare la barra di stato lightContent (testo in chiaro, per sfondi scuri).

    StatusBar.styleLightContent();
    

## Piattaforme supportate

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.styleBlackTranslucent

Utilizzare la barra di stato blackTranslucent (testo in chiaro, per sfondi scuri).

    StatusBar.styleBlackTranslucent();
    

## Piattaforme supportate

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.styleBlackOpaque

Utilizzare la barra di stato blackOpaque (testo in chiaro, per sfondi scuri).

    StatusBar.styleBlackOpaque();
    

## Piattaforme supportate

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.backgroundColorByName

IOS 7, quando StatusBar.statusBarOverlaysWebView è impostata su false, è possibile impostare il colore di sfondo della barra di stato con il nome di colore.

    StatusBar.backgroundColorByName("red");
    

Nomi di colore supportati sono:

    black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
    

## Piattaforme supportate

  * iOS
  * Android 5+
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.backgroundColorByHexString

Imposta il colore di sfondo della barra di stato di una stringa esadecimale.

    StatusBar.backgroundColorByHexString("#C0C0C0");
    

Proprietà di scrittura stenografica CSS sono supportati anche.

    StatusBar.backgroundColorByHexString("#333"); // => #333333
    StatusBar.backgroundColorByHexString("#FAB"); // => #FFAABB
    

IOS 7, quando StatusBar.statusBarOverlaysWebView è impostata su false, è possibile impostare il colore di sfondo della barra di stato di una stringa esadecimale (#RRGGBB).

Su WP7 e WP8 è inoltre possibile specificare i valori come #AARRGGBB, dove AA è un valore alfa

## Piattaforme supportate

  * iOS
  * Android 5+
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.hide

Nascondere la barra di stato.

    StatusBar.hide();
    

## Piattaforme supportate

  * iOS
  * Android
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.show

Mostra la barra di stato.

    StatusBar.show();
    

## Piattaforme supportate

  * iOS
  * Android
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.isVisible

Leggere questa proprietà per vedere se la barra di stato è visibile o no.

    if (StatusBar.isVisible) {
        // do something
    }
    

## Piattaforme supportate

  * iOS
  * Android
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1