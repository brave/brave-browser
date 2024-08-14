# Changelog

## [1.67.127](https://github.com/brave/brave-browser/releases/tag/v1.67.127)

### Web3

- Added support for retrying transactions on the Solana network. ([#37443](https://github.com/brave/brave-browser/issues/37443))
- Removed “Brave Fee” for all “Swap” transactions in Brave Wallet. ([#38566](https://github.com/brave/brave-browser/issues/38566))
- Updated token price rounding to more accurate decimal values for smaller balances. ([#36163](https://github.com/brave/brave-browser/issues/36163))
  
### General

- Added the ability for navigation history URLs to be opened in a new tab or in a new private tab via the context menu. ([#36988](https://github.com/brave/brave-browser/issues/36988))
- Updated default search engine to Brave Search for new installations in Italy. ([#38192](https://github.com/brave/brave-browser/issues/38192))
- Updated Leo defaults by deprecating Claude Instant in favor of Claude Haiku. ([#37988](https://github.com/brave/brave-browser/issues/37988))
- Updated labeling on certain language models listed in Brave Leo. ([#35611](https://github.com/brave/brave-browser/issues/35611))
- Fixed an issue with the Reddit redirect feature redirecting users incorrectly when using shortened Reddit links from third-party apps. ([#36122](https://github.com/brave/brave-browser/issues/36122))
- Fixed an issue with the URL bar connection state showing insecure connection during a network change. ([#38671](https://github.com/brave/brave-browser/issues/38671))
- Upgraded Chromium to 126.0.6478.126. ([#39329](https://github.com/brave/brave-browser/issues/39329))([Changelog for 126.0.6478.126](https://chromium.googlesource.com/chromium/src/+log/126.0.6478.114..126.0.6478.126?pretty=fuller&n=1000))

## [1.66.124](https://github.com/brave/brave-browser/releases/tag/v1.66.124)

 - Fixed memory usage issues for users with large playlists resulting in failures to load Brave. ([#39146](https://github.com/brave/brave-browser/issues/39146))

## [1.66.123](https://github.com/brave/brave-browser/releases/tag/v1.66.123)

 - Removed “Brave Fee” for all “Swap” transactions in Brave Wallet. ([#38566](https://github.com/brave/brave-browser/issues/38566))
 - Fixed a crash when dismissing alerts/share sheet menu in certain cases. ([#38651](https://github.com/brave/brave-browser/issues/38651))
 - Fixed "Add to Calendar" prompt not displaying when invite URLs are pasted into the URL bar or clicked via website links. ([#38548](https://github.com/brave/brave-browser/issues/38548))
 - Fixed download prompts appearing in certain cases when switching tabs. ([#38551](https://github.com/brave/brave-browser/issues/38551))
 - Fixed playlist items not deleting after being saved offline. ([#38665](https://github.com/brave/brave-browser/issues/38665))
 - Upgraded Chromium to 125.0.6422.165. ([#38803](https://github.com/brave/brave-browser/issues/38803)) ([Changelog for 125.0.6422.165](https://chromium.googlesource.com/chromium/src/+log/125.0.6422.147..125.0.6422.165?pretty=fuller&n=1000))

## [1.66.113](https://github.com/brave/brave-browser/releases/tag/v1.66.113)

### Web3

 - Added support to Retry, Cancel and Speed Up transactions. ([#36627](https://github.com/brave/brave-browser/issues/36627))
 - Fixed missing import legacy wallet option when restoring wallet in onboarding. ([#38123](https://github.com/brave/brave-browser/issues/38123))
 - Fixed inability to add/edit a custom network with chain ID below 16. ([#37863](https://github.com/brave/brave-browser/issues/37863))
 - Fixed user visible assets to be only shown in Account token list. ([#36806](https://github.com/brave/brave-browser/issues/36806))

### General

 - Implemented using cached ad-blocking results after changing shields settings. ([#37090](https://github.com/brave/brave-browser/issues/37090))
 - Implemented New Tab Page (NTP) video ads. ([#36435](https://github.com/brave/brave-browser/issues/36435))
 - Added Claude 3 Haiku and Claude 3 Sonnet model support for Leo. ([#36802](https://github.com/brave/brave-browser/issues/36802))
 - Added Brave to be an AutoFill Provider. ([#36028](https://github.com/brave/brave-browser/issues/36028))
 - Added support for Czech, Slovak, Danish, Finnish, Croatian, Bosnian, Swiss German, Greek and Portuguese variant languages. ([#37637](https://github.com/brave/brave-browser/issues/37637))
 - Added support for Base64 and Regex (multi) for debouncing. ([#37026](https://github.com/brave/brave-browser/issues/37026))
 - Added unification for ad-block engines by merging all filter lists. ([#36035](https://github.com/brave/brave-browser/issues/36035))
 - Added caching for DAT files during launch. ([#36539](https://github.com/brave/brave-browser/issues/36539))
 - Updated ad-blocking lists to use first party list. ([#35210](https://github.com/brave/brave-browser/issues/35210))
 - Updated debounce service to use brave-core instead of custom iOS service. ([#36033](https://github.com/brave/brave-browser/issues/36033))
 - Upgraded Chromium to 125.0.6422.76. ([#38465](https://github.com/brave/brave-browser/issues/38465)) ([Changelog for 125.0.6422.76](https://chromium.googlesource.com/chromium/src/+log/125.0.6422.60..125.0.6422.76?pretty=fuller&n=1000))

## [1.65.122](https://github.com/brave/brave-browser/releases/tag/v1.65.122)

### Web3

 - Fixed “Allow Biometrics Toggle” not being updated in Wallet settings. ([#36669](https://github.com/brave/brave-browser/issues/36669))

### General

 - Added support for Dutch language. ([#36939](https://github.com/brave/brave-browser/issues/36939))
 - Added support for marketplace URI scheme. ([#37650](https://github.com/brave/brave-browser/issues/37650))
 - Updated search result attribution to be more unified. ([#33469](https://github.com/brave/brave-browser/issues/33469))
 - Fixed crash related to quickly opening and closing many tabs. ([#37224](https://github.com/brave/brave-browser/issues/37224))
 - Fixed crash when quickly closing New Tab Page with sponsored images after its created. ([#36587](https://github.com/brave/brave-browser/issues/36587))
 - Fixed "page not found" error page being displayed when navigating through content blocked pages. ([#36378](https://github.com/brave/brave-browser/issues/36378))
 - Upgraded Chromium to 124.0.6367.82. ([#37814](https://github.com/brave/brave-browser/issues/37814)) ([Changelog for 124.0.6367.82](https://chromium.googlesource.com/chromium/src/+log/124.0.6367.60..124.0.6367.82?pretty=fuller&n=1000))

## [1.64.123](https://github.com/brave/brave-browser/releases/tag/v1.64.123)

### Web3

 - Implemented caching balances for assets in “Portfolio” page. ([#35986](https://github.com/brave/brave-browser/issues/35986))
 - Removed decimal values for NFTs on “Send” screen. ([#36771](https://github.com/brave/brave-browser/issues/36771))
 - Removed “Swap” option from all Filecoin Accounts. ([#37167](https://github.com/brave/brave-browser/issues/37167))

### General

 - Added support for Catalan language. ([#36261](https://github.com/brave/brave-browser/issues/36261))
 - Updated “Ask Leo” option in search overlay to be at the bottom. ([#37263](https://github.com/brave/brave-browser/issues/37263))
 - Fixed URL bar from falsely showing insecure state in some cases. ([#36951](https://github.com/brave/brave-browser/issues/36951))
 - Fixed a crash when opening “View all version info.” in landscape mode and switching to portrait. ([#36098](https://github.com/brave/brave-browser/issues/36098))
 - Fixed broken tab bar interaction after it becomes visible. ([#36591](https://github.com/brave/brave-browser/issues/36591))
 - Fixed YouTube videos from showing a black screen after unlocking the device. ([#36064](https://github.com/brave/brave-browser/issues/36064))
 - Upgraded Chromium to 123.0.6312.58. ([#36938](https://github.com/brave/brave-browser/issues/36938)) ([Changelog for 123.0.6312.58](https://chromium.googlesource.com/chromium/src/+log/122.0.6261.128..123.0.6312.58?pretty=fuller&n=1000))

## [1.63.183](https://github.com/brave/brave-browser/releases/tag/v1.63.183)

### Web3

 - Implemented v2 UI for "Account" details in Brave Wallet. ([#8663](https://github.com/brave/brave-ios/issues/8663))
 - Implemented v2 UI for “Accounts” tab in Brave Wallet. ([#8600](https://github.com/brave/brave-ios/issues/8600))
 - Fixed transaction status not updating automatically in "Transaction Details" page. ([#36468](https://github.com/brave/brave-browser/issues/36468))

### General

 - Added Brave Leo - AI for questions and answers leveraging page context. ([#36585](https://github.com/brave/brave-browser/issues/36585))
 - Added “Copy Clean Link” to the share menu. ([#8070](https://github.com/brave/brave-ios/issues/8070))
 - Added interstitial pages when blocking top-level domain pages. ([#8096](https://github.com/brave/brave-ios/issues/8096))
 - Added “Open in Brave” to iOS Share Sheet menu. ([#8516](https://github.com/brave/brave-ios/issues/8516))
 - Removed the limit on the number of filter lists that can be selected at once under “Content Filtering” settings page. ([#8656](https://github.com/brave/brave-ios/issues/8656))
 - Updated “Scan QR Code” to open scanned URLs in a new tab from the "Home Screen" context menu. ([#8594](https://github.com/brave/brave-ios/issues/8594))
 - Updated Webcompat report to use the site URL instead of using internal://local. ([#8667](https://github.com/brave/brave-ios/issues/8667))
 - Fixed an issue with muting/unmuting when Brave Talk is minimized. ([#8717](https://github.com/brave/brave-ios/issues/8717))
 - Fixed an issue with the search suggestions button not updating when pressed in the search field. ([#8630](https://github.com/brave/brave-ios/issues/8630))
