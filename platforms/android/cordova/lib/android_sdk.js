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

const execa = require('execa');

var suffix_number_regex = /(\d+)$/;
// Used for sorting Android targets, example strings to sort:
//   android-19
//   android-L
//   Google Inc.:Google APIs:20
//   Google Inc.:Glass Development Kit Preview:20
// The idea is to sort based on largest "suffix" number - meaning the bigger
// the number at the end, the more recent the target, the closer to the
// start of the array.
function sort_by_largest_numerical_suffix (a, b) {
    let suffix_a = a.match(suffix_number_regex);
    let suffix_b = b.match(suffix_number_regex);
    // If no number is detected (eg: preview version like android-R),
    // designate a suffix of 0 so it gets moved to the end
    suffix_a = suffix_a || ['0', '0'];
    suffix_b = suffix_b || ['0', '0'];
    // Return < zero, or > zero, based on which suffix is larger.
    return (parseInt(suffix_a[1]) > parseInt(suffix_b[1]) ? -1 : 1);
}

module.exports.print_newest_available_sdk_target = function () {
    return module.exports.list_targets().then(function (targets) {
        targets.sort(sort_by_largest_numerical_suffix);
        console.log(targets[0]);
    });
};

// Versions should not be represented as float, so we disable quote-props here
/* eslint-disable quote-props */
module.exports.version_string_to_api_level = {
    '4.0': 14,
    '4.0.3': 15,
    '4.1': 16,
    '4.2': 17,
    '4.3': 18,
    '4.4': 19,
    '4.4W': 20,
    '5.0': 21,
    '5.1': 22,
    '6.0': 23,
    '7.0': 24,
    '7.1.1': 25,
    '8.0': 26
};
/* eslint-enable quote-props */

function parse_targets (output) {
    var target_out = output.split('\n');
    var targets = [];
    for (var i = target_out.length - 1; i >= 0; i--) {
        if (target_out[i].match(/id:/)) { // if "id:" is in the line...
            targets.push(target_out[i].match(/"(.+)"/)[1]); // .. match whatever is in quotes.
        }
    }
    return targets;
}

module.exports.list_targets_with_android = function () {
    return execa('android', ['list', 'target']).then(result => parse_targets(result.stdout));
};

module.exports.list_targets_with_avdmanager = function () {
    return execa('avdmanager', ['list', 'target']).then(result => parse_targets(result.stdout));
};

module.exports.list_targets = function () {
    return module.exports.list_targets_with_avdmanager().catch(function (err) {
        // If there's an error, like avdmanager could not be found, we can try
        // as a last resort, to run `android`, in case this is a super old
        // SDK installation.
        if (err && (err.code === 'ENOENT' || (err.stderr && err.stderr.match(/not recognized/)))) {
            return module.exports.list_targets_with_android();
        } else throw err;
    }).then(function (targets) {
        if (targets.length === 0) {
            return Promise.reject(new Error('No android targets (SDKs) installed!'));
        }
        return targets;
    });
};
