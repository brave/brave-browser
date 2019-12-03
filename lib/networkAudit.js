const fs = require('fs-extra')
const URL = require('url').URL
const ip = require('ip')
const whitelistedUrlPrefixes = require('./whitelistedUrlPrefixes')
const whitelistedUrlPatterns = require('./whitelistedUrlPatterns')
const whitelistedUrlProtocols = [
  'chrome-extension:',
  'chrome:',
  'brave:',
  'file:',
  'data:',
  'blob:'
]

const networkAudit = {
  parseNetworkLog: (networkLogFile) => {
    let jsonContent = fs.readFileSync(networkLogFile, 'utf8').trim()

    // On windows netlog ends abruptly causing JSON parsing errors
    if (!jsonContent.endsWith('}]}')) {
      const n = jsonContent.lastIndexOf('},')
      jsonContent = jsonContent.substring(0, n) + '}]}'
    }

    let exitCode = 0
    let jsonOutput = {}
    jsonOutput = JSON.parse(jsonContent)

    const URL_REQUEST_TYPE = jsonOutput.constants.logSourceType.URL_REQUEST
    const URL_REQUEST_FAKE_RESPONSE_HEADERS_CREATED = jsonOutput.constants.logEventTypes.URL_REQUEST_FAKE_RESPONSE_HEADERS_CREATED
    const urlRequests = jsonOutput.events.filter((event) => {
      if (event.type === URL_REQUEST_FAKE_RESPONSE_HEADERS_CREATED) {
        // showing these helps determine which URL requests which don't
        // actually hit the network
        return true
      }
      if (event.source.type === URL_REQUEST_TYPE) {
        if (!event.params) {
          return false
        }
        const url = event.params.url
        if (!url) {
          return false
        }
        const urlParsed = new URL(url)
        const hostname = urlParsed.hostname
        if (/^[a-z]+$/.test(hostname)) {
          // Chromium sometimes sends requests to random non-resolvable hosts
          return false
        }
        if (whitelistedUrlProtocols.includes(urlParsed.protocol)) {
          return false
        }
        const foundPrefix = whitelistedUrlPrefixes.find((prefix) => {
          return url.startsWith(prefix)
        })
        const foundPattern = whitelistedUrlPatterns.find((pattern) => {
          return RegExp('^' + pattern).test(url)
        })
        if (!foundPrefix && !foundPattern) {
          // Check if the URL is a private IP
          try {
            if (ip.isPrivate(hostname)) {
              // Warn but don't fail the audit
              console.log('NETWORK AUDIT WARN:', url)
              return true
            }
          } catch (e) {}
          // This is not a whitelisted URL! log it and exit with non-zero
          console.log('NETWORK AUDIT FAIL:', url)
          exitCode = 1
        }
        return true
      }
      return false
    })
    fs.writeJsonSync('network-audit-results.json', urlRequests)
    if (exitCode > 0) {
      console.log(`network-audit failed. import ${networkLogFile} in chrome://net-internals for more details.`)
    } else {
      console.log('network audit passed.')
    }
    process.exit(exitCode)
  }
}

module.exports = networkAudit
