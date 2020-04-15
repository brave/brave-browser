// Before adding to this list, get approval from the security team
module.exports = [
  'http://[A-Za-z0-9-\.]+\.gvt1\.com/edgedl/release2/.+', // allowed because it 307's to redirector.brave.com
  'https://[A-Za-z0-9-\.]+\.gvt1\.com/edgedl/release2/.+', // allowed because it 307's to redirector.brave.com
  'http://www.google.com/dl/release2/chrome_component/.+crl-set.+', // allowed because it 307's to crlsets.brave.com
  'https://www.google.com/dl/release2/chrome_component/.+crl-set.+', // allowed because it 307's to crlsets.brave.com
  'http://storage.googleapis.com/update-delta/hfnkpimlhhgieaddgfemjhofmfblmnib/.+crxd', // allowed because it 307's to crlsets.brave.com,
  'https://storage.googleapis.com/update-delta/hfnkpimlhhgieaddgfemjhofmfblmnib/.+crxd', // allowed because it 307's to crlsets.brave.com
  'https://mobile-data.s3.brave.com/superreferrer/map-table.json', // allowed because it's url for fetching super referral's mapping table
  'https://mobile-data-dev.s3.brave.software/superreferrer/map-table.json' // allowed because it's url for fetching super referral's mapping table
]
