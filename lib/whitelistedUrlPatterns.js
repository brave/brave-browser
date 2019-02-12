// Before adding to this list, get approval from the security team
module.exports = [
  'http://[A-Za-z0-9-\.]+\.gvt1\.com/edgedl/release2/chrome_component/.+crl-set.+', // allowed because it 307's to crlset2.brave.com
  'https://[A-Za-z0-9-\.]+\.gvt1\.com/edgedl/release2/chrome_component/.+crl-set.+' // allowed because it 307's to crlset2.brave.com
]
