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

Ten plugin wdraża polityki białej nawigacja widoku sieci Web aplikacji na Cordova 4.0

## Cordova obsługiwanych platform

  * Android 4.0.0 lub powyżej
  * iOS 4.0.0 lub powyżej

## Biała lista nawigacji

Kontroluje, których adresy URL widoku sieci Web, samej można nawigować do. Dotyczy tylko najwyższego poziomu nawigacje.

Dziwactwa: na Android to dotyczy także IFRAME do nie-http (s) systemów.

Domyślnie, nawigacje tylko do URLi `file://` , są dozwolone. Aby zezwolić na inne adresy URL, należy dodać Tagi `< allow-navigation >` do pliku `config.xml`:

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
    

## Zamiarem biała

Kontroluje, których adresy URL aplikacji jest możliwość zapytać systemem otwierania. Domyślnie nie ma zewnętrznych adresów URL są dozwolone.

Na Android to przyrównuje do wysyłania zamiarem typu BROWSEABLE.

Ta biała nie ma zastosowania do pluginów, tylko hiperłącza i wywołania `window.open()`.

W `pliku config.xml`dodawanie tagów `< allow-intent >` , jak to:

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
    

## Sieci wniosek biała

Formanty, które sieci żądań (obrazy, XHRs, itp.) mogą być wykonane (za pośrednictwem cordova rodzimych haki).

Uwaga: Zalecamy, że używasz treści polityki bezpieczeństwa (patrz poniżej), który jest bardziej bezpieczne. Ta Biała jest głównie historyczne dla webviews, które nie obsługują CSP.

W `pliku config.xml`dodawanie tagów `< access >` , jak to:

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
    

Bez żadnych tagów `< access >` dozwolone są tylko żądania do URLi `file://` . Jednak domyślnie Cordova aplikacja zawiera `< access origin = "*" >` domyślnie.

Cokół: Android pozwala również żądania do https://ssl.gstatic.com/accessibility/javascript/android/ domyślnie, ponieważ jest to wymagane dla TalkBack wobec funkcja poprawnie.

### Zasady zabezpieczeń zawartości

Formanty, które sieci żądań (obrazy, XHRs, itp.) mogą być wykonane (za pomocą widoku sieci Web bezpośrednio).

Na Androida i iOS biała żądanie sieci (patrz wyżej) nie jest w stanie filtrować wszystkie rodzaje wniosków (np. `< video >` & WebSockets nie są zablokowane). Tak oprócz białej listy, należy użyć tagu `< meta >` [Treści polityki bezpieczeństwa](http://content-security-policy.com/) na wszystkich stronach.

Na Android wsparcie dla CSP w ramach systemu widoku sieci Web zaczyna KitKat (ale jest dostępne we wszystkich wersjach przy użyciu widoku sieci Web przejście dla pieszych).

Oto niektóre przykład CSP deklaracje dla strony `HTML` :

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