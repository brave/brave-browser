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

/* jshint jasmine: true */

exports.defineAutoTests = function () {
    describe('Splashscreen (cordova)', function () {
        it("splashscreen.spec.1 should exist", function () {
            expect(navigator.splashscreen).toBeDefined();
        });

        it("splashscreen.spec.2 show method should exist", function () {
            expect(navigator.splashscreen.show).toBeDefined();
            expect(typeof navigator.splashscreen.show).toBe('function');
        });

        it("splashscreen.spec.3 hide method should exist", function () {
            expect(navigator.splashscreen.hide).toBeDefined();
            expect(typeof navigator.splashscreen.hide).toBe('function');
        });
    });
};

exports.defineManualTests = function (contentEl, createActionButton) {
    function showFor(duration) {
        navigator.splashscreen.show();
        window.setTimeout(function () {
            navigator.splashscreen.hide();
        }, 1000 * duration);
    }

    contentEl.innerHTML = '<h1>Splashscreen Tests</h1>' +
        '<h3>Note for WP: AutoHideSplashScreen must be set to false in config.xml</h3>' +
        '<div id="show1"></div>' +
        'Expected result: Will show the Cordova splashscreen for 1 second' +
        '</p> <div id="show5"></div>' +
        'Expected result: Will show the Cordova splashscreen for 5 seconds';

    createActionButton('Show for 1 second', function () {
        showFor(1);
    }, 'show1');

    createActionButton('Show for 5 seconds', function () {
        showFor(5);
    }, 'show5');
};
