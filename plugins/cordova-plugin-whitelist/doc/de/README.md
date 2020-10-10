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

Dieses Plugin implementiert eine Whitelist-Politik für die Navigation in der Anwendung Webview Cordova 4.0

## Cordova unterstützte Plattformen

  * Android 4.0.0 oder höher
  * iOS 4.0.0 oder höher

## Navigation-Whitelist

Steuert, welche URLs die WebView selbst zu navigiert werden kann. Bezieht sich auf der obersten Ebene Navigationen nur.

Macken: auf Android es gilt auch für Iframes für nicht-http(s) Systeme.

In der Standardeinstellung Navigationen nur auf `file://` URLs, sind zulässig. Wenn andere andere URLs zulassen möchten, müssen Sie Ihre `"config.xml"` `<allow-navigation>` Markierungen hinzufügen:

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
    

## Vorsatz-Whitelist

Steuert, welche URLs die app zulässig ist, um das System zu öffnen Fragen. Standardmäßig dürfen keine externe URLs.

Das entspricht auf Android eine Absicht des Typs BROWSEABLE senden.

Diese Whitelist gilt nicht für Plugins, nur Hyperlinks und Aufrufe von `window.open()`.

Fügen Sie in `"config.xml"` `<allow-intent>` Tags hinzu, wie folgt:

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
    

## Netzwerk-Anforderung-Whitelist

Steuert, welche-Anforderungen Netzwerk (Bilder, XHRs, etc.) dürfen (über Cordova native Haken) erfolgen.

Hinweis: Wir empfehlen Ihnen eine Content Security Policy (siehe unten), das ist sicherer. Diese Whitelist ist vor allem historisch für Webansichten für die CSP nicht unterstützen.

Fügen Sie in `"config.xml"` `<access>` Tags hinzu, wie folgt:

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
    

Ohne `<access>` -Tags dürfen nur Anforderungen an `file://` URLs. Enthält jedoch die Standardanwendung Cordova `<access origin="*">` standardmäßig.

Eigenart: Android kann auch Anforderungen an https://ssl.gstatic.com/accessibility/javascript/android/ standardmäßig, da dies für TalkBack ordnungsgemäß erforderlich ist.

### Content-Security-Policy

Steuert, welche-Anforderungen Netzwerk (Bilder, XHRs, etc.) dürfen (über Webview direkt) erfolgen.

Auf Android und iOS ist die Netzwerk Anfrage Whitelist (s.o.) nicht in der Lage, alle Arten von Anfragen (z.B. `< video >` & WebSockets nicht blockiert) filtern. Also, sollten Sie neben der Whitelist, [Content Security Policy](http://content-security-policy.com/) `< Meta >` -Tags auf allen Ihren Seiten verwenden.

Auf Android Unterstützung für CSP innerhalb der System-Webview beginnt mit KitKat (aber ist in allen Versionen mit Crosswalk WebView verfügbar).

Hier sind einige Beispiel-CSP-Deklarationen für Ihre `HTML` -Seiten:

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