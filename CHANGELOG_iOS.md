# Changelog

## [1.83.118](https://github.com/brave/brave-browser/releases/tag/v1.83.118)

 - Added a new set of iOS 26 compatible Brave app icons. ([#46799](https://github.com/brave/brave-browser/issues/46799))
 - Added ability to select multiple tabs in the new tab tray. ([#48037](https://github.com/brave/brave-browser/issues/48037))
 - Added the ability to disable the Brave VPN admin policy. ([#48400](https://github.com/brave/brave-browser/issues/48400))
 - Added the ability to disable the Brave News admin policy. ([#48384](https://github.com/brave/brave-browser/issues/48384))
 - Added the ability to disable the Brave Talk admin policy. ([#48352](https://github.com/brave/brave-browser/issues/48352))
 - Added the ability to disable the Rewards admin policy. ([#48318](https://github.com/brave/brave-browser/issues/48318))
 - Added the ability to disable the Brave Leo admin policy. ([#48245](https://github.com/brave/brave-browser/issues/48245))
 - Added the ability to disable the Brave Wallet admin policy. ([#48113](https://github.com/brave/brave-browser/issues/48113))
 - Enabled the search bar to remain fixed at the top when using the new tab tray. ([#49521](https://github.com/brave/brave-browser/issues/49521))
 - Removed from the query string filter one campaign-level parameter and added four potentially user-identifying parameters. ([#47387](https://github.com/brave/brave-browser/issues/47387), [#48226](https://github.com/brave/brave-browser/issues/48226), & [#48228](https://github.com/brave/brave-browser/issues/48228))
 - Removed the "nacl" script previously used as a dependency for audio farbling. ([#48378](https://github.com/brave/brave-browser/issues/48378))
 - Migrated some Brave Shield preferences to content settings. ([#47350](https://github.com/brave/brave-browser/issues/47350))
 - Improved UX when adding a custom filter rule by showing a loading spinner to indicate an “in progress” state. ([#49120](https://github.com/brave/brave-browser/issues/49120))
 - Updated JitsiMeetSDK to version 11.4.0 lite. ([#45417](https://github.com/brave/brave-browser/issues/45417))
 - [Security] Fixed invalid URLs being rendered in Brave Leo as reported on HackerOne by canalun. ([#47906](https://github.com/brave/brave-browser/issues/47906))
 - Fixed the "Find in Page” shortcut not working when using an attached keyboard for iPad. ([#48407](https://github.com/brave/brave-browser/issues/48407))
 - Fixed closed tabs not appearing in "Recently Closed Tabs" list when Reader mode has been enabled. ([#48124](https://github.com/brave/brave-browser/issues/48124))
 - Upgraded Chromium to 141.0.7390.108. ([#50161](https://github.com/brave/brave-browser/issues/50161))([Changelog for 141.0.7390.108](https://chromium.googlesource.com/chromium/src/+log/140.0.7339.213..141.0.7390.108?pretty=fuller&n=10000))

## [1.82.174](https://github.com/brave/brave-browser/releases/tag/v1.82.174)

 - Fixed WebKit crash when compiling content blockers for iOS 26. ([#49722](https://github.com/brave/brave-browser/issues/49722))
 - Fixed a crash involving using the URL bar when playlist items have an invalid duration. ([#49507](https://github.com/brave/brave-browser/issues/49507))
 - Fixed website data not being deleted when using auto-shred on app exit. ([#49464](https://github.com/brave/brave-browser/issues/49464))
 - Upgraded Chromium to 140.0.7339.213. ([#49643](https://github.com/brave/brave-browser/issues/49643))([Changelog for 140.0.7339.213](https://chromium.googlesource.com/chromium/src/+log/140.0.7339.186..140.0.7339.213?pretty=fuller&n=10000))

## [1.82.171](https://github.com/brave/brave-browser/releases/tag/v1.82.171)

 - Implemented modern tab tray UI which can be enabled via brave://flags. ([#47435](https://github.com/brave/brave-browser/issues/47435))
 - Added "Gemma 3 12B" to the list of pre-loaded models. ([#46411](https://github.com/brave/brave-browser/issues/46411))
 - Added customization options for the items in the main menu. ([#47625](https://github.com/brave/brave-browser/issues/47625))
 - Added ability to shred all tabs from the tab tray. ([#47942](https://github.com/brave/brave-browser/issues/47942))
 - Added ability to access private tab related settings from the new tab tray UI. ([#47751](https://github.com/brave/brave-browser/issues/47751))
 - Added an "issue" category dropdown to the webcompat reporter. ([#47507](https://github.com/brave/brave-browser/issues/47507))
 - Enabled Brave Translate feature flag by default. ([#47383](https://github.com/brave/brave-browser/issues/47383))
 - Removed "Llama Vision" from the default model list. ([#47577](https://github.com/brave/brave-browser/issues/47577))
 - Improved syncing tabs to desktop by also including inactive tabs. ([#47054](https://github.com/brave/brave-browser/issues/47054))
 - Improved adblocking. ([#46292](https://github.com/brave/brave-browser/issues/46292), [#46290](https://github.com/brave/brave-browser/issues/46290), & [#46289](https://github.com/brave/brave-browser/issues/46289))
 - Updated the logic for the "Highest Quality Playback” media setting to reduce video quality when using mobile data. ([#47426](https://github.com/brave/brave-browser/issues/47426))
 - [Security] Fixed prompt not displaying the correct URL when using “switch to external application” as reported on HackerOne by severusstalin. ([#47986](https://github.com/brave/brave-browser/issues/47986))
 - [Security] Fixed improper URL handling when using “Open in Brave” from the share sheet as reported on HackerOne by severusstalin. ([#49146](https://github.com/brave/brave-browser/issues/49146))
 - Fixed a crash occurring in Leo in certain cases. ([#48304](https://github.com/brave/brave-browser/issues/48304))
 - Fixed a crash when removing a custom URL filter list. ([#49277](https://github.com/brave/brave-browser/issues/49277))
 - Fixed shuffle preference not persisting after disconnecting and then reconnecting to CarPlay. ([#46631](https://github.com/brave/brave-browser/issues/46631))
 - Fixed debouncing not working as expected with Chromium Web Embedder enabled. ([#48763](https://github.com/brave/brave-browser/issues/48763))
 - Fixed query parameters not being stripped from URL when using "Copy Clean Link”. ([#48601](https://github.com/brave/brave-browser/issues/48601))
 - Fixed NTT not being shown after clearing ads data. ([#44966](https://github.com/brave/brave-browser/issues/44966))
 - Fixed reader mode UI being shown in other tabs when changing device orientation. ([#47272](https://github.com/brave/brave-browser/issues/47272))
 - Fixed missing “Add to reading list” context item in the share menu. ([#47252](https://github.com/brave/brave-browser/issues/47252))
 - Fixed issue where a white flash would sometimes appear when closing or opening a new tab. ([#47026](https://github.com/brave/brave-browser/issues/47026))
 - Upgraded Chromium to 140.0.7339.186. ([#49381](https://github.com/brave/brave-browser/issues/49381))([Changelog for 140.0.7339.186](https://chromium.googlesource.com/chromium/src/+log/139.0.7258.66..140.0.7339.186?pretty=fuller&n=10000))

## [1.81.134](https://github.com/brave/brave-browser/releases/tag/v1.81.134)

### Web3 

 - Added support for resolving new Unstoppable Domains TLDs including .brave TLD. ([#46271](https://github.com/brave/brave-browser/issues/46271))
 - Added a Brave proxy for Zcash mainnet endpoint. ([#46266](https://github.com/brave/brave-browser/issues/46266))
 - Enabled ZCash feature flag by default. ([#48171](https://github.com/brave/brave-browser/issues/48171))
 - Fixed issue with web views not reloading when default Solana Wallet provider is changed. ([#47676](https://github.com/brave/brave-browser/issues/47676))

### General

 - Implemented the ability to block YouTube distracting elements and remove Shorts. ([#37966](https://github.com/brave/brave-browser/issues/37966))
 - Added support for Serbian and Bulgarian languages. ([#47384](https://github.com/brave/brave-browser/issues/47384))
 - Added standalone synced tabs UI. ([#46478](https://github.com/brave/brave-browser/issues/46478))
 - Added "Survey Panelists" feature which allows users to opt-in to surveys from Brave. ([#45990](https://github.com/brave/brave-browser/issues/45990))
 - Added light theme option for UI when private browsing. ([#46371](https://github.com/brave/brave-browser/issues/46371))
 - Improved performance by offloading background tab data updates from the main thread. ([#46551](https://github.com/brave/brave-browser/issues/46551))
 - Improved performance when handling attribution referral code generation. ([#46501](https://github.com/brave/brave-browser/issues/46501))
 - Improved performance when fetching all recently closed tabs after each navigation. ([#46504](https://github.com/brave/brave-browser/issues/46504))
 - Improved performance by removing speech recognizer offline availability checks from the main thread. ([#46413](https://github.com/brave/brave-browser/issues/46413))
 - Improved reliability for procedural filtering with better error handling and compatibility support. ([#46294](https://github.com/brave/brave-browser/issues/46294)
 - Updated UI in sync settings. ([#46625](https://github.com/brave/brave-browser/issues/46625)
 - [Security] Fixed file extensions not being shown when downloading files with long names as reported on HackerOne by severusstalin. ([#45988](https://github.com/brave/brave-browser/issues/45988))
 - Fixed open tab appearing blank after clearing site data. ([#47576](https://github.com/brave/brave-browser/issues/47576))
 - Fixed several items missing from the highlight context menu when using standard web views. ([#47503](https://github.com/brave/brave-browser/issues/47503))
 - Fixed “Open in Brave” sharesheet action item being incorrectly translated. ([#46878](https://github.com/brave/brave-browser/issues/46878))
 - Upgraded Chromium to 139.0.7258.66. ([#48048](https://github.com/brave/brave-browser/issues/48048))([Changelog for 139.0.7258.66](https://chromium.googlesource.com/chromium/src/+log/138.0.7204.101..139.0.7258.66?pretty=fuller&n=10000))
 
## [1.80.121](https://github.com/brave/brave-browser/releases/tag/v1.80.121)

 - Fixed sync related crash when browser is launched. ([#47375](https://github.com/brave/brave-browser/issues/47375))
 - Upgraded Chromium to 138.0.7204.101. ([#47476](https://github.com/brave/brave-browser/issues/47476))([Changelog for 138.0.7204.101](https://chromium.googlesource.com/chromium/src/+log/138.0.7204.97..138.0.7204.101?pretty=fuller&n=10000))

## [1.80.116](https://github.com/brave/brave-browser/releases/tag/v1.80.116)

 - Added "Recently Closed Tabs” section to History UI. ([#45679](https://github.com/brave/brave-browser/issues/45679))
 - Added eTLD+1 extension on URL and baseDomain improvements. ([#44214](https://github.com/brave/brave-browser/issues/44214))
 - Enabled new onboarding UI for all regions. ([#47061](https://github.com/brave/brave-browser/issues/47061))
 - Dropped support for iOS 16. ([#45702](https://github.com/brave/brave-browser/issues/45702))
 - Removed “Show in Address Bar” preference from Leo settings. ([#47091](https://github.com/brave/brave-browser/issues/47091))
 - Updated Playlist UI by replacing seek interval with previous/next buttons in the main controls. ([#46104](https://github.com/brave/brave-browser/issues/46104))
 - [Security] Fixed launching external app links with Chromium Web Views enabled as reported on HackerOne by syarif07. ([#46854](https://github.com/brave/brave-browser/issues/46854))
 - [Security] Fixed URL bar text not being reverted in certain cases when a new frame is loaded as reported on HackerOne by frozzipies. ([#47107](https://github.com/brave/brave-browser/issues/47107))
 - Fixed quick searches accessed via search history opening the incorrect search engine. ([#45384](https://github.com/brave/brave-browser/issues/45384))
 - Fixed “Original Text” string being shown when using Translate on https://api-dashboard.search.brave.com/app/documentation/web-search/get-started with Reader Mode enabled. ([#46446](https://github.com/brave/brave-browser/issues/46446))
 - Fixed “:matches-path()” type selector hiding the entire webpage when used in the beginning of a procedural filter script. ([#46220](https://github.com/brave/brave-browser/issues/46220))
 - Fixed "Chinese, Simplified" and "Chinese, Traditional" providing the exact same translation for websites. ([#45946](https://github.com/brave/brave-browser/issues/45946))
 - Fixed tabs being opened in private mode when launching a new Private Window. ([#45827](https://github.com/brave/brave-browser/issues/45827))
 - Fixed issue where Leo is allowed to be launched via the Shortcut button when private browsing. ([#46423](https://github.com/brave/brave-browser/issues/46423))
 - Fixed the suggestion sections in the omnibox being blocked by the keyboard. ([#45803](https://github.com/brave/brave-browser/issues/45803))
 - Fixed URLs with “blob” or “data” schemes not opening if triggered as pop-up using window.open. ([#45647](https://github.com/brave/brave-browser/issues/45647))
 - Upgraded Chromium to 138.0.7204.97. ([#47276](https://github.com/brave/brave-browser/issues/47276))([Changelog for 138.0.7204.97](https://chromium.googlesource.com/chromium/src/+log/137.0.7151.104..138.0.7204.97?pretty=fuller&n=10000))

## [1.79.124](https://github.com/brave/brave-browser/releases/tag/v1.79.124)

 - Added search omnibox UI upgrades. ([#44257](https://github.com/brave/brave-browser/issues/44257))
 - Added "Deepseek R1" model to Leo for premium users. ([#45454](https://github.com/brave/brave-browser/issues/45454))
 - Updated procedural filtering to be applied on mutated elements. ([#46046](https://github.com/brave/brave-browser/issues/46046)), ([#46358](https://github.com/brave/brave-browser/issues/46358))
 - Updated procedural filtering being applied to mutated elements with dynamically added child elements. ([#46208](https://github.com/brave/brave-browser/issues/46208))
 - [Security] Fixed share sheet title showing two URLs instead of one as reported on HackerOne by severusstalin. ([#46178](https://github.com/brave/brave-browser/issues/46178))
 - Fixed crash occurring when files are being downloaded for users using iOS 16.0-16.3. ([#46682](https://github.com/brave/brave-browser/issues/46682))
 - Fixed the order in the Quick-Search engine scroll view being offset when Leo is disabled. ([#46421](https://github.com/brave/brave-browser/issues/46421))
 - Fixed downloads failing to start when triggered in a new tab. ([#46323](https://github.com/brave/brave-browser/issues/46323))
 - Fixed the translate button being shown on webpages with invalid languages. ([#45779](https://github.com/brave/brave-browser/issues/45779))
 - Fixed an issue for iPad users where the Shortcut button was not being hidden. ([#45612](https://github.com/brave/brave-browser/issues/45612))
 - Fixed articles not being loaded when tapping on the Brave News widget thumbnail. ([#45609](https://github.com/brave/brave-browser/issues/45609))
 - Fixed og:image meta data from being requested for all sites. ([#45268](https://github.com/brave/brave-browser/issues/45268))
 - Fixed playback time in Playlist displaying incorrectly for longer videos. ([#45033](https://github.com/brave/brave-browser/issues/45033))
 - Fixed Japanese videos that contain Japanese titles failing to save offline in Playlist. ([#46236](https://github.com/brave/brave-browser/issues/46236))
 - Fixed tabs being incorrectly switched to either Normal or Private mode when using Shred. ([#45001](https://github.com/brave/brave-browser/issues/45001))
 - Fixed New Tab Page (NTP) background images not being loaded immediately when switching tabs. ([#46379](https://github.com/brave/brave-browser/issues/46379))
 - Upgraded Chromium to 137.0.7151.104. ([#46712](https://github.com/brave/brave-browser/issues/46712))([Changelog for 137.0.7151.104](https://chromium.googlesource.com/chromium/src/+log/136.0.7103.113..137.0.7151.104?pretty=fuller&n=10000))

## [1.78.104](https://github.com/brave/brave-browser/releases/tag/v1.78.104)

 - Fixed script blocking affecting other websites when enabled in shields panel for particular webpage. ([#46155](https://github.com/brave/brave-browser/issues/46155))
 - Fixed page zoom having no effect on the webpage when active. ([#46200](https://github.com/brave/brave-browser/issues/46200))

## [1.78.103](https://github.com/brave/brave-browser/releases/tag/v1.78.103)

 - Implemented Picture-in-Picture animation when setting default browser in the onboarding flow. ([#44182](https://github.com/brave/brave-browser/issues/44182))
 - Added new custom app icon designs. ([#44587](https://github.com/brave/brave-browser/issues/44587))
 - Added localization enhancements to the default browser onboarding animation for UK and Japan users. ([#44183](https://github.com/brave/brave-browser/issues/44183))
 - Added shuffle button to the Brave Playlist player in CarPlay. ([#43691](https://github.com/brave/brave-browser/issues/43691))
 - Added page loading indicator to the VPN region selection screen. ([#45371](https://github.com/brave/brave-browser/issues/45371))
 - Added privacy warning dialog when submitting Leo chat feedback. ([#45947](https://github.com/brave/brave-browser/issues/45947))
 - Re-enabled toggle visibility for “Block All Cookies” setting and also moved it into “Other Privacy Settings”. ([#45457](https://github.com/brave/brave-browser/issues/45457))
 - Removed dialog from being displayed for successfully exporting bookmarks. ([#44654](https://github.com/brave/brave-browser/issues/44654))
 - Improved support for downloading bundled Apple Wallet passes. ([#43338](https://github.com/brave/brave-browser/issues/43338))
 - Improved Leo chat operations by increasing the limit for associated content length in responses. ([#43928](https://github.com/brave/brave-browser/issues/43928))
 - Improved Playlist video downloading with an additional background fallback method. ([#44652](https://github.com/brave/brave-browser/issues/44652)) 
 - [Security] Fixed issue where file extensions for downloaded files are being hidden as reported on HackerOne by b4dc4t. ([#45433](https://github.com/brave/brave-browser/issues/45433))
 - [Security] Fixed issue with Tel: protocol prompts showing other origin as reported on HackerOne by frozzipies. ([#44719](https://github.com/brave/brave-browser/issues/44719))
 - [Security] Fixed links not opening in a private tab when using private browsing mode. ([#45389](https://github.com/brave/brave-browser/issues/45389))
 - Fixed “Block Scripts” and “Block Fingerprinting” toggle being shown as disabled after toggling Brave Shields. ([#43968](https://github.com/brave/brave-browser/issues/43968))
 - Fixed VPN not enabling in the case where the server is manually selected from the list. ([#45370](https://github.com/brave/brave-browser/issues/45370))
 - Fixed VPN server country not being updated after connecting. ([#45364](https://github.com/brave/brave-browser/issues/45364))
 - Fixed VPN connection status not displaying correctly in region selection screen. ([#45365](https://github.com/brave/brave-browser/issues/45365))
 - Fixed P3A onboarding page content from being clipped when using accessibility zoom. ([#44646](https://github.com/brave/brave-browser/issues/44646))
 - Fixed videos with non-Latin characters failing to save offline in Playlist. ([#42764](https://github.com/brave/brave-browser/issues/42764))
 - Upgraded Chromium to 136.0.7103.113. ([#46065](https://github.com/brave/brave-browser/issues/46065))([Changelog for 136.0.7103.113](https://chromium.googlesource.com/chromium/src/+log/135.0.7049.84..136.0.7103.113?pretty=fuller&n=10000))

## [1.77.98](https://github.com/brave/brave-browser/releases/tag/v1.77.98)

 - Implemented an exception list for Night Mode. ([#44213](https://github.com/brave/brave-browser/issues/44213))
 - Improved the performance of searching using URL bar for users with many bookmarks, tabs and history items. ([#43703](https://github.com/brave/brave-browser/issues/43703))
 - Improved search results filtering and auto-complete when using the URL bar. ([#44842](https://github.com/brave/brave-browser/issues/44842))
 - Improved cosmetic filtering performance. ([#42530](https://github.com/brave/brave-browser/issues/42530))
 - Updated default search engine to Yahoo! JAPAN for new installations in Japan region. ([#43311](https://github.com/brave/brave-browser/issues/43311))
 - Updated Brave Translate to hide "contribution" element in reader mode. ([#44835](https://github.com/brave/brave-browser/issues/44835))
 - Updated Brave Translate onboarding. ([#44650](https://github.com/brave/brave-browser/issues/44650))
 - Updated the “Enable Global Privacy Control” settings toggle placement to be at the bottom of the advanced settings page. ([#43690](https://github.com/brave/brave-browser/issues/43690))
 - [Security] Fixed several issues relating to blob URL spoofing as reported on HackerOne by b4dc4t and frozzipies. ([#43654](https://github.com/brave/brave-browser/issues/43654))
 - Fixed crash when clearing a large amount of history. ([#44981](https://github.com/brave/brave-browser/issues/44981))
 - Fixed normal tabs being removed when disabling the “Keep Private Tabs” setting toggle. ([#45350](https://github.com/brave/brave-browser/issues/45350))
 - Fixed an issue where tabs are not blocking pop-ups after switching from another tab. ([#44419](https://github.com/brave/brave-browser/issues/44419))
 - Fixed "Default Model View" page not loading under Brave Leo hamburger settings. ([#44072](https://github.com/brave/brave-browser/issues/44072))
 - Fixed audio continuing to play for users that closed a tab which showed a JavaScript alert. ([#43699](https://github.com/brave/brave-browser/issues/43699))
 - Fixed “Shred Site Data” not working while using reader mode. ([#43663](https://github.com/brave/brave-browser/issues/43663))
 - Fixed URL auto-complete issue when using Hindi transliteration keyboard. ([#43270](https://github.com/brave/brave-browser/issues/43270))
 - Upgraded Chromium to 135.0.7049.84. ([#45297](https://github.com/brave/brave-browser/issues/45297))([Changelog for 135.0.7049.84](https://chromium.googlesource.com/chromium/src/+log/134.0.6998.95..135.0.7049.84?pretty=fuller&n=10000))

## [1.76.77](https://github.com/brave/brave-browser/releases/tag/v1.76.77)

 - Added Brave Translate for page translations. ([#40782](https://github.com/brave/brave-browser/issues/40782))
 - Added generalization for the model names in Leo chat. ([#44195](https://github.com/brave/brave-browser/issues/44195))
 - Added warning text in the setting description when user enables “Block all cookies”. ([#42295](https://github.com/brave/brave-browser/issues/42295))
 - Added the ability to select custom app icons for Brave. ([#43141](https://github.com/brave/brave-browser/issues/43141))
 - Disabled TLS 1.0 and TLS 1.1 due to versions being deprecated. ([#43819](https://github.com/brave/brave-browser/issues/43819))
 - Fixed crash when enabling "Open Tabs" syncing. ([#44380](https://github.com/brave/brave-browser/issues/44380))
 - Fixed parent tab permission pop-ups being shown on child tabs as reported on HackerOne by b4dc4t. ([#44061](https://github.com/brave/brave-browser/issues/44061))
 - Fixed URL being incorrectly displayed when scanning QR codes as reported on HackerOne by roland_hack. ([#42559](https://github.com/brave/brave-browser/issues/42559))
 - Fixed text resizing issue for old.reddit.com posts when in Night Mode. ([#43096](https://github.com/brave/brave-browser/issues/43096))
 - Fixed background color for New Tabs when in Dark Mode. ([#44270](https://github.com/brave/brave-browser/issues/44270))
 - Fixed clipboard lookups when searching from the URL bar using the Kana Japanese keyboard. ([#42526](https://github.com/brave/brave-browser/issues/42526))
 - Fixed UI error when comparing cached content blocker rule list versions. ([#44156](https://github.com/brave/brave-browser/issues/44156))
 - Upgraded Chromium to 134.0.6998.95. ([#44589](https://github.com/brave/brave-browser/issues/44589))([Changelog for 134.0.6998.95](https://chromium.googlesource.com/chromium/src/+log/133.0.6943.98..134.0.6998.95?pretty=fuller&n=10000))

## [1.75.179](https://github.com/brave/brave-browser/releases/tag/v1.75.179)

### Web3

 - Added new updates to the transaction status screen. ([#26146](https://github.com/brave/brave-core/pull/26146))
 - Added “Speed up” button on wallet transaction status screen. ([#41800](https://github.com/brave/brave-browser/issues/41800))
 - Added “Cancel Transaction” button on wallet transaction status screen. ([#41799](https://github.com/brave/brave-browser/issues/41799))
 - Added support for resolving new Unstoppable Domains TLDs. ([#42368](https://github.com/brave/brave-browser/issues/42368))

### General

 - Added new customizable hamburger menu (being rolled out in phases using Griffin starting at 15%). ([#42836](https://github.com/brave/brave-browser/issues/42836))
 - Added Smart-Proxy and Kill-Switch support for Brave VPN. ([#42275](https://github.com/brave/brave-browser/issues/42275))
 - Added Shred feature to the contextual menu. ([#42240](https://github.com/brave/brave-browser/issues/42240))
 - Added support for custom site distillers. ([#40794](https://github.com/brave/brave-browser/issues/40794))
 - Added brave://ads-internals page for managing ads data. ([#40952](https://github.com/brave/brave-browser/issues/40952))
 - Added brave://flags/#block-all-cookies-toggle to enable the ability to block all cookies. ([#42061](https://github.com/brave/brave-browser/issues/42061))
 - Added new ”Store contact information for future broken site reports” toggle under the WebCompat reporter which is enabled by default. ([#40021](https://github.com/brave/brave-browser/issues/40021))
 - Implemented new version of onboarding flow for United Kingdom and Japan locales. ([#43020](https://github.com/brave/brave-browser/issues/43020))
 - Implemented 3-second timer before falling back to HTTP when upgrading to HTTPS. ([#42684](https://github.com/brave/brave-browser/issues/42684))
 - Implemented search for local items saved in Playlist. ([#42437](https://github.com/brave/brave-browser/issues/42437))
 - Removed external app prompts for “tel:”, “facetime:” and “facetime-audio:” schemes. ([#43065](https://github.com/brave/brave-browser/issues/43065))
 - Updated the country flag in the “VPN Region Changed” card to be aligned with the heading. ([#41916](https://github.com/brave/brave-browser/issues/41916))
 - [Security] Fixed issue with notifications pop-up not being displayed when profile is downloaded as reported on HackerOne by b4dc4t. ([#43092](https://github.com/brave/brave-browser/issues/43092))
 - [Security] Fixed address bar not displaying URL for “about:blank” pages as reported on HackerOne by b4dc4t. ([#43016](https://github.com/brave/brave-browser/issues/43016))
 - [Security] Fixed “tel:” pop-up not being shown on the correct page as reported on HackerOne by b4dc4t. ([#42986](https://github.com/brave/brave-browser/issues/42986))
 - Fixed crash when closing tabs in tab view while in landscape orientation. ([#42601](https://github.com/brave/brave-browser/issues/42601))
 - Fixed issue with content filtering in local frames. ([#40649](https://github.com/brave/brave-browser/issues/40649))
 - Fixed ads or metadata being shown in YouTube videos intermittently. ([#43454](https://github.com/brave/brave-browser/issues/43454))
 - Fixed location not being shown in the “VPN Region Changed” card. ([#41915](https://github.com/brave/brave-browser/issues/41915))
 - Fixed issue with “VPN Region Changed” card getting stuck on screen when quickly navigating out of the settings page. ([#41831](https://github.com/brave/brave-browser/issues/41831))
 - Fixed the VPN advanced server selection list not being displayed after relaunching Brave. ([#40855](https://github.com/brave/brave-browser/issues/40855))
 - Fixed losing position of video after exiting Playlist. ([#42620](https://github.com/brave/brave-browser/issues/42620))
 - Fixed not being able to add new videos in Playlist. ([#41555](https://github.com/brave/brave-browser/issues/41555))
 - Fixed control labels being shown for the Playlist controls for iOS 16 users. ([#42509](https://github.com/brave/brave-browser/issues/42509))
 - Fixed issue with video duration not shown correctly in the Playlist drawer view. ([#42569](https://github.com/brave/brave-browser/issues/42569))
 - Fixed the Leo “suggest questions” button causing UI to be unresponsive when clicked. ([#43366](https://github.com/brave/brave-browser/issues/43366))
 - Fixed issue where files with the same name couldn't be downloaded multiple times. ([#41284](https://github.com/brave/brave-browser/issues/41284))
 - Fixed blank screen being displayed when loading “https://dillards.com/” when shields are raised. ([#43286](https://github.com/brave/brave-browser/issues/43286))
 - Fixed rendering websites in dark mode which set a transparent background color. ([#43214](https://github.com/brave/brave-browser/issues/43214))
 - Fixed tabs bar disappearing with 2 or more tabs. ([#42272](https://github.com/brave/brave-browser/issues/42272))
 - Fixed tabs bar not being scrollable for some users. ([#41562](https://github.com/brave/brave-browser/issues/41562))
 - Fixed Readermode not working intermittently under Brave’s RSS feed. ([#43034](https://github.com/brave/brave-browser/issues/43034))
 - Fixed screen flashing white when loading content when in Dark/Night mode. ([#42929](https://github.com/brave/brave-browser/issues/42929))
 - Upgraded Chromium to 133.0.6943.98. ([#43927](https://github.com/brave/brave-browser/issues/43927))([Changelog for 133.0.6943.98](https://chromium.googlesource.com/chromium/src/+log/132.0.6834.83..133.0.6943.98?pretty=fuller&n=10000))

## [1.74.49](https://github.com/brave/brave-browser/releases/tag/v1.74.49)

### Web3

 - Updated 0x "Swap" API to v2. ([#41891](https://github.com/brave/brave-browser/issues/41891))

### General

 - Added the ability to scrub anywhere when playing videos in full screen in Playlist. ([#42442](https://github.com/brave/brave-browser/issues/42442))
 - Added some system player functionality on the device locked screen including support for play/pause and next/previous track on AirPods. ([#42370](https://github.com/brave/brave-browser/issues/42370))
 - Updated Yandex as default search engine for Uzbekistan region rather than Tanzania. ([#42023](https://github.com/brave/brave-browser/issues/42023))
 - Fixed crash in Brave Playlist when adding very short GIF videos. ([#42638](https://github.com/brave/brave-browser/issues/42638))
 - Fixed subscription status sometimes showing “Monthly Subscription” after purchasing Leo Premium yearly subscription. ([#42507](https://github.com/brave/brave-browser/issues/42507))
 - Fixed playlist UI not updating when moving, re-ordering or deleting items in player queue. ([#42355](https://github.com/brave/brave-browser/issues/42355))
 - Fixed playback speed buttons not working in Playlist fullscreen for iPad. ([#41892](https://github.com/brave/brave-browser/issues/41892))
 - Fixed VPN allowing profile to be installed when subscription is not purchased. ([#41887](https://github.com/brave/brave-browser/issues/41887))
 - Fixed “Share Private & Anonymous Product Insights” toggle being re-enabled after opening the “Learn more…” hyperlink in the onboarding flow. ([41777](https://github.com/brave/brave-browser/issues/41777))
 - Fixed “Advanced Settings” in Leo menu not being shown after upgrading app for certain premium subscribers. ([#41579](https://github.com/brave/brave-browser/issues/41579))
 - Upgraded Chromium to 132.0.6834.83. ([#43183](https://github.com/brave/brave-browser/issues/43183))([Changelog for 132.0.6834.83](https://chromium.googlesource.com/chromium/src/+log/131.0.6778.108..132.0.6834.83?pretty=fuller&n=10000))

## [1.73.97](https://github.com/brave/brave-browser/releases/tag/v1.73.97)

### Web3

 - Improved Solana swap failure rate. ([#42434](https://github.com/brave/brave-browser/issues/42434))

### General

 - Added 7 day trial and annual subscription support for Leo. ([#37961](https://github.com/brave/brave-browser/issues/37961))
 - Added customization to "Shortcut" button in the toolbar. ([#41031](https://github.com/brave/brave-browser/issues/41031))
 - Added support for Hebrew, Vietnamese and Thai languages. ([#42181](https://github.com/brave/brave-browser/issues/42181))
 - Added French, German, Italian and Spanish language support for Leo system prompts. ([#41554](https://github.com/brave/brave-browser/issues/41554))
 - Added support for procedural cosmetic filtering. ([#16935](https://github.com/brave/brave-browser/issues/16935))
 - Added “Copy Clean Link” option to the context menu in the URL bar for selected text. ([#41302](https://github.com/brave/brave-browser/issues/41302))
 - Improved Playlist UI responsiveness by converting some fetch operations to be asynchronous. ([#42501](https://github.com/brave/brave-browser/issues/42501))
 - Updated the “Edit” button to “Done” when editing custom search engines. ([#39552](https://github.com/brave/brave-browser/issues/39552))
 - Updated sizing for some icons in the toolbar to be more uniform. ([#41405](https://github.com/brave/brave-browser/issues/41405))
 - Fixed crash when accessing Leo when feature flag is disabled. ([#42150](https://github.com/brave/brave-browser/issues/42150))
 - Fixed crash in Leo when sending queries using “REWRITE” options in slash tools. ([#42443](https://github.com/brave/brave-browser/issues/42443))
 - Fixed crash when purchasing Leo subscription after VPN is purchased. ([#42268](https://github.com/brave/brave-browser/issues/42268))
 - Fixed Playlist crashing in the background due to excessive CPU usage. ([#42408](https://github.com/brave/brave-browser/issues/42408))
 - Fixed Playlist items not deleting due to having invalid cache. ([#41252](https://github.com/brave/brave-browser/issues/41252))
 - Fixed not being able to re-order Playlist items when users have multiple folders. ([#42318](https://github.com/brave/brave-browser/issues/42318))
 - Fixed a leak resulting in two Playlist items playing at once in the background. ([#42344](https://github.com/brave/brave-browser/issues/42344))
 - Fixed Playlist audio being paused momentarily when locking/unlocking device. ([#42468](https://github.com/brave/brave-browser/issues/42468))
 - Fixed URL being opened in normal tab first when choosing "Open In New Private Tab" via long-press context menu in Playlist. ([#42357](https://github.com/brave/brave-browser/issues/42357))
 - Fixed VPN Region shortcut to update the active region when changing servers. ([#41051](https://github.com/brave/brave-browser/issues/41051))
 - Fixed opening bookmarks via the URL bar searches for the website via default search engine rather than directly opening the bookmarked website. ([#41910](https://github.com/brave/brave-browser/issues/41910))
 - Fixed HTTP scheme being shown when loading insecure websites. ([#42070](https://github.com/brave/brave-browser/issues/42070))
 - Fixed missing favicon on NTP in private browsing. ([#40935](https://github.com/brave/brave-browser/issues/40935))
 - Fixed generic cosmetic filter list rules not being applied on certain websites. ([#42471](https://github.com/brave/brave-browser/issues/42471))
 - Fixed Night Mode not working on sites such as https://community.brave.app and https://old.reddit.com. ([#41888](https://github.com/brave/brave-browser/issues/41888))
 - Upgraded Chromium to 131.0.6778.108. ([#42639](https://github.com/brave/brave-browser/issues/42639))([Changelog for 131.0.6778.108](https://chromium.googlesource.com/chromium/src/+log/130.0.6723.116..131.0.6778.108?pretty=fuller&n=10000))

## [1.71.125](https://github.com/brave/brave-browser/releases/tag/v1.71.125)

### Web3

 - Added support for resolving new UD TLDs. ([#40543](https://github.com/brave/brave-browser/issues/40543))
 - Fixed inability to send any non-compressed Solana NFT from Brave Wallet. ([#40424](https://github.com/brave/brave-browser/issues/40424))

### General

 - Implemented local vector search for the selection of key text segments of page and video context in Brave Leo. ([#36801](https://github.com/brave/brave-browser/issues/36801))
 - Added support for running Brave in compatibility mode on VisionOS. ([#40579](https://github.com/brave/brave-browser/issues/40579))
 - Added Italy and Argentina support for Brave News. ([#40996](https://github.com/brave/brave-browser/issues/40996))
 - Added ability to cancel action when deleting all history. ([#41148](https://github.com/brave/brave-browser/issues/41148))
 - Added support for editing Leo responses in chat. ([#40208](https://github.com/brave/brave-browser/issues/40208))
 - Added additional locale support to Top News Widgets. ([#40298](https://github.com/brave/brave-browser/issues/40298))
 - Removed known tracking parameter "_bhlid" from URLs. ([#40716](https://github.com/brave/brave-browser/issues/40716))
 - Removed known tracking parameter "srsltid" from URLs. ([#40912](https://github.com/brave/brave-browser/issues/40912))
 - [Security] Fixed Reader mode leaking meta data to cross-origin image URLs as reported on HackerOne by newfunction. ([#41444](https://github.com/brave/brave-browser/issues/41444))
 - Updated Playlist UI. ([#40911](https://github.com/brave/brave-browser/issues/40911))
 - Fixed crash when requesting media permissions on certain websites. ([#41639](https://github.com/brave/brave-browser/issues/41639))
 - Fixed crash when loading bundled favicon in certain cases. ([#41697](https://github.com/brave/brave-browser/issues/41697))
 - Fixed crash in Playlist when deleting offline data. ([#41232](https://github.com/brave/brave-browser/issues/41232))
 - Fixed crash when loading interstitial pages in certain cases. ([#42162](https://github.com/brave/brave-browser/issues/42162))
 - Fixed “Refresh your credentials” button not working intermittently for premium users. ([#38086](https://github.com/brave/brave-browser/issues/38086))
 - Upgraded Chromium to 130.0.6723.116. ([#42088](https://github.com/brave/brave-browser/issues/42088))([Changelog for 130.0.6723.116](https://chromium.googlesource.com/chromium/src/+log/129.0.6668.100..130.0.6723.116?pretty=fuller&n=10000))

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
