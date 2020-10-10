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

Ten plugin wyświetla i ukrywa ekran powitalny podczas uruchamiania aplikacji.

## Instalacja

    // npm hosted (new) id
    cordova plugin add cordova-plugin-splashscreen
    // you may also install directly from this repo
    cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git
    

## Obsługiwane platformy

  * Amazon Fire OS
  * Android
  * BlackBerry 10
  * iOS
  * Windows Phone 7 i 8
  * Windows 8
  * Windows
  * Przeglądarka

## Metody

  * splashscreen.show
  * splashscreen.Hide

### Dziwactwa Androida

W pliku `config.xml`musisz dodać następujące preferencje:

    <preference name="SplashScreen" value="foo" />
    <preference name="SplashScreenDelay" value="10000" />
    <preference name="SplashMaintainAspectRatio" value="true|false" />
    

Gdzie foo jest nazwą pliku ekranu powitalnego, najlepiej 9 łatce. Upewnij się dodać pliki splashcreen do katalogu res/xml w odpowiednich folderach. Drugi parametr reprezentuje, jak długo ekranu powitalnego pojawi się w milisekundach. Domyślnie 3000 ms. Aby uzyskać więcej informacji, zobacz [ikony i ekrany powitalne w aplikacjach](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html).

"SplashMaintainAspectRatio" preferencji jest opcjonalne. Jeśli zestaw na wartość true, ekran powitalny dolarowe nie jest rozciągnięty do ekranów, ale zamiast po prostu "obejmuje" ekranu, jak CSS "tło-rozmiar: okładka". Jest to bardzo przydatne, kiedy opryskać tęcza obrazy nie zniekształcony w jakikolwiek sposób, na przykład, gdy zawierają one dekoracje lub tekst. To ustawienie działa najlepiej z obrazów, które mają duże marginesy (bezpiecznych obszarów), które mogą być bezpiecznie przycięte na ekrany z różnych proporcji.

Plugin ładuje rozchlapać dolarowe, gdy zmienia orientację, tak można określić różnych drawables do orientacji pionowej i poziomej.

### Quirks przeglądarki

W pliku `config.xml`można użyć następujące preferencje:

    <platform name="browser">
        <preference name="SplashScreen" value="images/browser/splashscreen.jpg" /> <!-- defaults to "img/logo.png" -->
        <preference name="SplashScreenDelay" value="10000" /> <!-- defaults to "3000" -->
        <preference name="SplashScreenBackgroundColor" value="green" /> <!-- defaults to "#464646" -->
        <preference name="ShowSplashScreen" value="false" /> <!-- defaults to "true" -->
        <preference name="SplashScreenWidth" value="600" /> <!-- defaults to "170" -->
        <preference name="SplashScreenHeight" value="300" /> <!-- defaults to "200" -->
    </platform>
    

### Dziwactwa iOS

  * `FadeSplashScreen` (wartość logiczna, domyślnie `true`): zestaw na `false` , aby zapobiec Znikająca i odkładane po zmianie stanu wyświetlania ekranu powitalnego.
    
        <preference name="FadeSplashScreen" value="false"/>
        

  * `FadeSplashScreenDuration` (float, domyślnie `2`): określa liczbę sekund dla ekranu powitalnego zanikanie efekt do wykonać.
    
        <preference name="FadeSplashScreenDuration" value="4"/>
        

  * `ShowSplashScreenSpinner` (wartość logiczna, domyślnie `true`): zestaw na `false` , aby ukryć pokrętła ekran powitalny.
    
        <preference name="ShowSplashScreenSpinner" value="false"/>
        

## splashscreen.Hide

Odrzucić ten opryskaæ têcza.

    navigator.splashscreen.hide();
    

### Jeżyna 10, WP8, iOS dziwactwo

Plik `config.xml` `AutoHideSplashScreen` ustawienie musi być `false`. Opóźnienia, ukrywanie ekranu powitalnego przez dwie sekundy, dodać timer następujących w `deviceready` obsługa zdarzeń:

        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);
    

## splashscreen.show

Wyświetla ekran powitalny.

    navigator.splashscreen.show();
    

Aplikacja nie można wywołać `navigator.splashscreen.show()`, aż aplikacja została uruchomiona i zdarzenie `deviceready` został zwolniony. Ale ponieważ zazwyczaj opryskać tęcza ma być widoczne przed rozpoczęciem aplikacji, wydaje się sprzeczne z celem ekranu powitalnego. Dostarczanie niektórych konfiguracji w `pliku config.xml` będzie automatycznie `show` splash na ekranie natychmiast po uruchomienie aplikacji i przed pełni rozpoczął i odebrał zdarzenie `deviceready`. Aby uzyskać więcej informacji na robienie tej konfiguracji, zobacz [ikony i ekrany powitalne w aplikacjach](http://cordova.apache.org/docs/en/edge/config_ref_images.md.html). Z tego powodu jest mało prawdopodobne, należy zadzwonić `navigator.splashscreen.show()`, aby wyświetlić ekran powitalny dla uruchamiania aplikacji.