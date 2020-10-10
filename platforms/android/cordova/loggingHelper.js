var CordovaLogger = require('cordova-common').CordovaLogger;

module.exports = {
    adjustLoggerLevel: function (opts) {
        if (opts instanceof Array) {
            opts.silent = opts.indexOf('--silent') !== -1;
            opts.verbose = opts.indexOf('--verbose') !== -1;
        }

        if (opts.silent) {
            CordovaLogger.get().setLevel('error');
        }

        if (opts.verbose) {
            CordovaLogger.get().setLevel('verbose');
        }
    }
};
