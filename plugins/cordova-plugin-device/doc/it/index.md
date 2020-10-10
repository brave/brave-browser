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

Questo plugin definisce un global `device` oggetto che descrive il dispositivo hardware e software. Sebbene l'oggetto sia in ambito globale, non è disponibile fino a dopo il `deviceready` evento.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(device.cordova);
    }
    

## Installazione

    cordova plugin add cordova-plugin-device
    

## Proprietà

*   device.cordova
*   device.model
*   device.platform
*   device.uuid
*   device.version

## device.cordova

Ottenere la versione di Cordova in esecuzione nel dispositivo.

### Piattaforme supportate

*   Amazon fuoco OS
*   Android
*   BlackBerry 10
*   Browser
*   Firefox OS
*   iOS
*   Tizen
*   Windows Phone 7 e 8
*   Windows 8

## device.model

Il `device.model` restituisce il nome del modello del dispositivo o del prodotto. Il valore viene impostato dal produttore del dispositivo e può essere differente tra le versioni dello stesso prodotto.

### Piattaforme supportate

*   Android
*   BlackBerry 10
*   Browser
*   iOS
*   Tizen
*   Windows Phone 7 e 8
*   Windows 8

### Esempio rapido

    // Android:    Nexus One       returns "Passion" (Nexus One code name)
    //             Motorola Droid  returns "voles"
    // BlackBerry: Torch 9800      returns "9800"
    // Browser:    Google Chrome   returns "Chrome"
    //             Safari          returns "Safari"
    // iOS:     for the iPad Mini, returns iPad2,5; iPhone 5 is iPhone 5,1. Vedi http://theiphonewiki.com/wiki/index.php?title=Models / / modello var = device.model;
    

### Stranezze Android

*   Ottiene il [nome del prodotto][1] anziché il [nome del modello][2], che è spesso il nome di codice di produzione. Ad esempio, restituisce il Nexus One `Passion` , e Motorola Droid restituisce`voles`.

 [1]: http://developer.android.com/reference/android/os/Build.html#PRODUCT
 [2]: http://developer.android.com/reference/android/os/Build.html#MODEL

### Tizen stranezze

*   Restituisce il modello di dispositivo assegnato dal fornitore, ad esempio,`TIZEN`

### Windows Phone 7 e 8 stranezze

*   Restituisce il modello di dispositivo specificato dal produttore. Ad esempio, restituisce il Samsung Focus`SGH-i917`.

## device.platform

Ottenere il nome del sistema operativo del dispositivo.

    var string = device.platform;
    

### Piattaforme supportate

*   Android
*   BlackBerry 10
*   Browser4
*   Firefox OS
*   iOS
*   Tizen
*   Windows Phone 7 e 8
*   Windows 8

### Esempio rapido

    // Depending on the device, a few examples are:
    //   - "Android"
    //   - "BlackBerry 10"
    //   - Browser:         returns "MacIntel" on Mac
    //                      returns "Win32" on Windows
    //   - "iOS"
    //   - "WinCE"
    //   - "Tizen"
    var devicePlatform = device.platform;
    

### Windows Phone 7 capricci

Windows Phone 7 dispositivi segnalano la piattaforma come`WinCE`.

### Windows Phone 8 stranezze

Dispositivi Windows Phone 8 segnalano la piattaforma come`Win32NT`.

## device.uuid

Ottenere identificatore del dispositivo univoco universale ([UUID][3]).

 [3]: http://en.wikipedia.org/wiki/Universally_Unique_Identifier

    var string = device.uuid;
    

### Descrizione

I dettagli di come viene generato un UUID sono determinati dal produttore del dispositivo e sono specifici per la piattaforma o il modello del dispositivo.

### Piattaforme supportate

*   Android
*   BlackBerry 10
*   iOS
*   Tizen
*   Windows Phone 7 e 8
*   Windows 8

### Esempio rapido

    / / Android: restituisce un intero casuale di 64 bit (come stringa, ancora una volta!) / / il numero intero è generato al primo avvio del dispositivo / / / / BlackBerry: restituisce il numero PIN del dispositivo / / questo è un valore integer univoco a nove cifre (come stringa, benchè!) / / / / iPhone: (parafrasato dalla documentazione della classe UIDevice) / / restituisce una stringa di valori hash creata dall'hardware più identifica.
    / / È garantito per essere unica per ogni dispositivo e non può essere legato / / per l'account utente.
    / / Windows Phone 7: restituisce un hash dell'utente corrente, + dispositivo / / se l'utente non è definito, un guid generato e persisterà fino a quando l'applicazione viene disinstallata / / Tizen: restituisce il dispositivo IMEI (International Mobile Equipment Identity o IMEI è un numero / / unico per ogni cellulare GSM e UMTS.
    var deviceID = device.uuid;
    

### iOS Quirk

Il `uuid` su iOS non è univoco per un dispositivo, ma varia per ogni applicazione, per ogni installazione. Cambia se si elimina e re-installare l'app, e possibilmente anche quando aggiornare iOS o anche aggiornare l'app per ogni versione (apparente in iOS 5.1). Il `uuid` non è un valore affidabile.

### Windows Phone 7 e 8 stranezze

Il `uuid` per Windows Phone 7 richiede l'autorizzazione `ID_CAP_IDENTITY_DEVICE` . Microsoft probabilmente sarà presto deprecare questa proprietà. Se la funzionalità non è disponibile, l'applicazione genera un guid persistente che viene mantenuto per la durata dell'installazione dell'applicazione sul dispositivo.

## device.version

Ottenere la versione del sistema operativo.

    var string = device.version;
    

### Piattaforme supportate

*   Android 2.1 +
*   BlackBerry 10
*   Browser
*   iOS
*   Tizen
*   Windows Phone 7 e 8
*   Windows 8

### Esempio rapido

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
