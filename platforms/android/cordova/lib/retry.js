/*
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

'use strict';

var events = require('cordova-common').events;

/*
 * Retry a promise-returning function a number of times, propagating its
 * results on success or throwing its error on a failed final attempt.
 *
 * @arg {Number}   attemptsLeft    - The number of times to retry the passed call.
 * @arg {Function} promiseFunction - A function that returns a promise.
 * @arg {...}                      - Arguments to pass to promiseFunction.
 *
 * @returns {Promise}
 */
module.exports.retryPromise = function (attemptsLeft, promiseFunction) {
    // NOTE:
    //      get all trailing arguments, by skipping the first two (attemptsLeft and
    //      promiseFunction) because they shouldn't get passed to promiseFunction
    var promiseFunctionArguments = Array.prototype.slice.call(arguments, 2);

    return promiseFunction.apply(undefined, promiseFunctionArguments).then(
        // on success pass results through
        function onFulfilled (value) {
            return value;
        },

        // on rejection either retry, or throw the error
        function onRejected (error) {
            attemptsLeft -= 1;

            if (attemptsLeft < 1) {
                throw error;
            }

            events.emit('verbose', 'A retried call failed. Retrying ' + attemptsLeft + ' more time(s).');

            // retry call self again with the same arguments, except attemptsLeft is now lower
            var fullArguments = [attemptsLeft, promiseFunction].concat(promiseFunctionArguments);
            return module.exports.retryPromise.apply(undefined, fullArguments);
        }
    );
};
