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

Ce plugin met en œuvre une politique de liste blanche pour naviguer le webview application sur Cordova 4.0

## Plates-formes prises en charge Cordova

  * 4.0.0 Android ou supérieur
  * iOS 4.0.0 ou supérieur

## Navigation liste blanche

Contrôle quels URL le WebView lui-même peut être parcourus à. S'applique à des navigations niveau supérieur seulement.

Particularités : sur Android il s'applique également aux iframes pour non-schémas http (s).

Par défaut, navigations qu'aux URL `file://` , sont autorisés. Pour permettre aux autres d'autres URL, vous devez ajouter des balises `<allow-navigation>` à votre `fichier config.xml`:

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
    

## Intent Whitelist

Contrôle quels URL l'app n'est autorisé à poser le système d'ouverture. Par défaut, aucun external URL est autorisés.

Sur Android, cela équivaut à envoyer une intention de type BROWSEABLE.

Cette autorisation ne s'applique pas aux plugins, uniquement les liens hypertexte et les appels à `window.open()`.

Dans le `fichier config.xml`, ajouter des balises `<allow-intent>` , comme ceci :

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
    

## Réseau demande liste blanche

Les contrôles dont les demandes de réseau (images, XHRs, etc.) sont autorisés à effectuer (via cordova natif crochets).

Remarque : Nous vous suggérons de qu'utiliser un contenu politique de sécurité (voir ci-dessous), qui est plus sûr. Cette liste blanche est surtout historique pour webviews qui ne prennent pas en charge les CSP.

Dans le `fichier config.xml`, ajouter des balises `<access>` , comme ceci :

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
    

Sans les balises `<access>` , seules les demandes d'URL `file://` sont autorisés. Toutefois, l'application de Cordoue par défaut inclut `<access origin="*" >` par défaut.

Bizarrerie : Android permet également aux requêtes à https://ssl.gstatic.com/accessibility/javascript/android/ par défaut, puisque c'est nécessaire pour TalkBack fonctionner correctement.

### Politique de sécurité du contenu

Les contrôles dont les demandes de réseau (images, XHRs, etc.) sont autorisés à effectuer (via webview directement).

Sur Android et iOS, la réseau demande liste blanche (voir ci-dessus) n'est pas en mesure de filtrer tous les types de demandes (p. ex. `< video >` & WebSockets ne sont pas bloquées). Ainsi, en plus de la liste blanche, vous devez utiliser une balise `< meta >` de [Contenu politique de sécurité](http://content-security-policy.com/) sur toutes vos pages.

Sur Android, support pour le CSP dans le système webview commence par KitKat (mais n'est disponible sur toutes les versions à l'aide du tableau de concordance WebView).

Voici quelques exemples de déclarations de CSP pour vos pages `.html` :

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