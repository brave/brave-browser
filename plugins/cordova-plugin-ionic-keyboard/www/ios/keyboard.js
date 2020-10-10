/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var Keyboard = function () {};

Keyboard.fireOnShow = function (height) {
    Keyboard.isVisible = true;
    cordova.fireWindowEvent('keyboardDidShow', {
        'keyboardHeight': height
    });

    // To support the keyboardAttach directive listening events
    // inside Ionic's main bundle
    cordova.fireWindowEvent('native.keyboardshow', {
        'keyboardHeight': height
    });
};

Keyboard.fireOnHide = function () {
    Keyboard.isVisible = false;
    cordova.fireWindowEvent('keyboardDidHide');

    // To support the keyboardAttach directive listening events
    // inside Ionic's main bundle
    cordova.fireWindowEvent('native.keyboardhide');
};

Keyboard.fireOnHiding = function () {
    cordova.fireWindowEvent('keyboardWillHide');
};

Keyboard.fireOnShowing = function (height) {
    cordova.fireWindowEvent('keyboardWillShow', {
        'keyboardHeight': height
    });
};

Keyboard.fireOnResize = function (height, screenHeight, ele) {
    if (!ele) {
        return;
    }
    if (height === 0) {
        ele.style.height = null;
    } else {
        ele.style.height = (screenHeight - height) + 'px';
    }
};

Keyboard.hideFormAccessoryBar = function (hide, success) {
    if (hide !== null && hide !== undefined) {
        exec(success, null, "CDVIonicKeyboard", "hideFormAccessoryBar", [hide]);
    } else {
        exec(success, null, "CDVIonicKeyboard", "hideFormAccessoryBar", []);
    }
};

Keyboard.hide = function () {
    exec(null, null, "CDVIonicKeyboard", "hide", []);
};

Keyboard.show = function () {
    console.warn('Showing keyboard not supported in iOS due to platform limitations.');
    console.warn('Instead, use input.focus(), and ensure that you have the following setting in your config.xml: \n');
    console.warn('    <preference name="KeyboardDisplayRequiresUserAction" value="false"/>\n');
};

Keyboard.disableScroll = function (disable) {
    exec(null, null, "CDVIonicKeyboard", "disableScroll", [disable]);
};

Keyboard.setResizeMode = function (mode) {
    exec(null, null, "CDVIonicKeyboard", "setResizeMode", [mode]);
}

Keyboard.setKeyboardStyle = function(style) {
    exec(null, null, "CDVIonicKeyboard", "keyboardStyle", [style]);
};

Keyboard.isVisible = false;

module.exports = Keyboard;