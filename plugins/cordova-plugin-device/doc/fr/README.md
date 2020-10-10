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

# cordova-plugin-device

[![Build Status](https://travis-ci.org/apache/cordova-plugin-device.svg?branch=master)](https://travis-ci.org/apache/cordova-plugin-device)

Ce plugin définit un global `device` objet qui décrit le matériel et les logiciels de l'appareil. Bien que l'objet est dans la portée globale, il n'est pas disponible jusqu'après la `deviceready` événement.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(device.cordova);
    }
    

## Installation

    cordova plugin add cordova-plugin-device
    

## Propriétés

  * device.cordova
  * device.model
  * device.platform
  * device.uuid
  * device.version

## device.cordova

Retourne la version de Cordova en cours d'exécution sur l'appareil.

### Plates-formes supportées

  * Amazon Fire OS
  * Android
  * BlackBerry 10
  * Navigateur
  * Firefox OS
  * iOS
  * Paciarelli
  * Windows Phone 7 et 8
  * Windows 8

## device.model

L'objet `device.model` retourne le nom du modèle de l'appareil/produit. Cette valeur est définie par le fabricant du périphérique et peut varier entre les différentes versions d'un même produit.

### Plates-formes supportées

  * Android
  * BlackBerry 10
  * Navigateur
  * iOS
  * Paciarelli
  * Windows Phone 7 et 8
  * Windows 8

### Exemple court

    // Android:    Nexus One       returns "Passion" (Nexus One code name)
    //             Motorola Droid  returns "voles"
    // BlackBerry: Torch 9800      returns "9800"
    // Browser:    Google Chrome   returns "Chrome"
    //             Safari          returns "Safari"
    // iOS:     for the iPad Mini, returns iPad2,5; iPhone 5 is iPhone 5,1. Voir http://theiphonewiki.com/wiki/index.php?title=Models
    //
    var model = device.model;
    

### Quirks Android

  * Retourne le [nom du produit](http://developer.android.com/reference/android/os/Build.html#PRODUCT) au lieu du [nom du modèle](http://developer.android.com/reference/android/os/Build.html#MODEL), ce qui équivaut souvent au nom de code de production. Par exemple, `Passion` pour le Nexus One et `voles` pour le Motorola Droid.

### Bizarreries de paciarelli

  * Retourne le modèle du dispositif, assigné par le vendeur, par exemple `TIZEN`

### Notes au sujet de Windows Phone 7 et 8

  * Retourne le modèle de l'appareil spécifié par le fabricant. Par exemple `SGH-i917` pour le Samsung Focus.

## device.platform

Obtenir le nom de système d'exploitation de l'appareil.

    var string = device.platform;
    

### Plates-formes supportées

  * Android
  * BlackBerry 10
  * Browser4
  * Firefox OS
  * iOS
  * Paciarelli
  * Windows Phone 7 et 8
  * Windows 8

### Exemple court

    // Depending on the device, a few examples are:
    //   - "Android"
    //   - "BlackBerry 10"
    //   - Browser:         returns "MacIntel" on Mac
    //                      returns "Win32" on Windows
    //   - "iOS"
    //   - "WinCE"
    //   - "Tizen"
    var devicePlatform = device.platform;
    

### Windows Phone 7 Quirks

Appareils Windows Phone 7 rapport de la plate-forme comme`WinCE`.

### Notes au sujet de Windows Phone 8

Appareils Windows Phone 8 rapport de la plate-forme comme`Win32NT`.

## device.uuid

Obtenir Universally Unique Identifier de l'appareil ([UUID](http://en.wikipedia.org/wiki/Universally_Unique_Identifier)).

    var string = device.uuid;
    

### Description

Les détails de comment un UUID généré sont déterminées par le fabricant du périphérique et sont spécifiques à la plate-forme ou le modèle de l'appareil.

### Plates-formes supportées

  * Android
  * BlackBerry 10
  * iOS
  * Paciarelli
  * Windows Phone 7 et 8
  * Windows 8

### Exemple court

    // Android : retourne un nombre entier 64-bit aléatoire (sous la forme d'une chaîne de caractères, encore !)
    // Ce nombre entier est généré lors du premier démarrage de l'appareil
    //
    // BlackBerry : retourne le numéro PIN de l'appareil
    // Il s'agit d'un nombre entier unique à neuf chiffres (sous la forme d'une chaîne de caractères cependant !)
    //
    // iPhone : (copié depuis la documentation de la classe UIDevice)
    // Retourne une chaîne de caractères générée à partir de plusieurs caractéristiques matérielles.
    / / Il est garanti pour être unique pour chaque appareil et ne peut pas être lié / / pour le compte d'utilisateur.
    // Windows Phone 7 : retourne un hashage généré à partir de appareil+utilisateur actuel,
    // si aucun utilisateur n'est défini, un guid est généré persistera jusqu'à ce que l'application soit désinstallée
    // Tizen : retourne le numéro IMEI (International Mobile Equipment Identity) de l'appareil, ce numéro est
    // unique pour chaque téléphone GSM et UMTS.
    var deviceID = device.uuid;
    

### Spécificités iOS

Le `uuid` sur iOS n'est pas propre à un périphérique, mais varie pour chaque application, pour chaque installation. Elle change si vous supprimez, puis réinstallez l'application, et éventuellement aussi quand vous mettre à jour d'iOS, ou même mettre à jour le soft par version (apparent dans iOS 5.1). Le `uuid` n'est pas une valeur fiable.

### Notes au sujet de Windows Phone 7 et 8

Le `uuid` pour Windows Phone 7 requiert l'autorisation `ID_CAP_IDENTITY_DEVICE` . Microsoft va probablement bientôt obsolète de cette propriété. Si la capacité n'est pas disponible, l'application génère un guid persistant qui est maintenu pendant toute la durée de l'installation de l'application sur le périphérique.

## device.version

Téléchargez la version de système d'exploitation.

    var string = device.version;
    

### Plates-formes supportées

  * Android 2.1+
  * BlackBerry 10
  * Navigateur
  * iOS
  * Paciarelli
  * Windows Phone 7 et 8
  * Windows 8

### Exemple court

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