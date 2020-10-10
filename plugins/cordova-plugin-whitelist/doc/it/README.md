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

Questo plugin attua una politica di whitelist per spostarsi all'interno dell'applicazione webview in Cordova 4.0

## Piattaforme supportate Cordova

  * Android 4.0.0 o superiore
  * iOS 4.0.0 o superiore

## Navigazione Whitelist

Controlla quali URL WebView stessa può essere esplorato. Si applica al solo primo livello navigazioni.

Stranezze: su Android vale anche per gli iframe per non-schemi di http (s).

Per impostazione predefinita, navigazioni solo agli URL `file://` , sono ammessi. Per consentire altri altri URL, è necessario aggiungere `<allow-navigation>` tag per il tuo `config. XML`:

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
    

## Whitelist intento

Controlla quali URL app è consentito richiedere il sistema di apertura. Per impostazione predefinita, nessun esterno URL sono ammessi.

Su Android, ciò equivale all'invio di un intento di tipo BROWSEABLE.

Questa whitelist non si applica ai plugin, solo i collegamenti ipertestuali e chiamate a `Window`.

In `config. XML`, aggiungere tag `<allow-intent>` , simile al seguente:

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
    

## Rete richiesta Whitelist

Controlli che le richieste di rete (immagini, XHRs, ecc.) sono consentiti (tramite ganci nativo di cordova).

Nota: Si consiglia di che utilizzare un criterio di protezione contenuti (Vedi sotto), che è più sicuro. La whitelist è principalmente storico per visualizzazioni Web che non supportano la CSP.

In `config. XML`, aggiungere tag `< access >` , simile al seguente:

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
    

Senza qualsiasi tag `< access >` , sono consentite solo le richieste di URL `file://` . Tuttavia, l'applicazione di Cordova predefinito include `< access origin = "*" >` per impostazione predefinita.

Stranezza: Android consente anche alle richieste di https://ssl.gstatic.com/accessibility/javascript/android/ per impostazione predefinita, poiché questa operazione è necessaria per TalkBack funzionare correttamente.

### Politica di sicurezza del contenuto

Controlli che le richieste di rete (immagini, XHRs, ecc.) possono essere effettuate (via webview direttamente).

Su Android e iOS, la rete richiesta whitelist (Vedi sopra) non è in grado di filtrare tutti i tipi di richieste (ad esempio non sono bloccate `< video >` & WebSockets). Così, oltre alla whitelist, è necessario utilizzare un tag `< meta >` [Content Security Policy](http://content-security-policy.com/) su tutte le pagine.

Su Android, supporto per CSP all'interno webview sistema inizia con KitKat (ma è disponibile su tutte le versioni usando Crosswalk WebView).

Ecco alcuni esempi di dichiarazioni di CSP per le pagine `HTML` :

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