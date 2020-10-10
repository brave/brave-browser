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

// The last resume event that was received that had the result of a plugin call.
var lastResumeEvent = null;

module.exports = {
    id: 'android',
    bootstrap: function () {
        var channel = require('cordova/channel');
        var cordova = require('cordova');
        var exec = require('cordova/exec');
        var modulemapper = require('cordova/modulemapper');

        // Get the shared secret needed to use the bridge.
        exec.init();

        // TODO: Extract this as a proper plugin.
        modulemapper.clobbers('cordova/plugin/android/app', 'navigator.app');

        var APP_PLUGIN_NAME = Number(cordova.platformVersion.split('.')[0]) >= 4 ? 'CoreAndroid' : 'App';

        // Inject a listener for the backbutton on the document.
        var backButtonChannel = cordova.addDocumentEventHandler('backbutton');
        backButtonChannel.onHasSubscribersChange = function () {
            // If we just attached the first handler or detached the last handler,
            // let native know we need to override the back button.
            exec(null, null, APP_PLUGIN_NAME, 'overrideBackbutton', [this.numHandlers === 1]);
        };

        // Add hardware MENU and SEARCH button handlers
        cordova.addDocumentEventHandler('menubutton');
        cordova.addDocumentEventHandler('searchbutton');

        function bindButtonChannel (buttonName) {
            // generic button bind used for volumeup/volumedown buttons
            var volumeButtonChannel = cordova.addDocumentEventHandler(buttonName + 'button');
            volumeButtonChannel.onHasSubscribersChange = function () {
                exec(null, null, APP_PLUGIN_NAME, 'overrideButton', [buttonName, this.numHandlers === 1]);
            };
        }
        // Inject a listener for the volume buttons on the document.
        bindButtonChannel('volumeup');
        bindButtonChannel('volumedown');

        // The resume event is not "sticky", but it is possible that the event
        // will contain the result of a plugin call. We need to ensure that the
        // plugin result is delivered even after the event is fired (CB-10498)
        var cordovaAddEventListener = document.addEventListener;

        document.addEventListener = function (evt, handler, capture) {
            cordovaAddEventListener(evt, handler, capture);

            if (evt === 'resume' && lastResumeEvent) {
                handler(lastResumeEvent);
            }
        };

        // Let native code know we are all done on the JS side.
        // Native code will then un-hide the WebView.
        channel.onCordovaReady.subscribe(function () {
            exec(onMessageFromNative, null, APP_PLUGIN_NAME, 'messageChannel', []);
            exec(null, null, APP_PLUGIN_NAME, 'show', []);
        });
    }
};

function onMessageFromNative (msg) {
    var cordova = require('cordova');
    var action = msg.action;

    switch (action) {
    // pause and resume are Android app life cycle events
    case 'backbutton':
    case 'menubutton':
    case 'searchbutton':
    case 'pause':
    case 'volumedownbutton':
    case 'volumeupbutton':
        cordova.fireDocumentEvent(action);
        break;
    case 'resume':
        if (arguments.length > 1 && msg.pendingResult) {
            if (arguments.length === 2) {
                msg.pendingResult.result = arguments[1];
            } else {
                // The plugin returned a multipart message
                var res = [];
                for (var i = 1; i < arguments.length; i++) {
                    res.push(arguments[i]);
                }
                msg.pendingResult.result = res;
            }

            // Save the plugin result so that it can be delivered to the js
            // even if they miss the initial firing of the event
            lastResumeEvent = msg;
        }
        cordova.fireDocumentEvent(action, msg);
        break;
    default:
        throw new Error('Unknown event action ' + action);
    }
}
