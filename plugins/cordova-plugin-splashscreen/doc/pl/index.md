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

# cordova-plugin-splashscreen

Ten plugin wyświetla i ukrywa ekran powitalny podczas uruchamiania aplikacji.

## Instalacja

    cordova plugin add cordova-plugin-splashscreen
    

## Obsługiwane platformy

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   iOS
*   Windows Phone 7 i 8
*   Windows 8

## Metody

*   splashscreen.show
*   splashscreen.Hide

### Dziwactwa Androida

W pliku config.xml musisz dodać następujące preferencje:

    <preference name="SplashScreen" value="foo" />
    <preference name="SplashScreenDelay" value="10000" />
    

Gdzie foo jest nazwą pliku ekranu powitalnego, najlepiej 9 łatce. Upewnij się dodać pliki splashcreen do katalogu res/xml w odpowiednich folderach. Drugi parametr reprezentuje, jak długo ekranu powitalnego pojawi się w milisekundach. Domyślnie 3000 ms. Aby uzyskać więcej informacji, zobacz [ikony i ekrany powitalne w aplikacjach][1].

 [1]: http://cordova.apache.org/docs/en/edge/config_ref_images.md.html

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
    

Aplikacja nie można wywołać `navigator.splashscreen.show()`, aż aplikacja została uruchomiona i zdarzenie `deviceready` został zwolniony. Ale ponieważ zazwyczaj opryskać tęcza ma być widoczne przed rozpoczęciem aplikacji, wydaje się sprzeczne z celem ekranu powitalnego. Dostarczanie niektórych konfiguracji w `pliku config.xml` będzie automatycznie `show` splash na ekranie natychmiast po uruchomienie aplikacji i przed pełni rozpoczął i odebrał zdarzenie `deviceready`. Aby uzyskać więcej informacji na robienie tej konfiguracji, zobacz [ikony i ekrany powitalne w aplikacjach][1]. Z tego powodu jest mało prawdopodobne, należy zadzwonić `navigator.splashscreen.show()`, aby wyświetlić ekran powitalny dla uruchamiania aplikacji.
