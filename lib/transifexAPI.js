// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const https = require('https')
const url = require('url')
const chalk = require('chalk')

module.exports.request = function transifexRequest (apiUrlPath, options) {
  // Option defaults
  let { 
    method = 'GET', 
    data = null,
    dataContentType = 'application/json',
    baseUrl = 'https://www.transifex.com/api/',
    username = process.env.TRANSIFEX_USERNAME,
    password = process.env.TRANSIFEX_PASSWORD,
    api_key = process.env.TRANSIFEX_API_KEY,
    logStatus = true,
    logError = true
  } = options
  // Validate
  if (!username && !api_key) {
    const err = new Error('No username or api_key was provided for transifex api request.')
    if (logError) {
      console.error(err)
    }
    return Promise.reject(err)
  }
  // API key auth specifics
  if (api_key) {
    username = 'api'
    password = api_key
  }
  const requestUrl = url.resolve(baseUrl, apiUrlPath)
  return new Promise((resolve, reject) => {
    // Build request
    const options = { 
      method: 'PUT',
      headers: {
        Authorization: 'Basic ' + new Buffer.from(`${username}:${password}`).toString('base64')
      }
    }
    if (data) {
      options.data = data,
      options.headers['Content-Length'] = data.length
      options.headers['Content-Type'] = dataContentType
    }
    // Send request
    const req = https.request(requestUrl, options, (resp) => {
      let data = ''
      resp.on('data', chunk => { data += chunk })
      resp.on('end', () => {
        if (logStatus) {
          console.log(chalk.green(`[${resp.statusCode}] ${requestUrl}`))
        }
        resolve(data)
      })
    })
    // Handle request error
    req.on('error', (err) => {
      if (logError) {
        console.error(chalk.red.bgBlack(`ERROR with request for url ${requestUrl}:`, err))
      }
      reject(err)
    })
    // Write data to request
    if (data && method !== 'GET') {
      req.write(data)
      req.end()
    }
  })
}
