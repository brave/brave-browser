// Before adding to this list, get approval from the security team
module.exports = [
  'http://update.googleapis.com/service/update2', // allowed because it 307's to go-updater.brave.com. should never actually connect to googleapis.com.
  'https://update.googleapis.com/service/update2', // allowed because it 307's to go-updater.brave.com. should never actually connect to googleapis.com.
  'https://safebrowsing.googleapis.com/v4/threatListUpdates', // allowed because it 307's to safebrowsing.brave.com
  'https://clients2.googleusercontent.com/crx/blobs/',
  'http://dl.google.com/', // allowed because it 307's to redirector.brave.com
  'https://dl.google.com/', // allowed because it 307's to redirector.brave.com
  'https://no-thanks.invalid/', // fake gaia URL
  'https://go-updater.brave.com/',
  'https://safebrowsing.brave.com/',
  'https://brave-core-ext.s3.brave.com/',
  'https://laptop-updates.brave.com/',
  'https://static.brave.com/',
  'https://static1.brave.com/',
  'http://componentupdater.brave.com/service/update2', // allowed because it 307's to https://componentupdater.brave.com
  'https://componentupdater.brave.com/service/update2',
  'https://crlsets.brave.com/',
  'https://crxdownload.brave.com/crx/blobs/',
  'https://ledger.mercury.basicattentiontoken.org/',
  'https://ledger-staging.mercury.basicattentiontoken.org/',
  'https://balance.mercury.basicattentiontoken.org/',
  'https://balance-staging.mercury.basicattentiontoken.org/',
  'https://publishers.basicattentiontoken.org/',
  'https://publishers-staging.basicattentiontoken.org/',
  'https://updates-dev.brave.software/',
  'https://publishers-distro.basicattentiontoken.org/',
  'https://publishers-staging-distro.basicattentiontoken.org/',
  'https://p3a.brave.com/',
  'https://dns.google/dns-query', // needed for DoH on Mac build machines
  'https://chrome.cloudflare-dns.com/dns-query', // needed for DoH on Mac build machines
  'https://tor.bravesoftware.com/', // for fetching tor client updater component
  'https://redirector.brave.com/',
]
