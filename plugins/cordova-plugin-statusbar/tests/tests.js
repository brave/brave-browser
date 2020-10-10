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
/* global StatusBar */

exports.defineAutoTests = function () {
    describe("StatusBar", function () {
        it("statusbar.spec.1 should exist", function() {
            expect(window.StatusBar).toBeDefined();
        });

        it("statusbar.spec.2 should have show|hide methods", function() {
            expect(window.StatusBar.show).toBeDefined();
            expect(typeof window.StatusBar.show).toBe("function");

            expect(window.StatusBar.hide).toBeDefined();
            expect(typeof window.StatusBar.hide).toBe("function");
        });

        it("statusbar.spec.3 should have set backgroundColor methods", function() {
            expect(window.StatusBar.backgroundColorByName).toBeDefined();
            expect(typeof window.StatusBar.backgroundColorByName).toBe("function");

            expect(window.StatusBar.backgroundColorByHexString).toBeDefined();
            expect(typeof window.StatusBar.backgroundColorByHexString).toBe("function");
        });

        it("statusbar.spec.4 should have set style methods", function() {
            expect(window.StatusBar.styleBlackTranslucent).toBeDefined();
            expect(typeof window.StatusBar.styleBlackTranslucent).toBe("function");

            expect(window.StatusBar.styleDefault).toBeDefined();
            expect(typeof window.StatusBar.styleDefault).toBe("function");

            expect(window.StatusBar.styleLightContent).toBeDefined();
            expect(typeof window.StatusBar.styleLightContent).toBe("function");

            expect(window.StatusBar.styleBlackOpaque).toBeDefined();
            expect(typeof window.StatusBar.styleBlackOpaque).toBe("function");

            expect(window.StatusBar.overlaysWebView).toBeDefined();
            expect(typeof window.StatusBar.overlaysWebView).toBe("function");
        });
    });
};

exports.defineManualTests = function (contentEl, createActionButton) {
    function log(msg) {
        var el = document.getElementById("info");
        var logLine = document.createElement('div');
        logLine.innerHTML = msg;
        el.appendChild(logLine);
    }

    function doShow() {
        StatusBar.show();
        log('StatusBar.isVisible=' + StatusBar.isVisible);
    }

    function doHide() {
        StatusBar.hide();
        log('StatusBar.isVisible=' + StatusBar.isVisible);
    }

    function doColor1() {
        log('set color=red');
        StatusBar.backgroundColorByName('red');
    }

    function doColor2() {
        log('set style=translucent black');
        StatusBar.styleBlackTranslucent();
    }

    function doColor3() {
        log('set style=default');
        StatusBar.styleDefault();
    }

    var showOverlay = true;
    function doOverlay() {
        showOverlay = !showOverlay;
        StatusBar.overlaysWebView(showOverlay);
        log('Set overlay=' + showOverlay);
    }

    /******************************************************************************/

    contentEl.innerHTML = '<div id="info"></div>' +
        'Also: tapping bar on iOS should emit a log.' +
        '<div id="action-show"></div>' +
        'Expected result: Status bar will be visible' +
        '</p> <div id="action-hide"></div>' +
        'Expected result: Status bar will be hidden' +
        '</p> <div id="action-color2"></div>' +
        'Expected result: Status bar text will be a light (white) color' +
        '</p> <div id="action-color3"></div>' +
        'Expected result: Status bar text will be a dark (black) color' +
        '</p> <div id="action-overlays"></div>' +
        'Expected result:<br>Overlay true = status bar will lay on top of web view content<br>Overlay false = status bar will be separate from web view and will not cover content' +
        '</p> <div id="action-color1"></div>' +
        'Expected result: If overlay false, background color for status bar will be red';

    log('StatusBar.isVisible=' + StatusBar.isVisible);
    window.addEventListener('statusTap', function () {
        log('tap!');
    }, false);

    createActionButton("Show", function () {
        doShow();
    }, 'action-show');

    createActionButton("Hide", function () {
        doHide();
    }, 'action-hide');

    createActionButton("Style=red (background)", function () {
        doColor1();
    }, 'action-color1');

    createActionButton("Style=translucent black", function () {
        doColor2();
    }, 'action-color2');

    createActionButton("Style=default", function () {
        doColor3();
    }, 'action-color3');

    createActionButton("Toggle Overlays", function () {
        doOverlay();
    }, 'action-overlays');
};
