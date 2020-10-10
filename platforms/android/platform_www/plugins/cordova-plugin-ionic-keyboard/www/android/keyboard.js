cordova.define("cordova-plugin-ionic-keyboard.keyboard", function(require, exports, module) {
var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    channel = require('cordova/channel');

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

Keyboard.hideFormAccessoryBar = Keyboard.hideKeyboardAccessoryBar = function (hide) {
    console.warn("Keyboard.hideKeyboardAccessoryBar() not supported in Android");
};

Keyboard.hide = function () {
    exec(null, null, "CDVIonicKeyboard", "hide", []);
};

Keyboard.show = function () {
    exec(null, null, "CDVIonicKeyboard", "show", []);
};

Keyboard.disableScroll = function (disable) {
    console.warn("Keyboard.disableScroll() not supported in Android");
};

Keyboard.setResizeMode = function (mode) {
    console.warn("Keyboard.setResizeMode() not supported in Android");
}

Keyboard.setKeyboardStyle = function(style) {
    console.warn("Keyboard.setKeyboardStyle() not supported in Android");
};

channel.onCordovaReady.subscribe(function () {
    exec(success, null, 'CDVIonicKeyboard', 'init', []);

    function success(msg) {
        var action = msg.charAt(0);
        if (action === 'S') {
            var keyboardHeight = parseInt(msg.substr(1));
            Keyboard.fireOnShowing(keyboardHeight);
            Keyboard.fireOnShow(keyboardHeight);

        } else if (action === 'H') {
            Keyboard.fireOnHiding();
            Keyboard.fireOnHide();
        }
    }
});


Keyboard.isVisible = false;

module.exports = Keyboard;

});
