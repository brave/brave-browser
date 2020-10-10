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

# cordova-plugin-whitelist

Este plugin implementa una política de lista blanca para navegar la aplicación webview en Cordova 4.0

## Plataformas soportadas Cordova

  * Android 4.0 o superior
  * iOS 4.0.0 o superior

## Lista blanca de navegación

Controla que las URLs del WebView se puede navegar a. Se aplica a nivel superior navegaciones solo.

Peculiaridades: en Android también se aplica a iframes para esquemas que son de http (s).

Por defecto, navegaciones solo a direcciones URL `file://` , son permitidas. Para permitir que otros otras URL, debe agregar `< allow-navegación >` etiquetas en el `archivo config.xml`:

    <!-- Allow links to example.com -->
    <allow-navigation href="http://example.com/*" />
    
    <!-- Wildcards are allowed for the protocol, as a prefix
         to the host, or as a suffix to the path -->
    <allow-navigation href="*://*.example.com/*" />
    
    <!-- A wildcard can be used to whitelist the entire network,
         over HTTP and HTTPS.
         *NOT RECOMMENDED* -->
    <allow-navigation href="*" />
    
    <!-- The above is equivalent to these three declarations -->
    <allow-navigation href="http://*/*" />
    <allow-navigation href="https://*/*" />
    <allow-navigation href="data:*" />
    

## Intención de lista blanca

Controla qué URLs de la aplicación se permite hacer el sistema para abrir. De forma predeterminada, se permiten ninguÌ n external URLs.

En Android, esto equivale a enviar una intención de tipo BROWSEABLE.

Esta lista blanca no se aplica a plugins, sólo los hipervínculos y las llamadas a `window.Open)`.

En `config.xml`, agregar etiquetas `< allow-intent >` , como este:

    <!-- Allow links to web pages to open in a browser -->
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    
    <!-- Allow links to example.com to open in a browser -->
    <allow-intent href="http://example.com/*" />
    
    <!-- Wildcards are allowed for the protocol, as a prefix
         to the host, or as a suffix to the path -->
    <allow-intent href="*://*.example.com/*" />
    
    <!-- Allow SMS links to open messaging app -->
    <allow-intent href="sms:*" />
    
    <!-- Allow tel: links to open the dialer -->
    <allow-intent href="tel:*" />
    
    <!-- Allow geo: links to open maps -->
    <allow-intent href="geo:*" />
    
    <!-- Allow all unrecognized URLs to open installed apps
         *NOT RECOMMENDED* -->
    <allow-intent href="*" />
    

## Solicitud de red blanca

Controles que las peticiones de la red (imágenes, XHRs, etc.) se les permite hacer (a través de ganchos nativa de Córdoba).

Nota: Le sugerimos que utilice una política de seguridad de contenido (véase abajo), que es más seguro. Esta lista blanca es sobre todo histórico para webviews que no admiten la CSP.

En `config.xml`, agregue etiquetas de `< access >` , como este:

    <!-- Allow images, xhrs, etc. to google.com -->
    <access origin="http://google.com" />
    <access origin="https://google.com" />
    
    <!-- Access to the subdomain maps.google.com -->
    <access origin="http://maps.google.com" />
    
    <!-- Access to all the subdomains on google.com -->
    <access origin="http://*.google.com" />
    
    <!-- Enable requests to content: URLs -->
    <access origin="content:///*" />
    
    <!-- Don't block any requests -->
    <access origin="*" />
    

Sin las etiquetas `< access >` , se admiten sólo las solicitudes a direcciones URL `file://` . Sin embargo, la aplicación por defecto de Cordova incluye `< access origin = "*" >` por defecto.

Quirk: Android también permite las solicitudes de https://ssl.gstatic.com/accessibility/javascript/android/ por defecto, puesto que es necesario para TalkBack funcionar correctamente.

### Política de seguridad de contenido

Controles que las peticiones de la red (imágenes, XHRs, etc.) se les permite hacer (vía webview directamente).

En iOS y Android, la red solicitud lista blanca (véase arriba) no es capaz de filtrar todos los tipos de solicitudes (por ejemplo, `< video >` y WebSockets no estén bloqueadas). Así, además de la lista blanca, usted debe utilizar una etiqueta `< meta >` de [Contenido la política de seguridad](http://content-security-policy.com/) en todas las páginas.

En Android, soporte para CSP en el sistema webview comienza con KitKat (pero está disponible en todas las versiones con WebView de paso de peatones).

Aquí están algunas declaraciones de CSP de ejemplo para las páginas `.html` :

    <!-- Good default declaration:
        * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
        * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
        * Disables use of eval() and inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
            * Enable inline JS: add 'unsafe-inline' to default-src
            * Enable eval(): add 'unsafe-eval' to default-src
    -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *">
    
    <!-- Allow requests to foo.com -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' foo.com">
    
    <!-- Enable all requests, inline styles, and eval() -->
    <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'">
    
    <!-- Allow XHRs via https only -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' https:">
    
    <!-- Allow iframe to https://cordova.apache.org/ -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; frame-src 'self' https://cordova.apache.org">