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

Ce plugin affiche et masque un écran de démarrage lors du lancement de l'application.

## Installation

    // npm hosted (new) id
    cordova plugin add cordova-plugin-splashscreen
    // you may also install directly from this repo
    cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git
    

## Plates-formes supportées

  * Amazon Fire OS
  * Android
  * BlackBerry 10
  * iOS
  * Windows Phone 7 et 8
  * Windows 8
  * Windows
  * Navigateur

## Méthodes

  * splashscreen.Show
  * splashscreen.Hide

### Quirks Android

Dans votre `fichier config.xml`, vous devez ajouter les préférences suivantes :

    <preference name="SplashScreen" value="foo" />
    <preference name="SplashScreenDelay" value="10000" />
    <preference name="SplashMaintainAspectRatio" value="true|false" />
    

Où foo est le nom du fichier splashscreen, préférablement un fichier de 9 correctif. Assurez-vous d'ajouter vos fichiers splashcreen dans votre répertoire res/xml dans les dossiers appropriés. Le deuxième paramètre représente combien de temps le splashscreen apparaîtra en millisecondes. Il est par défaut à 3000 ms. Pour plus d'informations, consultez [icônes et écrans de démarrage](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html).

Préférence de « SplashMaintainAspectRatio » est facultative. Si défini à true, écran de démarrage drawable n'est pas étirée pour s'adapter écran, mais plutôt simplement « couvre » l'écran, comme CSS "fond-taille : couverture". Ceci est très utile lorsque images écran de démarrage ne peut pas être déformées en quelque sorte, par exemple lorsqu'ils contiennent des décors ou texte. Ce paramètre fonctionne mieux avec des images qui ont des marges importantes (zones de sécurité) qui peuvent être recadrées en toute sécurité sur les écrans avec des proportions différentes.

Le plugin recharge splash drawable chaque fois que l'orientation change, donc vous pouvez spécifier différents drawables pour les orientations portrait et paysage.

### Bizarreries navigateur

Vous pouvez utiliser les préférences suivantes dans votre `fichier config.xml`:

    <platform name="browser">
        <preference name="SplashScreen" value="images/browser/splashscreen.jpg" /> <!-- defaults to "img/logo.png" -->
        <preference name="SplashScreenDelay" value="10000" /> <!-- defaults to "3000" -->
        <preference name="SplashScreenBackgroundColor" value="green" /> <!-- defaults to "#464646" -->
        <preference name="ShowSplashScreen" value="false" /> <!-- defaults to "true" -->
        <preference name="SplashScreenWidth" value="600" /> <!-- defaults to "170" -->
        <preference name="SplashScreenHeight" value="300" /> <!-- defaults to "200" -->
    </platform>
    

### Notes au sujet d'iOS

  * `FadeSplashScreen` (boolean, par défaut est `true`): la valeur `false` pour empêcher l'écran de démarrage de fading in et out lorsque son état d'affichage est modifié.
    
        <preference name="FadeSplashScreen" value="false"/>
        

  * `FadeSplashScreenDuration` (float, la valeur par défaut `2`): spécifie le nombre de secondes que l'écran de démarrage s'estomper l'effet d'exécuter.
    
        <preference name="FadeSplashScreenDuration" value="4"/>
        

  * `ShowSplashScreenSpinner` (boolean, par défaut est `true`): la valeur `false` pour masquer le cône de l'écran de démarrage.
    
        <preference name="ShowSplashScreenSpinner" value="false"/>
        

## splashscreen.Hide

Faire disparaître de l'écran de démarrage.

    navigator.splashscreen.hide();
    

### BlackBerry 10, WP8, iOS Quirk

Paramètre `AutoHideSplashScreen` du fichier `config.xml` doit avoir la valeur `false`. Pour retarder la cacher l'écran de démarrage pendant deux secondes, ajouter un minuteur semblable à la suivante dans le gestionnaire d'événements `deviceready` :

        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);
    

## splashscreen.Show

Affiche l'écran de démarrage.

    navigator.splashscreen.show();
    

Votre application ne peut pas appeler `navigator.splashscreen.show()` jusqu'à ce que l'application a commencé et l'événement `deviceready` est déclenché. Mais puisqu'en général, l'écran de démarrage est destiné à être visible avant que votre application a commencé, qui semblerait à l'encontre des objectifs de l'écran de démarrage. Fournir une configuration dans le fichier `config.xml` automatiquement `show` le splash projettera immédiatement après votre lancement de l'app et avant qu'il a complètement démarré et a reçu l'événement `deviceready`. Voir les [icônes et les écrans de démarrage](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html) pour plus d'informations sur la conduite de cette configuration. Pour cette raison, il est peu probable que vous devez appeler `navigator.splashscreen.show()` pour rendre l'écran de démarrage visible pour le démarrage de l'application.