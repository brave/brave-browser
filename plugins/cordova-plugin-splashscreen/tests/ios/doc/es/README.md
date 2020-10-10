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

# Pruebas de iOS para CDVSplashScreen

Necesita instalar `node.js` en `Córdoba-ios`.

Primero instalar cordova-ios:

    npm install
    

... en la carpeta actual.

# Prueba de Xcode

  1. Iniciar el archivo `CDVSplashScreenTest.xcworkspace` .
  2. Elija "CDVSplashScreenLibTests" en el menú de lista desplegable esquema
  3. Haga clic y mantenga el botón de `Play` y elegir el icono de `llave inglesa` para ejecutar las pruebas

# Pruebas desde la línea de comandos

    npm test
