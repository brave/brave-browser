#!/usr/bin/env node

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

var emulator = require('./emulator');
var args = process.argv;

var install_target;
if (args.length > 2) {
    if (args[2].substring(0, 9) === '--target=') {
        install_target = args[2].substring(9, args[2].length);
    } else {
        console.error('ERROR : argument \'' + args[2] + '\' not recognized.');
        process.exit(2);
    }
}

emulator.start(install_target).catch(function (err) {
    console.error('ERROR: ' + err);
    process.exit(2);
});
