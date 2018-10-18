module.exports = [
  'https://update.googleapis.com/service/update2', // allowed because it 307's to go-updater.brave.com. should never actually connect to googleapis.com.
  'https://no-thanks.invalid/', // fake gaia URL
  'https://go-updater.brave.com/',
  'https://safebrowsing.brave.com/',
  'https://brave-core-ext.s3.brave.com/',
  'https://laptop-updates.brave.com/',
  'https://ledger.mercury.basicattentiontoken.org/',
  'https://ledger-staging.mercury.basicattentiontoken.org/',
  'https://balance.mercury.basicattentiontoken.org/',
  'https://balance-staging.mercury.basicattentiontoken.org/',
  'https://publishers.basicattentiontoken.org/',
  'https://publishers-staging.basicattentiontoken.org/',
  'https://updates.bravesoftware.com/', // remove this once updates are moved to the prod environment
  'https://pdfjs.robwu.nl/logpdfjs' // allowed because it gets canceled in tracking protection
]
