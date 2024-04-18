# Changelog

## [1.64.122](https://github.com/brave/brave-browser/releases/tag/v1.64.122)

 - Fixed an issue where Brave wouldn't change to another language on "Android 13" and above. ([#28822](https://github.com/brave/brave-browser/issues/28822))
 - Upgraded Chromium to 123.0.6312.122. ([#37474](https://github.com/brave/brave-browser/issues/37474)) ([Changelog for 123.0.6312.122](https://chromium.googlesource.com/chromium/src/+log/123.0.6312.105..123.0.6312.122?pretty=fuller&n=1000))

## [1.64.116](https://github.com/brave/brave-browser/releases/tag/v1.64.116)

 - Disabled Brave Leo when "Block Scripts" has been enabled globally via "Brave Shields & privacy" settings. ([#37146](https://github.com/brave/brave-browser/issues/37146))
 - Upgraded Chromium to 123.0.6312.105. ([#37268](https://github.com/brave/brave-browser/issues/37268)) ([Changelog for 123.0.6312.105](https://chromium.googlesource.com/chromium/src/+log/123.0.6312.86..123.0.6312.105?pretty=fuller&n=1000))

## [1.64.113](https://github.com/brave/brave-browser/releases/tag/v1.64.113)

 - Added voice support for Brave Leo. ([#37053](https://github.com/brave/brave-browser/issues/37053))
 - Improved Brave Leo handling for YouTube video transcripts. ([#34945](https://github.com/brave/brave-browser/issues/34945))
 - Fixed payout status banner not being displayed under rewards panel for self-custody. ([#36773](https://github.com/brave/brave-browser/issues/36773))
 - Upgraded Chromium to 123.0.6312.86. ([#37097](https://github.com/brave/brave-browser/issues/37097)) ([Changelog for 123.0.6312.86](https://chromium.googlesource.com/chromium/src/+log/123.0.6312.58..123.0.6312.86?pretty=fuller&n=1000))

## [1.64.109](https://github.com/brave/brave-browser/releases/tag/v1.64.109)

### Web3

 - Added support for SNS V2 Records. ([#35958](https://github.com/brave/brave-browser/issues/35958))
 - Implemented new Brave Wallet onboarding. ([#35713](https://github.com/brave/brave-browser/issues/35713)) & ([#35488](https://github.com/brave/brave-browser/issues/35488))

### Rewards

 - Added self-custody option for Brave Rewards. ([#35334](https://github.com/brave/brave-browser/issues/35334))
 - Updated generic linking error text. ([#33955](https://github.com/brave/brave-browser/issues/33955))

### General

 - Improved Chromium storage partitioning by making it compatible with Brave's ephemeral storage implementation. ([#26165](https://github.com/brave/brave-browser/issues/26165))
 - Improved brave://adblock by redirecting to "Custom Filters" via settings. ([#35269](https://github.com/brave/brave-browser/issues/35269))
 - Renamed "Data Preferences" button under Sync settings to "Sync Options". ([#13530](https://github.com/brave/brave-browser/issues/13530))
 - Fixed Brave Leo so that if a content node isn't found the root content node is used. ([#35371](https://github.com/brave/brave-browser/issues/35371))
 - Fixed invalid URLs being used when reporting websites via "Report a broken site" under the shields panel. ([#35244](https://github.com/brave/brave-browser/issues/35244))
 - Upgraded Chromium to 123.0.6312.58. ([#36938](https://github.com/brave/brave-browser/issues/36938)) ([Changelog for 123.0.6312.58](https://chromium.googlesource.com/chromium/src/+log/122.0.6261.128..123.0.6312.58?pretty=fuller&n=1000))

## [1.63.174](https://github.com/brave/brave-browser/releases/tag/v1.63.174)

 - Upgraded Chromium to 122.0.6261.128. ([#36732](https://github.com/brave/brave-browser/issues/36732)) ([Changelog for 122.0.6261.128](https://chromium.googlesource.com/chromium/src/+log/122.0.6261.111..122.0.6261.128?pretty=fuller&n=1000))

## [1.63.169](https://github.com/brave/brave-browser/releases/tag/v1.63.169)

### Web3

 - Implemented autofill of token details when adding EVM tokens. ([#31062](https://github.com/brave/brave-browser/issues/31062))

### General

 - Fixed inability to login to SharePoint by enabling Cookie Partitioning. ([#36450](https://github.com/brave/brave-browser/issues/36450))
 - Fixed Leo "Submit" button overlapping text when using RTL locales. ([#36413](https://github.com/brave/brave-browser/issues/36413))
 - Upgraded Chromium to 122.0.6261.111. ([#36556](https://github.com/brave/brave-browser/issues/36556)) ([Changelog for 122.0.6261.111](https://chromium.googlesource.com/chromium/src/+log/122.0.6261.94..122.0.6261.111?pretty=fuller&n=1000))

## [1.63.165](https://github.com/brave/brave-browser/releases/tag/v1.63.165)

 - Added Brave Leo - AI for questions and answers leveraging page context. ([#36303](https://github.com/brave/brave-browser/issues/36303))
 - Upgraded Chromium to 122.0.6261.94. ([#36404](https://github.com/brave/brave-browser/issues/36404)) ([Changelog for 122.0.6261.94](https://chromium.googlesource.com/chromium/src/+log/122.0.6261.69..122.0.6261.94?pretty=fuller&n=1000))

## [1.63.161](https://github.com/brave/brave-browser/releases/tag/v1.63.161)

### Web3

 - Added new configuration options for default "Ethereum wallet" and "Solana wallet" settings. ([#18325](https://github.com/brave/brave-browser/issues/18325))
 - Added chain validation to "wallet_addEthereumChain" API call and chainID validation to the network settings page. ([#20934](https://github.com/brave/brave-browser/issues/20934))
 - Updated certain areas of the wallet from native UI to Web UI. ([#34386](https://github.com/brave/brave-browser/issues/34386))
 - Updated "Swap" UI to be similar to "Send" UI. ([#28720](https://github.com/brave/brave-browser/issues/28720))
 - Fixed crash when adding Brave Rewards account while the wallet is currently in a locked state. ([#36018](https://github.com/brave/brave-browser/issues/36018))

### Rewards

 - Removed "?" from the BAT icon under the rewards panel. ([#33922](https://github.com/brave/brave-browser/issues/33922))

### General

 - Added VPN region selection into main settings menu. ([#27014](https://github.com/brave/brave-browser/issues/27014))
 - Improved support for "removeparam" in standard mode. ([#35141](https://github.com/brave/brave-browser/issues/35141))
 - Updated default VPN icon. ([#32595](https://github.com/brave/brave-browser/issues/32595)
 - Updated VPN summary under paywall modal. ([#34250](https://github.com/brave/brave-browser/issues/34250)
 - Removed known YouTube tracking parameter "si" from URLs. ([#34719](https://github.com/brave/brave-browser/issues/34719))
 - Removed known Instagram tracking parameter "igsh" from URLs. ([#35094](https://github.com/brave/brave-browser/issues/35094))
 - Fixed scriptlet arguments with trailing escaped commas not being parsed correctly. ([#36223](https://github.com/brave/brave-browser/issues/36223))
 - Fixed crash when changing default search engine for "Private Tab" in certain cases. ([#34826](https://github.com/brave/brave-browser/issues/34826))
 - Fixed "Connecting to your server. Should only take a moment..." messaging being displayed infinitely when VPN subscription has expired. ([#34738](https://github.com/brave/brave-browser/issues/34738)) 
 - Fixed crash when playing media in a loop within the Playlist. ([#30682](https://github.com/brave/brave-browser/issues/30682))
 - Upgraded Chromium to 122.0.6261.57. ([#36242](https://github.com/brave/brave-browser/issues/36242)) ([Changelog for 122.0.6261.57](https://chromium.googlesource.com/chromium/src/+log/121.0.6167.184..122.0.6261.57?pretty=fuller&n=1000))

## [1.62.165](https://github.com/brave/brave-browser/releases/tag/v1.62.165)

 - Upgraded Chromium to 121.0.6167.184. ([#36023](https://github.com/brave/brave-browser/issues/36023)) ([Changelog for 121.0.6167.184](https://chromium.googlesource.com/chromium/src/+log/121.0.6167.164..121.0.6167.184?pretty=fuller&n=1000))

## [1.62.162](https://github.com/brave/brave-browser/releases/tag/v1.62.162)

 - Upgraded Chromium to 121.0.6167.164. ([#35844](https://github.com/brave/brave-browser/issues/35844)) ([Changelog for 121.0.6167.164](https://chromium.googlesource.com/chromium/src/+log/121.0.6167.139..121.0.6167.164?pretty=fuller&n=1000))

## [1.62.156](https://github.com/brave/brave-browser/releases/tag/v1.62.156)

 - Fixed sync crash when forcing device polling in certain cases. ([#35554](https://github.com/brave/brave-browser/issues/35554))
 - Upgraded Chromium to 121.0.6167.139. ([#35704](https://github.com/brave/brave-browser/issues/35704)) ([Changelog for 121.0.6167.139](https://chromium.googlesource.com/chromium/src/+log/121.0.6167.85..121.0.6167.139?pretty=fuller&n=1000))

## [1.62.152](https://github.com/brave/brave-browser/releases/tag/v1.62.152)

### Web3

 - [Security] Updated Brave Wallet password policy. ([#25780](https://github.com/brave/brave-browser/issues/25780))
 - Updated wallet account blockies design. ([#34482](https://github.com/brave/brave-browser/issues/34482))
 - Migrated Solana Swaps to use Jupiter Swap API v6. ([#35091](https://github.com/brave/brave-browser/issues/35091))
 - Removed loading indicator when asset discovery is not being run. ([#30921](https://github.com/brave/brave-browser/issues/30921))

### General
 
 - Added the ability to pause/disable VPN tunnelling for a desired time frame. ([#34445](https://github.com/brave/brave-browser/issues/34445))
 - [Security] Force the referrer to always be "no-referrer" while in Speedreader mode as reported on HackerOne by nishimunea. ([#35095](https://github.com/brave/brave-browser/issues/35095))
 - Updated farbling protections to only farble a subset of user installed fonts. ([#34043](https://github.com/brave/brave-browser/issues/34043))
 - Updated "Private Tab" re-authentication UI. ([#29688](https://github.com/brave/brave-browser/issues/29688))
 - Updated various "Setting" menus to improve usability. ([#33981](https://github.com/brave/brave-browser/issues/33981))
 - Removed HTTPS Everywhere. ([#28433](https://github.com/brave/brave-browser/issues/28433))
 - Removed aggressive fingerprinting mode (being rolled out in phases using Griffin). ([#31229](https://github.com/brave/brave-browser/issues/31229))
 - Removed known tracking parameter "_kx" from URLs. ([#34578](https://github.com/brave/brave-browser/issues/34578))
 - Removed known tracking parameter "irclickid" from URLs. ([#33952](https://github.com/brave/brave-browser/issues/33952))
 - Removed several known Yandex tracking parameters from URLs. ([#33216](https://github.com/brave/brave-browser/issues/33216))
 - Removed several known Facebook tracking parameters from URLs. ([#33984](https://github.com/brave/brave-browser/issues/33984))
 - Moved both "Block YouTube recommended content" and "Block YouTube distracting elements" into "Media" under "Settings". ([#34420](https://github.com/brave/brave-browser/issues/34420))
 - Upgraded Chromium to 121.0.6167.101. ([#35530](https://github.com/brave/brave-browser/issues/35530)) ([Changelog for 121.0.6167.101](https://chromium.googlesource.com/chromium/src/+log/120.0.6099.234..121.0.6167.101?pretty=fuller&n=1000))

## [1.61.120](https://github.com/brave/brave-browser/releases/tag/v1.61.120)

 - Upgraded Chromium to 120.0.6099.234. ([#35345](https://github.com/brave/brave-browser/issues/35345)) ([Changelog for 120.0.6099.234](https://chromium.googlesource.com/chromium/src/+log/120.0.6099.217..120.0.6099.234?pretty=fuller&n=1000))

## [1.61.116](https://github.com/brave/brave-browser/releases/tag/v1.61.116)

 - Upgraded Chromium to 120.0.6099.217. ([#35219](https://github.com/brave/brave-browser/issues/35219)) ([Changelog for 120.0.6099.217](https://chromium.googlesource.com/chromium/src/+log/120.0.6099.199..120.0.6099.217?pretty=fuller&n=1000))

## [1.61.114](https://github.com/brave/brave-browser/releases/tag/v1.61.114)

 - Upgraded Chromium to 120.0.6099.199. ([#35108](https://github.com/brave/brave-browser/issues/35108)) ([Changelog for 120.0.6099.199](https://chromium.googlesource.com/chromium/src/+log/120.0.6099.144..120.0.6099.199?pretty=fuller&n=1000))

## [1.61.109](https://github.com/brave/brave-browser/releases/tag/v1.61.109)

 - Upgraded Chromium to 120.0.6099.144. ([#34988](https://github.com/brave/brave-browser/issues/34988)) ([Changelog for 120.0.6099.144](https://chromium.googlesource.com/chromium/src/+log/120.0.6099.115..120.0.6099.144?pretty=fuller&n=1000))

## [1.61.104](https://github.com/brave/brave-browser/releases/tag/v1.61.104)

 - Fixed "Signature verification error" being incorrectly displayed in Brave Wallet with the signTransaction method. ([#34842](https://github.com/brave/brave-browser/issues/34842))
 - Upgraded Chromium to 120.0.6099.115. ([#34856](https://github.com/brave/brave-browser/issues/34856)) ([Changelog for 120.0.6099.115](https://chromium.googlesource.com/chromium/src/+log/120.0.6099.71..120.0.6099.115?pretty=fuller&n=1000))

## [1.61.100](https://github.com/brave/brave-browser/releases/tag/v1.61.100)

### Web3

 - Improved dark mode within Brave Wallet. ([#33439](https://github.com/brave/brave-browser/issues/33439))

### Rewards

 - Redesigned UI for the contribution banner. ([#30371](https://github.com/brave/brave-browser/issues/30371))
 - Implemented new design for account provider selection screen. ([#33258](https://github.com/brave/brave-browser/issues/33258))

### General

 - Added save path to the bookmark "Exported successfully" dialog. ([#33171](https://github.com/brave/brave-browser/issues/33171))
 - [Security] Fixed crash when incorrectly handling reward navigation redirects as reported on HackerOne by 0xc4gr1. ([#32498](https://github.com/brave/brave-browser/issues/32498))
 - Disabled VPN "Contact Technical Support" for non-subscribed users. ([#34724](https://github.com/brave/brave-browser/issues/34724))
 - Fixed website failing to load on certain Motorola Moto devices (was rolled out using Griffin starting at 100%). ([#33941](https://github.com/brave/brave-browser/issues/33941))
 - Fixed Brave News onboarding modal appearing via NTP for unsupported regions. ([#33267](https://github.com/brave/brave-browser/issues/33267))
 - Fixed "Add" button under "Custom filter list" not being disabled when "Enter filter list URL here" text field is empty. ([#33178](https://github.com/brave/brave-browser/issues/33178))
 - Upgraded Chromium to 120.0.6099.62. ([#34723](https://github.com/brave/brave-browser/issues/34723)) ([Changelog for 120.0.6099.62](https://chromium.googlesource.com/chromium/src/+log/119.0.6045.199..120.0.6099.62?pretty=fuller&n=1000))

## [1.60.125](https://github.com/brave/brave-browser/releases/tag/v1.60.125)

 - Added support for quoted scriptlet arguments. ([#34170](https://github.com/brave/brave-browser/issues/34170))
 - Upgraded Chromium to 119.0.6045.199. ([#34574](https://github.com/brave/brave-browser/issues/34574)) ([Changelog for 119.0.6045.199](https://chromium.googlesource.com/chromium/src/+log/119.0.6045.163..119.0.6045.199?pretty=fuller&n=1000))

## [1.60.118](https://github.com/brave/brave-browser/releases/tag/v1.60.118)

 - Upgraded Chromium to 119.0.6045.163. ([#34331](https://github.com/brave/brave-browser/issues/34331)) ([Changelog for 119.0.6045.163](https://chromium.googlesource.com/chromium/src/+log/119.0.6045.124..119.0.6045.163?pretty=fuller&n=1000))

## [1.60.116](https://github.com/brave/brave-browser/releases/tag/v1.60.116)

 - Added a first-party exception list to the correct adblock engine. ([#34081](https://github.com/brave/brave-browser/issues/34081))
 - Upgraded Chromium to 119.0.6045.134. ([#34209](https://github.com/brave/brave-browser/issues/34209)) ([Changelog for 119.0.6045.134](https://chromium.googlesource.com/chromium/src/+log/119.0.6045.124..119.0.6045.134?pretty=fuller&n=1000))

## [1.60.110](https://github.com/brave/brave-browser/releases/tag/v1.60.110)

### Web3

 - Updated Brave Wallet v2 screens for SIWE support. ([#32863](https://github.com/brave/brave-browser/issues/32863)), ([#33254](https://github.com/brave/brave-browser/issues/33254))
 - Improved performance of "Network" filter dropdown. ([#33004](https://github.com/brave/brave-browser/issues/33004))
 - Fixed webview crash when selecting tokens using the "Deposit" screen. ([#33966](https://github.com/brave/brave-browser/issues/33966))

### Rewards

 - Added auto-select of target country during the rewards onboarding via the geolocation declaration dropdown. ([#29785](https://github.com/brave/brave-browser/issues/29785))
 - Fixed multiple default regions being selected during rewards onboarding via the geolocation declaration dropdown. ([#32273](https://github.com/brave/brave-browser/issues/32273))

### General

 - Added Widevine support. ([#20241](https://github.com/brave/brave-browser/issues/20241))
 - Added support for "#@#+js()" syntax for blanket scriptlet exception. ([#33766](https://github.com/brave/brave-browser/issues/33766))
 - Enabled History datatype for Brave Sync. ([#32876](https://github.com/brave/brave-browser/issues/32876))
 - Updated New Tab Page Sponsored Image counter to reset every 24 hours. ([#31551](https://github.com/brave/brave-browser/issues/31551))
 - Updated display frequency for New Tab Page Sponsored Image. ([#33228](https://github.com/brave/brave-browser/issues/33228))
 - Updated Brave News to only download the page's linked alternate feeds when the UI list is opened. ([#33246](https://github.com/brave/brave-browser/issues/33246))
 - Removed known tracking parameter "_gl" from URLs. ([#33188](https://github.com/brave/brave-browser/issues/33188))
 - Removed known tracking parameters "at_recipient_id" and "at_recipient_list" from URLs. ([#32488](https://github.com/brave/brave-browser/issues/32488))
 - Removed known tracking parameter "unicorn_click_id" from URLs. ([#33172](https://github.com/brave/brave-browser/issues/33172))
 - Fixed crash while viewing Privacy Hub in certain cases. ([#32944](https://github.com/brave/brave-browser/issues/32944))
 - Upgraded Chromium to 119.0.6045.105. ([#34024](https://github.com/brave/brave-browser/issues/34024)) ([Changelog for 119.0.6045.105](https://chromium.googlesource.com/chromium/src/+log/118.0.5993.117..119.0.6045.105?pretty=fuller&n=1000))

## [1.59.124](https://github.com/brave/brave-browser/releases/tag/v1.59.124)

 - Updated user shield reports to include the "origin" + "path" to improve webcompat. ([#32640](https://github.com/brave/brave-browser/issues/32640))
 - Brave Ad Block Resources Library now updates via Component Updater on a more frequent basis, to always have most recent Ad Block lists. ([#32274](https://github.com/brave/brave-browser/issues/32274))
 - Upgraded Chromium to 118.0.5993.117. ([#33893](https://github.com/brave/brave-browser/issues/33893)) ([Changelog for 118.0.5993.117](https://chromium.googlesource.com/chromium/src/+log/118.0.5993.96..118.0.5993.117?pretty=fuller&n=1000))

## [1.59.120](https://github.com/brave/brave-browser/releases/tag/v1.59.120)

 - Fixed "Block Cookies" changes under the "Brave Shields & privacy" settings not being saved. ([#30155](https://github.com/brave/brave-browser/issues/30155))
 - Fixed crash when viewing the New Tab Page in certain cases. ([#33385](https://github.com/brave/brave-browser/issues/33385))
 - Upgraded Chromium to 118.0.5993.88. ([#33694](https://github.com/brave/brave-browser/issues/33694)) ([Changelog for 118.0.5993.88](https://chromium.googlesource.com/chromium/src/+log/118.0.5993.70..118.0.5993.88?pretty=fuller&n=1000))

## [1.59.117](https://github.com/brave/brave-browser/releases/tag/v1.59.117)

### Web3

 - Redesigned the main Brave Wallet layout. ([#32197](https://github.com/brave/brave-browser/issues/32197)) 
 - Redesigned wallet navigation and combined both "Assets" & "NTFs" into a single section. ([#32411](https://github.com/brave/brave-browser/issues/32411)) 
 - Redesigned the "Portfolio" view and added option to show/hide NFTs. ([#32545](https://github.com/brave/brave-browser/issues/32545)) 
 - Added ability to select multiple networks under the "Networks" selection screen for both the "Portfolio" and "NFT" tabs. ([#32644](https://github.com/brave/brave-browser/issues/32644)) 
 - Added method to return "Swap" protocol fees. ([#32464](https://github.com/brave/brave-browser/issues/32464))
 - Added "Help Centre" link under both the wallet settings and panel settings. ([#27270](https://github.com/brave/brave-browser/issues/27270))
 - Improved wallet performance by optimizing the onboarding flow. ([#32256](https://github.com/brave/brave-browser/issues/32256))
 - Fixed NFTs still appearing as visible when marked as invisible via "Edit visible NTFs" settings. ([#31915](https://github.com/brave/brave-browser/issues/31915))
 - Fixed wallet header not being displayed. ([#32222](https://github.com/brave/brave-browser/issues/32222))
 - Fixed crash when downloading wallet data on a slower connection in certain cases. ([#33386](https://github.com/brave/brave-browser/issues/33386))

### Rewards

 - Updated "Estimated earnings" to display "Earnings so far". ([#32653](https://github.com/brave/brave-browser/issues/32653))
 - Fixed rewards panel and brave://rewards using different balance values dueto using different rounding algorithm. ([#28258](https://github.com/brave/brave-browser/issues/28258))

### General

 - [Security] Updated which origins and URLs trigger debouncing and request-OTR protections as reported on HackerOne by nishimunea. ([#32230](https://github.com/brave/brave-browser/issues/32230))
 - [Security] Fixed crash when loading brave://optimization-guide-internals as reported on HackerOne by jaguilera. ([#31648](https://github.com/brave/brave-browser/issues/31648))
 - Moved both content filtering and "add custom filter list" from brave://adblock into "Brave Shields & privacy" settings. ([#26587](https://github.com/brave/brave-browser/issues/26587)), ([#30174](https://github.com/brave/brave-browser/issues/30174))
 - Removed the cookie content modal. ([#33151](https://github.com/brave/brave-browser/issues/33151))
 - Fixed crash when adding scriptlet injection filters with too many arguments. ([#32916](https://github.com/brave/brave-browser/issues/32916))
 - Fixed context menu for Brave News articles not correctly being displayed while in landscape mode. ([#31935](https://github.com/brave/brave-browser/issues/31935))
 - Upgraded Chromium to 118.0.5993.70. ([#33556](https://github.com/brave/brave-browser/issues/33556)) ([Changelog for 118.0.5993.70](https://chromium.googlesource.com/chromium/src/+log/117.0.5938.153..118.0.5993.70?pretty=fuller&n=1000))

## [1.58.137](https://github.com/brave/brave-browser/releases/tag/v1.58.137)

 - Upgraded Chromium to 117.0.5938.153. ([#33391](https://github.com/brave/brave-browser/issues/33391)) ([Changelog for 117.0.5938.153](https://chromium.googlesource.com/chromium/src/+log/117.0.5938.140..117.0.5938.153?pretty=fuller&n=1000))

## [1.58.135](https://github.com/brave/brave-browser/releases/tag/v1.58.135)

 - Fixed crash when dismissing Brave VPN dialog in certain cases. ([#33257](https://github.com/brave/brave-browser/issues/33257))
 - Fixed crash when checking if device supports Brave VPN in certain cases. ([#33235](https://github.com/brave/brave-browser/issues/33235))
 - Upgraded Chromium to 117.0.5938.140. ([#33282](https://github.com/brave/brave-browser/issues/33282)) ([Changelog for 117.0.5938.140](https://chromium.googlesource.com/chromium/src/+log/117.0.5938.92..117.0.5938.140?pretty=fuller&n=1000))

## [1.58.131](https://github.com/brave/brave-browser/releases/tag/v1.58.131)

 - Upgraded Chromium to 117.0.5938.92. ([#33181](https://github.com/brave/brave-browser/issues/33181)) ([Changelog for 117.0.5938.92](https://chromium.googlesource.com/chromium/src/+log/117.0.5938.88..117.0.5938.92?pretty=fuller&n=1000))

## [1.58.129](https://github.com/brave/brave-browser/releases/tag/v1.58.129)

 - Added brave://flags#brave-global-privacy-control-enabled to opt out of GPC. ([#32231](https://github.com/brave/brave-browser/issues/32231))
 - Updated SKU credential matching logic for Brave VPN. ([#32924](https://github.com/brave/brave-browser/issues/32924))
 - Fixed Brave VPN crash due to new Billing SDK. ([#32924](33090://github.com/brave/brave-browser/issues/33090))

## [1.58.125](https://github.com/brave/brave-browser/releases/tag/v1.58.125)

### Web3

 - Added Filecoin to Brave Wallet. ([#30342](https://github.com/brave/brave-browser/issues/30342))
 - Added support for EIP-6963. ([#30595](https://github.com/brave/brave-browser/issues/30595))
 - Added network selector in the "Add custom asset" dialog. ([#31188](https://github.com/brave/brave-browser/issues/31188))
 - Added network selector in the "Edit visible assets" dialog. ([#27093](https://github.com/brave/brave-browser/issues/27093))
 - Implemented Web UI for "Send" similar to desktop. ([#31260](https://github.com/brave/brave-browser/issues/31260))
 - Implemented Web UI for "Buy" similar to desktop. ([#31494](https://github.com/brave/brave-browser/issues/31494))
 - Implemented Web UI for "Deposit" similar to desktop. ([#31495](https://github.com/brave/brave-browser/issues/31495))
 - [Security] Fixed Brave Wallet pop-up hiding the full screen toast as reported on HackerOne by shadow2639. ([#30113](https://github.com/brave/brave-browser/issues/30113))
 - Improved the flow for manually adding NFTs. ([#31399](https://github.com/brave/brave-browser/issues/31399))
 - Updated "Add custom asset" dialog to appear in full screen (also added "Add NFT" screen which appears in full screen). ([#27070](https://github.com/brave/brave-browser/issues/27070))
 - Moved Solana to the top of the network list. ([#31506](https://github.com/brave/brave-browser/issues/31506))
 - Removed reference to Brave Rewards within the wallet reset flow. ([#28003](https://github.com/brave/brave-browser/issues/28003))
 - Fixed transaction confirmation screen being shown when wallet has been auto-locked. ([#31272](https://github.com/brave/brave-browser/issues/31272)), ([#23049](https://github.com/brave/brave-browser/issues/23049))
 - Fixed wallet balance being displayed on Swap Web UI when wallet is locked. ([#31236](https://github.com/brave/brave-browser/issues/31236))
 - Fixed manually added assets not being listed in deposit fund screen. ([#31889](https://github.com/brave/brave-browser/issues/31889))
 - Fixed crash when fetching prices in certain cases. ([#32561](https://github.com/brave/brave-browser/issues/32561))
 - Fixed crash when editing visible assets in certain cases. ([#31303](https://github.com/brave/brave-browser/issues/31303))
 - Fixed color for both the "Add custom asset" & "Add NFT" buttons in dark mode. ([#31141](https://github.com/brave/brave-browser/issues/31141))

### Rewards

 - Added ZebPay as new custodial account provider for Brave Rewards (India only). ([#32386](https://github.com/brave/brave-browser/issues/32386))
 - Implemented new rewards onboarding UI and flow. ([#30309](https://github.com/brave/brave-browser/issues/30309))
 - Implemented "Manage Brave Ads" on the brave://rewards page. ([#30638](https://github.com/brave/brave-browser/issues/30638))
 - Fixed Virtual BAT expiry notice being displayed due to an incorrect deadline date being used. ([#28817](https://github.com/brave/brave-browser/issues/28817))

### General

 - Added "Copy clean link" feature. ([#26013](https://github.com/brave/brave-browser/issues/26013))
 - Added external deep linking for both VPN & Playlist. ([#31148](https://github.com/brave/brave-browser/issues/31148))
 - Updated "lock" icon to "tune" icon in address bar. ([#32380](https://github.com/brave/brave-browser/issues/32380))
 - Updated cosmetic filtering to force aggressive blocking on YouTube. ([#30896](https://github.com/brave/brave-browser/issues/30896))
 - Updated "Learn more" link on the "Lookalike URL" popup. ([#31396](https://github.com/brave/brave-browser/issues/31396))
 - Removed known tracking parameters "mtm_cid" and "pk_cid" from URLs. ([#31084](https://github.com/brave/brave-browser/issues/31084))
 - Fixed "Open in new tab" behaving as "Open in new tab in group" and opening new tabs in groups. ([#32853](https://github.com/brave/brave-browser/issues/32853))
 - Fixed "Open in new tab" being shown under the New Tab Page context menu when toggle is still disabled under "Appearance" settings. ([#32854](https://github.com/brave/brave-browser/issues/32854))
 - Fixed external links not being opened in the same tab group. ([#32868](https://github.com/brave/brave-browser/issues/32868))
 - Fixed "Try" Brave VPN modal not being displayed when user meets conditions. ([#29255](https://github.com/brave/brave-browser/issues/29255))
 - Fixed crash when interacting with VPN settings in certain cases. ([#30656](https://github.com/brave/brave-browser/issues/30656))
 - Fixed crash when viewing the Brave News feed in certain cases. ([#31195](https://github.com/brave/brave-browser/issues/31195))
 - Upgraded Chromium to 117.0.5938.62. ([#32945](https://github.com/brave/brave-browser/issues/32945)) ([Changelog for 117.0.5938.62](https://chromium.googlesource.com/chromium/src/+log/116.0.5845.188..117.0.5938.62?pretty=fuller&n=1000))

## [1.57.62](https://github.com/brave/brave-browser/releases/tag/v1.57.62)

 - Upgraded Chromium to 116.0.5845.180. ([#32765](https://github.com/brave/brave-browser/issues/32765)) ([Changelog for 116.0.5845.180](https://chromium.googlesource.com/chromium/src/+log/116.0.5845.163..116.0.5845.180?pretty=fuller&n=1000))

## [1.57.60](https://github.com/brave/brave-browser/releases/tag/v1.57.60)

 - Fixed "Allow app links to open in apps outside of Brave" being disabled by default. ([#32500](https://github.com/brave/brave-browser/issues/32500))
 - Upgraded Chromium to 116.0.5845.163. ([#32587](https://github.com/brave/brave-browser/issues/32587)) ([Changelog for 116.0.5845.163](https://chromium.googlesource.com/chromium/src/+log/116.0.5845.114..116.0.5845.163?pretty=fuller&n=1000))

## [1.57.53](https://github.com/brave/brave-browser/releases/tag/v1.57.53)

### Web3

 - Added support for "Swap" on Base. ([#32235](https://github.com/brave/brave-browser/issues/32235))
 - Fixed cancelling unapproved transaction continues to display the pending transaction icon. ([#32199](https://github.com/brave/brave-browser/issues/32199))

### General

 - Fixed crash when interacting with brave://adblock on multiple tabs. ([#14123](https://github.com/brave/brave-browser/issues/14123))
 - Upgraded Chromium to 116.0.5845.114. ([#32451](https://github.com/brave/brave-browser/issues/32451)) ([Changelog for 116.0.5845.114](https://chromium.googlesource.com/chromium/src/+log/116.0.5845.96..116.0.5845.114?pretty=fuller&n=1000))

## [1.57.50](https://github.com/brave/brave-browser/releases/tag/v1.57.50)

 - Fixed crash when using the bottom toolbar in certain cases. ([#32334](https://github.com/brave/brave-browser/issues/32334))
 - Fixed "Back" gesture closing/crashing Brave on Android 14. ([#31939](https://github.com/brave/brave-browser/issues/31939))

## [1.57.47](https://github.com/brave/brave-browser/releases/tag/v1.57.47)

### Web3

 - Added Market Tab. ([#30301](https://github.com/brave/brave-browser/issues/30301))
 - Added asset details within Market Tab. ([#30717](https://github.com/brave/brave-browser/issues/30717))
 - Added Activity Tab. ([#30608](https://github.com/brave/brave-browser/issues/30608))
 - Added the ability to connect to DApps by selected network per origin. ([#29635](https://github.com/brave/brave-browser/issues/29635))
 - Added "Help Center" link next to "Privacy Policy" link on the "Swap" page. ([#30372](https://github.com/brave/brave-browser/issues/30372))
 - Added full network name in status bar for "Buy", "Send" and "Swap" activity. ([#30341](https://github.com/brave/brave-browser/issues/30341))
 - Added Ellipsify contract address in status bar for "Buy", "Send" and "Swap" activity. ([#30340](https://github.com/brave/brave-browser/issues/30340))
 - Improved "Select Network" by displaying test networks in separate group. ([#31815](https://github.com/brave/brave-browser/issues/31815))
 - Fixed Filecoin EVM Testnet being displayed in secondary networks list. ([#30903](https://github.com/brave/brave-browser/issues/30903))
 - Fixed changing network momentarily flashes ETH icon. ([#24244](https://github.com/brave/brave-browser/issues/24244))

### Rewards

 - Updated "Estimated Earnings" indicator to display a monthly payout range. ([#30352](https://github.com/brave/brave-browser/issues/30352))
 - Updated "Brave Rewards" button in native browser settings to redirect to brave://rewards settings page. ([#26902](https://github.com/brave/brave-browser/issues/26902))

### General

 - Added support for "Forget by Default" browsing mode. ([#26465](https://github.com/brave/brave-browser/issues/26465))
 - Added farbled weights to Accept-Language headers' service workers. ([#29372](https://github.com/brave/brave-browser/issues/29372))
 - Added ability to Allow/Block universal links from being opened in external apps. ([#25863](https://github.com/brave/brave-browser/issues/25863))
 - Added support for overriding eTLD+1 exceptions from default adblock filter lists. ([#20426](https://github.com/brave/brave-browser/issues/20426))
 - Improved text on domain blocking interstitial page. ([#30142](https://github.com/brave/brave-browser/issues/30142))
 - Improved accessibility by fixing several content labelling issues. ([#30763](https://github.com/brave/brave-browser/issues/30763))
 - Removed known Hive email trackers "h_sid" and "h_slt" from URLs. ([#30731](https://github.com/brave/brave-browser/issues/30731))
 - Removed "Restore" button from VPN subscription modal when there's no active subscription available. ([#30244](https://github.com/brave/brave-browser/issues/30244))
 - Fixed custom filter lists in shields not respecting the "Expires" field. ([#17909](https://github.com/brave/brave-browser/issues/17909))
 - Upgraded Chromium to 116.0.5845.96. ([#32241](https://github.com/brave/brave-browser/issues/32241)) ([Changelog for 116.0.5845.96](https://chromium.googlesource.com/chromium/src/+log/115.0.5790.171..116.0.5845.96?pretty=fuller&n=1000))

## [1.56.20](https://github.com/brave/brave-browser/releases/tag/v1.56.20)

- Fixed performance issues loading Facebook timeline due to Safe Browsing. ([#31894](https://github.com/brave/brave-browser/issues/31894))
- Upgraded Chromium to 115.0.5790.171. ([#32040](https://github.com/brave/brave-browser/issues/32040)) ([Changelog for 115.0.5790.171](https://chromium.googlesource.com/chromium/src/+log/115.0.5790.138..115.0.5790.171?pretty=fuller&n=1000))

## [1.56.16](https://github.com/brave/brave-browser/releases/tag/v1.56.16)

- Upgraded Chromium to 115.0.5790.138. ([#31869](https://github.com/brave/brave-browser/issues/31869)) ([Changelog for 115.0.5790.138](https://chromium.googlesource.com/chromium/src/+log/115.0.5790.136..115.0.5790.138?pretty=fuller&n=1000))

## [1.56.13](https://github.com/brave/brave-browser/releases/tag/v1.56.13)

- Fixed incorrect VPN support page being linked via "VPN Support" under "Settings". ([#22950](https://github.com/brave/brave-browser/issues/22950))
- Upgraded Chromium to 115.0.5790.136. ([#31795](https://github.com/brave/brave-browser/issues/31795)) ([Changelog for 115.0.5790.136](https://chromium.googlesource.com/chromium/src/+log/115.0.5790.98..115.0.5790.136?pretty=fuller&n=1000))

## [1.56.8](https://github.com/brave/brave-browser/releases/tag/v1.56.8)

### Web3

 - Added auto-discovery for Filecoin assets and accounts. ([#28002](https://github.com/brave/brave-browser/issues/28002))
 - Updated default Brave Wallet auto lock setting to 10 minutes. ([#26362](https://github.com/brave/brave-browser/issues/26362))
 - Fixed transactions and tx approvals displaying invalid amount and gas values due to using default network. ([#30277](https://github.com/brave/brave-browser/issues/30277))

### Brave Rewards

 - Updated the "Verified Creator" blue checkmark icon. ([#28208](https://github.com/brave/brave-browser/issues/28208))
 - Redesigned UI for the contribution banner. ([#28149](https://github.com/brave/brave-browser/issues/28149))

### General

 - Added the ability to import/export bookmarks. ([#6378](https://github.com/brave/brave-browser/issues/6378))
 - Fixed login issue on https://login.live.com. ([#31196](https://github.com/brave/brave-browser/issues/31196))
 - Fixed issue where cosmetic filtering could not resolve relative URLs as first-party. ([#30062](https://github.com/brave/brave-browser/issues/30062))
 - Fixed cosmetic filtering unhiding heuristic. ([#30202](https://github.com/brave/brave-browser/issues/30202))
 - Fixed debounced sites displaying a top-level document blocking interstitial. ([#22437](https://github.com/brave/brave-browser/issues/22437))
 - Fixed crash when loading brave://settings via the URL bar. ([#31047](https://github.com/brave/brave-browser/issues/31047))
 - Fixed articles from Brave News always being grouped when using "Open in New Tab" via context menu. ([#28868](https://github.com/brave/brave-browser/issues/28868))
 - Upgraded Chromium to 115.0.5790.98. ([#31682](https://github.com/brave/brave-browser/issues/31682)) ([Changelog for 115.0.5790.98](https://chromium.googlesource.com/chromium/src/+log/114.0.5735.198..115.0.5790.98?pretty=fuller&n=1000))

## [1.52.130](https://github.com/brave/brave-browser/releases/tag/v1.52.130)

### Web3

 - Updated label for "Reset and clear wallet data" under brave://settings/web3. ([#30005](https://github.com/brave/brave-browser/issues/30005))
 - Fixed crash when hiding local network assets via "Edit visible assets" when local networks have been disabled. ([#31357](https://github.com/brave/brave-browser/issues/31357))

### General

 - Fixed "Share" button under shields panel not working on certain devices. ([#29856](https://github.com/brave/brave-browser/issues/29856))
 - Fixed "Brave News has no content to show" modal not appearing under New Tab Page when there's no Brave News sources selected. ([#28349](https://github.com/brave/brave-browser/issues/28349))
 - Fixed bottom padding for "Top Sites" under New Tab Page. ([#30674](https://github.com/brave/brave-browser/issues/30674))

## [1.52.129](https://github.com/brave/brave-browser/releases/tag/v1.52.129)

 - Upgraded Chromium to 114.0.5735.198. ([#31309](https://github.com/brave/brave-browser/issues/31309)) ([Changelog for 114.0.5735.198](https://chromium.googlesource.com/chromium/src/+log/114.0.5735.133..114.0.5735.198?pretty=fuller&n=1000))

## [1.52.126](https://github.com/brave/brave-browser/releases/tag/v1.52.126)

### Web3

 - Fixed switch network notifications incorrectly being fired when a custom network is selected. ([#30778](https://github.com/brave/brave-browser/issues/30778))

### General

 - Fixed crash which could occur when refreshing the New Tab Page in certain cases. ([#30938](https://github.com/brave/brave-browser/issues/30938))
 - Fixed crash when the "Notification are disabled" modal is displayed in certain cases. ([#30821](https://github.com/brave/brave-browser/issues/30821))
 - Upgraded Chromium to 114.0.5735.133. ([#31023](https://github.com/brave/brave-browser/issues/31023)) ([Changelog for 114.0.5735.133](https://chromium.googlesource.com/chromium/src/+log/114.0.5735.110..114.0.5735.133?pretty=fuller&n=1000))

## [1.52.122](https://github.com/brave/brave-browser/releases/tag/v1.52.122)

 - Upgraded Chromium to 114.0.5735.110. ([#30830](https://github.com/brave/brave-browser/issues/30830)) ([Changelog for 114.0.5735.110](https://chromium.googlesource.com/chromium/src/+log/114.0.5735.90..114.0.5735.110?pretty=fuller&n=1000))

## [1.52.120](https://github.com/brave/brave-browser/releases/tag/v1.52.120)

 - Fixed crash when opening Brave from third party apps using "Web Search". ([#30773](https://github.com/brave/brave-browser/issues/30773))

## [1.52.117](https://github.com/brave/brave-browser/releases/tag/v1.52.117)

### Web3

 - Added multi-chain support to show NFTs in grid view. ([#29444](https://github.com/brave/brave-browser/issues/29444))
 - Added "All network" selection for visible asset dialog. ([#29555](https://github.com/brave/brave-browser/issues/29555))
 - Implemented versioned transactions for Solana swaps on Jupiter. ([#30296](https://github.com/brave/brave-browser/issues/30296))
 - Implemented "Enable NFT auto-discovery" popup when navigating to NFT section for the first time. ([#29778](https://github.com/brave/brave-browser/issues/29778)) 
 - Updated Jupiter Swap API to v4 to add support for versioned transactions. ([#30297](https://github.com/brave/brave-browser/issues/30297))
 - Updated network selector to show all tokens from the selected network. ([#27333](https://github.com/brave/brave-browser/issues/27333))
 - Updated token list to only display tokens and not NFTs. ([#29412](https://github.com/brave/brave-browser/issues/29412))
 - Updated back navigation from block explorer to return to wallet instead of browser. ([#29421](https://github.com/brave/brave-browser/issues/29421))
 - Updated Buy/Send/Swap buttons to fall back to default network. ([#29695](https://github.com/brave/brave-browser/issues/29695))
 - Fixed inability to sign transactions on custom EVM networks. ([#30642](https://github.com/brave/brave-browser/issues/30642))
 - Fixed Solana transactions not being submitted to the chain in certain cases. ([#28645](https://github.com/brave/brave-browser/issues/28645))
 - Fixed issue with Solana swap failing if "Associated Token Account" does not exist. ([#29733](https://github.com/brave/brave-browser/issues/29733))

### Brave Rewards

 - Updated custodian selection modal. ([#29448](https://github.com/brave/brave-browser/issues/29448))

### General

 - Added "localhost resources" permission prompt. ([#29730](https://github.com/brave/brave-browser/issues/29730))
 - Added Constellation/STAR encryption for P3A. ([#24338](https://github.com/brave/brave-browser/issues/24338))
 - Added settings to remove distracting elements from YouTube. ([#27095](https://github.com/brave/brave-browser/issues/27095))
 - Added drop shadow around the rewards dropdown panel. ([#27257](https://github.com/brave/brave-browser/issues/27257))
 - [Security] Fixed URLs automatically being resolved when scanned from QR code as reported on HackerOne by roland_hack. ([#29743](https://github.com/brave/brave-browser/issues/29743))
 - Removed widget onboarding promo. ([#30618](https://github.com/brave/brave-browser/issues/30618))
 - Removed Google fallback when http://redirector.brave.com is unresponsive. ([#29841](https://github.com/brave/brave-browser/issues/29841))
 - Fixed "HTTPS Everywhere" not being disabled when enabling "HTTPS By Default" which caused issues with "Don't upgrade connections to HTTPS" in certain cases. ([#30436](https://github.com/brave/brave-browser/issues/30436))
 - Fixed VPN resetting both split tunnelling and country selection when resetting the configuration. ([#29466](https://github.com/brave/brave-browser/issues/29466))
 - Fixed crash when loading New Tab Page images in certain cases. ([#29427](https://github.com/brave/brave-browser/issues/29427))
 - Fixed crash when loading "Top Tiles" after opening a New Tab Page in certain cases. ([#29790](https://github.com/brave/brave-browser/issues/29790)) 
 - Upgraded Chromium to 114.0.5735.90. ([#30679](https://github.com/brave/brave-browser/issues/30679)) ([Changelog for 114.0.5735.90](https://chromium.googlesource.com/chromium/src/+log/113.0.5672.126..114.0.5735.90?pretty=fuller&n=1000))

## [1.51.121](https://github.com/brave/brave-browser/releases/tag/v1.51.121)

 - Upgraded Chromium to 113.0.5672.163. ([#30511](https://github.com/brave/brave-browser/issues/30511)) ([Changelog for 113.0.5672.163](https://chromium.googlesource.com/chromium/src/+log/113.0.5672.126..113.0.5672.163?pretty=fuller&n=1000))

## [1.51.118](https://github.com/brave/brave-browser/releases/tag/v1.51.118)

 - Implemented per-device WebUSB serial farbling. ([#30041](https://github.com/brave/brave-browser/issues/30041))
 - Fixed IPFS setting being disabled after being enabled when user leave settings. ([#29647](https://github.com/brave/brave-browser/issues/29647))
 - Upgraded Chromium to 113.0.5672.126. ([#30386](https://github.com/brave/brave-browser/issues/30386)) ([Changelog for 113.0.5672.126](https://chromium.googlesource.com/chromium/src/+log/113.0.5672.92..113.0.5672.126?pretty=fuller&n=1000))

## [1.51.114](https://github.com/brave/brave-browser/releases/tag/v1.51.114)

### Web3

 - [Security] Fixed Brave Wallet binding issue as reported on HackerOne by nick0ve. ([#30204](https://github.com/brave/brave-browser/issues/30204))

### General

 - Upgraded Chromium to 113.0.5672.92. ([#30209](https://github.com/brave/brave-browser/issues/30209)) ([Changelog for 113.0.5672.92](https://chromium.googlesource.com/chromium/src/+log/113.0.5672.77..113.0.5672.92?pretty=fuller&n=1000))

## [1.51.110](https://github.com/brave/brave-browser/releases/tag/v1.51.110)

### Web3

 - Added NFT tab feature under "Wallet' section. ([#29274](https://github.com/brave/brave-browser/issues/29274))
 - Added overlapping network icon and network name on asset list items via the "Portfolio" page. ([#29165](https://github.com/brave/brave-browser/issues/29165))
 - Implemented SVG support for NFT images. ([#27800](https://github.com/brave/brave-browser/issues/27800))
 - Updated native asset icons for Aurora to use ETH icon. ([#24210](https://github.com/brave/brave-browser/issues/24210))
 - [Security] Prevent blind cross chain signing as reported on HackerOne by julianor. ([#29798](https://github.com/brave/brave-browser/issues/29798))
 - Removed Transak assets which are not supported in the US. ([#28866](https://github.com/brave/brave-browser/issues/28866))
 - Removed NFTs from being displayed under "Portfolio". ([#29330](https://github.com/brave/brave-browser/issues/29330))
 - Fixed missing network icons (Aurora, Arbitrum etc..) to show actual icon instead of ETH icon on "Asset" list. ([#29166](https://github.com/brave/brave-browser/issues/29166))
 - Fixed incorrect NFTs being displayed when wallet is unlocked. ([#28301](https://github.com/brave/brave-browser/issues/28301))
 - Fixed NFTs with same token identifiers may display incorrect balance. ([#28627](https://github.com/brave/brave-browser/issues/28627))
 - Fixed issue with graph not being displayed when network is changed. ([#28748](https://github.com/brave/brave-browser/issues/28748))
 - Fixed crash when pulling image assets when activity context has been destroyed. ([#29473](https://github.com/brave/brave-browser/issues/29473))

### Brave Rewards

 - Fixed creator counter not being displayed in unconnected state. ([#29270](https://github.com/brave/brave-browser/issues/29270))

### General

 - Added "Google Sign-In" permission prompt. ([#28927](https://github.com/brave/brave-browser/issues/28927))
 - Added support for scriptlet arguments with quotes or backslashes. ([#29099](https://github.com/brave/brave-browser/issues/29099))
 - Added "View page with Speedreader" modal when visiting websites compatible with Speedreader. ([#28769](https://github.com/brave/brave-browser/issues/28769))
 - Implemented "HTTPS by Default" feature. ([#28295](https://github.com/brave/brave-browser/issues/28295))
 - Implemented WebUSB farbling. ([#28146](https://github.com/brave/brave-browser/issues/28146))
 - Updated “HTTPS by Default” to fallback to HTTP when encountering an HTTP error code in response to an HTTPS upgrade. ([#28013](https://github.com/brave/brave-browser/issues/28013))
 - Updated “HTTPS by Default” to work with “HttpsFirstModeV2" which fixes some capability problems, such as determining the correct referrer policy for a navigation. ([#28935](https://github.com/brave/brave-browser/issues/28935) & [#28809](https://github.com/brave/brave-browser/issues/28809))
 - Fixed crash when switching back to original NTP after enabling Brave News in another tab. ([#29634](https://github.com/brave/brave-browser/issues/29634))
 - Fixed crash when scrolling through Brave News feed in certain cases. ([#29343](https://github.com/brave/brave-browser/issues/29343))
 - Fixed crash when adding widgets to Android home screen in certain cases. ([#28831](https://github.com/brave/brave-browser/issues/28831))
 - Upgraded Chromium to 113.0.5672.77. ([#30096](https://github.com/brave/brave-browser/issues/30096)) ([Changelog for 113.0.5672.77](https://chromium.googlesource.com/chromium/src/+log/112.0.5615.165..113.0.5672.77?pretty=fuller&n=1000))

## [1.50.121](https://github.com/brave/brave-browser/releases/tag/v1.50.121)

### Web3

 - Added support for biometric unlock when restoring a wallet. ([#20807](https://github.com/brave/brave-browser/issues/20807))
 - Added navigation to new Swap WebUI in a new tab when selecting Swap from wallet. ([#29223](https://github.com/brave/brave-browser/issues/29223))
 - Fixed crash when attempting to select different networks via https://app.uniswap.org on Android 8 devices. ([#29538](https://github.com/brave/brave-browser/issues/29538))

### Brave Rewards

 - Fixed "Notifications are disabled" being displayed under rewards panel even though notifications have been enabled on Android 8 devices. ([#29563](https://github.com/brave/brave-browser/issues/29563))
 - Fixed "Note:" being displayed twice in the cross-custodial tipping notice via the rewards panel. ([#29081](https://github.com/brave/brave-browser/issues/29081))
 - Fixed cross-custodial notice not being updated correctly via both the rewards panel and rewards banner. ([#29080](https://github.com/brave/brave-browser/issues/29080))
 - Fixed "Loading..." spinner not being displayed under rewards panel when balance failed to fetch from custodian. ([#29054](https://github.com/brave/brave-browser/issues/29054))

### General

 - Fixed crash when attempting to set Brave as the default browser in certain cases. ([#29428](https://github.com/brave/brave-browser/issues/29428))
 - Fixed crash when tipping via the rewards panel in certain cases. ([#29041](https://github.com/brave/brave-browser/issues/29041))
 - Fixed crash when tipping with Android 8 devices. ([#29562](https://github.com/brave/brave-browser/issues/29562))
 - Upgraded Chromium to 112.0.5615.138. ([#29839](https://github.com/brave/brave-browser/issues/29839)) ([Changelog for 112.0.5615.138](https://chromium.googlesource.com/chromium/src/+log/112.0.5615.121..112.0.5615.138?pretty=fuller&n=1000))

## [1.50.114](https://github.com/brave/brave-browser/releases/tag/v1.50.114)

### Web3

 - Added Filecoin EVM to preloaded networks. ([#28954](https://github.com/brave/brave-browser/issues/28954))
 - Implemented filtering options for "eth_subscribe" with "logs". ([#27842](https://github.com/brave/brave-browser/issues/27842))
 - Updated Brave Wallet to use BalanceScanner contracts for ETH asset discovery. ([#28203](https://github.com/brave/brave-browser/issues/28203))
 - Updated on-ramp support for Sardine and Transak purchases on Android. ([#23316](https://github.com/brave/brave-browser/issues/23316))
 - Removed Sardine as an on-ramp provider for native BNB token. ([#29248](https://github.com/brave/brave-browser/issues/29248))

### Brave Rewards

 - Fixed Brave Rewards option being displayed under settings menu for unsupported countries. ([#28908](https://github.com/brave/brave-browser/issues/28908))
 - Fixed crash in certain cases when interacting with the "Brave Rewards" modal that appears via New Tab Page. ([#28451](https://github.com/brave/brave-browser/issues/28451))
 - Fixed rewards crash in certain cases. ([#28482](https://github.com/brave/brave-browser/issues/28482))
 - Fixed "Earn Tokens" and "Give Back" text misalignment under the Brave Rewards onboarding panel. ([#28278](https://github.com/brave/brave-browser/issues/28278))

### General

 - Added Brave News V2. ([#28476](https://github.com/brave/brave-browser/issues/28476))
 - Added brave://flags/#brave-sync-send-all-history flag to enable the ability to send all history entries to Brave Sync. ([#28062](https://github.com/brave/brave-browser/issues/28062))
 - Added support for ":-abp-has()" procedural selector in adblock rules. ([#28609](https://github.com/brave/brave-browser/issues/28609))
 - Added and enabled "Fanboy's Mobile Notification List" by default. ([#25079](https://github.com/brave/brave-browser/issues/25079))
 - Enabled all available regional adblock filter lists for a given locale on first launch. ([#20825](https://github.com/brave/brave-browser/issues/20825))
 - Updated widget onboarding so it only appears after Brave has been opened 25 times. ([#27648](https://github.com/brave/brave-browser/issues/27648))
 - Updated adblock rules created by the "Don't warn me about this site again" domain blocking interstitial to be more strict. ([#28390](https://github.com/brave/brave-browser/issues/28390))
 - Fixed Brave Shields onboarding being interrupted by other onboarding modals. ([#27644](https://github.com/brave/brave-browser/issues/27644))
 - Fixed search queries being added into "Top Sites" under New Tab Page. ([#29093](https://github.com/brave/brave-browser/issues/29093))
 - Fixed error when logging in https://account.t-mobile.com. ([#28945](https://github.com/brave/brave-browser/issues/28945))
 - Fixed crash when viewing passwords in "Password Manager" when system text is set as bold via "Display size & text". ([#29344](https://github.com/brave/brave-browser/issues/29344))
 - Fixed news sources not being unfollowed when removing via the context menu under New Tab Page. ([#28865](https://github.com/brave/brave-browser/issues/28865))
 - Fixed widget crash in certain cases. ([#27946](https://github.com/brave/brave-browser/issues/27946))
 - Upgraded Chromium to 112.0.5615.49. ([#29396](https://github.com/brave/brave-browser/issues/29396)) ([Changelog for 112.0.5615.49](https://chromium.googlesource.com/chromium/src/+log/111.0.5563.147..112.0.5615.49?pretty=fuller&n=1000))

## [1.49.132](https://github.com/brave/brave-browser/releases/tag/v1.49.132)

### Web3

 - Fixed issue with multiple onboarding tabs opening up for Magic Eden. ([#28546](https://github.com/brave/brave-browser/issues/28546))

### General

 - Fixed crash when scrolling through the Brave News feed in certain cases. ([#28576](https://github.com/brave/brave-browser/issues/28576))
 - Upgraded Chromium to 111.0.5563.147. ([#29341](https://github.com/brave/brave-browser/issues/29341)) ([Changelog for 111.0.5563.147](https://chromium.googlesource.com/chromium/src/+log/111.0.5563.116..111.0.5563.147?pretty=fuller&n=1000))

## [1.49.129](https://github.com/brave/brave-browser/releases/tag/v1.49.129)

### Web3

  - Added "Swap" button to the token details screen. ([#28914](https://github.com/brave/brave-browser/issues/28914))
  - Fixed missing users wallet address as fee payer when submitting Solana transactions in certain cases. ([#28955](https://github.com/brave/brave-browser/issues/28955))
  - Fixed token balance not being updated correctly when user changes network or accounts. ([#28879](https://github.com/brave/brave-browser/issues/28879))

### General

 - Fixed blob partitioning. ([#28934](https://github.com/brave/brave-browser/issues/28934)) 
 - Fixed "Share via" not working in Custom Tabs. ([#28805](https://github.com/brave/brave-browser/issues/28805)) 
 - Fixed searching or opening pages through the URL bar not correctly triggering events for user activity. ([#28826](https://github.com/brave/brave-browser/issues/28826)) 
 - Fixed subscription "Status" and "Expires" fields appearing blank after redeeming a VPN subscription. ([#28910](https://github.com/brave/brave-browser/issues/28910)) 
 - Fixed crash when adding VPN subscription in certain cases. ([#29037](https://github.com/brave/brave-browser/issues/29037)) 
 - Fixed crash when the "Enable" VPN modal is displayed in certain cases. ([#29039](https://github.com/brave/brave-browser/issues/29039)) 
 - Fixed crash when the bottom toolbar is initialized in certain cases. ([#29184](https://github.com/brave/brave-browser/issues/29184)) 
 - Upgraded Chromium to 111.0.5563.116. ([#29229](https://github.com/brave/brave-browser/issues/29229)) ([Changelog for 111.0.5563.116](https://chromium.googlesource.com/chromium/src/+log/111.0.5563.64..111.0.5563.116?pretty=fuller&n=1000))

## [1.49.122](https://github.com/brave/brave-browser/releases/tag/v1.49.122)

### Web3

 - Added auto-discovery of Solana assets. ([#27246](https://github.com/brave/brave-browser/issues/27246))
 - Added loading skeletons to Brave Wallet asset list on the "Portfolio" and "Account" pages. ([#27344](https://github.com/brave/brave-browser/issues/27344))
 - Implemented "logs" support for "eth_subscribe". ([#27283](https://github.com/brave/brave-browser/issues/27283))

### Brave Rewards
 
 - Implemented vBAT messaging. ([#27883](https://github.com/brave/brave-browser/issues/27883))
 - Updated Brave Rewards for users in specific countries to disallow enabling and show clearer unavailable messaging. ([#25276](https://github.com/brave/brave-browser/issues/25276))
 - Fixed accidental tipping by not selecting a tipping amount by default under the tipping banner. ([#7767](https://github.com/brave/brave-browser/issues/7767))
 - Fixed crash in rewards tipping banner in certain cases. ([#28316](https://github.com/brave/brave-browser/issues/28316))
 - Fixed crash in rewards site banner in certain cases. ([#28088](https://github.com/brave/brave-browser/issues/28088))
 - Fixed "Accourding" spelling error under the limited functionality toast notification. ([#28215](https://github.com/brave/brave-browser/issues/28215)) 

### General

 - Added support for ":has" pseudoclass in cosmetic filters. ([#27874](https://github.com/brave/brave-browser/issues/27874))
 - Added support for "$match-case" option for adblock filters. ([#28194](https://github.com/brave/brave-browser/issues/28194))
 - Added ability to disable download progress notifications via "Downloads" settings. ([#25611](https://github.com/brave/brave-browser/issues/25611))
 - Enabled Safe Browsing by default. ([#27642](https://github.com/brave/brave-browser/issues/27642))
 - Included "Fanboy's Mobile Notifications List" in brave://adblock by default. ([#24506](https://github.com/brave/brave-browser/issues/24506))
 - [Security] Restricted QR scanner to only open HTTP/HTTPS URL schemas rather than allowing any valid URL schema to be opened. ([#28703](https://github.com/brave/brave-browser/issues/28703))
 - Removed the search engine onboarding for new installations in India. ([#28656](https://github.com/brave/brave-browser/issues/27709))
 - Updated default search engine to Brave Search for new installations in India. ([#27709](https://github.com/brave/brave-browser/issues/28656))
 - Fixed crash when accessing Brave VPN billing in certain cases. ([#28946](https://github.com/brave/brave-browser/issues/28946))
 - Fixed crash when viewing the retention notification in certain cases. ([#28317](https://github.com/brave/brave-browser/issues/28317))
 - Fixed "Open in New Tab" under Brave News not opening tabs in background. ([#26289](https://github.com/brave/brave-browser/issues/26289))
 - Fixed "Rate Brave" button overlapping the "Liking Brave" rating card in certain cases. ([#28315](https://github.com/brave/brave-browser/issues/28315))
 - Fixed Brave icons being incorrectly sized in Android's browser app picker. ([#27937](https://github.com/brave/brave-browser/issues/27937))
 - Upgraded Chromium to 111.0.5563.64. ([#28922](https://github.com/brave/brave-browser/issues/28922)) ([Changelog for 111.0.5563.64](https://chromium.googlesource.com/chromium/src/+log/110.0.5481.177..111.0.5563.64?pretty=fuller&n=1000))

## [1.48.171](https://github.com/brave/brave-browser/releases/tag/v1.48.171)

 - Fixed crash when fetching balance on the "Portfolio" screen via Brave Wallet in certain cases. ([#28452](https://github.com/brave/brave-browser/issues/28452))
 - Fixed long wait times when starting a sync chain with multiple devices with a large amount of bookmarks. ([#27931](https://github.com/brave/brave-browser/issues/27931))
 - Fixed incorrect aspect ratio being used on certain New Tab Page images. ([#28450](https://github.com/brave/brave-browser/issues/28450))
 - Fixed crash when quickly selecting a search engine from "Private Tab" and then closing the "Settings" page. ([#28262](https://github.com/brave/brave-browser/issues/28262))
 - Fixed crash when opening New Tab Page in certain cases. ([#28457](https://github.com/brave/brave-browser/issues/28457))
 - Fixed crash when running through the welcome onboarding in certain cases. ([#28458](https://github.com/brave/brave-browser/issues/28458)) ([#28598](https://github.com/brave/brave-browser/issues/28598))
 - Removed auto contribution slide from the the Brave Rewards onboarding panel in Japan region. ([#28221](https://github.com/brave/brave-browser/issues/28221))
 - Upgraded Chromium to 110.0.5481.177. ([#28690](https://github.com/brave/brave-browser/issues/28690)) ([Changelog for 110.0.5481.177](https://chromium.googlesource.com/chromium/src/+log/110.0.5481.104..110.0.5481.177?pretty=fuller&n=1000))

## [1.48.164](https://github.com/brave/brave-browser/releases/tag/v1.48.164)

 - Upgraded Chromium to 110.0.5481.100. ([#28515](https://github.com/brave/brave-browser/issues/28515)) ([Changelog for 110.0.5481.100](https://chromium.googlesource.com/chromium/src/+log/110.0.5481.77..110.0.5481.100?pretty=fuller&n=1000))

## [1.48.160](https://github.com/brave/brave-browser/releases/tag/v1.48.160)

 - Added NFT asset details screen in Brave Wallet. ([#27276](https://github.com/brave/brave-browser/issues/27276))
 - Added support to add Solana NFT to Brave Wallet and implemented Solana NFT details screen. ([#27803](https://github.com/brave/brave-browser/issues/27803))
 - Added NFT section in "Portfolio" page via Brave Wallet. ([#27777](https://github.com/brave/brave-browser/issues/27777))
 - Added "Solana Naming Service" (SNS) preference under the "Brave Shields & privacy" settings to resolve SNS domains. ([#27392](https://github.com/brave/brave-browser/issues/27392))
 - Added support for "eth_signTransaction" and "eth_sendRawTransaction" in Brave Wallet. ([#23582](https://github.com/brave/brave-browser/issues/23582))
 - Added ENS L2 address resolution in Brave Wallet. ([#27465](https://github.com/brave/brave-browser/issues/27465))
 - Added and updated rewards states for Brave Rewards changes as described in https://brave.com/rewards-changes. ([#27055](https://github.com/brave/brave-browser/issues/27055))
 - Added "Auto-redirect tracking URLs" setting under brave://settings/shields. ([#24020](https://github.com/brave/brave-browser/issues/24020))
 - Added ability to hide privacy stats from the New Tab Page using the "Show Brave Stats" toggle via the "New tab page" settings. ([#22921](https://github.com/brave/brave-browser/issues/22921))
 - Implemented ENS/SNS/UD address resolution for Brave Wallet addresses. ([#27464](https://github.com/brave/brave-browser/issues/27464))
 - Improved various rating prompts within Brave. ([#25777](https://github.com/brave/brave-browser/issues/25777))
 - [Security] Added the ability to delete a Brave Sync chain. ([#22884](https://github.com/brave/brave-browser/issues/22884))
 - [Security] Added ability to enable Safe Browsing via brave://flags. ([#8705](https://github.com/brave/brave-browser/issues/8705))
 - [Security] Fixed EIP712Domain data not being displayed in Brave Wallet when signing messages as reported on HackerOne by julianor. ([#28048](https://github.com/brave/brave-browser/issues/28048))
 - Reverted Twitter's "t" tracking parameter removal due to webcompat issues in certain cases. ([#28184](https://github.com/brave/brave-browser/issues/28184))
 - Removed crypto widgets. ([#26865](https://github.com/brave/brave-browser/issues/26865))
 - Removed address resolution for ".coin" TLD from Unstoppable Domains. ([#27436](https://github.com/brave/brave-browser/issues/27436))
 - Removed "user wallet" language in the custodian submenu via the rewards panel. ([#27190](https://github.com/brave/brave-browser/issues/27190))
 - Removed known Yahoo tracking parameters from URLs. ([#25691](https://github.com/brave/brave-browser/issues/25691))
 - Removed known Twitter tracking parameters "ref_src" and "ref_url" from URLs. ([#26966](https://github.com/brave/brave-browser/issues/26966))
 - Updated "Learn more" link under Brave Rewards panel from https://brave.com/brave-rewards to https://brave.com/rewards-changes. ([#27986](https://github.com/brave/brave-browser/issues/27986))
 - Updated "Learn more" link under P3A onboarding from https://brave.com/privacy/browser/#how-we-improve-brave to https://support.brave.com/hc/en-us/articles/9140465918093-What-is-P3A-in-Brave-. ([#27279](https://github.com/brave/brave-browser/issues/27279))
 - Limited account names to thirty characters in Brave Wallet. ([#23362](https://github.com/brave/brave-browser/issues/23362))
 - Fixed the back button and swipe navigation in Brave Wallet that prevented users from leaving the Brave Wallet view on Android 13. ([#27787](https://github.com/brave/brave-browser/issues/27787))
 - Fixed issue with "Portfolio" graph when adding an NFT with an non-existent Token ID in Brave Wallet. ([#26803](https://github.com/brave/brave-browser/issues/26803))
 - Fixed crash in Brave Wallet when Solana is selected as the default provider. ([#28147](https://github.com/brave/brave-browser/issues/28147))
 - Fixed crash when changing the default network in Brave Wallet in certain cases. ([#28225](https://github.com/brave/brave-browser/issues/28225)) 
 - Fixed cosmetic filters not being applied on certain websites. ([#27098](https://github.com/brave/brave-browser/issues/27098))
 - Fixed amp="true" not being detected by DeAMP regex which prevented websites from being redirected to non-AMP websites. ([#27477](https://github.com/brave/brave-browser/issues/27477))
 - Fixed crash when opening links from third party apps while Brave set as default browser in certain cases. ([#28087](https://github.com/brave/brave-browser/issues/28087))
 - Fixed crash on New Tab Page when interacting with Brave News in certain cases. ([#28089](https://github.com/brave/brave-browser/issues/28089))
 - Fixed crash when enabling Brave News while device has no internet connection. ([#28197](https://github.com/brave/brave-browser/issues/28197))
 - Fixed "Enable notifications from Brave to earn Brave Rewards" modal not being displayed during Brave Rewards panel onboarding when "Brave Ads" notifications have been disabled via the "Notification" settings. ([#27851](https://github.com/brave/brave-browser/issues/27851))
 - Fixed "Get weekly privacy updates on tracker & ad blocking" not being displayed when "General" notifications have been disabled via the "Notification" settings. ([#27852](https://github.com/brave/brave-browser/issues/27852))
 - Fixed "Not now" button being cut off via widget onboarding on certain devices. ([#27825](https://github.com/brave/brave-browser/issues/27825))
 - Upgraded Chromium to 110.0.5481.77. ([#28219](https://github.com/brave/brave-browser/issues/28219)) ([Changelog for 110.0.5481.77](https://chromium.googlesource.com/chromium/src/+log/109.0.5414.119..110.0.5481.77?pretty=fuller&n=1000))

## [1.47.188](https://github.com/brave/brave-browser/releases/tag/v1.47.188)

 - Reverted [#27757](https://github.com/brave/brave-browser/issues/27757) which was causing issues on certain Samsung devices due to old widgets not being removed from the manifest file. ([#28118](https://github.com/brave/brave-browser/issues/28118))
 - Fixed crash when scrolling through the Brave News feed in certain cases. ([#28086](https://github.com/brave/brave-browser/issues/28086))

## [1.47.186](https://github.com/brave/brave-browser/releases/tag/v1.47.186)

 - Added Ramp network support in Brave Wallet. ([#27678](https://github.com/brave/brave-browser/issues/27678))
 - Fixed crash when creating a Brave Wallet in certain cases. ([#27805](https://github.com/brave/brave-browser/issues/27805))
 - Fixed crash when displaying the Brave search widget onboarding in certain cases. ([#27903](https://github.com/brave/brave-browser/issues/27903))
 - Fixed some "$removeparam" filter rules not being applied to document requests. ([#27819](https://github.com/brave/brave-browser/issues/27819))
 - Fixed crash in "DomainBlockNavigationThrottle" in certain cases when adding "$removeparam" rules into "brave://settings/shields/filters". ([#27791](https://github.com/brave/brave-browser/issues/27791))
 - Fixed intermittent crash when accessing DApps. ([#28015](https://github.com/brave/brave-browser/issues/28015))
 - Fixed crash when scrolling through the Brave News feed in certain cases. ([#27836](https://github.com/brave/brave-browser/issues/27836))
 - Fixed startup crash when attempting to access the ads notification channel when not created in certain cases. ([#27982](https://github.com/brave/brave-browser/issues/27982))
 - Fixed crash when updating settings menu icon state in certain cases. ([#27856](https://github.com/brave/brave-browser/issues/27856))
 - Fixed crash when accessing Brave VPN billing in certain cases. ([#27751](https://github.com/brave/brave-browser/issues/27751))
 - Fixed "Top Tile" icons being cut off within the quick action widget on certain devices. ([#26645](https://github.com/brave/brave-browser/issues/26645))
 - Fixed icons within the bookmark widget not being displayed correctly when minimized vertically. ([#27801](https://github.com/brave/brave-browser/issues/27801))
 - Fixed placeholder text within search widget not being updated when changing default search engine. ([#27749](https://github.com/brave/brave-browser/issues/27749))
 - Fixed legacy widgets not being removed from current widget list after updating profile. ([#27757](https://github.com/brave/brave-browser/issues/27757))
 - Fixed text under the permission request modals when using dark theme. ([#27767](https://github.com/brave/brave-browser/issues/27767))
 - Upgraded Chromium to 109.0.5414.119. ([#28011](https://github.com/brave/brave-browser/issues/28011)) ([Changelog for 109.0.5414.119](https://chromium.googlesource.com/chromium/src/+log/109.0.5414.87..109.0.5414.119?pretty=fuller&n=1000))

## [1.47.175](https://github.com/brave/brave-browser/releases/tag/v1.47.175)

 - Fixed several crashes related to the permission request modals for Brave Rewards and Privacy Report. ([#27810](https://github.com/brave/brave-browser/issues/27810)) ([#27809](https://github.com/brave/brave-browser/issues/27809))
 - Fixed crash when viewing ad notifications in certain cases. ([#27808](https://github.com/brave/brave-browser/issues/27808))

## [1.47.172](https://github.com/brave/brave-browser/releases/tag/v1.47.172)

 - Added Solana DApp support for Brave Wallet. ([#27527](https://github.com/brave/brave-browser/issues/27527))
 - Added support for "$removeparam" adblock filter syntax under brave://settings/shields/filters. ([#23927](https://github.com/brave/brave-browser/issues/23927))
 - Added "Connecting to selected custodian temporarily unavailable" error modal in Brave Rewards. ([#25125](https://github.com/brave/brave-browser/issues/25125))
 - Added widget onboarding and updated widget previews to remove Chrome defaults. ([#22875](https://github.com/brave/brave-browser/issues/22875))
 - Added ability to scroll through "Top Sites" on the New Tab Page. ([#26942](https://github.com/brave/brave-browser/issues/26942))
 - [Security] Improved browser privacy by reducing high resolution timer precision as reported on HackerOne by joe12387. ([#24681](https://github.com/brave/brave-browser/issues/24681))
 - [Security] Improved URL bar by always displaying eTLD+1 URLs. ([#26155](https://github.com/brave/brave-browser/issues/26155))
 - Improved asset discovery for Brave Wallet. ([#25820](https://github.com/brave/brave-browser/issues/25820))
 - Improved performance of cosmetic filtering in third-party iframes. ([#26212](https://github.com/brave/brave-browser/issues/26212))
 - Updated permission request modals for Brave Rewards and Privacy Report when Android notifications are not enabled during onboarding or have been disabled. ([#27032](https://github.com/brave/brave-browser/issues/27032))
 - Disabled the paint preview feature by default. ([#25123](https://github.com/brave/brave-browser/issues/25123))
 - Removed "Restore" tab from "Manage Brave Rewards" modal. ([#26338](https://github.com/brave/brave-browser/issues/26338))
 - Removed known tracking parameter "vgo_ee" from URLs. ([#26295](https://github.com/brave/brave-browser/issues/26295))
 - Fixed NFT details page displaying as a token and listing all available accounts. ([#23507](https://github.com/brave/brave-browser/issues/23507))
 - Fixed Brave News crash which occurred when certain characters were at the end of the title or description field. ([#26604](https://github.com/brave/brave-browser/issues/26604))
 - Fixed default search engine for private tabs not updating until all private tabs have been closed. ([#25821](https://github.com/brave/brave-browser/issues/25821))
 - Upgraded Chromium to 109.0.5414.87. ([#27710](https://github.com/brave/brave-browser/issues/27710)) ([Changelog for 109.0.5414.87](https://chromium.googlesource.com/chromium/src/+log/108.0.5359.128..109.0.5414.87?pretty=fuller&n=1000))

## [1.46.154](https://github.com/brave/brave-browser/releases/tag/v1.46.154)

 - Removed Wyre for buying crypto in Brave Wallet. ([#27681](https://github.com/brave/brave-browser/issues/27681))

## [1.46.146](https://github.com/brave/brave-browser/releases/tag/v1.46.146)

 - Added close button ("X") under Brave Rewards tipping banner. ([#26744](https://github.com/brave/brave-browser/issues/26744))
 - Updated Brave Wallet to sign Solana transactions with selected account instead of fee payer. ([#27051](https://github.com/brave/brave-browser/issues/27051))
 - Fixed crash during Brave Rewards onboarding when selecting country on both Android 6 and 7. ([#26286](https://github.com/brave/brave-browser/issues/26286))
 - Fixed "Support this creator" not being displayed under the Brave Rewards tipping banner. ([#26740](https://github.com/brave/brave-browser/issues/26740))
 - Fixed several spacing issues on Brave Rewards tipping banner when using tablet devices. ([#26739](https://github.com/brave/brave-browser/issues/26739))
 - Upgraded Chromium to 108.0.5359.128. ([#27351](https://github.com/brave/brave-browser/issues/27351)) ([Changelog for 108.0.5359.128](https://chromium.googlesource.com/chromium/src/+log/108.0.5359.99..108.0.5359.128?pretty=fuller&n=1000))

## [1.46.138](https://github.com/brave/brave-browser/releases/tag/v1.46.138)

 - Fixed performance issue where fingerprint farbling caused some sites to load slowly or not at all. ([#26700](https://github.com/brave/brave-browser/issues/26700))
 
## [1.46.134](https://github.com/brave/brave-browser/releases/tag/v1.46.134)

 - Upgraded Chromium to 108.0.5359.94. ([#27130](https://github.com/brave/brave-browser/issues/27130)) ([Changelog for 108.0.5359.94](https://chromium.googlesource.com/chromium/src/+log/108.0.5359.71..108.0.5359.94?pretty=fuller&n=1000))

## [1.46.133](https://github.com/brave/brave-browser/releases/tag/v1.46.133)

 - Added asset discovery for tokens with non-zero balance when restoring Brave Wallet via seed phrase, private key import or via hardware wallet import. ([#19746](https://github.com/brave/brave-browser/issues/19746))
 - Added custom tip amounts to Brave Rewards. ([#16021](https://github.com/brave/brave-browser/issues/16021))
 - Added country selection requirement for Brave Rewards. ([#24543](https://github.com/brave/brave-browser/issues/24543))
 - Added permission request modals for Brave Rewards and Privacy Report when Android notifications are not enabled during onboarding or have been disabled. ([#25042](https://github.com/brave/brave-browser/issues/25042))
 - Added font fingerprinting protections. ([#24975](https://github.com/brave/brave-browser/issues/24975))
 - [Security] Fixed "Dark Mode" detection not being blocked when fingerprinting protection is set as strict. ([#25851](https://github.com/brave/brave-browser/issues/25851))
 - Updated Brave Wallet to ignore Chain ID casing. ([#25707](https://github.com/brave/brave-browser/issues/25707))
 - Updated Brave Rewards onboarding via the rewards panel. ([#26041](https://github.com/brave/brave-browser/issues/26041))
 - Updated Brave Rewards tipping banner. ([#17070](https://github.com/brave/brave-browser/issues/17070))
 - Updated the notifications permission request modal on Android 13. ([#25593](https://github.com/brave/brave-browser/issues/25593))
 - Updated adblock components to use plaintext lists. ([#25363](https://github.com/brave/brave-browser/issues/25363))
 - Updated debouncing to only apply to cross site navigations. ([#25859](https://github.com/brave/brave-browser/issues/25859))
 - Fixed locale parsing of send values in a Brave Wallet transaction. ([#24909](https://github.com/brave/brave-browser/issues/24909))
 - Fixed Brave Wallet addresses not resolving under the "Send" screen when using QR scanner. ([#25731](https://github.com/brave/brave-browser/issues/25731))
 - Fixed Brave Rewards banner displaying "Tip Amount" instead of "One-time tip amount" when creating a recurring monthly tip. ([#26348](https://github.com/brave/brave-browser/issues/26348))
 - Fixed crash on https://d3ward.github.io/toolz/adblock when "RU Adlist" is enabled under brave://settings/shields/filters. ([#26075](https://github.com/brave/brave-browser/issues/26075))
 - Fixed HTTPSE redirects taking precedence over adblock redirects. ([#26415](https://github.com/brave/brave-browser/issues/26415))
 - Upgraded Chromium to 108.0.5359.71. ([#27041](https://github.com/brave/brave-browser/issues/27041)) ([Changelog for 108.0.5359.71](https://chromium.googlesource.com/chromium/src/+log/107.0.5304.141..108.0.5359.71?pretty=fuller&n=1000))

## [1.45.133](https://github.com/brave/brave-browser/releases/tag/v1.45.133)

 - Upgraded Chromium to 107.0.5304.141. ([#26965](https://github.com/brave/brave-browser/issues/26965)) ([Changelog for 107.0.5304.141](https://chromium.googlesource.com/chromium/src/+log/107.0.5304.110..107.0.5304.141?pretty=fuller&n=1000))

## [1.45.131](https://github.com/brave/brave-browser/releases/tag/v1.45.131)

- Added header for "search.brave.com" so Brave Search is aware when Brave Ads are enabled. ([#25430](https://github.com/brave/brave-browser/issues/25430))

## [1.45.127](https://github.com/brave/brave-browser/releases/tag/v1.45.127)

 - Added Solana NFT support in Brave Wallet. ([#26617](https://github.com/brave/brave-browser/issues/26617))
 - Added new setting to enable/disable Brave Translate feature. ([#26154](https://github.com/brave/brave-browser/issues/26154))
 - [Security] Fixed misleading signing request message in Brave Wallet. ([#26372](https://github.com/brave/brave-browser/issues/26372))
 - Updated default search engine to Brave Search for new installations in certain regions. ([#26318](https://github.com/brave/brave-browser/issues/26318))

## [1.45.123](https://github.com/brave/brave-browser/releases/tag/v1.45.123)

 - Upgraded Chromium to 107.0.5304.110. ([#26621](https://github.com/brave/brave-browser/issues/26621)) ([Changelog for 107.0.5304.110](https://chromium.googlesource.com/chromium/src/+log/107.0.5304.91..107.0.5304.110?pretty=fuller&n=1000))

## [1.45.120](https://github.com/brave/brave-browser/releases/tag/v1.45.120)

 - Fixed crash when viewing a retention notification in certain cases. ([#26444](https://github.com/brave/brave-browser/issues/26444))
 - Fixed crash when using the built-in password manager in certain cases. ([#26396](https://github.com/brave/brave-browser/issues/26396))
 - Fixed crash when viewing "In-app notification settings" under "App notification". ([#26440](https://github.com/brave/brave-browser/issues/26440))

## [1.45.116](https://github.com/brave/brave-browser/releases/tag/v1.45.116)

 - Upgraded Chromium to 107.0.5304.91. ([#26292](https://github.com/brave/brave-browser/issues/26292)) ([Changelog for 107.0.5304.91](https://chromium.googlesource.com/chromium/src/+log/107.0.5304.62..107.0.5304.91?pretty=fuller&n=1000))

## [1.45.113](https://github.com/brave/brave-browser/releases/tag/v1.45.113)

 - Added dialog for blocking cookie consent banners. ([#8974](https://github.com/brave/brave-browser/issues/8974))
 - Added QR code scanner to address bar. ([#21478](https://github.com/brave/brave-browser/issues/21478))
 - Added additional language pairs to Brave Translate. ([#24303](https://github.com/brave/brave-browser/issues/24303))
 - Added support for province level targeting for select Canadian provinces when using Brave Ads. ([#16682](https://github.com/brave/brave-browser/issues/16682))
 - [Security] Added additional password protection for Brave Wallet show private key. ([#24830](https://github.com/brave/brave-browser/issues/24830))
 - Implemented Solana connection state indicator on Brave Wallet panel. ([#24810](https://github.com/brave/brave-browser/issues/24810))
 - Implemented multi-chain pending transaction requests on Brave Wallet panel. ([#24928](https://github.com/brave/brave-browser/issues/24928))
 - Enabled theme support for Speedreader. ([#25116](https://github.com/brave/brave-browser/issues/25116))
 - Improved fingerprinting privacy by adding farbling protections for screen resolution and coordinates. ([#23170](https://github.com/brave/brave-browser/issues/23170))
 - Improved privacy by preventing private windows from inheriting permissions set in normal windows. ([#24720](https://github.com/brave/brave-browser/issues/24720))
 - Improved brave://rewards responsiveness. ([#24570](https://github.com/brave/brave-browser/issues/24570))
 - Updated the text colour of pre-set values to be more legible on the Brave Wallet "Send" screen. ([#24522](https://github.com/brave/brave-browser/issues/24522))
 - Updated verified vs. unverified criteria for Brave Rewards creator channels. ([#25085](https://github.com/brave/brave-browser/issues/25085))
 - Removed known Blueshift email tracking parameters from URLs. ([#25238](https://github.com/brave/brave-browser/issues/25238))
 - Fixed crash when switching/selecting networks and quickly viewing asset details via Brave Wallet. ([#25131](https://github.com/brave/brave-browser/issues/25131))
 - Fixed misaligned autocomplete icons under the address bar. ([#26063](https://github.com/brave/brave-browser/issues/26063))
 - Fixed misaligned on-touch animation under Top Sites. ([#24676](https://github.com/brave/brave-browser/issues/24676))
 - Upgraded Chromium to 107.0.5304.62. ([#26151](https://github.com/brave/brave-browser/issues/26151)) ([Changelog for 107.0.5304.62](https://chromium.googlesource.com/chromium/src/+log/106.0.5249.119..107.0.5304.62?pretty=fuller&n=1000))

## [1.44.114](https://github.com/brave/brave-browser/releases/tag/v1.44.114)

 - Fixed crash when tapping on Brave ads within the Brave News feed via the New Tab Page. ([#25933](https://github.com/brave/brave-browser/issues/25933))
 - Upgraded Chromium to 106.0.5249.126. ([#26018](https://github.com/brave/brave-browser/issues/26018)) ([Changelog for 106.0.5249.126](https://chromium.googlesource.com/chromium/src/+log/106.0.5249.119..106.0.5249.126?pretty=fuller&n=1000))

## [1.44.112](https://github.com/brave/brave-browser/releases/tag/v1.44.112)

 - Removed deprecated Ethereum Testnet's (Ropsten/Rinkeby/Kovan) and added support for Sepolia Testnet for Brave Wallet. ([#25654](https://github.com/brave/brave-browser/issues/25654))
 - Upgraded Chromium to 106.0.5249.119. ([#25926](https://github.com/brave/brave-browser/issues/25926)) ([Changelog for 106.0.5249.119](https://chromium.googlesource.com/chromium/src/+log/106.0.5249.103..106.0.5249.119?pretty=fuller&n=1000))

## [1.44.105](https://github.com/brave/brave-browser/releases/tag/v1.44.105)

 - Upgraded Chromium to 106.0.5249.91. ([#25737](https://github.com/brave/brave-browser/issues/25737)) ([Changelog for 106.0.5249.91](https://chromium.googlesource.com/chromium/src/+log/106.0.5249.65..106.0.5249.91?pretty=fuller&n=1000))

## [1.44.101](https://github.com/brave/brave-browser/releases/tag/v1.44.101)

 - Added .zil TLD support for Unstoppable Domains. ([#24621](https://github.com/brave/brave-browser/issues/24621))
 - Added "Prevent fingerprinting via language settings" under the "Brave Shields & privacy" settings. ([#24621](https://github.com/brave/brave-browser/issues/23919))  
 - Added Solana account creation dialog in Brave Wallet under the "Send" screen if Solana account doesn't exist. ([#24463](https://github.com/brave/brave-browser/issues/24463))  
 - Updated Brave Wallet to create a Solana account by default when creating or restoring a wallet and set Solana as the default network. ([#25432](https://github.com/brave/brave-browser/issues/25432))
 - Improved de-AMP functionality. ([#22917](https://github.com/brave/brave-browser/issues/22917))
 - Removed extra whitespace being added when pasting a contract address while adding a custom token in Brave Wallet. ([#24728](https://github.com/brave/brave-browser/issues/24728))
 - Removed support for legacy Brave Rewards anonymous Uphold cards. ([#24464](https://github.com/brave/brave-browser/issues/24464))
 - Removed 2 BAT minimum threshold under Brave Rewards before being able to use Uphold as a custodial provider. ([#24759](https://github.com/brave/brave-browser/issues/24759))
 - Fixed pending Solana Devnet requests not being displayed under "Transactions" via Brave Wallet. ([#24410](https://github.com/brave/brave-browser/issues/24410))
 - Fixed "Reset Brave Rewards" not working correctly when the Brave Rewards page is opened. ([#8776](https://github.com/brave/brave-browser/issues/8776))
 - Fixed Brave Rewards panel not displaying "Logged out" when wallet has been disconnected from custodian. ([#23480](https://github.com/brave/brave-browser/issues/23480))
 - Fixed Brave News feed not being displayed under active NTP when enabling through settings. ([#25500](https://github.com/brave/brave-browser/issues/25500))
 - Upgraded Chromium to 106.0.5249.65. ([#25629](https://github.com/brave/brave-browser/issues/25629)) ([Changelog for 106.0.5249.65](https://chromium.googlesource.com/chromium/src/+log/105.0.5195.127..106.0.5249.65?pretty=fuller&n=1000))

## [1.43.94](https://github.com/brave/brave-browser/releases/tag/v1.43.94)

 - Upgraded Chromium to 105.0.5195.136. ([#25431](https://github.com/brave/brave-browser/issues/25431)) ([Changelog for 105.0.5195.136](https://chromium.googlesource.com/chromium/src/+log/105.0.5195.127..105.0.5195.136?pretty=fuller&n=1000))

## [1.43.93](https://github.com/brave/brave-browser/releases/tag/v1.43.93)

 - Added "Bridge to Aurora" button under the "Asset" panel in Brave Wallet. ([#24446](https://github.com/brave/brave-browser/issues/24446))
 - Restored gesture requirement for async clipboard write access. ([#16890](https://github.com/brave/brave-browser/issues/16890))
 - Fixed crash when reaching the end of Brave News feed. ([#25312](https://github.com/brave/brave-browser/issues/25312))
 - Fixed button text not visible while using dark mode. ([#25225](https://github.com/brave/brave-browser/issues/25225))
 - Upgraded Chromium to 105.0.5195.127. ([#25377](https://github.com/brave/brave-browser/issues/25377)) ([Changelog for 105.0.5195.127](https://chromium.googlesource.com/chromium/src/+log/105.0.5195.102..105.0.5195.127?pretty=fuller&n=1000))

## [1.43.90](https://github.com/brave/brave-browser/releases/tag/v1.43.90)

 - Fixed crash when disabling Brave Ads under brave://rewards. ([#25191](https://github.com/brave/brave-browser/issues/25191))
 - Upgraded Chromium to 105.0.5195.102. ([#25173](https://github.com/brave/brave-browser/issues/25173)) ([Changelog for 105.0.5195.102](https://chromium.googlesource.com/chromium/src/+log/105.0.5195.68..105.0.5195.102?pretty=fuller&n=1000))

## [1.43.88](https://github.com/brave/brave-browser/releases/tag/v1.43.88)

 - Added Brave Translate. ([#23770](https://github.com/brave/brave-browser/issues/23770))
 - Added dynamic Brave Ads payout status UI to Brave Rewards. ([#23429](https://github.com/brave/brave-browser/issues/23429))
 - [Security] Implemented feature policy for Ethereum and Solana for iframes. ([#23710](https://github.com/brave/brave-browser/issues/23710))
 - Updated several onboarding strings to improve the experience for users in India locales. ([#24111](https://github.com/brave/brave-browser/issues/24111))
 - Updated IPFS to use a longer delay between reconnection attempts. ([#24461](https://github.com/brave/brave-browser/issues/24461))
 - Fixed native token not being used when switching networks under both the "Send" and "Swap" panels in Brave Wallet. ([#22572](https://github.com/brave/brave-browser/issues/22572))
 - Fixed native token not being updated when network is changed under the "DApp" panel in Brave Wallet. ([#24078](https://github.com/brave/brave-browser/issues/24078))
 - Fixed incorrect image being used for the pending contribution message in Brave Rewards. ([#24006](https://github.com/brave/brave-browser/issues/24006))
 - Fixed Brave News settings bar being cut off when scrolling through the news feed under the New Tab Page. ([#21737](https://github.com/brave/brave-browser/issues/21737))
 - Fixed Brave News display issue when scrolling through the news feed after changing orientation while under the New Tab Page. ([#22439](https://github.com/brave/brave-browser/issues/22439))
 - Fixed scrolling issue when swiping through the news feed under the New Tab Page for Brave News. ([#22434](https://github.com/brave/brave-browser/issues/22434))
 - Fixed inconsistency between the "Sync Chain Code" and "Sync Chain QR Code" error messages in Brave Sync. ([#23948](https://github.com/brave/brave-browser/issues/23948))
 - Fixed "Show simplified view" being displayed in certain cases even though the setting has been disabled via the "Accessibility" settings. ([#14749](https://github.com/brave/brave-browser/issues/14749))
 - Fixed string alignment issue under the "Help make Brave better" onboarding panel at first launch. ([#24003](https://github.com/brave/brave-browser/issues/24003))
 - Upgraded Chromium to 105.0.5195.68. ([#25009](https://github.com/brave/brave-browser/issues/25009)) ([Changelog for 105.0.5195.68](https://chromium.googlesource.com/chromium/src/+log/104.0.5112.102..105.0.5195.68?pretty=fuller&n=1000))

## [1.42.97](https://github.com/brave/brave-browser/releases/tag/v1.42.97)

 - Added Solana support for account creation, sending SOL and sending SPL tokens with Brave Wallet. ([#24133](https://github.com/brave/brave-browser/issues/24133))
 - Improved fingerprint farbling for subresources. ([#24282](https://github.com/brave/brave-browser/issues/24282))
 - Updated tokens list for Aurora Chain in Brave Wallet. ([#24473](https://github.com/brave/brave-browser/issues/24473))
 - Fixed balance not being updated correctly when changing networks via Brave Wallet. ([#24272](https://github.com/brave/brave-browser/issues/24272))
 - Upgraded Chromium to 104.0.5112.102. ([#24713](https://github.com/brave/brave-browser/issues/24713)) ([Changelog for 104.0.5112.102](https://chromium.googlesource.com/chromium/src/+log/104.0.5112.81..104.0.5112.102?pretty=fuller&n=1000))

## [1.42.94](https://github.com/brave/brave-browser/releases/tag/v1.42.94)

 - Added Aurora EVM chain to preloaded chains for Brave Wallet. ([#23522](https://github.com/brave/brave-browser/issues/23522))
 - Added the ability to debounce URLs based on a regex applied to the path. ([#23121](https://github.com/brave/brave-browser/issues/23121))
 - Added pending request notification to Brave Wallet icon badge for Decrypt screen. ([#23613](https://github.com/brave/brave-browser/issues/23613))
 - Improved Brave Wallet UI on various screens to show the gradient color when selected. ([#23556](https://github.com/brave/brave-browser/issues/23556))
 - Improved fingerprint farbling in aggressive mode. ([#24126](https://github.com/brave/brave-browser/issues/24126))
 - Updated default search engine to Brave Search for new installations in certain regions. ([#23814](https://github.com/brave/brave-browser/issues/23814))
 - Removed known Marketo email tracking parameters from URLs. ([#9018](https://github.com/brave/brave-browser/issues/9018))
 - Removed P3A protobuf reporting. ([#23147](https://github.com/brave/brave-browser/issues/23147))
 - Fixed incorrect token being set as default when selecting Buy/Send from token details page in Brave Wallet. ([#22574](https://github.com/brave/brave-browser/issues/22574))
 - Fixed cosmetic filters not being applied inside of child frames. ([#22781](https://github.com/brave/brave-browser/issues/22781))
 - Fixed input field from being blocked by auto-complete suggestions on certain sites. ([#23487](https://github.com/brave/brave-browser/issues/23487))
 - Fixed Brave Wallet account address to be displayed in the same line when selected. ([#23558](https://github.com/brave/brave-browser/issues/23558))
 - Fixed Brave Wallet icon color to match based on site theme color. ([#23632](https://github.com/brave/brave-browser/issues/23632))
 - Fixed Brave Wallet interaction notification when tab focus is changed. ([#23745](https://github.com/brave/brave-browser/issues/23745))
 - Fixed incorrect balance being shown for certain tokens in Brave Wallet. ([#23998](https://github.com/brave/brave-browser/issues/23998))
 - Upgraded Chromium to 104.0.5112.81. ([#24364](https://github.com/brave/brave-browser/issues/24364)) ([Changelog for 104.0.5112.81](https://chromium.googlesource.com/chromium/src/+log/103.0.5060.134..104.0.5112.81?pretty=fuller&n=1000))

## [1.41.100](https://github.com/brave/brave-browser/releases/tag/v1.41.100)

 - Fixed crash which occurred when searching on certain sites due to debouncing. ([#24164](https://github.com/brave/brave-browser/issues/24164))

## [1.41.99](https://github.com/brave/brave-browser/releases/tag/v1.41.99)

 - Fixed error page being shown when debouncing in certain cases. ([#24080](https://github.com/brave/brave-browser/issues/24080))
 - Upgraded Chromium to 103.0.5060.134. ([#24122](https://github.com/brave/brave-browser/issues/24122)) ([Changelog for 103.0.5060.134](https://chromium.googlesource.com/chromium/src/+log/103.0.5060.114..103.0.5060.134?pretty=fuller&n=1000))

## [1.41.96](https://github.com/brave/brave-browser/releases/tag/v1.41.96)

 - Implemented time-limited sync code words. ([#22242](https://github.com/brave/brave-browser/issues/22242))
 - Added host related information including the ability to disconnect from Brave VPN via the persistent notification. ([#21997](https://github.com/brave/brave-browser/issues/21997))
 - Added DApp decrypt request screen. ([#23260](https://github.com/brave/brave-browser/issues/23260))
 - Improved privacy by preventing pages from passing identifiers through "window.name". ([#5910](https://github.com/brave/brave-browser/issues/5910))
 - Updated the onboarding welcome screens. ([#22946](https://github.com/brave/brave-browser/issues/22946))
 - Updated the brand logo for Ecosia throughout Brave. ([#23405](https://github.com/brave/brave-browser/issues/23405))
 - Removed "Desktop Mode" from "Site Settings" as it's a duplicate of "Desktop site". ([#23652](https://github.com/brave/brave-browser/issues/23652))
 - Fixed not being able to send Non-Fungible Token (ERC721) tokens. ([#23508](https://github.com/brave/brave-browser/issues/23508))
 - Fixed Swap "To" token value from resetting to 0 when Swap "From" token is changed ([#23631](https://github.com/brave/brave-browser/issues/23631))
 - Fixed crash when adding Harmony network into Brave Wallet when the locale is set to Hindi. ([#23775](https://github.com/brave/brave-browser/issues/23775))
 - Fixed blogspot.com URLs not being debounced. ([#22894](https://github.com/brave/brave-browser/issues/22894))

## [1.40.113](https://github.com/brave/brave-browser/releases/tag/v1.40.113)

 - Upgraded Chromium to 103.0.5060.114. ([#23860](https://github.com/brave/brave-browser/issues/23860)) ([Changelog for 103.0.5060.114](https://chromium.googlesource.com/chromium/src/+log/103.0.5060.66..103.0.5060.114?pretty=fuller&n=1000))

## [1.40.111](https://github.com/brave/brave-browser/releases/tag/v1.40.111)

 - Upgraded Chromium to 103.0.5060.70. ([#23779](https://github.com/brave/brave-browser/issues/23779)) ([Changelog for 103.0.5060.70](https://chromium.googlesource.com/chromium/src/+log/103.0.5060.53..103.0.5060.70?pretty=fuller&n=1000))

## [1.40.106](https://github.com/brave/brave-browser/releases/tag/v1.40.106)

 - Fixed browser crash when app is brought into view from background with a pending action in Brave Wallet panel while notification badge is shown. ([#23604](https://github.com/brave/brave-browser/issues/23604))

## [1.40.105](https://github.com/brave/brave-browser/releases/tag/v1.40.105)

 - Added Dapps support for Brave Wallet. ([#23159](https://github.com/brave/brave-browser/issues/23159))
 - Added support to list Non-Fungible Token (ERC721) in Brave Wallet. ([#19565](https://github.com/brave/brave-browser/issues/19565))
 - Added pre-loaded EVMs into Brave Wallet network selector (supported by 0x). ([#22888](https://github.com/brave/brave-browser/issues/22888))
 - Added ability to remove "Top Tiles" from the New Tab Page via the "New Tab Page" settings. ([#23118](https://github.com/brave/brave-browser/issues/23118))
 - Retired the option of using DNS over HTTPS for Unstoppable Domains resolution now that layer 2 support has been added. ([#22149](https://github.com/brave/brave-browser/issues/22149))
 - Changed Ethereum Dapp provider to only be available in secure contexts. ([#23407](https://github.com/brave/brave-browser/issues/23407))
 - Changed Unstoppable Domains user opt-in interstitial from Cloudflare DoH to Ethereum option. ([#22148](https://github.com/brave/brave-browser/issues/22148))
 - Removed "Beta" from Brave Wallet via the settings menu. ([#23238](https://github.com/brave/brave-browser/issues/23238))
 - Updated QR sync code generator to include Brave icon when creating new QR sync codes. ([#22420](https://github.com/brave/brave-browser/issues/22420)) 
 - Fixed Ethereum Dapps dialog being opened in inactive tabs. ([#23460](https://github.com/brave/brave-browser/issues/23460))
 - Fixed selected network being used when resolving Unstoppable Domains/Ethereum Name Service to ETH address. ([#22151](https://github.com/brave/brave-browser/issues/22151))
 - Fixed crash when selecting "VPN Support" under the "Brave Firewall + VPN" settings in certain cases. ([#23492](https://github.com/brave/brave-browser/issues/23492))
 - Fixed not being able to copy sync code from existing sync chain in certain cases. ([#23206](https://github.com/brave/brave-browser/issues/23206))
 - Fixed issue where setting Brave as the default browser using the onboarding screen didn't work in certain cases. ([#22766](https://github.com/brave/brave-browser/issues/22766))
 - Upgraded Chromium to 103.0.5060.53. ([#23482](https://github.com/brave/brave-browser/issues/23482)) ([Changelog for 103.0.5060.53](https://chromium.googlesource.com/chromium/src/+log/102.0.5005.115..103.0.5060.53?pretty=fuller&n=1000))

## [1.39.123](https://github.com/brave/brave-browser/releases/tag/v1.39.123)

 - Fixed certain cases where AMP pages would get into a redirect loop. ([#23320](https://github.com/brave/brave-browser/issues/23320))
 - Upgraded Chromium to 102.0.5005.125. ([#23444](https://github.com/brave/brave-browser/issues/23444)) ([Changelog for 102.0.5005.125](https://chromium.googlesource.com/chromium/src/+log/102.0.5005.99..102.0.5005.125?pretty=fuller&n=1000))

## [1.39.120](https://github.com/brave/brave-browser/releases/tag/v1.39.120)

 - Changed position of VPN toggle under settings menu. ([#23240](https://github.com/brave/brave-browser/issues/23240))
 - Fixed browser crash when device attempts connecting to Google Play Store after losing network connectivity in certain cases. ([#23177](https://github.com/brave/brave-browser/issues/23177))
 - Fixed subscription status under Brave Firewall + VPN settings not specifying if it's a trial, monthly or yearly subscription. ([#23004](https://github.com/brave/brave-browser/issues/23004))
 - Fixed errors during sync decryption which caused Brave Sync to fail in certain cases. ([#22898](https://github.com/brave/brave-browser/issues/22898))
 - Fixed certain cases where AMP pages would go into loading loop. ([#22610](https://github.com/brave/brave-browser/issues/22610))
 - Upgraded Chromium to 102.0.5005.99. ([#23311](https://github.com/brave/brave-browser/issues/23311)) ([Changelog for 102.0.5005.99](https://chromium.googlesource.com/chromium/src/+log/102.0.5005.78..102.0.5005.99?pretty=fuller&n=1000))

## [1.39.115](https://github.com/brave/brave-browser/releases/tag/v1.39.115)

 - Disabled Brave Firewall + VPN on both Android 6 and Android 7 due to several crashes. ([#23063](https://github.com/brave/brave-browser/issues/23063)) & ([#23089](https://github.com/brave/brave-browser/issues/23089))
 - Fixed cookies being cleared/removed when upgrading from Chromium 101 to Chromium 102. ([#23109](https://github.com/brave/brave-browser/issues/23109))
 - Upgraded Chromium to 102.0.5005.78. ([#23131](https://github.com/brave/brave-browser/issues/23131)) ([Changelog for 102.0.5005.78](https://chromium.googlesource.com/chromium/src/+log/102.0.5005.61..102.0.5005.78?pretty=fuller&n=1000))

## [1.39.111](https://github.com/brave/brave-browser/releases/tag/v1.39.111)

 - Added Brave Firewall + VPN. ([#12197](https://github.com/brave/brave-browser/issues/12197))
 - Added support for blob partitioning. ([#21746](https://github.com/brave/brave-browser/issues/21746))
 - Implemented eth_getEncryptionPublicKey for Brave Wallet. ([#19276](https://github.com/brave/brave-browser/issues/19276))
 - Reduced adblock filter memory usage by optimizing unused regex rules. ([#21970](https://github.com/brave/brave-browser/issues/21970))
 - Removed known Dialog Insight user tracking parameters from URLs. ([#22082](https://github.com/brave/brave-browser/issues/22082))
 - Fixed breakage in webpack build caused by OpenSSL 3.0. ([#22305](https://github.com/brave/brave-browser/issues/22305))
 - Fixed pending bell icon under Brave Wallet not being displayed when new unapproved requests are created. ([#21654](https://github.com/brave/brave-browser/issues/21654))
 - Fixed expand icon under Brave Shields using incorrect color when the Privacy Hub has been enabled. ([#22049](https://github.com/brave/brave-browser/issues/22049))
 - Upgraded Chromium to 102.0.5005.61. ([#22923](https://github.com/brave/brave-browser/issues/22923)) ([Changelog for 102.0.5005.61](https://chromium.googlesource.com/chromium/src/+log/101.0.4951.67..102.0.5005.61?pretty=fuller&n=1000))

## [1.38.119](https://github.com/brave/brave-browser/releases/tag/v1.38.119)

 - Added Brave News opt-in card via the New Tab Page. ([#22778](https://github.com/brave/brave-browser/issues/22778))
 - Reimplemented the ability to override page elements with "!important" styles using cosmetic filtering. ([#22264](https://github.com/brave/brave-browser/issues/22264))
 - Refactored gas fee estimations to help increase successful transactions for Brave Wallet. ([#22640](https://github.com/brave/brave-browser/issues/22640))
 - Fixed Brave Wallet disambiguation between Thor on Avalanche vs Thorswap on Ethereum. ([#22651](https://github.com/brave/brave-browser/issues/22651))
 - Fixed selected custom networks not being displayed within the Brave Wallet portfolio page when selected via the dropdown menu. ([#22425](https://github.com/brave/brave-browser/issues/22425))
 - Fixed incorrect starting position being used when opening a new tab within another New Tab Page while Brave News is enabled. ([#22549](https://github.com/brave/brave-browser/issues/22549))
 - Fixed crash when changing device orientation and scrolling through the New Tab Page after upgrade in certain cases. ([#22777](https://github.com/brave/brave-browser/issues/22777))
 - Fixed Brave News feed reappearing via the New Tab Page after being disabled when changing the device orientation. ([#22444](https://github.com/brave/brave-browser/issues/22444))
 - Fixed Brave News position not being retained when switching between different tabs. ([#22356](https://github.com/brave/brave-browser/issues/22356))
 - Fixed tapping on "Load new content" takes user to the second card within the news feed rather than at the beginning of feed. ([#22183](https://github.com/brave/brave-browser/issues/22183))
 - Upgraded Chromium to 101.0.4951.67. ([#22896](https://github.com/brave/brave-browser/issues/22896)) ([Changelog for 101.0.4951.67](https://chromium.googlesource.com/chromium/src/+log/101.0.4951.61..101.0.4951.67?pretty=fuller&n=1000))

## [1.38.113](https://github.com/brave/brave-browser/releases/tag/v1.38.113)

 - Upgraded Chromium to 101.0.4951.61. ([#22760](https://github.com/brave/brave-browser/issues/22760)) ([Changelog for 101.0.4951.61](https://chromium.googlesource.com/chromium/src/+log/101.0.4951.41..101.0.4951.61?pretty=fuller&n=1000))

## [1.38.109](https://github.com/brave/brave-browser/releases/tag/v1.38.109)

 - Added Gemini two-way Brave Rewards wallet. ([#17408](https://github.com/brave/brave-browser/issues/17408))
 - Added the ability to redirect an AMP page to its canonical non-AMP version. ([#21643](https://github.com/brave/brave-browser/issues/21643))
 - Added the ability to customize the nonce for unapproved Brave Wallet transactions via the transactions confirmation screen. ([#21459](https://github.com/brave/brave-browser/issues/21459))
 - Added "Clear wallet transaction and nonce information" setting for Brave Wallet under "Settings". ([#21457](https://github.com/brave/brave-browser/issues/21457))
 - Added notification for Brave Wallet pending transactions. ([#19837](https://github.com/brave/brave-browser/issues/19837))
 - Added "Show all pending contributions" view into Brave Wallet. ([#17038](https://github.com/brave/brave-browser/issues/17038))
 - Updated the Brave Wallet network selector screen. ([#20471](https://github.com/brave/brave-browser/issues/20471))
 - Updated adblocking to execute all cosmetic scriptlets even if one fails. ([#21932](https://github.com/brave/brave-browser/issues/21932))
 - Renamed "Monthly Contributions" to "Monthly Tips" for Brave Rewards. ([#20564](https://github.com/brave/brave-browser/issues/20564))
 - Removed referral code from P3A reports. ([#21460](https://github.com/brave/brave-browser/issues/21460))
 - Fixed crash when opening the swap page under Brave Wallet for custom watchlist assets. ([#22164](https://github.com/brave/brave-browser/issues/22164))
 - Fixed users swap values automatically being changed due to the market price constantly being updated in Brave Wallet. ([#22308](https://github.com/brave/brave-browser/issues/22308))
 - Fixed both "Approve" and "Reject" buttons overlapping the details section when initiating swaps. ([#21605](https://github.com/brave/brave-browser/issues/21605))
 - Fixed "Approve/Reject" dialog not being displayed for unapproved Brave Wallet transactions via "Asset Details". ([#21458](https://github.com/brave/brave-browser/issues/21458))
 - Fixed switching networks in Brave Wallet via the "Send" screen not resetting input values. ([#21136](https://github.com/brave/brave-browser/issues/21136))
 - Fixed unblocked cookie consent dialogs on some websites when the brave://flags/#brave-adblock-cookie-list-default is enabled. ([#22032](https://github.com/brave/brave-browser/issues/22032))
 - Upgraded Chromium to 101.0.4951.41. ([#22431](https://github.com/brave/brave-browser/issues/22431)) ([Changelog for 101.0.4951.41](https://chromium.googlesource.com/chromium/src/+log/100.0.4896.127..101.0.4951.41?pretty=fuller&n=1000))

## [1.37.116](https://github.com/brave/brave-browser/releases/tag/v1.37.116)

 - Improved general performance by fixing cosmetic filters. ([#22030](https://github.com/brave/brave-browser/issues/22030))
 - Added "Enable Tab Group auto creation" setting under "Appearance" which controls the ability to open links in separate tabs. ([#22105](https://github.com/brave/brave-browser/issues/22105))
 - Fixed rounding issues under Brave Wallet via the "Send" and "Swap" panels by increasing the digits after the decimal to 0.00000000 (8 digits) from 0.000000 (6 digits). ([#22257](https://github.com/brave/brave-browser/issues/22257))
 - Fixed crash when attempting to send opened tab to another devices on sync chain using "Send to your devices". ([#22128](https://github.com/brave/brave-browser/issues/22128))
 - Upgraded Chromium to 100.0.4896.127. ([#22318](https://github.com/brave/brave-browser/issues/22318)) ([Changelog for 100.0.4896.127](https://chromium.googlesource.com/chromium/src/+log/100.0.4896.88..100.0.4896.127?pretty=fuller&n=1000))

## [1.37.113](https://github.com/brave/brave-browser/releases/tag/v1.37.113)

 - Upgraded Chromium to 100.0.4896.88. ([#22221](https://github.com/brave/brave-browser/issues/22221)) ([Changelog for 100.0.4896.88](https://chromium.googlesource.com/chromium/src/+log/100.0.4896.79..100.0.4896.88?pretty=fuller&n=1000))

## [1.37.112](https://github.com/brave/brave-browser/releases/tag/v1.37.112)

 - Fixed crash when enabling or disabling P3A in certain cases. ([#22037](https://github.com/brave/brave-browser/issues/22037))
 - Upgraded Chromium to 100.0.4896.79. ([#22077](https://github.com/brave/brave-browser/issues/22077)) ([Changelog for 100.0.4896.79](https://chromium.googlesource.com/chromium/src/+log/100.0.4896.60..100.0.4896.79?pretty=fuller&n=1000))

## [1.37.111](https://github.com/brave/brave-browser/releases/tag/v1.37.111)

 - Upgraded Chromium to 100.0.4896.79. ([#22077](https://github.com/brave/brave-browser/issues/22077)) ([Changelog for 100.0.4896.79](https://chromium.googlesource.com/chromium/src/+log/100.0.4896.60..100.0.4896.79?pretty=fuller&n=1000))

## [1.37.110](https://github.com/brave/brave-browser/releases/tag/v1.37.110)

 - Fixed crash when enabling or disabling P3A in certain cases. ([#22037](https://github.com/brave/brave-browser/issues/22037))

## [1.37.109](https://github.com/brave/brave-browser/releases/tag/v1.37.109)

 - Added fee oracle for EIP-1559 to estimate priority fees in Brave Wallet. ([#20469](https://github.com/brave/brave-browser/issues/20469))
 - Added ability to to override page elements with "!important" styles using cosmetic filtering. ([#20177](https://github.com/brave/brave-browser/issues/20177))
 - Improved selection of RPC URLs after input from chainlist.org with variables and wss:// (Affects Arbitrum). ([#20958](https://github.com/brave/brave-browser/issues/20958))
 - Improved adblocking by applying generic cosmetic filters from brave://adblock into "Standard" shields blocking mode. ([#20855](https://github.com/brave/brave-browser/issues/20855))
 - Removed references of "Brave DEX Aggregator" from Brave Wallet. ([#20463](https://github.com/brave/brave-browser/issues/20463))
 - Fixed transaction status not being updated in certain cases for pending transactions in Brave Wallet. ([#21300](https://github.com/brave/brave-browser/issues/21300))
 - Fixed biometric still enabled after Brave Wallet has been reset via brave://settings/wallet. ([#20444](https://github.com/brave/brave-browser/issues/20444))
 - Fixed new Brave Wallet transactions not being added into the "Buy", "Send" and "Swap" panels. ([#20677](https://github.com/brave/brave-browser/issues/20677))
 - Fixed switching to "Private" mode opened a "Standard" tab in certain cases. [#21877](https://github.com/brave/brave-browser/issues/21877))
 - Fixed desktop mode not working in certain cases. ([#20936](https://github.com/brave/brave-browser/issues/20936))
 - Fixed New Tab Page Sponsored Image text being cut off at the bottom on certain devices with smaller screen size. ([#21736](https://github.com/brave/brave-browser/issues/21736))
 - Upgraded Chromium to 100.0.4896.60. ([#21953](https://github.com/brave/brave-browser/issues/21953)) ([Changelog for 100.0.4896.60](https://chromium.googlesource.com/chromium/src/+log/99.0.4844.88..100.0.4896.60?pretty=fuller&n=1000))

## [1.36.122](https://github.com/brave/brave-browser/releases/tag/v1.36.122)

 - Upgraded Chromium to 99.0.4844.88. ([#21889](https://github.com/brave/brave-browser/issues/21889)) ([Changelog for 99.0.4844.88](https://chromium.googlesource.com/chromium/src/+log/99.0.4844.83..99.0.4844.88?pretty=fuller&n=1000))

## [1.36.116](https://github.com/brave/brave-browser/releases/tag/v1.36.116)

 - Fixed Brave News onboarding card still appearing under New Tab Page in certain cases when Brave News has already been enabled via settings. ([#21493](https://github.com/brave/brave-browser/issues/21493))
 - Upgraded Chromium to 99.0.4844.74. ([#21693](https://github.com/brave/brave-browser/issues/21693)) ([Changelog for 99.0.4844.74](https://chromium.googlesource.com/chromium/src/+log/99.0.4844.51..99.0.4844.74?pretty=fuller&n=1000))

## [1.36.112](https://github.com/brave/brave-browser/releases/tag/v1.36.112)

 - Fixed crash due to autocomplete in certain cases. ([#21558](https://github.com/brave/brave-browser/issues/21558))

## [1.36.111](https://github.com/brave/brave-browser/releases/tag/v1.36.111)

 - Added EVM support for compatible chains under Brave Wallet. ([#20337](https://github.com/brave/brave-browser/issues/20337))
 - Added ability to restore Brave Crypto wallets within Brave Wallet using legacy 24-word mnemonic. ([#18459](https://github.com/brave/brave-browser/issues/18459))
 - Added WebSockets connection pool limit when shields are enabled. ([#19990](https://github.com/brave/brave-browser/issues/19990))
 - Added ability to completely disable autocomplete under "Brave Shields and privacy" settings. ([#19647](https://github.com/brave/brave-browser/issues/19647))
 - Added EIP-55 checksum address checks in the send widget. ([#20132](https://github.com/brave/brave-browser/issues/20132))
 - Added ability to enable Brave News via settings. ([#21477](https://github.com/brave/brave-browser/issues/21477))
 - Added ability to scroll through websites within tab groups using swipe gestures. ([#19902](https://github.com/brave/brave-browser/issues/19902))
 - Updated P3A pings to use JSON format. ([#15967](https://github.com/brave/brave-browser/issues/15967))
 - Updated setting name and description for "Automatically send diagnostic reports" under brave://settings/privacy for clarity. ([#19822](https://github.com/brave/brave-browser/issues/19822))
 - Removed the tab stack layout in favor of tab overview mode. ([#21005](https://github.com/brave/brave-browser/issues/21005))
 - Fixed crash during onboarding when creating a Brave Wallet on certain devices that have biometric unlock enabled. ([#21153](https://github.com/brave/brave-browser/issues/21153))
 - Fixed biometric unlock only being displayed when initially launching Brave Wallet. ([#19973](https://github.com/brave/brave-browser/issues/19973))
 - Fixed biometric unlock not being displayed when auto-lock is triggered within Brave Wallet. ([#20036](https://github.com/brave/brave-browser/issues/20036))
 - Fixed custom network being removed when editing ChainID while custom network not set as default. ([#21046](https://github.com/brave/brave-browser/issues/21046))
 - Fixed selecting unapproved transactions not displaying the approval screen. ([#19969](https://github.com/brave/brave-browser/issues/19969))
 - Fixed both "Buy" and "Swap" screens not being closed when an unsupported network is selected. ([#20977](https://github.com/brave/brave-browser/issues/20977))
 - Fixed being able to select the same token under both the "From" and "To" fields when using Swaps via Brave Wallet. ([#20005](https://github.com/brave/brave-browser/issues/20005))
 - Fixed incorrect asset icons being used in certain cases for Brave Wallet. ([#20649](https://github.com/brave/brave-browser/issues/20649))
 - Fixed verify recovery phrase page being displayed when backup wallet is selected after resetting Brave Wallet. ([#20532](https://github.com/brave/brave-browser/issues/20532))
 - Fixed cursor being reset to beginning of recovery phrase when "Show recovery" is selected. ([#20465](https://github.com/brave/brave-browser/issues/20465))
 - Fixed several theme issues with Brave Wallet. ([#19827](https://github.com/brave/brave-browser/issues/19827))
 - Fixed both "Submit" and "Add" buttons being cutoff when adding custom networks via Brave Wallet. ([#20962](https://github.com/brave/brave-browser/issues/20962))
 - Upgraded Chromium to 99.0.4844.51. ([#21370](https://github.com/brave/brave-browser/issues/21370)) ([Changelog for 99.0.4844.51](https://chromium.googlesource.com/chromium/src/+log/98.0.4758.109..99.0.4844.51?pretty=fuller&n=1000))

## [1.35.103](https://github.com/brave/brave-browser/releases/tag/v1.35.103)

 - Added bitFlyer notification for Japan region only to let users know bitFlyer is available as a custodian. ([#20725](https://github.com/brave/brave-browser/issues/20725))
 - Fixed crash when attempting to send opened tab to another devices on sync chain using "Send to your devices". ([#21035](https://github.com/brave/brave-browser/issues/21035))
 - Upgraded Chromium to 98.0.4758.102. ([#21093](https://github.com/brave/brave-browser/issues/21093)) ([Changelog for 98.0.4758.102](https://chromium.googlesource.com/chromium/src/+log/98.0.4758.87..98.0.4758.102?pretty=fuller&n=1000))

## [1.35.101](https://github.com/brave/brave-browser/releases/tag/v1.35.101)

 - Fixed issues with "Desktop mode" which prevented users from being able to view websites in desktop mode. ([#20963](https://github.com/brave/brave-browser/issues/20963))
 - Fixed phone model being leaked via "navigator.userAgent". ([#20499](https://github.com/brave/brave-browser/issues/20499))
 - Fixed crash when adding large values into swap input field via Brave Wallet. ([#20881](https://github.com/brave/brave-browser/issues/20881))

## [1.35.100](https://github.com/brave/brave-browser/releases/tag/v1.35.100)

 - Added bitFlyer two-way Brave Rewards wallet for Japan region. ([#18439](https://github.com/brave/brave-browser/issues/18439))
 - Added "Brave" into the web search context menu when opening links in other browsers. ([#19842](https://github.com/brave/brave-browser/issues/19842))
 - Added notification for Uphold verified users when Customer Due Diligence survey needs to be completed. ([#20497](https://github.com/brave/brave-browser/issues/20497))
 - Added "wallet_requestPermissions" and "wallet_getPermissions" for compatibility with https://market.x.immutable.com and others. ([#19274](https://github.com/brave/brave-browser/issues/19274))
 - Added support for "wallet_watchAsset" method to add suggested tokens. ([#17878](https://github.com/brave/brave-browser/issues/17878))
 - Added EIP-55 checksum address checks in the send widget. ([#19532](https://github.com/brave/brave-browser/issues/19532))
 - Updated rewards panel design. ([#18471](https://github.com/brave/brave-browser/issues/18471))
 - Reduced BAT threshold before being able to verify Uphold two-way user wallet from 15 to 2 BAT. ([#19912](https://github.com/brave/brave-browser/issues/19912))
 - Removed known user tracking parameters "igshid" from certain URLs. ([#11580](https://github.com/brave/brave-browser/issues/11580))
 - Removed "navigator.connection". ([#20122](https://github.com/brave/brave-browser/issues/20122))
 - Fixed last connected account being selected when multiple accounts are provided for OpenSea. ([#19750](https://github.com/brave/brave-browser/issues/19750))
 - Fixed typed data signing issues with https://looksrare.org. ([#20541](https://github.com/brave/brave-browser/issues/20541))
 - Fixed backup wallet message being displayed when restoring wallet account from seed phrase. ([#19966](https://github.com/brave/brave-browser/issues/19966))
 - Fixed "My First Ad" notification not opening the correct website after rewards has been enabled. ([#19856](https://github.com/brave/brave-browser/issues/19856))
 - Fixed "Brave Wallet" icon under "Settings" being a lot larger than other icons. ([#20034](https://github.com/brave/brave-browser/issues/20034))
 - Upgraded Chromium to 98.0.4758.87. ([#20814](https://github.com/brave/brave-browser/issues/20814)) ([Changelog for 98.0.4758.87](https://chromium.googlesource.com/chromium/src/+log/97.0.4692.99..98.0.4758.87?pretty=fuller&n=1000))

## [1.34.81](https://github.com/brave/brave-browser/releases/tag/v1.34.81)

 - Upgraded Chromium to 97.0.4692.99. ([#20553](https://github.com/brave/brave-browser/issues/20553)) ([Changelog for 97.0.4692.99](https://chromium.googlesource.com/chromium/src/+log/97.0.4692.71..97.0.4692.99?pretty=fuller&n=1000))

## [1.34.80](https://github.com/brave/brave-browser/releases/tag/v1.34.80)

 - Added several new notifications to help onboard users and explain various features. ([#19888](https://github.com/brave/brave-browser/issues/19888))
 - Updated the default widget list under New Tab Page. ([#19888](https://github.com/brave/brave-browser/issues/19888))
 - Fixed autofill suggestions covering the URL bar in certain cases. ([#19575](https://github.com/brave/brave-browser/issues/19575))
 - Fixed "Backup your wallet" error message not being clickable. ([#18945](https://github.com/brave/brave-browser/issues/18945))
 - Upgraded Chromium to 97.0.4692.71. ([#20269](https://github.com/brave/brave-browser/issues/20269)) ([Changelog for 97.0.4692.71](https://chromium.googlesource.com/chromium/src/+log/96.0.4664.110..97.0.4692.71?pretty=fuller&n=1000))

## [1.33.106](https://github.com/brave/brave-browser/releases/tag/v1.33.106)

 - Added first steps of Brave Wallet (Dapps and EVM support in future releases). ([#19702](https://github.com/brave/brave-browser/issues/19702))
 - Implemented time-limited sync QR codes. ([#19550](https://github.com/brave/brave-browser/issues/19550))
 - Removed known user tracking parameters "wbraid" and "gbraid" from certain URLs. ([#18758](https://github.com/brave/brave-browser/issues/18758))
 - Upgraded Chromium to 96.0.4664.110. ([#20077](https://github.com/brave/brave-browser/issues/20077)) ([Changelog for 96.0.4664.110](https://chromium.googlesource.com/chromium/src/+log/96.0.4664.93..96.0.4664.110?pretty=fuller&n=1000))

## [1.32.115](https://github.com/brave/brave-browser/releases/tag/v1.32.115)

 - Fixed search engines not being added into Open Search. ([#19737](https://github.com/brave/brave-browser/issues/19737))
 - Upgraded Chromium to 96.0.4664.93. ([#19950](https://github.com/brave/brave-browser/issues/19950)) ([Changelog for 96.0.4664.93](https://chromium.googlesource.com/chromium/src/+log/96.0.4664.45..96.0.4664.93?pretty=fuller&n=1000))

## [1.32.112](https://github.com/brave/brave-browser/releases/tag/v1.32.112)

 - Re-enable P3A uploads if enabled by user. ([#19302](https://github.com/brave/brave-browser/issues/19302))
 - Fixed P3A being automatically enabled if disabled after upgrading in certain cases. ([#19324](https://github.com/brave/brave-browser/issues/19324))

## [1.32.106](https://github.com/brave/brave-browser/releases/tag/v1.32.106)

 - Updated autoplay to behave the same as desktop (desktop parity). ([#14142](https://github.com/brave/brave-browser/issues/14142))
 - Fixed not being able to scan sync QR code during initial setup if QR code modal was dismissed. ([#19389](https://github.com/brave/brave-browser/issues/19389))
 - Fixed sync warning modal that appears before joining sync chain not being dismissed when screen timeout is reached. ([#19483](https://github.com/brave/brave-browser/issues/19483))
 - Removed mention of "Incognito" from the "Cookie" section under "Site Settings". ([#12514](https://github.com/brave/brave-browser/issues/12514))
 - Upgraded Chromium to 96.0.4664.45. ([#19387](https://github.com/brave/brave-browser/issues/19387)) ([Changelog for 96.0.4664.45](https://chromium.googlesource.com/chromium/src/+log/95.0.4638.69..96.0.4664.45?pretty=fuller&n=1000))

## [1.31.91](https://github.com/brave/brave-browser/releases/tag/v1.31.91)

 - [Security] Clarified sync setup instructions. ([#19233](https://github.com/brave/brave-browser/issues/19233))
 - Disabled P3A temporarily due to possible instability issues and crashes in certain cases. ([#19280](https://github.com/brave/brave-browser/issues/19280))
 - Fixed inability to leave sync chain in certain cases. ([#19199](https://github.com/brave/brave-browser/issues/19199))

## [1.31.90](https://github.com/brave/brave-browser/releases/tag/v1.31.90)

 - Fixed crash when tapping on "private product analytics" under the "Welcome to Brave Browser" on-boarding screen in certain cases. ([#19135](https://github.com/brave/brave-browser/issues/19135))
 - Fixed crash when the initial "Brave Rewards" notification is displayed after enabling rewards for the first time in certain cases on Android 12 devices. ([#19149](https://github.com/brave/brave-browser/issues/19149))
 - Fixed Brave freezing and crashing in certain cases. ([#19144](https://github.com/brave/brave-browser/issues/19144))

## [1.31.88](https://github.com/brave/brave-browser/releases/tag/v1.31.88)

 - Fixed startup crash on devices running Android 12. ([#18667](https://github.com/brave/brave-browser/issues/18667))
 - Fixed startup crash when launching Brave for the first time without a network connection. ([#18825](https://github.com/brave/brave-browser/issues/18825))
 - Fixed crash when tapping on "Continue" under the "Welcome to Brave Browser" on-boarding screen in certain cases. ([#18776](https://github.com/brave/brave-browser/issues/18776))
 - Fixed incorrect search engine being set for both "Standard" and "Private" tab after making a selection under the search on-boarding screen. ([#18777](https://github.com/brave/brave-browser/issues/18777))
 - Upgraded Chromium to 95.0.4638.69. ([#19083](https://github.com/brave/brave-browser/issues/19083)) ([Changelog for 95.0.4638.69](https://chromium.googlesource.com/chromium/src/+log/95.0.4638.54..95.0.4638.69?pretty=fuller&n=1000))

## [1.31.87](https://github.com/brave/brave-browser/releases/tag/v1.31.87)

 - Added support for custom filter lists in shields via brave://adblock. ([#8107](https://github.com/brave/brave-browser/issues/8107))
 - Added support to retrieve New Tab Page background images via CRX which reduces the size of the initial app. ([#17328](https://github.com/brave/brave-browser/issues/17328))
 - Added ability to disable Chrome Sharing Hub from the share sheet via "Appearance" settings. ([#17548](https://github.com/brave/brave-browser/issues/17548))
 - Added support for Android crash reports to be uploaded to https://backtrace.io. ([#17563](https://github.com/brave/brave-browser/issues/17563))
 - Updated default search engine to Brave Search for new installations in certain regions. ([#18452](https://github.com/brave/brave-browser/issues/18452))
 - Updated website that opens in a new tab when Brave Search is selected as the default. ([#18324](https://github.com/brave/brave-browser/issues/18324))
 - Removed "Brave" from User Agent when visiting DuckDuckGo. ([#15156](https://github.com/brave/brave-browser/issues/15156))
 - Removed Uphold "x-client-partner" header. ([#18015](https://github.com/brave/brave-browser/issues/18015))
 - Removed "IdleDetection" from brave://settings/content. ([#18409](https://github.com/brave/brave-browser/issues/18409))
 - Removed known user tracking parameter "twclid" from Twitter query strings. ([#18020](https://github.com/brave/brave-browser/issues/18020))
 - Fixed "Incognito" being used instead of "Private" under "Search" settings on non-en-US locales. ([#10105](https://github.com/brave/brave-browser/issues/10105))
 - Upgraded Chromium to 95.0.4638.54. ([#18840](https://github.com/brave/brave-browser/issues/18840)) ([Changelog for 95.0.4638.54](https://chromium.googlesource.com/chromium/src/+log/94.0.4606.81..95.0.4638.54?pretty=fuller&n=1000))

## [1.30.89](https://github.com/brave/brave-browser/releases/tag/v1.30.89)

 - Upgraded Chromium to 94.0.4606.81. ([#18620](https://github.com/brave/brave-browser/issues/18620)) ([Changelog for 94.0.4606.81](https://chromium.googlesource.com/chromium/src/+log/94.0.4606.71..94.0.4606.81?pretty=fuller&n=1000))

## [1.30.87](https://github.com/brave/brave-browser/releases/tag/v1.30.87)

 - Upgraded Chromium to 94.0.4606.71. ([#18477](https://github.com/brave/brave-browser/issues/18477)) ([Changelog for 94.0.4606.71](https://chromium.googlesource.com/chromium/src/+log/94.0.4606.61..94.0.4606.71?pretty=fuller&n=1000))

## [1.30.86](https://github.com/brave/brave-browser/releases/tag/v1.30.86)

 - Added setting to "Automatically send daily usage ping to Brave" under brave://settings/privacy. ([#16583](https://github.com/brave/brave-browser/issues/16583))
 - Removed known user tracking parameters from URLs. ([#17507](https://github.com/brave/brave-browser/issues/17507), [#17452](https://github.com/brave/brave-browser/issues/17452), [#17451](https://github.com/brave/brave-browser/issues/17451))
 - Upgraded Chromium to 94.0.4606.61. ([#18333](https://github.com/brave/brave-browser/issues/18333)) ([Changelog for 94.0.4606.61](https://chromium.googlesource.com/chromium/src/+log/93.0.4577.82..94.0.4606.61?pretty=fuller&n=1000))

## [1.29.81](https://github.com/brave/brave-browser/releases/tag/v1.29.81)

 - Upgraded Chromium to 93.0.4577.82. ([#18066](https://github.com/brave/brave-browser/issues/18066)) ([Changelog for 93.0.4577.82](https://chromium.googlesource.com/chromium/src/+log/93.0.4577.63..93.0.4577.82?pretty=fuller&n=10000))

## [1.29.79](https://github.com/brave/brave-browser/releases/tag/v1.29.79)

 - Fixed issue where site settings were not being retained in certain cases. ([#17859](https://github.com/brave/brave-browser/issues/17859))

## [1.29.78](https://github.com/brave/brave-browser/releases/tag/v1.29.78)

 - Fixed Brave crash when launching Twitter App on tablets running Android 5. ([#17735](https://github.com/brave/brave-browser/issues/17735))
 - Fixed browser crash when closing private tabs after interacting with shields on private tab. ([#17657](https://github.com/brave/brave-browser/issues/17657))
 - Upgraded Chromium to 93.0.4577.63. ([#17790](https://github.com/brave/brave-browser/issues/17790)) ([Changelog for 93.0.4577.63](https://chromium.googlesource.com/chromium/src/+log/93.0.4577.58..93.0.4577.63?pretty=fuller&n=1000))

## [1.29.76](https://github.com/brave/brave-browser/releases/tag/v1.29.76)

 - Added ephemeral support to "BroadcastChannel". ([#17220](https://github.com/brave/brave-browser/issues/17220))
 - Added Uphold user ID under brave://rewards-internals to assist with rewards support. ([#16937](https://github.com/brave/brave-browser/issues/16937))
 - Updated the date of installation parameter in the stats ping to expire in 30 days. ([#17089](https://github.com/brave/brave-browser/issues/17089))
 - Removed the Brave Rewards semi-verified user wallet state which occurred in certain cases. ([#15390](https://github.com/brave/brave-browser/issues/15390))
 - Upgraded Chromium to 93.0.4577.58. ([#17668](https://github.com/brave/brave-browser/issues/17668)) ([Changelog for 93.0.4577.58](https://chromium.googlesource.com/chromium/src/+log/92.0.4515.159..93.0.4577.58?pretty=fuller&n=1000))

## [1.28.106](https://github.com/brave/brave-browser/releases/tag/v1.28.106)

 - Upgraded Chromium to 92.0.4515.159. ([#17513](https://github.com/brave/brave-browser/issues/17513)) ([Changelog for 92.0.4515.159](https://chromium.googlesource.com/chromium/src/+log/92.0.4515.131..92.0.4515.159?pretty=fuller&n=10000))

## [1.28.105](https://github.com/brave/brave-browser/releases/tag/v1.28.105)

 - Updated the custom header list to be hard-coded. ([#16455](https://github.com/brave/brave-browser/issues/16455))
 - Updated adblocking to collapse HTML elements with blocked image or iframe requests. ([#14960](https://github.com/brave/brave-browser/issues/14960))
 - Removed the mention of Gmail under the "Safe Browsing" settings. ([#16181](https://github.com/brave/brave-browser/issues/16181))
 - Fixed Brave Rewards wallet being reset after upgrading in certain cases. ([#16449](https://github.com/brave/brave-browser/issues/16449))

## [1.27.111](https://github.com/brave/brave-browser/releases/tag/v1.27.111)

 - Fixed users not being rewarded for New Tab Page Sponsored Image views in certain cases. ([#17352](https://github.com/brave/brave-browser/issues/17352))
 - Fixed ads from split groups not being displayed in certain cases. ([#17199](https://github.com/brave/brave-browser/issues/17199))
 - Fixed Brave ads database failing to upgrade in certain cases. ([#17231](https://github.com/brave/brave-browser/issues/17231))
 - Upgraded Chromium to 92.0.4515.131. ([#17306](https://github.com/brave/brave-browser/issues/17306)) ([Changelog for 92.0.4515.131](https://chromium.googlesource.com/chromium/src/+log/92.0.4515.115..92.0.4515.131?pretty=fuller&n=10000))

## [1.27.109](https://github.com/brave/brave-browser/releases/tag/v1.27.109)

 - Added new hourly options under “Maximum number of ads displayed” for Brave Ads notifications. ([#16228](https://github.com/brave/brave-browser/issues/16228))
 - Added ability to change “Block trackers & ads” to either “Standard”, “Aggressive” or “Allow all” via the shields panel. ([#16300](https://github.com/brave/brave-browser/issues/16300))
 - Added a new tab tutorial page on startup for Japan region. ([#16033](https://github.com/brave/brave-browser/issues/16033))
 - Updated default search engine for new installations in certain regions. ([#16870](https://github.com/brave/brave-browser/issues/16870))
 - Updated “Block cross-site trackers” text to “Block trackers & ads” under the shields panel. ([#16299](https://github.com/brave/brave-browser/issues/16299))
 - Updated fingerprinting protections to always return light mode when set to strict. ([#15265](https://github.com/brave/brave-browser/issues/15265))
 - Updated Brave Ads UI to show estimated pending rewards for current month only. ([#15005](https://github.com/brave/brave-browser/issues/15005))
 - Improved “Disconnected” Brave Rewards wallet state. ([#15237](https://github.com/brave/brave-browser/issues/15237))
 - Fixed “Maximum number of ads displayed” incorrectly being set to 0 after upgrade in certain cases. ([#17155](https://github.com/brave/brave-browser/issues/17155))
 - Upgraded Chromium to 92.0.4515.115. ([#17162](https://github.com/brave/brave-browser/issues/17162))

## [1.26.77](https://github.com/brave/brave-browser/releases/tag/v1.26.77)

 - Upgraded Chromium to 91.0.4472.164. ([#16977](https://github.com/brave/brave-browser/issues/16977))

## [1.26.74](https://github.com/brave/brave-browser/releases/tag/v1.26.74)

 - Renamed “Brave Search beta” to “Brave” in several locations including settings and the onboarding screen. ([#16564](https://github.com/brave/brave-browser/issues/16564))
 - Upgraded Chromium to 91.0.4472.124. ([#16600](https://github.com/brave/brave-browser/issues/16600))

## [1.26.71](https://github.com/brave/brave-browser/releases/tag/v1.26.71)

 - Fixed crash when opening links using custom tabs on certain locales. ([#16569](https://github.com/brave/brave-browser/issues/16569))
 - Fixed permission crash in certain cases when sharing stats using Brave Shields. ([#16596](https://github.com/brave/brave-browser/issues/16596))
 - Upgraded Chromium to 91.0.4472.120. ([#16576](https://github.com/brave/brave-browser/issues/16576))

## [1.26.67](https://github.com/brave/brave-browser/releases/tag/v1.26.67)

 - Added Brave Search beta to the list of available search engines. ([#15663](https://github.com/brave/brave-browser/issues/15663))
 - Added ability to clear data on exit via “Clear browsing data on exit” under settings. ([#7487](https://github.com/brave/brave-browser/issues/7487))
 - Added share button in Brave Shields to increase app virality. ([#15021](https://github.com/brave/brave-browser/issues/15021))
 - Updated brave://version to show full variation names. ([#14780](https://github.com/brave/brave-browser/issues/14780))
 - Updated the “Learn more” link on the IPFS interstitial page and under brave://settings/ipfs. ([#15829](https://github.com/brave/brave-browser/issues/15829))
 - Updated the Cloudflare privacy policy link on the Unstoppable Domains interstitial page. ([#15831](https://github.com/brave/brave-browser/issues/15831))
 - Fixed New Tab Page Sponsored Image always being opened when creating new tabs after beign added into tab groups. ([#16263](https://github.com/brave/brave-browser/issues/16263))
 - Fixed “Ask where to save files” state under “Downloads” not persisting when changed. ([#14246](https://github.com/brave/brave-browser/issues/14246))
 - Upgraded Chromium to 91.0.4472.114. ([#16489](https://github.com/brave/brave-browser/issues/16489))

## [1.25.73](https://github.com/brave/brave-browser/releases/tag/v1.25.73)

- Upgraded Chromium to 91.0.4472.106. ([#16314](https://github.com/brave/brave-browser/issues/16314))

## [1.25.72](https://github.com/brave/brave-browser/releases/tag/v1.25.72)

- Fixed $csp rules still being applied when Brave Shields has been disabled. ([#16283](https://github.com/brave/brave-browser/issues/16283))
- Upgraded Chromium to 91.0.4472.101. ([#16314](https://github.com/brave/brave-browser/issues/16314))

## [1.25.71](https://github.com/brave/brave-browser/releases/tag/v1.25.71)

 - Fixed an issue with tab-groups setting from working and re-implemented stacked tab layout. ([#16140](https://github.com/brave/brave-browser/issues/16140))
 - Upgraded Chromium to 91.0.4472.88. ([#16243](https://github.com/brave/brave-browser/issues/16243))

## [1.25.69](https://github.com/brave/brave-browser/releases/tag/v1.25.69)

 - Added support for Unstoppable Domains via Ethereum. ([#15373](https://github.com/brave/brave-browser/issues/15373))
 - Added support for “$csp” filter list rules in blocking engine. ([#14792](https://github.com/brave/brave-browser/issues/14792))
 - Removed all Japan related Brave Rewards blocks. ([#15786](https://github.com/brave/brave-browser/issues/15786))
 - Enabled logging of Brave Rewards errors by default. ([#15500](https://github.com/brave/brave-browser/issues/15500))
 - Reduced BAT threshold before being able to verify Uphold two-way user wallet from 25 to 15 BAT. ([#15196](https://github.com/brave/brave-browser/issues/15196))
 - Disabled additional parts of Google’s FLoC system. ([#14942](https://github.com/brave/brave-browser/issues/14942))
 - Disabled FirstParty Sets. ([#13098](https://github.com/brave/brave-browser/issues/13098))
 - Updated rewards wallet verification flow to match the current desktop flow. ([#13220](https://github.com/brave/brave-browser/issues/13220))
 - Updated ad notification icons to distinguish between release and beta ads. ([#7571](https://github.com/brave/brave-browser/issues/7571))
 - Updated Startpage icon under onboarding and search engine settings. ([#15515](https://github.com/brave/brave-browser/issues/15515))
 - Fixed Binance widget not being dismissed when “Buy” button is clicked and landing page is loaded. ([#14405](https://github.com/brave/brave-browser/issues/14405))
 - Fixed all tokens being displayed when viewing deposit address for a specific token. ([#15236](https://github.com/brave/brave-browser/issues/15236))
 - Fixed certain setting pages missing “X” close button. ([#10375](https://github.com/brave/brave-browser/issues/10375))
 - Fixed list of trackers being blocked under privacy report not visible when using dark theme. ([#13455](https://github.com/brave/brave-browser/issues/13455))
 - Fixed “Nothing to see here” being shown on NTP instead of favorite icons when selecting search engine from onboarding. ([#14662](https://github.com/brave/brave-browser/issues/14662))
 - Upgraded Chromium to 91.0.4472.77. ([#16054](https://github.com/brave/brave-browser/issues/16054))

## [1.24.86](https://github.com/brave/brave-browser/releases/tag/v1.24.86)

 - Fixed referral program codes not being retrieved from Google Play Store. ([#15903](https://github.com/brave/brave-browser/issues/15903))

## [1.24.85](https://github.com/brave/brave-browser/releases/tag/v1.24.85)

 - Upgraded Chromium to 90.0.4430.212. ([#15725](https://github.com/brave/brave-browser/issues/15725))

## [1.24.84](https://github.com/brave/brave-browser/releases/tag/v1.24.84)

 - Added support for Unstoppable Domains and ENS via DNS over HTTPS. ([#15159](https://github.com/brave/brave-browser/issues/15159))
 - Added support for IPFS via gateway. ([#13683](https://github.com/brave/brave-browser/issues/13683))
 - Updated 5% fee for Brave Rewards tips to only attempt to contribute 3 times per browsing session. ([#14386](https://github.com/brave/brave-browser/issues/14386))
 - Removed Chrome logo when vertically flipping opened tabs. ([#9867](https://github.com/brave/brave-browser/issues/9867))
 - Fixed “X” close button not working under “Site setting” pages. ([#12181](https://github.com/brave/brave-browser/issues/12181))
 - Fixed crash when switching to existing rewards tab in certain cases. ([#15389](https://github.com/brave/brave-browser/issues/15389))
 - Fixed Tab Groups toolbar occasionally still visible when the second last tab is closed. ([#14847](https://github.com/brave/brave-browser/issues/14847))

## [1.23.76](https://github.com/brave/brave-browser/releases/tag/v1.23.76)

 - Fixed “Estimated pending rewards” being temporarily reset to zero when server endpoint returns a non HTTP_OK status. ([#15460](https://github.com/brave/brave-browser/issues/15460))
 - Fixed artifacts appearing when using fullscreen on YouTube. ([#15548](https://github.com/brave/brave-browser/issues/15548))
 - Upgraded Chromium to 90.0.4430.93. ([#15502](https://github.com/brave/brave-browser/issues/15502))

## [1.23.74](https://github.com/brave/brave-browser/releases/tag/v1.23.74)

 - Added ability to disable Tab Groups through settings. ([#15453](https://github.com/brave/brave-browser/issues/15453))
 - Fixed issue where device information was sometimes reported in User Agent string. ([#15372](https://github.com/brave/brave-browser/issues/15372))
 - Upgraded Chromium to 90.0.4430.85. ([#15397](https://github.com/brave/brave-browser/issues/15397))

## [1.23.71](https://github.com/brave/brave-ios/releases/tag/v1.23.71)

 - Implemented verifiable advertiser conversions for Brave Ads. ([#13368](https://github.com/brave/brave-browser/issues/13368))
 - Fixed CNAME adblocking breakage in certain cases. ([#14755](https://github.com/brave/brave-browser/issues/14755))
 - Fixed Brave Shield icon being displayed in the incorrect position when using Custom Tabs. ([#9113](https://github.com/brave/brave-browser/issues/9113)) 
 - Fixed text color to improve visuals in certain reward onboarding panels. ([#13911](https://github.com/brave/brave-browser/issues/13911)) 
 - Upgraded Chromium to 90.0.4430.72. ([#15299](https://github.com/brave/brave-browser/issues/15299))

## [1.22.72](https://github.com/brave/brave-browser/releases/tag/v1.22.72)

 - Upgraded Chromium to 89.0.4389.128. ([#15270](https://github.com/brave/brave-browser/issues/15270))

## [1.22.71](https://github.com/brave/brave-browser/releases/tag/v1.22.71)

 - Fixed referral pings not initializing correctly. ([#15034](https://github.com/brave/brave-browser/issues/15034))
 - Upgraded Chromium to 89.0.4389.114. ([#15030](https://github.com/brave/brave-browser/issues/15030))

## [1.22.69](https://github.com/brave/brave-browser/releases/tag/v1.22.69)

- Improved canvas fingerprinting protections. ([#12069](https://github.com/brave/brave-browser/issues/12069))
- Enabled re-linking when Uphold wallet is connected to Brave Rewards. ([#14573](https://github.com/brave/brave-browser/issues/14573))
- Removed known Drip tracking parameters from URLs. ([#8975](https://github.com/brave/brave-browser/issues/8975))
- Updated query filter to enabled or disabled using shields toggle. ([#13242](https://github.com/brave/brave-browser/issues/13242))
- Fixed shields appearing disabled when opening links using “Open in browser” via custom tabs. ([#14645](https://github.com/brave/brave-browser/issues/14645))
- Fixed bottom toolbar appearing in landscape mode. ([#14254](https://github.com/brave/brave-browser/issues/14254))
- Fixed CNAME adblocking breakage. ([#14756](https://github.com/brave/brave-browser/issues/14756))
- Upgraded Chromium to 89.0.4389.105. ([#14891](https://github.com/brave/brave-browser/issues/14891))

## [1.21.77](https://github.com/brave/brave-browser/releases/tag/v1.21.77)

 - Updated the default number of ads per hour from 2 to 5 for new users and users who have not changed the "Maximum number of ads displayed" setting for Brave Ads. ([#14377](https://github.com/brave/brave-browser/issues/14377))
 - Fixed crash on startup in certain cases due to stats ping being called before the profile is initialized. ([#14594](https://github.com/brave/brave-browser/issues/14594))
 - Upgraded Chromium to 89.0.4389.90. ([#14694](https://github.com/brave/brave-browser/issues/14694))

## [1.21.76](https://github.com/brave/brave-browser/releases/tag/v1.21.76)

 - Fixed ads service crashing when fetching estimated earnings via rewards widget under the New Tab Page. ([#14447](https://github.com/brave/brave-browser/issues/14447))
 - Upgraded Chromium to 89.0.4389.86. ([#14579](https://github.com/brave/brave-browser/issues/14579))

## [1.21.74](https://github.com/brave/brave-browser/releases/tag/v1.21.74)

 - Fixed crash when closing tabs while "Tab Groups" is enabled via brave://flags. ([#14491](https://github.com/brave/brave-browser/issues/14491))
 - Fixed ads incorrectly displaying on https://www.reuters.com. ([#14483](https://github.com/brave/brave-browser/issues/14483))

## [1.21.73](https://github.com/brave/brave-browser/releases/tag/v1.21.73)

 - Added support for overriding default network adblocking using custom exception rules in brave://adblock. ([#5440](https://github.com/brave/brave-browser/issues/5440))
 - Added warning into Brave Sync if auto-sync has been disabled on the device. ([#11128](https://github.com/brave/brave-browser/issues/11128))
 - Implemented cosmetic filters. ([#13070](https://github.com/brave/brave-browser/issues/13070))
 - Updated referral system to skip initialization when no referral code present. ([#14428](https://github.com/brave/brave-browser/issues/14428))
 - Updated User Agent farbling to add workers support. ([#12392](https://github.com/brave/brave-browser/issues/12392))
 - Removed known Olytics tracking parameters from URLs. ([#13644](https://github.com/brave/brave-browser/issues/13644))
 - Removed known tracking parameter "wickedid" from URLs. ([#13647](https://github.com/brave/brave-browser/issues/13647))
 - Fixed default browser modal being displayed if another Brave version is already set as the default browser. ([#14078](https://github.com/brave/brave-browser/issues/14078))
 - Fixed Binance widget and autocomplete always using "en" URLs for all locales. ([#9691](https://github.com/brave/brave-browser/issues/9691))
 - Fixed cast dialog not being displayed on https://gem.cbc.ca/live/channel/ottawa. ([#13898](https://github.com/brave/brave-browser/issues/13898))
 - Upgraded Chromium to 89.0.4389.72. ([#14412](https://github.com/brave/brave-browser/issues/14412))

## [1.20.108](https://github.com/brave/brave-browser/releases/tag/v1.20.108)

 - [Security] Fixed ISP DNS leak when shields are enabled. ([#12575](https://github.com/brave/brave-browser/issues/12575))
 - Fixed onboarding tooltip being displayed when shields icon not currently in view. ([#14060](https://github.com/brave/brave-browser/issues/14060))
 - Upgraded Chromium to 88.0.4324.182. ([#14187](https://github.com/brave/brave-browser/issues/14187))

## [1.20.103](https://github.com/brave/brave-browser/releases/tag/v1.20.103)

 - Added several educational onboarding notifications for Brave Shields. ([#12209](https://github.com/brave/brave-browser/issues/12209))
 - Added onboarding for Privacy Preserving Product Analytics (P3A). ([#12723](https://github.com/brave/brave-browser/issues/12723))
 - Implemented User Agent fingerprint farbling protections. ([#12638](https://github.com/brave/brave-browser/issues/12638))
 - Updated the default browser modal. ([#12390](https://github.com/brave/brave-browser/issues/12390))
 - Updated New Tab Page background images. ([#13447](https://github.com/brave/brave-browser/issues/13447))
 - Improved UI on several onboarding modals. ([#11939](https://github.com/brave/brave-browser/issues/11939))
 - Fixed rewards onboarding under rewards panel being displayed twice. ([#13423](https://github.com/brave/brave-browser/issues/13423))
 - Fixed cases where the search engine onboarding is being displayed when URL bar not empty. ([#13392](https://github.com/brave/brave-browser/issues/13392))
 - Fixed bookmark button under the bottom toolbar opening "Edit bookmark" rather than removing bookmark. ([#14033](https://github.com/brave/brave-browser/issues/14033))

## [1.19.92](https://github.com/brave/brave-browser/releases/tag/v1.19.92)

 - Upgraded Chromium to 88.0.4324.152. ([#13969](https://github.com/brave/brave-browser/issues/13969))

## [1.19.91](https://github.com/brave/brave-browser/releases/tag/v1.19.91)

 - Removed "Homepage" under settings when bottom toolbar has been disabled which fixes a known crash. ([#13809](https://github.com/brave/brave-browser/issues/13809))
 - Improved appearance of several text strings on the rewards onboarding panels. ([#13800](https://github.com/brave/brave-browser/issues/13800))
 - Fixed several broken images on the rewards onboarding panels. ([#13749](https://github.com/brave/brave-browser/issues/13749))
 - Fixed crash when loading background images on New Tab Page in certain cases. ([#12627](https://github.com/brave/brave-browser/issues/12627))
 - Upgraded Chromium to 88.0.4324.146. ([#13900](https://github.com/brave/brave-browser/issues/13900))

## [1.19.88](https://github.com/brave/brave-browser/releases/tag/v1.19.88)

 - Added Ecosia to the default search engine list for several new regions. ([#13511](https://github.com/brave/brave-browser/issues/13511))
 - Fixed crash when updating home button state in certain cases. ([#13680](https://github.com/brave/brave-browser/issues/13680))

## [1.19.86](https://github.com/brave/brave-browser/releases/tag/v1.19.86)

 - Updated pre-populated search engine list. ([#13283](https://github.com/brave/brave-browser/issues/13283))
 - Update referrer handling for better compatibility. ([#13464](https://github.com/brave/brave-browser/issues/13464))
 - Fixed PDF files automatically downloading and opening on click. ([#12902](https://github.com/brave/brave-browser/issues/12902))
 - Fixed menu buttons not properly aligned when bottom toolbar is disabled. ([#12926](https://github.com/brave/brave-browser/issues/12926))
 - Upgraded Chromium to 88.0.4324.96. ([#13637](https://github.com/brave/brave-browser/issues/13637))

## [1.18.78](https://github.com/brave/brave-browser/releases/tag/v1.18.78)

 - Upgraded Chromium to 87.0.4280.141. ([#13399](https://github.com/brave/brave-browser/issues/13399))

## [1.18.77](https://github.com/brave/brave-browser/releases/tag/v1.18.77)

- Fixed not being able to play videos on https://www.imdb.com. ([#13101](https://github.com/brave/brave-browser/issues/13101))

## [1.18.75](https://github.com/brave/brave-browser/releases/tag/v1.18.75)

 - Added protection against private browsing detection. ([#11543](https://github.com/brave/brave-browser/issues/11543))
 - Implemented the ability to remove other devices in a sync chain. ([#11232](https://github.com/brave/brave-browser/issues/11232))
 - Implemented Brave Rewards onboarding. ([#12141](https://github.com/brave/brave-browser/issues/12141))
 - Enabled Global Privacy Control. ([#12875](https://github.com/brave/brave-browser/issues/12875))
 - Updated default search engine to Yandex for new installations in certain regions. ([#12327](https://github.com/brave/brave-browser/issues/12327))
 - Removed redundant rewards setting to address user confusion. ([#11467](https://github.com/brave/brave-browser/issues/11467))
 - Fixed issue where the number of Brave Ads delivered per day was incorrectly being limited by the ads per hour selection. ([#13215](https://github.com/brave/brave-browser/issues/13215))
 - Fixed issue where "Hide Brave Rewards Icon" setting was not being respected. ([#12533](https://github.com/brave/brave-browser/issues/12533))
 - Upgraded Chromium to 87.0.4280.101. ([#13081](https://github.com/brave/brave-browser/issues/13081))

## [1.17.75](https://github.com/brave/brave-browser/releases/tag/v1.17.75)

 - Upgraded Chromium to 87.0.4280.88. ([#13006](https://github.com/brave/brave-browser/issues/13006))

## [1.17.74](https://github.com/brave/brave-browser/releases/tag/v1.17.74)

 - Fixed only four top sites appearing under New Tab Page when background images are disabled. ([#12837](https://github.com/brave/brave-browser/issues/12837))
 - Fixed crash when "Tab Groups" or "Conditional Tab Strip" are enabled using brave://flags. ([#12809](https://github.com/brave/brave-browser/issues/12809))
 - Fixed crash under privacy report in certain cases. ([#12834](https://github.com/brave/brave-browser/issues/12834))
 - Fixed Brave stats formatting error under privacy report when reaching certain values. ([#12831](https://github.com/brave/brave-browser/issues/12831))
 - Fixed settings menu appearing on both the top and bottom when opening links using custom tabs. ([#12784](https://github.com/brave/brave-browser/issues/12784))
 - Updated "Ad notifications received this month" text under brave://rewards to "Ads received this month". ([#12719](https://github.com/brave/brave-browser/issues/12719))
 - Upgraded Chromium to 87.0.4280.67. ([#12793](https://github.com/brave/brave-browser/issues/12793))

## [1.17.72](https://github.com/brave/brave-browser/releases/tag/v1.17.72)

 - Added widgets under New Tab Page. ([#11658](https://github.com/brave/brave-browser/issues/11658))
 - Added support for CNAME adblocking. ([#11712](https://github.com/brave/brave-browser/issues/11712))
 - Implemented WebGL2 fingerprint farbling protections. ([#9189](https://github.com/brave/brave-browser/issues/9189))
 - Removed known user tracking parameter "_openstat" from query strings. ([#11579](https://github.com/brave/brave-browser/issues/11579))
 - Fixed cosmetic filters crash in certain cases. ([#12745](https://github.com/brave/brave-browser/issues/12745))
 - Fixed Startpage missing from onboarding. ([#12340](https://github.com/brave/brave-browser/issues/12340))
 - Upgraded Chromium to 87.0.4280.66. ([#12741](https://github.com/brave/brave-browser/issues/12741))

## [1.16.76](https://github.com/brave/brave-browser/releases/tag/v1.16.76)

 - Upgraded Chromium to 86.0.4240.198. ([#12645](https://github.com/brave/brave-browser/issues/12645))

## [1.16.75](https://github.com/brave/brave-browser/releases/tag/v1.16.75)

- Fixed supported links not being opened in external applications. ([#12330](https://github.com/brave/brave-browser/issues/12330))
- Changed HTTP error code Brave uses when blocking network request to better match what other browsers and tools expect, to increase compatibility with crowdsourced filter lists. ([#10063](https://github.com/brave/brave-browser/issues/10063))
- Disabled Brave notification when upgrading to a new version. ([#12507](https://github.com/brave/brave-browser/issues/12507))
- Upgraded Chromium to 86.0.4240.193. ([#12603](https://github.com/brave/brave-browser/issues/12603))

## [1.16.74](https://github.com/brave/brave-browser/releases/tag/v1.16.74)

- Fixed reCAPTCHA constantly being displayed when logging into certain websites. ([#12359](https://github.com/brave/brave-browser/issues/12359))
- Fixed crash when tapping on rewards panel after skipping onboarding. ([#12509](https://github.com/brave/brave-browser/issues/12509))
- Upgraded Chromium to 86.0.4240.185. ([#12479](https://github.com/brave/brave-browser/issues/12479))

## [1.16.70](https://github.com/brave/brave-browser/releases/tag/v1.16.70)

- Fixed "Desktop Mode". ([#11928](https://github.com/brave/brave-browser/issues/11928))
- Fixed webview crash in certain cases by using proper origin. ([#12268](https://github.com/brave/brave-browser/issues/12268))

## [1.16.68](https://github.com/brave/brave-browser/releases/tag/v1.16.68)

- Added cosmetic filtering. ([#11599](https://github.com/brave/brave-browser/issues/11599))
- Added social media blocking for Google, Twitter, LinkedIn and Facebook. ([#9536](https://github.com/brave/brave-browser/issues/9536))
- [Security] Fixed file-path for cookies as reported on HackerOne by kanytu. ([#11520](https://github.com/brave/brave-browser/issues/11520))
- [Security] Encrypted private wallet data preferences for Brave Rewards. ([#2555](https://github.com/brave/brave-browser/issues/2555))
- Updated Startpage search to give attribution to Brave. ([#12257](https://github.com/brave/brave-browser/issues/12257))
- Removed known email tracking parameters from Vero URLs. ([#11817](https://github.com/brave/brave-browser/issues/11817))
- Removed known tracking parameter "yclid" from URLs. ([#11578](https://github.com/brave/brave-browser/issues/11578))
- Removed intra-site requests from the query string filter. ([#9020](https://github.com/brave/brave-browser/issues/9020))
- Fixed breakage on sites that use "addthis" scripts in certain cases. ([#11744](https://github.com/brave/brave-browser/issues/11744))

## [1.15.76](https://github.com/brave/brave-browser/releases/tag/v1.15.76)

 - Upgraded Chromium to 86.0.4240.111. ([#12225](https://github.com/brave/brave-browser/issues/12225))

## [1.15.75](https://github.com/brave/brave-browser/releases/tag/v1.15.75)

  - Fixed "Estimated pending rewards" and "Ad notifications received this month" not being updated even though ads are being displayed in certain cases. ([#11952](https://github.com/brave/brave-browser/issues/11952))
  - Upgraded Chromium to 86.0.4240.99. ([#12124](https://github.com/brave/brave-browser/issues/12124))

## [1.15.73](https://github.com/brave/brave-browser/releases/tag/v1.15.73)

 - Added "Night Mode" under "Appearance" settings. ([#11085](https://github.com/brave/brave-browser/issues/11085))
 - Removed Chrome images from password prompt when re-logging into websites using saved passwords. ([#12018](https://github.com/brave/brave-browser/issues/12018))
 - Fixed ad landing page not loading when clicking on a silent ad notification when Brave is running in background. ([#10926](https://github.com/brave/brave-browser/issues/10926))
 - Fixed fingerprint settings not being retained in certain cases. ([#11786](https://github.com/brave/brave-browser/issues/11786))
 - Upgraded Chromium to 86.0.4240.75. ([#12021](https://github.com/brave/brave-browser/issues/12021))

## [1.14.86](https://github.com/brave/brave-browser/releases/tag/v1.14.86)

 - Upgraded Chromium to 85.0.4183.127. ([#11827](https://github.com/brave/brave-browser/issues/11827))

## [1.14.84](https://github.com/brave/brave-browser/releases/tag/v1.14.84)

 - Upgraded Chromium to 85.0.4183.121. ([#11793](https://github.com/brave/brave-browser/issues/11793))

## [1.14.83](https://github.com/brave/brave-browser/releases/tag/v1.14.83)

 - Implemented additional farbling protections for fingerprinters accessing CPU information. ([#10808](https://github.com/brave/brave-browser/issues/10808))
 - Implemented additional farbling protections for fingerprinters accessing media hardware information. ([#11271](https://github.com/brave/brave-browser/issues/11271))
 - Fixed browser still using auto-rotate even when auto-rotate has been disabled on the device. ([#11632](https://github.com/brave/brave-browser/issues/11632))
 - Fixed Brave accepting TLS 1.0 and TLS 1.1 certificates without warning users. ([#10607](https://github.com/brave/brave-browser/issues/10607))
 - Fixed WebRTC Web APIs being modified when fingerprinting protection is enabled. ([#11310](https://github.com/brave/brave-browser/issues/11310))

## [1.13.87](https://github.com/brave/brave-browser/releases/tag/v1.13.87)

 - Fixed crash when opening "Privacy Report" notification while Brave running in background. ([#11625](https://github.com/brave/brave-browser/issues/11625))
 - Fixed "Settings" menu not reachable on devices running Android 7. ([#11620](https://github.com/brave/brave-browser/issues/11620))
 - Fixed text under the location permission modal displaying "Chromium" instead of "Brave". ([#11656](https://github.com/brave/brave-browser/issues/11656))
 - Upgraded Chromium to 85.0.4183.102. ([#11621](https://github.com/brave/brave-browser/issues/11621))

## [1.13.85](https://github.com/brave/brave-browser/releases/tag/v1.13.85)

 - Implemented cross-platform promotion modal. ([#10571](https://github.com/brave/brave-browser/issues/10571))
 - Implemented "Refresh Status" button on rewards panel to check publisher status. ([#10005](https://github.com/brave/brave-browser/issues/10005))
 - Implemented new version of onboarding. ([#9555](https://github.com/brave/brave-browser/issues/9555))
 - Implemented fingerprint farbling for Plugins. ([#9435](https://github.com/brave/brave-browser/issues/9435))
 - Implemented new wallet API for Brave Rewards. ([#8428](https://github.com/brave/brave-browser/issues/8428))
 - [Security] Reduce logging as reported on HackerOne by hihouhou. ([#11456](https://github.com/brave/brave-browser/issues/11456))
 - Disabled ability to retrieve rewards logs via brave://rewards-internals and removed existing logs. ([#11260](https://github.com/brave/brave-browser/issues/11260))
 - Fixed issue where ad conversions would fail when a site uses pushState. ([#11012](https://github.com/brave/brave-browser/issues/11012))
 - Fixed not being able to open downloaded PDF and APK files. ([#11420](https://github.com/brave/brave-browser/issues/11420)
 - Fixed not being able to send links from Android to Desktop when sync is enabled. ([#11077](https://github.com/brave/brave-browser/issues/11077)
 - Upgraded Chromium to 85.0.4183.83. ([#11401](https://github.com/brave/brave-browser/issues/11401))

## [1.12.113](https://github.com/brave/brave-browser/releases/tag/v1.12.113)

 - Added Sync v2. ([#10203](https://github.com/brave/brave-browser/issues/10203))
 - Added support for state level ads delivery. ([#9200](https://github.com/brave/brave-browser/issues/9200))
 - Added the date of installation to the stats ping. ([#10061](https://github.com/brave/brave-browser/issues/10061))
 - Added farbling for WebGL API when "Fingerprinting blocking" is set to "strict". ([#10214](https://github.com/brave/brave-browser/issues/10214)) 
 - Enabled the "prefetch-privacy-changes" flag by default under brave://flags. ([#8319](https://github.com/brave/brave-browser/issues/8319))
 - Updated referrer policy to improve privacy and prevent web compatibility issues. ([#8696](https://github.com/brave/brave-browser/issues/8696))
 - Updated canvas maximum farbling to match balanced farbling. ([#11067](https://github.com/brave/brave-browser/issues/11067))
 - Updated pre-populated search engine list. ([#11089](https://github.com/brave/brave-browser/issues/11089))
 - Improved web compatibility by changing behavior of local and session storage in third-party frames to not throw an exception when storage is blocked. ([#9578](https://github.com/brave/brave-browser/issues/9758))
 - Reduced size and improved performance of the publisher list for Brave Rewards. ([#10836](https://github.com/brave/brave-browser/issues/10836))
 - Reduced the frequency at which promotions are fetched for rewards. ([#9513](https://github.com/brave/brave-browser/issues/9513))
 - Disabled ad notifications on wearables. ([#9397](https://github.com/brave/brave-browser/issues/9397)) 
 - Fixed issue where "Bat Ads Service" was running when Brave Ads were not enabled. ([#9196](https://github.com/brave/brave-browser/issues/9196))
 - Fixed crash with Brave Ads when opening a new tab in certain cases. ([#9393](https://github.com/brave/brave-browser/issues/9393))
 - Fixed issue where "Bat Ledger Service" was running when Brave Rewards was not enabled. ([#9526](https://github.com/brave/brave-browser/issues/9526))
 - Fixed file-path for cookies as reported on HackerOne by kanytu. ([#9818](https://github.com/brave/brave-browser/issues/9818))
 - Fixed "Estimated pending rewards" not being refreshed after claiming an ad grant. ([#10094](https://github.com/brave/brave-browser/issues/10094))
 - Fixed ads state being removed when Brave Ads are disabled. ([#10097](https://github.com/brave/brave-browser/issues/10097))
 - Fixed URL bar text being cleared when going into edit mode. ([#10524](https://github.com/brave/brave-browser/issues/10524))
 - Fixed ads not being enabled on clean install when enabling rewards. ([#10526](https://github.com/brave/brave-browser/issues/10526))
 - Fixed state level ads being shown on versions without support for state level ads delivery. ([#10557](https://github.com/brave/brave-browser/issues/10557))
 - Upgrade to Chromium 84.0.4147.125. ([#11153](https://github.com/brave/brave-browser/issues/11153))

## [1.11.105](https://github.com/brave/brave-browser/releases/tag/v1.11.105)

 - Implemented new Brave Shields design to match desktop. ([#9888](https://github.com/brave/brave-browser/issues/9888))
 - Implemented "Rate Brave" to capture feedback from within the app. ([#8243](https://github.com/brave/brave-browser/issues/8243))
 - Implemented Sync v1 deprecation infobar for devices that have Sync enabled. ([#10416](https://github.com/brave/brave-browser/issues/10416))
 - Added ability to view and download server error logs for Brave Rewards under "brave://rewards-internals" to improve rewards debugging. ([#10712](https://github.com/brave/brave-browser/issues/10712))
 - Fixed shields not working on custom tab when app is removed from memory. ([#10612](https://github.com/brave/brave-browser/issues/10612))
 - Updated Brave Rewards to display BAT values to three decimal places. ([#10028](https://github.com/brave/brave-browser/issues/10028))
 - Upgraded to Chromium 84.0.4147.105. ([#10732](https://github.com/brave/brave-browser/issues/10732))

## [1.10.99](https://github.com/brave/brave-browser/releases/tag/v1.10.99)

 - Fixed rewards balance appearing as "0.0 BAT" in certain cases. ([#9992](https://github.com/brave/brave-browser/issues/9992))
 - Fixed ads being shown on embedded YouTube videos. ([#10436](https://github.com/brave/brave-browser/issues/10436))
 - Upgraded to Chromium 83.0.4103.116. ([#10482](https://github.com/brave/brave-browser/issues/10482))

## [1.10.95](https://github.com/brave/brave-browser/releases/tag/v1.10.95)

 - Disabled Twitter support in the rewards panel. ([#10208](https://github.com/brave/brave-browser/issues/10208))
 - Fixed "Enable bottom toolbar" being reverted in certain cases. ([#9843](https://github.com/brave/brave-browser/issues/9843))
 - Fixed ads being shown on YouTube in certain cases. ([#10241](https://github.com/brave/brave-browser/issues/10241))
 - Fixed crash when opening new tab with Sponsored Image on certain screen resolutions. ([#10296](https://github.com/brave/brave-browser/issues/10296))

## [1.10.94](https://github.com/brave/brave-browser/releases/tag/v1.10.94)

 - Added Uphold two-way user wallets. ([#8511](https://github.com/brave/brave-browser/issues/8511))
 - Added 25 BAT threshold before being able to verify Uphold two-way user wallet. ([#9636](https://github.com/brave/brave-browser/issues/9636))
 - Fixed promotion notification not being cleared when error occurs. ([#9657](https://github.com/brave/brave-browser/issues/9657))
 - Fixed referral QR code using incorrect URL format. ([#10079](https://github.com/brave/brave-browser/issues/10079))
 - Upgraded to Chromium 83.0.4103.106. ([#10268](https://github.com/brave/brave-browser/issues/10268))

## [1.9.80](https://github.com/brave/brave-browser/releases/tag/v1.9.80)

 - Fixed default setting for "Show Brave suggested sites in autocomplete suggestions" to be off under brave://settings/appearance. ([#10131](https://github.com/brave/brave-browser/issues/10131))

## [1.9.79](https://github.com/brave/brave-browser/releases/tag/v1.9.79)

 - Implemented import/export database options for rewards. ([#9766](https://github.com/brave/brave-browser/issues/9766))
 - Added settings for "Top sites suggestions" and "Brave suggested sites". ([#9782](https://github.com/brave/brave-browser/issues/9782))
 - Added "Estimated Bandwidth Savings" stats on new tab page. ([#8845](https://github.com/brave/brave-browser/issues/8845))
 - Fixed crash on certain devices when opening custom tabs. ([#9857](https://github.com/brave/brave-browser/issues/9857))

## [1.8.112](https://github.com/brave/brave-browser/releases/tag/v1.8.112)

 - Fixed users not receiving ad promotion due to empty public key in certain cases. ([#9733](https://github.com/brave/brave-browser/issues/9733))
 - Implemented pagination for publisher list. ([#9724](https://github.com/brave/brave-browser/issues/9724))
 - Upgraded to Chromium 81.0.4044.138. ([#9736](https://github.com/brave/brave-browser/issues/9736))

## [1.8.93](https://github.com/brave/brave-browser/releases/tag/v1.8.93)

 - Added support for referral background images and top sites on the New Tab Page. ([#8217](https://github.com/brave/brave-browser/issues/8217))
 - Removed the "Telephone" permission. ([#9454](https://github.com/brave/brave-browser/issues/9454))
 - Disabled background ad notifications by default. ([#8641](https://github.com/brave/brave-browser/issues/8641))
 - Fixed Twitter displaying "Something went wrong" when toggling "Cross-site cookies blocked" using the shields panel. ([#9489](https://github.com/brave/brave-browser/issues/9489))
 - Fixed video not playing in background in certain cases. ([#9463](https://github.com/brave/brave-browser/issues/9463))
 - Fixed intermittent crash in ad confirmations due to invalid wallet. ([#9651](https://github.com/brave/brave-browser/issues/9651))
 - Fixed sponsored images on New Tab Page being cropped after rotation. ([#8892](https://github.com/brave/brave-browser/issues/8892))
 - Fixed URL overlapping tab count when using private tab and the bottom toolbar is disabled. ([#9040](https://github.com/brave/brave-browser/issues/9040))
 - Upgraded to Chromium 81.0.4044.129. ([#9734](https://github.com/brave/brave-browser/issues/9734))

## [1.7.102](https://github.com/brave/brave-browser/releases/tag/v1.7.102) 

 - Added "Open tabs in Custom Tabs" option in settings. ([#9074](https://github.com/brave/brave-browser/issues/9074))
 - Improved publisher list load time. ([#9376](https://github.com/brave/brave-browser/issues/9376))
 - Fixed ad notifications being displayed when Brave is not running. ([#7917](https://github.com/brave/brave-browser/issues/7917))
 - Fixed claiming grants issue on rewards page when there are multiple promotions available. ([#8586](https://github.com/brave/brave-browser/issues/8586))
 - Fixed custom tab being opened instead of new tab after launching PWA from home screen. ([#9037](https://github.com/brave/brave-browser/issues/9037))
 - Fixed sponsored images under New Tab Page not using defined center point. ([#9426](https://github.com/brave/brave-browser/issues/9426))
 - Fixed urlbar corners not appearing rounded when the rewards icon is disabled. ([#8983](https://github.com/brave/brave-browser/issues/8983))
 - Upgraded to Chromium 81.0.4044.122. ([#9453](https://github.com/brave/brave-browser/issues/9453))

## [1.5.131](https://github.com/brave/brave-browser/releases/tag/v1.5.131)

 - Fixed third party cookies being blocked in certain cases after upgrade causing web compatibility issues. ([#9055](https://github.com/brave/brave-browser/issues/9055))
 - Fixed Brave not closing when "Closing all tabs closes Brave" is enabled. ([#9044](https://github.com/brave/brave-browser/issues/9044))
 - Replaced Chromium incognito icons with Brave icons in private browsing. ([#9046](https://github.com/brave/brave-browser/issues/9046))

## [1.5.130](https://github.com/brave/brave-browser/releases/tag/v1.5.130)

 - Changed rewards publisher list fetch interval from 1 day to every 7 days. ([#9032](https://github.com/brave/brave-browser/issues/9032))
 - Upgraded Chromium to 80.0.3987.162. ([#9031](https://github.com/brave/brave-browser/issues/9031))

## [1.5.120](https://github.com/brave/brave-browser/releases/tag/v1.5.120)

 - Moved to new Chromium code base to improve stability and performance. ([#9052](https://github.com/brave/brave-browser/issues/9052))
