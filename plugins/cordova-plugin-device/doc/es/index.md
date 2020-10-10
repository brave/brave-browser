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

Este plugin define un global `device` objeto que describe del dispositivo hardware y software. Aunque el objeto está en el ámbito global, no está disponible hasta después de la `deviceready` evento.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(device.cordova);
    }
    

## Instalación

    cordova plugin add cordova-plugin-device
    

## Propiedades

*   device.cordova
*   device.model
*   device.platform
*   device.uuid
*   device.version

## device.cordova

Obtener la versión de Cordova que se ejecuta en el dispositivo.

### Plataformas soportadas

*   Amazon fire OS
*   Android
*   BlackBerry 10
*   Explorador
*   Firefox OS
*   iOS
*   Tizen
*   Windows Phone 7 y 8
*   Windows 8

## device.model

El `device.model` devuelve el nombre de modelo del dispositivo o producto. El valor es fijado por el fabricante del dispositivo y puede ser diferente a través de versiones del mismo producto.

### Plataformas soportadas

*   Android
*   BlackBerry 10
*   Explorador
*   iOS
*   Tizen
*   Windows Phone 7 y 8
*   Windows 8

### Ejemplo rápido

    // Android:    Nexus One       returns "Passion" (Nexus One code name)
    //             Motorola Droid  returns "voles"
    // BlackBerry: Torch 9800      returns "9800"
    // Browser:    Google Chrome   returns "Chrome"
    //             Safari          returns "Safari"
    // iOS:     for the iPad Mini, returns iPad2,5; iPhone 5 is iPhone 5,1. See http://theiphonewiki.com/wiki/index.php?title=Models
    //
    var model = device.model;
    

### Rarezas Android

*   Obtiene el [nombre del producto][1] en lugar del [nombre de la modelo][2], que es a menudo el nombre de código de producción. Por ejemplo, el Nexus One devuelve `Passion` y Motorola Droid devuelve `voles`.

 [1]: http://developer.android.com/reference/android/os/Build.html#PRODUCT
 [2]: http://developer.android.com/reference/android/os/Build.html#MODEL

### Rarezas Tizen

*   Devuelve que el modelo de dispositivo asignado por el proveedor, por ejemplo, `TIZEN`

### Windows Phone 7 y 8 rarezas

*   Devuelve el modelo de dispositivo especificado por el fabricante. Por ejemplo, el Samsung Focus devuelve `SGH-i917`.

## device.platform

Obtener el nombre del sistema operativo del dispositivo.

    var string = device.platform;
    

### Plataformas soportadas

*   Android
*   BlackBerry 10
*   Browser4
*   Firefox OS
*   iOS
*   Tizen
*   Windows Phone 7 y 8
*   Windows 8

### Ejemplo rápido

    // Depending on the device, a few examples are:
    //   - "Android"
    //   - "BlackBerry 10"
    //   - Browser:         returns "MacIntel" on Mac
    //                      returns "Win32" on Windows
    //   - "iOS"
    //   - "WinCE"
    //   - "Tizen"
    var devicePlatform = device.platform;
    

### Windows Phone 7 rarezas

Dispositivos Windows Phone 7 informe de la plataforma como `WinCE`.

### Windows Phone 8 rarezas

Dispositivos Windows Phone 8 Informe la plataforma como `Win32NT`.

## device.uuid

Obtener identificador universalmente única del dispositivo ([UUID][3]).

 [3]: http://en.wikipedia.org/wiki/Universally_Unique_Identifier

    var string = device.uuid;
    

### Descripción

Los detalles de cómo se genera un UUID son determinados por el fabricante del dispositivo y son específicos a la plataforma del dispositivo o modelo.

### Plataformas soportadas

*   Android
*   BlackBerry 10
*   iOS
*   Tizen
*   Windows Phone 7 y 8
*   Windows 8

### Ejemplo rápido

    // Android: devuelve un entero de 64 bits al azar (como una cadena, otra vez!) 
    // el entero es generado en el primer arranque del dispositivo 
    // 
    // BlackBerry: devuelve el número PIN del dispositivo 
    // este es un entero único de nueve dígitos (como una cadena, aunque!) 
    // 
    // iPhone: (parafraseado de la documentación de la clase UIDevice) 
    // devuelve una cadena de valores hash creado a partir 
    //  de múltiples hardware identifica.
    / / Está garantizado para ser único para cada dispositivo y no puede ser atado / / a la cuenta de usuario.
    // Windows Phone 7: devuelve un hash de dispositivo + usuario actual, 
    // si el usuario no está definido, un guid generado y persistirá hasta que se desinstala la aplicación 
    // 
    // Tizen: devuelve el dispositivo IMEI (identidad de equipo móvil internacional o IMEI es un número 
    // único para cada teléfono móvil GSM y UMTS.
    var deviceID = device.uuid;
    

### iOS chanfle

El `uuid` en iOS no es exclusiva de un dispositivo, pero varía para cada aplicación, para cada instalación. Cambia si puedes borrar y volver a instalar la aplicación, y posiblemente también cuándo actualizar iOS, o incluso mejorar la aplicación por la versión (evidente en iOS 5.1). El `uuid` no es un valor confiable.

### Windows Phone 7 y 8 rarezas

El `uuid` para Windows Phone 7 requiere el permiso `ID_CAP_IDENTITY_DEVICE`. Microsoft pronto probablemente desaprueban esta propiedad. Si la capacidad no está disponible, la aplicación genera un guid persistente que se mantiene durante la duración de la instalación de la aplicación en el dispositivo.

## device.version

Obtener la versión del sistema operativo.

    var string = device.version;
    

### Plataformas soportadas

*   Android 2.1 +
*   BlackBerry 10
*   Explorador
*   iOS
*   Tizen
*   Windows Phone 7 y 8
*   Windows 8

### Ejemplo rápido

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
    // Windows Phone 7: returns current OS version number, ex. el Mango se vuelve 7.10.7720 
    // Tizen: devuelve "TIZEN_20120425_2" 
    var deviceVersion = device.version;
