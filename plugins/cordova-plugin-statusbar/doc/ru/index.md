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

> Объект `StatusBar` предоставляет некоторые функции для настройки статусной панели на iOS и Android.

## Настройки

#### config.xml

*   **StatusBarOverlaysWebView** (логическое значение, по умолчанию true). В iOS 7 определяет необходимо ли сделать наложение статусной панели на WebView при запуске или нет.
    
        <preference name="StatusBarOverlaysWebView" value="true" />
        

*   **StatusBarBackgroundColor** (шестнадцатеричная строка цвета, значения по умолчанию #000000). На iOS 7 установит цвет фона статусной панели при запуске, на основании шестнадцатеричной строки цвета (#RRGGBB).
    
        <preference name="StatusBarBackgroundColor" value="#000000" />
        

*   **StatusBarStyle** (статус бар стиль, по умолчанию lightcontent). На iOS 7 установите стиль строки состояния. Доступные параметры по умолчанию, lightcontent, blacktranslucent, blackopaque.
    
        <preference name="StatusBarStyle" value="lightcontent" />
        

## Скрытие при запуске

Во время выполнения можно использовать функцию StatusBar.hide ниже, но если вы хотите StatusBar быть скрыты при запуске приложения, необходимо изменить файл Info.plist вашего приложения.

Добавьте/измените эти два атрибута, если они не присутствуют или отличаются от нижеуказанных значений. Установите значение **«Status bar is initially hidden»** равное **«YES»** и установите значение **«View controller-based status bar appearance»** на **«NO»**. Если вы измените его вручную без Xcode, ключи и значения являются следующими:

    <key>UIStatusBarHidden</key>
    <true/>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
    

## Методы

*   StatusBar.overlaysWebView
*   StatusBar.styleDefault
*   StatusBar.styleLightContent
*   StatusBar.styleBlackTranslucent
*   StatusBar.styleBlackOpaque
*   StatusBar.backgroundColorByName
*   StatusBar.backgroundColorByHexString
*   StatusBar.hide
*   StatusBar.show

## Параметры

*   StatusBar.isVisible

## Разрешения

#### config.xml

            <feature name="StatusBar">
                <param name="ios-package" value="CDVStatusBar" onload="true" />
            </feature>
    

# StatusBar.overlaysWebView

На iOS 7 Сделайте statusbar overlay или не поверх WebView.

    StatusBar.overlaysWebView(true);
    

## Описание

На iOS 7 Установите значение false чтобы сделать statusbar появляются как iOS 6. Задайте стиль и цвет фона в соответствии с использованием других функций.

## Поддерживаемые платформы

*   iOS

## Краткий пример

    StatusBar.overlaysWebView(true);
    StatusBar.overlaysWebView(false);
    

# StatusBar.styleDefault

Используйте по умолчанию statusbar (темный текст, для легких стола).

    StatusBar.styleDefault();
    

## Поддерживаемые платформы

*   iOS
*   Windows Phone 7
*   Windows Phone 8

# StatusBar.styleLightContent

Используйте lightContent statusbar (светлый текст, на темном фоне).

    StatusBar.styleLightContent();
    

## Поддерживаемые платформы

*   iOS
*   Windows Phone 7
*   Windows Phone 8

# StatusBar.styleBlackTranslucent

Используйте blackTranslucent statusbar (светлый текст, на темном фоне).

    StatusBar.styleBlackTranslucent();
    

## Поддерживаемые платформы

*   iOS
*   Windows Phone 7
*   Windows Phone 8

# StatusBar.styleBlackOpaque

Используйте blackOpaque statusbar (светлый текст, на темном фоне).

    StatusBar.styleBlackOpaque();
    

## Поддерживаемые платформы

*   iOS
*   Windows Phone 7
*   Windows Phone 8

# StatusBar.backgroundColorByName

На iOS 7 когда StatusBar.statusBarOverlaysWebView присвоено значение false, можно задать цвет фона для объекта statusbar по имени цвета.

    StatusBar.backgroundColorByName("red");
    

Имена поддерживаемых цветов являются:

    black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
    

## Поддерживаемые платформы

*   iOS
*   Windows Phone 7
*   Windows Phone 8

# StatusBar.backgroundColorByHexString

Задает цвет фона для объекта statusbar, шестнадцатеричная строка.

    StatusBar.backgroundColorByHexString("#C0C0C0");
    

Также поддерживаются свойства CSS стенографию.

    StatusBar.backgroundColorByHexString("#333"); // => #333333
    StatusBar.backgroundColorByHexString("#FAB"); // => #FFAABB
    

На iOS 7 когда StatusBar.statusBarOverlaysWebView присвоено значение false, можно задать цвет фона для объекта statusbar, шестнадцатеричная строка (#RRGGBB).

На WP7 и WP8 также можно указать значения как #AARRGGBB, где AA — это альфа-значение

## Поддерживаемые платформы

*   iOS
*   Windows Phone 7
*   Windows Phone 8

# StatusBar.hide

Скройте строку состояния statusbar.

    StatusBar.hide();
    

## Поддерживаемые платформы

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8

# StatusBar.show

Показывает строку состояния statusbar.

    StatusBar.show();
    

## Поддерживаемые платформы

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8

# StatusBar.isVisible

Чтение это свойство, чтобы увидеть, если statusbar является видимым или нет.

    if (StatusBar.isVisible) {
        // do something
    }
    

## Поддерживаемые платформы

*   iOS
*   Android
*   Windows Phone 7
*   Windows Phone 8
