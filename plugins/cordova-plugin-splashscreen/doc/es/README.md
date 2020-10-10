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

Este plugin muestra y esconde una pantalla de bienvenida durante el inicio de la aplicación.

## Instalación

    // npm hosted (new) id
    cordova plugin add cordova-plugin-splashscreen
    // you may also install directly from this repo
    cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git
    

## Plataformas soportadas

  * Amazon fire OS
  * Android
  * BlackBerry 10
  * iOS
  * Windows Phone 7 y 8
  * Windows 8
  * Windows
  * Explorador

## Métodos

  * splashscreen.show
  * splashscreen.hide

### Rarezas Android

En el `archivo config.xml`, es necesario agregar las siguientes preferencias:

    <preference name="SplashScreen" value="foo" />
    <preference name="SplashScreenDelay" value="10000" />
    <preference name="SplashMaintainAspectRatio" value="true|false" />
    

Donde foo es el nombre del archivo splashscreen, preferiblemente un archivo de 9 parche. Asegúrese de agregar tus archivos splashcreen en tu directorio res/xml bajo las carpetas apropiadas. El segundo parámetro representa cuánto aparecerán el splashscreen en milisegundos. Valor predeterminado es ms 3000. Ver [los iconos y salpicadura pantallas](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html) para obtener más información.

Preferencia "SplashMaintainAspectRatio" es opcional. Si establece en true, pantalla dibujable no es estirado para caber la pantalla, pero en su lugar simplemente "cover" la pantalla, como CSS "background-size: cover". Esto es muy útil cuando las imágenes de pantallas splash no distorsionadas de cualquier manera, por ejemplo cuando contienen texto o paisaje. Esta opción funciona mejor con imágenes que tienen bordes grandes (zonas seguras) que pueden ser recortadas con seguridad en pantallas con diferentes relaciones de aspecto.

El plugin recarga splash dibujable cuando cambia de orientación, por lo que puede especificar diferente dibujo para orientaciones vertical y horizontal.

### Navegador rarezas

Puede utilizar las siguientes preferencias en el `archivo config.xml`:

    <platform name="browser">
        <preference name="SplashScreen" value="images/browser/splashscreen.jpg" /> <!-- defaults to "img/logo.png" -->
        <preference name="SplashScreenDelay" value="10000" /> <!-- defaults to "3000" -->
        <preference name="SplashScreenBackgroundColor" value="green" /> <!-- defaults to "#464646" -->
        <preference name="ShowSplashScreen" value="false" /> <!-- defaults to "true" -->
        <preference name="SplashScreenWidth" value="600" /> <!-- defaults to "170" -->
        <preference name="SplashScreenHeight" value="300" /> <!-- defaults to "200" -->
    </platform>
    

### iOS rarezas

  * `FadeSplashScreen` (booleano, por defecto `true`): establecida en `false` para evitar que la pantalla de bienvenida de descolorarse adentro y hacia fuera cuando cambia su estado de presentación.
    
        <preference name="FadeSplashScreen" value="false"/>
        

  * `FadeSplashScreenDuration` (float, por defecto es `2`): especifica el número de segundos para que la pantalla se descolora efecto para ejecutar.
    
        <preference name="FadeSplashScreenDuration" value="4"/>
        

  * `ShowSplashScreenSpinner` (booleano, por defecto `true`): establecida en `false` para ocultar la ruleta de la pantalla de bienvenida.
    
        <preference name="ShowSplashScreenSpinner" value="false"/>
        

## splashscreen.hide

Despedir a la pantalla de bienvenida.

    navigator.splashscreen.hide();
    

### BlackBerry 10, WP8, iOS Quirk

El `config.xml` del archivo `AutoHideSplashScreen` la configuración debe ser `false` . Para retrasar oculta la pantalla splash durante dos segundos, agregue un temporizador como la siguiente en el `deviceready` controlador de eventos:

        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);
    

## splashscreen.show

Muestra la pantalla de bienvenida.

    navigator.splashscreen.show();
    

La aplicación no se puede llamar `navigator.splashscreen.show()` hasta que haya iniciado la aplicación y el `deviceready` evento ha despedido. Pero puesto que normalmente la pantalla está destinada a ser visible antes de que comience su aplicación, que parecería que el propósito de la pantalla de bienvenida. Proporcionar cierta configuración en `config.xml` automáticamente `show` la pantalla de presentación inmediatamente después de su lanzamiento de la aplicación y antes de ser completamente ha iniciado y recibió el `deviceready` evento. Ver [los iconos y salpicadura pantallas](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html) para obtener más información sobre haciendo esta configuración. Por esta razón, es poco probable que necesitas llamar a `navigator.splashscreen.show()` para hacer la pantalla visible para el inicio de la aplicación.