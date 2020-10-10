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

> El `StatusBar` objeto proporciona algunas funciones para personalizar el iOS y Android StatusBar.

## Instalación

    cordova plugin add cordova-plugin-statusbar
    

## Preferencias

#### config.xml

  * **StatusBarOverlaysWebView** (boolean, true por defecto). En iOS 7, hacer la superposición statusbar o no superponer la WebView al inicio.
    
        <preference name="StatusBarOverlaysWebView" value="true" />
        

  * **StatusBarBackgroundColor** (color hex string por defecto #000000). IOS 7 y 5 Android, configurar el color de fondo de la barra de estado por una cadena hexadecimal (#RRGGBB) en el arranque.
    
        <preference name="StatusBarBackgroundColor" value="#000000" />
        

  * **StatusBarStyle** (status bar estilo por defecto lightcontent). En iOS 7, definir el estilo de barra de estado. Por defecto las opciones disponibles, lightcontent, blacktranslucent, blackopaque.
    
        <preference name="StatusBarStyle" value="lightcontent" />
        

### Rarezas Android

Android 5 + pautas especifican utilizando un color diferente para la barra de estado que la aplicación principal de color (a diferencia del color de barra de estado uniforme de muchas apps de iOS 7 +), por lo que puede establecer el color de la barra de estado en tiempo de ejecución en su lugar a través de `StatusBar.backgroundColorByHexString` o `StatusBar.backgroundColorByName`. Una forma de hacerlo sería:

```js
if (cordova.platformId == 'android') {
    StatusBar.backgroundColorByHexString("#333");
}
```

## Escondido en el arranque

Durante el tiempo de ejecución puede utilizar la función StatusBar.hide abajo, pero si quieres la barra de estado que está escondido en el inicio de la aplicación, se debe modificar el archivo Info.plist de su aplicación.

Agregar/editar estos dos atributos si no está presente. Defina **"inicialmente se esconde la barra de estado"** a **"YES"** y **"Aparición de vista basado en controlador estatus bar"** a **"NO"**. Si se edita manualmente sin Xcode, las claves y valores son:

    <key>UIStatusBarHidden</key>
    <true/>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
    

## Métodos

Este plugin define global `StatusBar` objeto.

Aunque en el ámbito global, no estará disponible hasta después de la `deviceready` evento.

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

## Propiedades

  * StatusBar.isVisible

## Permisos

#### config.xml

            <feature name="StatusBar">
                <param name="ios-package" value="CDVStatusBar" onload="true" />
            </feature>
    

# StatusBar.overlaysWebView

En iOS 7, hacer la barra de estado superposición o no superponer la vista Web.

    StatusBar.overlaysWebView(true);
    

## Descripción

En iOS 7, establecida en false para que la barra de estado aparezca como iOS 6. Establece el color de fondo y estilo para utilizar las otras funciones.

## Plataformas soportadas

  * iOS

## Ejemplo rápido

    StatusBar.overlaysWebView(true);
    StatusBar.overlaysWebView(false);
    

# StatusBar.styleDefault

Utilice la barra de estado por defecto (texto oscuro, para fondos de luz).

    StatusBar.styleDefault();
    

## Plataformas soportadas

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.styleLightContent

Utilice la barra de estado lightContent (texto ligero, para fondos oscuros).

    StatusBar.styleLightContent();
    

## Plataformas soportadas

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.styleBlackTranslucent

Utilice la barra de estado blackTranslucent (texto ligero, para fondos oscuros).

    StatusBar.styleBlackTranslucent();
    

## Plataformas soportadas

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.styleBlackOpaque

Utilice la barra de estado blackOpaque (texto ligero, para fondos oscuros).

    StatusBar.styleBlackOpaque();
    

## Plataformas soportadas

  * iOS
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.backgroundColorByName

En iOS 7, al establecer StatusBar.statusBarOverlaysWebView a false, se puede establecer el color de fondo de la barra de estado nombre del color.

    StatusBar.backgroundColorByName("red");
    

Nombres de los colores admitidos son:

    black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
    

## Plataformas soportadas

  * iOS
  * Android 5+
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.backgroundColorByHexString

Establece el color de fondo de la barra de estado por una cadena hexadecimal.

    StatusBar.backgroundColorByHexString("#C0C0C0");
    

Propiedades CSS abreviada también son compatibles.

    StatusBar.backgroundColorByHexString("#333"); // => #333333
    StatusBar.backgroundColorByHexString("#FAB"); // => #FFAABB
    

En iOS 7, cuando se establece StatusBar.statusBarOverlaysWebView en false, se puede establecer el color de fondo de la barra de estado una cadena hexadecimal (#RRGGBB).

En WP7 y WP8 también puede especificar valores como #AARRGGBB, donde AA es un valor alfa

## Plataformas soportadas

  * iOS
  * Android 5+
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.hide

Ocultar la barra de estado.

    StatusBar.hide();
    

## Plataformas soportadas

  * iOS
  * Android
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.show

Muestra la barra de estado.

    StatusBar.show();
    

## Plataformas soportadas

  * iOS
  * Android
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1

# StatusBar.isVisible

Lea esta propiedad para ver si la barra de estado es visible o no.

    if (StatusBar.isVisible) {
        // do something
    }
    

## Plataformas soportadas

  * iOS
  * Android
  * Windows Phone 7
  * Windows Phone 8
  * Windows Phone 8.1