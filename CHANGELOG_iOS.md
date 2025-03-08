# Changelog

## [1.70.133](https://github.com/brave/brave-browser/releases/tag/v1.70.133)

 - [Security] Added warning message when submitting transactions containing system program instructions as reported on HackerOne by topenga. ([#41820](https://github.com/brave/brave-browser/issues/41820))
 - Fixed crash when dismissing Brave News opt-in dialog on New Tab Page for iOS 18 users. ([#41858](https://github.com/brave/brave-browser/issues/41858))

## [1.70.131](https://github.com/brave/brave-browser/releases/tag/v1.70.131)

### Web3

 - Updated "Confirm Transactions" page to display contract address as hyperlink. ([#39720](https://github.com/brave/brave-browser/issues/39720))

### General

 - Implemented search for "Content Filtering" settings page. ([#36036](https://github.com/brave/brave-browser/issues/36036))
 - Added option to force update filter lists in "Content Filtering" settings page. ([#35982](https://github.com/brave/brave-browser/issues/35982))
 - Added support for Dark Mode and Tinted icons on iOS 18. ([#41088](https://github.com/brave/brave-browser/issues/41088))
 - Added Leo to the Home Screen shortcuts widget. ([#39886](https://github.com/brave/brave-browser/issues/39886))
 - Added support for modifying user prompt in Leo. ([#39831](https://github.com/brave/brave-browser/issues/39831))
 - Added skipping debouncing if canonicalized URL’s hostname doesn’t match unescaped URLs hostname. ([#39866](https://github.com/brave/brave-browser/issues/39866))
 - Added ability to edit custom search engines after being added in "Search Engines" settings page. ([#39552](https://github.com/brave/brave-browser/issues/39552))
 - Added DarkReader support when Night Mode is enabled. ([#39786](https://github.com/brave/brave-browser/issues/39786))
 - Added handling for potential infinite redirect loop with HTTPS upgrades. ([#40346](https://github.com/brave/brave-browser/issues/40346))
 - Added right-to-left (RTL) language support. ([#40471](https://github.com/brave/brave-browser/issues/40471))
 - Updated "Manage Website Data" to remove ads data as well when clearing browsing history. ([#39051](https://github.com/brave/brave-browser/issues/39051))
 - Updated icon for starting a new conversation in Leo. ([#39818](https://github.com/brave/brave-browser/issues/39818))
 - Updated input box to be in focus when Leo is opened. ([#39858](https://github.com/brave/brave-browser/issues/39858))
 - Updated copy in Brave Rewards panel for non-connected users. ([#40909](https://github.com/brave/brave-browser/issues/40909))
 - [Security] Fixed issue with URL formatting as reported in HackerOne by renwa. ([#41716](https://github.com/brave/brave-browser/issues/41716))
 - [Security] Fixed issue involving interstitial pages not showing deceptive site warning as reported in HackerOne by renwa. ([#41803](https://github.com/brave/brave-browser/issues/41803))
 - Fixed crash when launching Brave via Home Screen shortcuts widget search button. ([#41457](https://github.com/brave/brave-browser/issues/41457))
 - Fixed crash when tapping on search icon to open search settings after opening URL bar. ([#39136](https://github.com/brave/brave-browser/issues/39136))
 - Fixed crash for some users when loading internal pages. ([#41445](https://github.com/brave/brave-browser/issues/41445))
 - Fixed crash when the block summary pop-up is displayed for Japan users. ([#41443](https://github.com/brave/brave-browser/issues/41443))
 - Fixed crash in Playlist when saving data offline with internet connection disabled. ([#41388](https://github.com/brave/brave-browser/issues/41388))
 - Fixed bookmark count to show correctly when adding "Saved Tabs" via tab icon. ([#38340](https://github.com/brave/brave-browser/issues/38340))
 - Fixed not being able to open links from X app using "Open in Brave" from share menu. ([#41296](https://github.com/brave/brave-browser/issues/41296))
 - Upgraded Chromium to 129.0.6668.100. ([#41494](https://github.com/brave/brave-browser/issues/41494))([Changelog for 129.0.6668.100](https://chromium.googlesource.com/chromium/src/+log/128.0.6613.138..129.0.6668.100?pretty=fuller&n=10000))

## [1.69.172](https://github.com/brave/brave-browser/releases/tag/v1.69.172)

 - Fixed content failing to be saved after downloading. ([#41073](https://github.com/brave/brave-browser/issues/41073))

## [1.69.170](https://github.com/brave/brave-browser/releases/tag/v1.69.170)

### Web3

 - Enabled Bitcoin by default in Brave Wallet. ([#38775](https://github.com/brave/brave-browser/issues/38775))

### General

 - Added per-site adblocking in the Brave Shields panel. ([#39573](https://github.com/brave/brave-browser/issues/39573))
 - Added advanced server selection for Brave VPN. ([#36409](https://github.com/brave/brave-browser/issues/36409))
 - Added country server details to the VPN “Server Region” page. ([#39824](https://github.com/brave/brave-browser/issues/39824))
 - Improved standard mode shields logic to allow some ads that were being hidden. ([#40967](https://github.com/brave/brave-browser/issues/40967))
 - Updated model names in Brave Leo models menu. ([#40464](https://github.com/brave/brave-browser/issues/40464))
 - Updated adblock-rust to v0.8.11 which applies “removeparam” to document/subdocument/xhr by default. ([#36039](https://github.com/brave/brave-browser/issues/36039))
 - Updated the Leo input box UI. ([#38960](https://github.com/brave/brave-browser/issues/38960))
 - Fixed prompt spoofing issue as reported on HackerOne by Imnarendrabhati. ([#40709](https://github.com/brave/brave-browser/issues/40709))
 - Fixed sandbox iframe configuration vulnerability as reported on HackerOne by imnarendrabhati. ([#40846](https://github.com/brave/brave-browser/issues/40846))
 - Fixed issues with Requestblockingscript.js which caused some delays in page loading on certain sites. ([#39546](https://github.com/brave/brave-browser/issues/39546))
 - Upgraded Chromium to 128.0.6613.138. ([#40972](https://github.com/brave/brave-browser/issues/40972))([Changelog for 128.0.6613.138](https://chromium.googlesource.com/chromium/src/+log/127.0.6533.120..128.0.6613.138?pretty=fuller&n=10000))

## [1.68.145](https://github.com/brave/brave-browser/releases/tag/v1.68.145)

 - Added feature flag for strict mode in HTTPS by Default. ([#40634](https://github.com/brave/brave-browser/issues/40634))
 - Fixed SSL interstitial pages being displayed incorrectly in certain cases. ([#40617](https://github.com/brave/brave-browser/issues/40617))

## [1.68.134](https://github.com/brave/brave-browser/releases/tag/v1.68.134)

### Web3

 - Added the ability to import BTC accounts (BIP84) into Brave Wallet. ([#38546](https://github.com/brave/brave-browser/issues/38546))
 - Added support to "Send" BTC from iOS. ([#37958](https://github.com/brave/brave-browser/issues/37958))
 - Updated default account names to differentiate between Filecoin mainnet and testnet accounts. ([#38526](https://github.com/brave/brave-browser/issues/38526))
 - Updated “Show Zero Balances” button to be always shown on "Select a Token to Send” screen. ([#38452](https://github.com/brave/brave-browser/issues/38452))
 - Updated network setting to show/hide all networks similar to Brave Wallet on desktop. ([#37741](https://github.com/brave/brave-browser/issues/37741))

### General

 - Added HTTPS strict mode to “Upgrade Connections to HTTPS” setting in “Brave Shields & Privacy”. ([#36408](https://github.com/brave/brave-browser/issues/36408))
 - Added transcription support for Jitsi SDK. ([#38368](https://github.com/brave/brave-browser/issues/38368))
 - Added "Refresh your credentials" button for Leo and VPN if a user has an active subscription purchased on another device. ([#38086](https://github.com/brave/brave-browser/issues/38086))
 - Added "Claude 3 Haiku" (free) and "Claude 3 Sonnet" (premium) models to the Brave Leo model selection list. ([#37989](https://github.com/brave/brave-browser/issues/37989))
 - Added ability to use quick actions via "/" under Brave Leo panel. ([#37297](https://github.com/brave/brave-browser/issues/37297))
 - Added support for conversation API in Leo. ([#39331](https://github.com/brave/brave-browser/issues/39331))
 - Added UI views to handle premium disconnected states in Leo chat. ([#39231](https://github.com/brave/brave-browser/issues/39231))
 - Added name indicator beside the avatar for each message in the Leo chat. ([#37793](https://github.com/brave/brave-browser/issues/37793))
 - Added the ability to close all tabs except active tab using “Close All Other Tabs” in the tab tray context menu. ([#37069](https://github.com/brave/brave-browser/issues/37069))
 - Implemented blocking non-HTTP/HTTPS URLs from loading when opened via Shortcuts. ([#39836](https://github.com/brave/brave-browser/issues/39836))
 - Implemented displaying Sync code expiry when showing the pairing codes. ([#38020](https://github.com/brave/brave-browser/issues/38020))
 - Updated ads service preferences to disable fetching when Brave Rewards/Brave News is disabled. ([#39621](https://github.com/brave/brave-browser/issues/39621))
 - Updated displaying items on History page by handling certain title cases. ([#39550](https://github.com/brave/brave-browser/issues/39550))
 - Updated settings icon design in the Leo chat header. ([#39460](https://github.com/brave/brave-browser/issues/39460))
 - Updated the design for the Leo opt-in notice. ([#38742](https://github.com/brave/brave-browser/issues/38742))
 - Updated Leo chat prompt to add new line instead of submitting the message when pressing “enter” key. ([#39351](https://github.com/brave/brave-browser/issues/39351))
 - Updated the title in the Leo chat product header to “Leo AI”. ([#36917](https://github.com/brave/brave-browser/issues/36917))
 - Fixed issue with Leo chat window being unresponsive after using app switcher while the Leo menu is open. ([#39109](https://github.com/brave/brave-browser/issues/39109))
 - Fixed buttons not working to dismiss the premium upgrade card in Leo chat. ([#39061](https://github.com/brave/brave-browser/issues/39061))
 - Fixed a crash when opening CarPlay without a main Brave window open. ([#38612](https://github.com/brave/brave-browser/issues/38612))
 - Fixed issue with incorrect count being shown when bookmarking all tabs via long pressing on tab tray icon. ([#38340](https://github.com/brave/brave-browser/issues/38340)
 - Fixed issue with tabs bar showing multiple active tabs at once. ([#36102](https://github.com/brave/brave-browser/issues/36102))
 - Fixed issue with the ‘X’ button being grayed out in the current active bar after closing previous active tab. ([#37064](https://github.com/brave/brave-browser/issues/37064))

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
