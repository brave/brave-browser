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

> Le `StatusBar` objet fournit quelques fonctions pour personnaliser les iOS et Android StatusBar.

## Installation

    cordova plugin add cordova-plugin-statusbar
    

## Préférences

#### config.xml

*   **StatusBarOverlaysWebView** (boolean, la valeur par défaut true). Sur iOS 7, faire la superposition de statusbar ou pas superposition le WebView au démarrage.
    
        <preference name="StatusBarOverlaysWebView" value="true" />
        

*   **StatusBarBackgroundColor** (chaîne hexadécimale de couleur, par défaut, #000000). Sur iOS 7, définir la couleur d'arrière-plan de la barre d'État par une chaîne hexadécimale (#RRGGBB) au démarrage.
    
        <preference name="StatusBarBackgroundColor" value="#000000" />
        

*   **StatusBarStyle** (style de barre de statut, par défaut, lightcontent). Sur iOS 7, définir le style de barre de statut. Par défaut les options disponibles, lightcontent, blacktranslucent, blackopaque.
    
        <preference name="StatusBarStyle" value="lightcontent" />
        

## Cacher au démarrage

Pendant l'exécution, vous pouvez utiliser la fonction StatusBar.hide en bas, mais si vous souhaitez que la barre d'État pour être caché au démarrage de l'application, vous devez modifier le fichier Info.plist de votre application.

Ajouter/modifier ces deux attributs si n'est pas présent. **"Barre d'État est initialement masqué"** la valeur **"** Yes" et **"À l'apparence vue sur contrôleur statut bar"** la valeur **"Non"**. Si vous modifiez manuellement sans Xcode, les clés et les valeurs sont :

    <key>UIStatusBarHidden</key>
    <true/>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
    

## Méthodes

Ce plugin définit objet `StatusBar` global.

Bien que dans la portée globale, il n'est pas disponible jusqu'après la `deviceready` événement.

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

## Propriétés

*   StatusBar.isVisible

## Autorisations

#### config.xml

            <feature name="StatusBar">
                <param name="ios-package" value="CDVStatusBar" onload="true" />
            </feature>
    

# StatusBar.overlaysWebView

Sur iOS 7, faire la statusbar superposition ou pas superposer le WebView.

    StatusBar.overlaysWebView(true);
    

## Description

Sur iOS 7, la valeur false pour afficher la barre d'État comme iOS 6. Définissez la couleur de style et d'arrière-plan en fonction de l'utilisation des autres fonctions.

## Plates-formes supportées

*   iOS

## Exemple court

    StatusBar.overlaysWebView(true);
    StatusBar.overlaysWebView(false);
    

# StatusBar.styleDefault

Utilisez la barre de statut par défaut (texte sombre, pour les arrière-plans lumineux).

    StatusBar.styleDefault();
    

## Plates-formes prises en charge

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleLightContent

Utilisez la barre d'État lightContent (texte clair, des arrière-plans sombres).

    StatusBar.styleLightContent();
    

## Plates-formes prises en charge

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleBlackTranslucent

Utilisez la barre d'État blackTranslucent (texte clair, des arrière-plans sombres).

    StatusBar.styleBlackTranslucent();
    

## Plates-formes prises en charge

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.styleBlackOpaque

Utilisez la barre d'État blackOpaque (texte clair, des arrière-plans sombres).

    StatusBar.styleBlackOpaque();
    

## Plates-formes prises en charge

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.backgroundColorByName

Sur iOS 7, lorsque vous définissez StatusBar.statusBarOverlaysWebView sur false, vous pouvez définir la couleur d'arrière-plan de la barre d'État par nom de couleur.

    StatusBar.backgroundColorByName("red");
    

Les noms de couleurs prises en charge sont :

    black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
    

## Plates-formes prises en charge

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.backgroundColorByHexString

Définit la couleur d'arrière-plan de la barre d'État par une chaîne hexadécimale.

    StatusBar.backgroundColorByHexString("#C0C0C0");
    

Propriétés de raccourci CSS sont également pris en charge.

    StatusBar.backgroundColorByHexString("#333"); // => #333333
    StatusBar.backgroundColorByHexString("#FAB"); // => #FFAABB
    

Sur iOS 7, lorsque vous définissez StatusBar.statusBarOverlaysWebView sur false, vous pouvez définir la couleur d'arrière-plan de la barre d'État par une chaîne hexadécimale (#RRGGBB).

Sur WP7 et WP8, vous pouvez également spécifier des valeurs comme #AARRGGBB, où AA représente une valeur alpha

## Plates-formes prises en charge

*   iOS
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.hide

Masquer la barre d'État.

    StatusBar.hide();
    

## Plates-formes prises en charge

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.show

Affiche la barre d'État.

    StatusBar.show();
    

## Plates-formes prises en charge

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1

# StatusBar.isVisible

Lire cette propriété afin de voir si la barre d'État est visible ou non.

    if (StatusBar.isVisible) {
        // do something
    }
    

## Plates-formes supportées

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8
*   Windows Phone 8.1
