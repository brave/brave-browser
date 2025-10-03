# Changelog

## [1.83.109](https://github.com/brave/brave-browser/releases/tag/v1.83.109)

 - Fixed crash on launch which occurred in certain cases due to a missing "setting" value for the "cosmeticFiltering" key in the "Preference" file. ([#49861](https://github.com/brave/brave-browser/issues/49861))

## [1.83.108](https://github.com/brave/brave-browser/releases/tag/v1.83.108)

### Web3

 - Added a warning message to "Sign Permit" requests. ([#48900](https://github.com/brave/brave-browser/issues/48900))
 - Updated "Transaction" list to be virtualized. ([#49576](https://github.com/brave/brave-browser/issues/49576))
 - Updated UI to display "DApp Radar" information if a DApp can be verified. ([#47884](https://github.com/brave/brave-browser/issues/47884))
 - Updated Brave Wallet Admin policy. ([#47458](https://github.com/brave/brave-browser/issues/47458))
 - Fixed domain text not wrapping in the "Connections" panel. ([#48748](https://github.com/brave/brave-browser/issues/48748))
 - Fixed "Forgot to save? Go back" button routing during recovery phrase backup. ([#48174](https://github.com/brave/brave-browser/issues/48174))

### Leo

 - Added memory management tool for adding memories in Brave Leo UI during conversations. ([#47982](https://github.com/brave/brave-browser/issues/47982))
 - Added support for drag and drop for Brave Leo image attachments. ([#48120](https://github.com/brave/brave-browser/issues/48120))
 - Added support for pasting images into Brave Leo. ([#46468](https://github.com/brave/brave-browser/issues/46468))
 - Added support for uploading PDFs as an attachment into Brave Leo. ([#48151](https://github.com/brave/brave-browser/issues/48151))
 - Moved model selector to input box. ([#48381](https://github.com/brave/brave-browser/issues/48381))
 - Resized Brave Leo slash tools icon. ([#48435](https://github.com/brave/brave-browser/issues/48435))
 - Updated Brave Leo to allow context menu in the sidebar. ([#48177](https://github.com/brave/brave-browser/issues/48177))

### General

 - Added list descriptions to the "Filter lists" displayed in brave://settings/shields/filters. ([#48694](https://github.com/brave/brave-browser/issues/48694))
 - [Security] Updated split view to respect SameSite attribute as reported on HackerOne by mingijung. ([#47642](https://github.com/brave/brave-browser/issues/47642))
 - [Security] Removed incorrectly elided URL from shields panel as reported on HackerOne by apapedulimu. ([#48313](https://github.com/brave/brave-browser/issues/48313))
 - Increased number of custom New Tab Page background images a user can upload from 24 to 48 images. ([#47928](https://github.com/brave/brave-browser/issues/47928))
 - Updated the New Tab Page design (being rolled out in phases using Griffin starting at 15%). ([#41483](https://github.com/brave/brave-browser/issues/41483))
 - Updated the navigation bar styling for settings, history, bookmarks, and downloads. ([#47931](https://github.com/brave/brave-browser/issues/47931))
 - Updated split view to show 3 dots menu at the bottom of each split view tab. ([#48984](https://github.com/brave/brave-browser/issues/48984))
 - Disabled WebRTC in Tor windows as reported on HackerOne by robert_min1. ([#48051](https://github.com/brave/brave-browser/issues/48051))
 - Removed 7-day lifetime-capping for JavaScript cookies. ([#48063](https://github.com/brave/brave-browser/issues/48063))
 - Removed from the query string filter one campaign-level parameter and added four potentially user-identifying parameters. ([#47387](https://github.com/brave/brave-browser/issues/47387), [#48226](https://github.com/brave/brave-browser/issues/48226), & [#48228](https://github.com/brave/brave-browser/issues/48228))
 - Fixed brave://settings/system/shortcuts displaying shortcuts for items which are disabled by Admin policy. ([#47455](https://github.com/brave/brave-browser/issues/47455))
 - Fixed Tor windows being mentioned in Private Windows when Tor is disabled via Admin policy. ([#7921](https://github.com/brave/brave-browser/issues/7921))
 - Fixed misalignment of search icon on Private Windows. ([#48073](https://github.com/brave/brave-browser/issues/48073))
 - Fixed active tab colors not changing according to theme. ([#48431](https://github.com/brave/brave-browser/issues/48431))
 - Upgraded Chromium to 141.0.7390.55. ([#49783](https://github.com/brave/brave-browser/issues/49783)) ([Changelog for 141.0.7390.55](https://chromium.googlesource.com/chromium/src/+log/140.0.7339.213..141.0.7390.55?pretty=fuller&n=1000))

## [1.82.173](https://github.com/brave/brave-browser/releases/tag/v1.82.173)

 - Upgraded Chromium to 140.0.7339.213 on macOS. ([#49643](https://github.com/brave/brave-browser/issues/49643)) ([Changelog for 140.0.7339.213](https://chromium.googlesource.com/chromium/src/+log/140.0.7339.207..140.0.7339.213?pretty=fuller&n=1000))

## [1.82.172](https://github.com/brave/brave-browser/releases/tag/v1.82.172)

 - Fixed crash which could occur when using Cyrillic or other locale characters in the omnibox in certain cases on Linux. ([#49272](https://github.com/brave/brave-browser/issues/49272))
 - Fixed issue where Brave-hosted MV2 extensions may not update. ([#49198](https://github.com/brave/brave-browser/issues/49198))
 - Upgraded Chromium to 140.0.7339.207. ([#49566](https://github.com/brave/brave-browser/issues/49566)) ([Changelog for 140.0.7339.207](https://chromium.googlesource.com/chromium/src/+log/140.0.7339.186..140.0.7339.207?pretty=fuller&n=1000))

## [1.82.170](https://github.com/brave/brave-browser/releases/tag/v1.82.170)

 - Added support for liquid glass icons for macOS 26. ([#46798](https://github.com/brave/brave-browser/issues/46798))
 - [Security] Enhanced validation for hardware wallet bridge communication as reported on HackerOne by oblivionsage. ([#48704](https://github.com/brave/brave-browser/issues/48704))
 - Updated the bottom radius of vertical tabs for macOS 26. ([#49171](https://github.com/brave/brave-browser/issues/49171))
 - Fixed issue where token name casing was not consistent on the "Portfolio" page of Brave Wallet. ([#44671](https://github.com/brave/brave-browser/issues/44671))
 - Upgraded Chromium to 140.0.7339.186. ([#49381](https://github.com/brave/brave-browser/issues/49381)) ([Changelog for 140.0.7339.186](https://chromium.googlesource.com/chromium/src/+log/140.0.7339.133..140.0.7339.186?pretty=fuller&n=1000))

## [1.82.166](https://github.com/brave/brave-browser/releases/tag/v1.82.166)

 - Fixed table formatting in Leo's response to show headers in bold and remove escaped HTML tags. ([#49048](https://github.com/brave/brave-browser/issues/49048))
 - Upgraded Chromium to 140.0.7339.133. ([#49123](https://github.com/brave/brave-browser/issues/49123)) ([Changelog for 140.0.7339.133](https://chromium.googlesource.com/chromium/src/+log/140.0.7339.80..140.0.7339.133?pretty=fuller&n=1000))

## [1.82.165](https://github.com/brave/brave-browser/releases/tag/v1.82.165)

 - Fixed crash which could occur in certain cases when connecting to Brave VPN on Windows using WireGuard. ([#49003](https://github.com/brave/brave-browser/issues/49003))

## [1.82.161](https://github.com/brave/brave-browser/releases/tag/v1.82.161)

### Web3

 - Added wallet address "Actions" menu. ([#47019](https://github.com/brave/brave-browser/issues/47019))
 - Updated Brave Wallet to support both object and string data formats for the "eth_signTypedData_v4" transactions. ([#46822](https://github.com/brave/brave-browser/issues/46822))
 - Updated UI for the "Add Suggested Token" panel. ([#47720](https://github.com/brave/brave-browser/issues/47720))
 - Updated UI for the "Confirm Switch Networks" panel. ([#47571](https://github.com/brave/brave-browser/issues/47571))
 - Updated UI for the "Confirm Add Network" panel. ([#47570](https://github.com/brave/brave-browser/issues/47570))
 - Updated padding on the "Transaction Intent" text of the "Post Confirmation" panel. ([#45829](https://github.com/brave/brave-browser/issues/45829))
 - Fixed broken "Market Details" page. ([#47678](https://github.com/brave/brave-browser/issues/47678))

### Leo

 - Added "Gemma 3 12B" to the list of pre-loaded models. ([#46411](https://github.com/brave/brave-browser/issues/46411))
 - Added support for Brave Leo customization and memory feature. ([#47685](https://github.com/brave/brave-browser/issues/47685) & [#47981](https://github.com/brave/brave-browser/issues/47981))
 - Added the ability to add tabs as attachments by mentioning them starting with "@". ([#46215](https://github.com/brave/brave-browser/issues/46215))
 - Added model icons to the "Regenerate Answer" menu. ([#47223](https://github.com/brave/brave-browser/issues/47223))
 - Added support to display markdown-formatted tables in Brave Leo responses. ([#46085](https://github.com/brave/brave-browser/issues/46085))
 - Updated Brave Leo to use image content as reference context when accessed via its URL. ([#47353](https://github.com/brave/brave-browser/issues/47353))
 - Updated padding of the "Send" and "Tool" buttons. ([#46904](https://github.com/brave/brave-browser/issues/46904))
 - Removed "Llama Vision" from the default model list. ([#47577](https://github.com/brave/brave-browser/issues/47577))
 - Fixed empty citation brackets being displayed in certain cases. ([#47484](https://github.com/brave/brave-browser/issues/47484))
 - Fixed inability to scroll during Brave Leo onboarding on small screen resolutions. ([#40910](https://github.com/brave/brave-browser/issues/40910))
 - Fixed wrapping of "Edited" label. ([#47485](https://github.com/brave/brave-browser/issues/47485))

### General

 - Added "Theme and colors" and "Toolbar" side panels under brave://settings/appearance. ([#39375](https://github.com/brave/brave-browser/issues/39375))
 - Added support for Brave VPN "Smart Proxy" on Windows and macOS. ([#43737](https://github.com/brave/brave-browser/issues/43737))
 - Added the ability to disable Brave Talk via Admin policy. ([#47457](https://github.com/brave/brave-browser/issues/47457))
 - Added the ability to disable Brave News via Admin policy. ([#47456](https://github.com/brave/brave-browser/issues/47456))
 - Added a "Delete" button to the downloads panel. ([#35432](https://github.com/brave/brave-browser/issues/35432))
 - Added a top level toggle for Speedreader feature under brave://settings/braveContent. ([#48336](https://github.com/brave/brave-browser/issues/48336))
 - Added the ability to show hidden entries in the "Filter lists" section under brave://settings/shields/filters. ([#28987](https://github.com/brave/brave-browser/issues/28987))
 - Added an "issue" category dropdown to the webcompat reporter. ([#46287](https://github.com/brave/brave-browser/issues/46287))
 - Added localization support for Laotian and Kazakh. ([#48110](https://github.com/brave/brave-browser/issues/48110) & [#45184](https://github.com/brave/brave-browser/issues/45184))
 - [Security] Disabled "navigator.share()" in Tor windows on macOS as reported on HackerOne by cinzinga. ([#47726](https://github.com/brave/brave-browser/issues/47726))
 - [Security] Treat ".onion" hostnames as secure for insecure form warnings and autofill as reported on HackerOne by newfunction. ([#44802](https://github.com/brave/brave-browser/issues/44802))
 - [Security] Prevent tab modal dialogs being shown from inactive split tab as reported on HackerOne by frozzipies. ([#46871](https://github.com/brave/brave-browser/issues/46871))
 - Improved adblocking. ([#46301](https://github.com/brave/brave-browser/issues/46301), [#46292](https://github.com/brave/brave-browser/issues/46292), [#46290](https://github.com/brave/brave-browser/issues/46290), & [#46289](https://github.com/brave/brave-browser/issues/46289))
 - Improved adblock content picker design. ([#45104](https://github.com/brave/brave-browser/issues/45104))
 - Improved the mapping of group policies to preferences. ([#48187](https://github.com/brave/brave-browser/issues/48187))
 - Updated P3A components to be removed when disabled. ([#47473](https://github.com/brave/brave-browser/issues/47473))
 - Removed WebTorrent code now that WebTorrent has been deprecated. ([#46430](https://github.com/brave/brave-browser/issues/46430))
 - Fixed issue where custom scriptlets were removed in certain cases. ([#45657](https://github.com/brave/brave-browser/issues/45657))
 - Fixed favicon alignment with pinned split tabs when vertical tabs are enabled. ([#47364](https://github.com/brave/brave-browser/issues/47364))
 - Fixed "Tab Search" button being displayed when disabled and vertical tabs are enabled. ([#47076](https://github.com/brave/brave-browser/issues/47076))
 - Upgraded Chromium to 140.0.7339.80. ([#48911](https://github.com/brave/brave-browser/issues/48911)) ([Changelog for 140.0.7339.80](https://chromium.googlesource.com/chromium/src/+log/139.0.7258.158..140.0.7339.80?pretty=fuller&n=1000))

## [1.81.137](https://github.com/brave/brave-browser/releases/tag/v1.81.137)

 - Upgraded Chromium to 139.0.7258.158. ([#48736](https://github.com/brave/brave-browser/issues/48736)) ([Changelog for 139.0.7258.158](https://chromium.googlesource.com/chromium/src/+log/139.0.7258.143..139.0.7258.158?pretty=fuller&n=1000))

## [1.81.136](https://github.com/brave/brave-browser/releases/tag/v1.81.136)

 - Fixed slow loading of token list on the "Send", "Swap", and "Bridge" pages. ([#45959](https://github.com/brave/brave-browser/issues/45959))
 - Upgraded Chromium to 139.0.7258.143. ([#48513](https://github.com/brave/brave-browser/issues/48513)) ([Changelog for 139.0.7258.143](https://chromium.googlesource.com/chromium/src/+log/139.0.7258.127..139.0.7258.143?pretty=fuller&n=1000))

## [1.81.135](https://github.com/brave/brave-browser/releases/tag/v1.81.135)

### Web3

 - [Security] Set clipboard sensitivity flag when copying Brave Wallet recovery code as reported on HackerOne by newfunction. ([#47840](https://github.com/brave/brave-browser/issues/47840))
 - Fixed crash when changing the "Exchange Provider" under the "Buy" or "Swap" screens. ([#48254](https://github.com/brave/brave-browser/issues/48254))

### Leo

 - Fixed the "Suggested Questions" overlapping the "Regenerate Answer" menu. ([#48256](https://github.com/brave/brave-browser/issues/48256))
 - Fixed issue where the "Reasoning" text was not being hidden when using DeepSeek model. ([#46684](https://github.com/brave/brave-browser/issues/46684))

### Rewards

 - Enabled Solana self-custody support in Brave Rewards by default. ([#45997](https://github.com/brave/brave-browser/issues/45997))

### General

 - Removed unnecessary scrollbar from the side navigation panel on brave://bookmarks page. ([#47949](https://github.com/brave/brave-browser/issues/47949))
 - Fixed crash which could occur when importing multiple Edge profiles via brave://welcome on Windows. ([#47705](https://github.com/brave/brave-browser/issues/47705))
 - Upgraded Chromium to 139.0.7258.127. ([#48356](https://github.com/brave/brave-browser/issues/48356)) ([Changelog for 139.0.7258.127](https://chromium.googlesource.com/chromium/src/+log/139.0.7258.66..139.0.7258.127?pretty=fuller&n=1000))

## [1.81.131](https://github.com/brave/brave-browser/releases/tag/v1.81.131)

### Web3

 - Added support for resolving new Unstoppable Domains TLDs including .brave TLD. ([#46271](https://github.com/brave/brave-browser/issues/46271))
 - Added Cardano support. ([#46090](https://github.com/brave/brave-browser/issues/46090))
 - Added a "Shield Funds" button to the token list item dropdown for ZEC tokens. ([#46596](https://github.com/brave/brave-browser/issues/46596))
 - Added a "Shield Account" alert on the "Account Details" panel for Zcash accounts. ([#46598](https://github.com/brave/brave-browser/issues/46598))
 - Added a Brave proxy for Zcash mainnet endpoint. ([#46266](https://github.com/brave/brave-browser/issues/46266))
 - [Security] Added clickjacking protection on DDNS interstitials as reported on HackerOne by newfunction. ([#47407](https://github.com/brave/brave-browser/issues/47407))
 - Updated address prefix lengths when trimming addresses. ([#46749](https://github.com/brave/brave-browser/issues/46749))
 - Removed deprecated "Legacy Brave Crypto Wallets". ([#46205](https://github.com/brave/brave-browser/issues/46205))
 - Removed gas controls for Cardano transactions. ([#46752](https://github.com/brave/brave-browser/issues/46752))
 - Fixed the "Post Confirmation" panel displaying incorrect information for Associated Token Account (ATA) creation. ([#46713](https://github.com/brave/brave-browser/issues/46713))
 - Fixed the settings menu on the "Account Details" panel tab being pushed out of view in certain cases. ([#44948](https://github.com/brave/brave-browser/issues/44948))

### Leo

 - Added support for Temporary Chat in Brave Leo. ([#46277](https://github.com/brave/brave-browser/issues/46277))
 - Added support for multiple tab contexts in a single conversation in Brave Leo. ([#43190](https://github.com/brave/brave-browser/issues/43190))
 - Added context menu option for Leo in toolbar to set Leo to open in the Sidebar or a New Tab. ([#44296](https://github.com/brave/brave-browser/issues/44296))
 - Updated Brave Leo content attachment UI. ([#45774](https://github.com/brave/brave-browser/issues/45774))
 - Updated hamburger menu item from "Leo" to "Leo AI". ([#45075](https://github.com/brave/brave-browser/issues/45075))
 - Fixed edit/copy prompt menu not displaying properly. ([#46741](https://github.com/brave/brave-browser/issues/46741))
 - Fixed UI issues with Brave Leo "Regenerate" menu. ([#46042](https://github.com/brave/brave-browser/issues/46042))

### General

 - Added the ability to disable Windows "Recall" feature for all Brave windows. ([#46284](https://github.com/brave/brave-browser/issues/46284))
 - Added "Survey Panelists" feature which allows users to opt-in to surveys from Brave (being rolled out in phases using Griffin starting at 25%). ([#45990](https://github.com/brave/brave-browser/issues/45990))
 - Added support for non-Latin characters for the ":matches-path()" procedural adblock filter. ([#46275](https://github.com/brave/brave-browser/issues/46275))
 - Added a "Brave-hosted" label for MV2 extensions hosted on Brave's servers. ([#46916](https://github.com/brave/brave-browser/issues/46916))
 - [Security] Fixed inactive split view tab displaying a permission prompt as reported on HackerOne by frozzipies. ([#46870](https://github.com/brave/brave-browser/issues/46870))
 - Implemented use of brave-checks.txt to spoof the "Sec-CH-UA" header for certain sites. ([#46001](https://github.com/brave/brave-browser/issues/46001))
 - Improved reliability of procedural filters in cases where some are invalid or unsupported. ([#46294](https://github.com/brave/brave-browser/issues/46294))
 - Updated allowlist for Brave-hosted MV2 extensions to keep them from being disabled when MV2 flags are disabled/removed (will be enabled via Griffin in the future). ([#46921](https://github.com/brave/brave-browser/issues/46921))
 - Updated warning text for brave://settings/extensions/v2. ([#46917](https://github.com/brave/brave-browser/issues/46917))
 - Disabled WebTorrent. ([#46416](https://github.com/brave/brave-browser/issues/46416))
 - Removed "not found on Web Store" warning for Brave-hosted extensions. ([#46919](https://github.com/brave/brave-browser/issues/46919))
 - Fixed error when trying to set a Brave group policy through Microsoft Intune. ([#42956](https://github.com/brave/brave-browser/issues/42956))
 - Upgraded Chromium to 139.0.7258.66. ([#48048](https://github.com/brave/brave-browser/issues/48048)) ([Changelog for 139.0.7258.66](https://chromium.googlesource.com/chromium/src/+log/138.0.7204.184..139.0.7258.66?pretty=fuller&n=1000))

## [1.80.125](https://github.com/brave/brave-browser/releases/tag/v1.80.125)

 - Upgraded Chromium to 138.0.7204.184. ([#48011](https://github.com/brave/brave-browser/issues/48011)) ([Changelog for 138.0.7204.184](https://chromium.googlesource.com/chromium/src/+log/138.0.7204.168..138.0.7204.184?pretty=fuller&n=1000))

## [1.80.124](https://github.com/brave/brave-browser/releases/tag/v1.80.124)

 - Updated Brave Leo in sidebar so input field is selected/focused by default when opened. ([#47796](https://github.com/brave/brave-browser/issues/47796))
 - Removed hardcoded client side context limits for Brave Leo which will now be enforced server side. ([#41620](https://github.com/brave/brave-browser/issues/41620))
 - Upgraded Chromium to 138.0.7204.168. ([#47844](https://github.com/brave/brave-browser/issues/47844)) ([Changelog for 138.0.7204.168](https://chromium.googlesource.com/chromium/src/+log/138.0.7204.157..138.0.7204.168?pretty=fuller&n=1000))

## [1.80.122](https://github.com/brave/brave-browser/releases/tag/v1.80.122)

 - Fixed crash on brave://tor-internals which occurred while the Tor network was still connecting. ([#44960](https://github.com/brave/brave-browser/issues/44960))
 - Upgraded Chromium to 138.0.7204.157. ([#47649](https://github.com/brave/brave-browser/issues/47649)) ([Changelog for 138.0.7204.157](https://chromium.googlesource.com/chromium/src/+log/138.0.7204.101..138.0.7204.157?pretty=fuller&n=1000))

## [1.80.120](https://github.com/brave/brave-browser/releases/tag/v1.80.120)

 - Fixed crash which occurred when using Tor in certain cases. ([#47228](https://github.com/brave/brave-browser/issues/47228))
 - Fixed bookmark default folder selection. ([#47069](https://github.com/brave/brave-browser/issues/47069))
 - Upgraded Chromium to 138.0.7204.101. ([#47476](https://github.com/brave/brave-browser/issues/47476)) ([Changelog for 138.0.7204.101](https://chromium.googlesource.com/chromium/src/+log/138.0.7204.97..138.0.7204.101?pretty=fuller&n=1000))

## [1.80.115](https://github.com/brave/brave-browser/releases/tag/v1.80.115)

 - Fixed issue with Brave Leo not summarizing video transcripts. ([#46845](https://github.com/brave/brave-browser/issues/46845))
 - Upgraded Chromium to 138.0.7204.97. ([#47276](https://github.com/brave/brave-browser/issues/47276)) ([Changelog for 138.0.7204.97](https://chromium.googlesource.com/chromium/src/+log/138.0.7204.49..138.0.7204.97?pretty=fuller&n=1000))

## [1.80.113](https://github.com/brave/brave-browser/releases/tag/v1.80.113)

### Web3

 - Implemented stricter wallet routing and added a 404 page for an invalid route. ([#45684](https://github.com/brave/brave-browser/issues/45684))
 - Updated opt-in screen for Meld to fit on small screen sizes. ([#44318](https://github.com/brave/brave-browser/issues/44318))
 - Removed the "Edit" gas button for Zcash transactions. ([#45748](https://github.com/brave/brave-browser/issues/45748))
 - Fixed crash which occurred when trying to render Brave Wallet image in certain cases. ([#46828](https://github.com/brave/brave-browser/issues/46828))
 - Fixed "Search" icon being cut off on the "Explore" page. ([#44950](https://github.com/brave/brave-browser/issues/44950))

### Leo

 - Added support for automatic default model. ([#45954](https://github.com/brave/brave-browser/issues/45954))
 - Added loading spinner to display when uploading image attachments. ([#45889](https://github.com/brave/brave-browser/issues/45889))
 - Improved image attachment UI. ([#45672](https://github.com/brave/brave-browser/issues/45672))
 - Removed Mixtral from the default Leo model list. ([#46406](https://github.com/brave/brave-browser/issues/46406))
 - Fixed attachment thumbnail image not being displayed correctly. ([#45916](https://github.com/brave/brave-browser/issues/45916))

### Rewards

 - Updated dark mode color theme for Rewards UI. ([#45741](https://github.com/brave/brave-browser/issues/45741))

### General

 - Added the ability to open Progressive Web Apps (PWAs) in a tabbed window. ([#45435](https://github.com/brave/brave-browser/issues/45435))
 - Updated extension import to warn the user to close Chrome if opened during import attempt. ([#44945](https://github.com/brave/brave-browser/issues/44945))
 - Updated extension import to import both "IndexedDB" and "Local Extension Storage" when present for an extension. ([#44946](https://github.com/brave/brave-browser/issues/44946))
 - Updated buttons on interstitial pages to use Brave theme. ([#45666](https://github.com/brave/brave-browser/issues/45666))
 - Removed the password check box from brave://settings/importData dialog when importing from Chrome. ([#46206](https://github.com/brave/brave-browser/issues/46206))
 - Fixed crash which occurred when moving a tab across monitors. ([#46066](https://github.com/brave/brave-browser/issues/46066))
 - Fixed issue with ":matches-path" being used at the beginning of a filter rule. ([#46220](https://github.com/brave/brave-browser/issues/46220))
 - Fixed display of long keyboard shortcuts on brave://settings/system/shortcuts. ([#41873](https://github.com/brave/brave-browser/issues/41873))
 - Fixed "Toggle Vertical Tabs Expanded" keyboard shortcut not working when "Expand Vertical Tabs Independently per Window" is enabled. ([#41074](https://github.com/brave/brave-browser/issues/41074))
 - Upgraded Chromium to 138.0.7204.49. ([#47094](https://github.com/brave/brave-browser/issues/47094)) ([Changelog for 138.0.7204.49](https://chromium.googlesource.com/chromium/src/+log/137.0.7151.119..138.0.7204.49?pretty=fuller&n=1000))

## [1.79.126](https://github.com/brave/brave-browser/releases/tag/v1.79.126)

 - Fixed crash when clicking on shields panel in certain cases. ([#46566](https://github.com/brave/brave-browser/issues/46566))
 - Fixed crash on navigation when a Google sign-in request has been triggered. ([#46769](https://github.com/brave/brave-browser/issues/46769))
 - Fixed crash when Leo generates empty list when clicking on "Suggest questions" while using BYOM (Bring Your Own Model). ([#46843](https://github.com/brave/brave-browser/issues/46843))
 - Fixed issue importing from Trezor wallet when Trezor Connect is outdated. ([#46660](https://github.com/brave/brave-browser/issues/46660))
 - Upgraded Chromium to 137.0.7151.119. ([#46911](https://github.com/brave/brave-browser/issues/46911)) ([Changelog for 137.0.7151.119](https://chromium.googlesource.com/chromium/src/+log/137.0.7151.104..137.0.7151.119?pretty=fuller&n=1000))

## [1.79.123](https://github.com/brave/brave-browser/releases/tag/v1.79.123)

### Leo

 - Improved citation UI. ([#45761](https://github.com/brave/brave-browser/issues/45761))

### General

 - [Security] Fixed missing DDNS navigation throttle for subframes as reported on HackerOne by newfunction. ([#46703](https://github.com/brave/brave-browser/issues/46703))
 - Fixed crash which occurred when clicking on the "View site information" icon in the address bar while having "Don't allow sites to scroll and zoom shared tabs" enabled. ([#46566](https://github.com/brave/brave-browser/issues/46566))
 - Fixed crash which occurred with the "Save autofill" prompt in certain cases. ([#45546](https://github.com/brave/brave-browser/issues/45546))
 - Upgraded Chromium to 137.0.7151.104. ([#46712](https://github.com/brave/brave-browser/issues/46712)) ([Changelog for 137.0.7151.104](https://chromium.googlesource.com/chromium/src/+log/137.0.7151.68..137.0.7151.104?pretty=fuller&n=1000))

## [1.79.119](https://github.com/brave/brave-browser/releases/tag/v1.79.119)

 - [Security] Added a conditional host check in binding handlers as reported on HackerOne by newfunction. ([#46181](https://github.com/brave/brave-browser/issues/46181))
 - Fixed procedural filters not matching against dynamically added child elements. ([#46208](https://github.com/brave/brave-browser/issues/46208))
 - Upgraded Chromium to 137.0.7151.68. ([#46515](https://github.com/brave/brave-browser/issues/46515)) ([Changelog for 137.0.7151.68](https://chromium.googlesource.com/chromium/src/+log/137.0.7151.61..137.0.7151.68?pretty=fuller&n=1000))

## [1.79.118](https://github.com/brave/brave-browser/releases/tag/v1.79.118)

### Web3

 - Added "Verified" DApp status to wallet connection panels. ([#45507](https://github.com/brave/brave-browser/issues/45507))
 - Added "Connections" tab in the wallet panel for concurrent connections between "EVM" and "SVM" networks. ([#41564](https://github.com/brave/brave-browser/issues/41564))
 - Added "Reset ZCash sync state" setting under brave://settings/web3. ([#44782](https://github.com/brave/brave-browser/issues/44782))
 - Added Zcash shielded support on the "Deposit" screen. ([#45185](https://github.com/brave/brave-browser/issues/45185))
 - Implemented auto-hide for bottom sheet when clicking away from the wallet panel. ([#45436](https://github.com/brave/brave-browser/issues/45436))
 - Updated default segmented control size in wallet panel. ([#45351](https://github.com/brave/brave-browser/issues/45351))
 - Fixed issue where Zcash native token may not be displayed on some wallets. ([#46306](https://github.com/brave/brave-browser/issues/46306))
 - Fixed the "More" menu on the "Accounts" list being pushed out of view in certain cases. ([#44949](https://github.com/brave/brave-browser/issues/44949))

### Leo

 - Added "DeepSeek R1" to the list of pre-loaded models. ([#45294](https://github.com/brave/brave-browser/issues/45294))
 - Added the ability to have links in Leo responses. ([#44207](https://github.com/brave/brave-browser/issues/44207))
 - Added support for inline citations in generated responses. ([#45152](https://github.com/brave/brave-browser/issues/45152))
 - Added full page screenshot feature for Brave Leo. ([#45510](https://github.com/brave/brave-browser/issues/45510))
 - Added support for HTTPS links in responses when using Bring Your Own Model (BYOM) in Brave Leo. ([#45116](https://github.com/brave/brave-browser/issues/45116))
 - Added support to allow for empty favicon for WebSources. ([#45346](https://github.com/brave/brave-browser/issues/45346))
 - Updated Leo toolbar icon to launch full page chat. ([#44988](https://github.com/brave/brave-browser/issues/44988))
 - Updated chat bubbles to break and wrap long words and URLs. ([#45302](https://github.com/brave/brave-browser/issues/45302))

### General

 - [Security] Fixed Tor onion icon incorrectly appearing in the URL bar in certain cases as reported on HackerOne by newfunction. ([#45102](https://github.com/brave/brave-browser/issues/45102) & [#45376](https://github.com/brave/brave-browser/issues/45376))
 - Improved formatting of version information under brave://settings/help. ([#2560](https://github.com/brave/brave-browser/issues/2560))
 - Updated the UI for Progressive Web Apps (PWAs) for Windows and Linux. ([#45107](https://github.com/brave/brave-browser/issues/45107))
 - Updated download button icon. ([#45239](https://github.com/brave/brave-browser/issues/45239))
 - Removed "Can't update Brave" message from hamburger menu on macOS. ([#37427](https://github.com/brave/brave-browser/issues/37427))
 - Fixed issue with WebSocket reconnection. ([#15410](https://github.com/brave/brave-browser/issues/15410))
 - Fixed Brave and Chromium versions displaying as "undefined" in brave://settings/help when browser language is not English. ([#45840](https://github.com/brave/brave-browser/issues/45840))
 - Upgraded Chromium to 137.0.7151.61. ([#46422](https://github.com/brave/brave-browser/issues/46422)) ([Changelog for 137.0.7151.61](https://chromium.googlesource.com/chromium/src/+log/136.0.7103.113..137.0.7151.61?pretty=fuller&n=1000))

## [1.78.102](https://github.com/brave/brave-browser/releases/tag/v1.78.102)

 - Upgraded Chromium to 136.0.7103.113. ([#46065](https://github.com/brave/brave-browser/issues/46065)) ([Changelog for 136.0.7103.113](https://chromium.googlesource.com/chromium/src/+log/136.0.7103.93..136.0.7103.113?pretty=fuller&n=1000))

## [1.78.97](https://github.com/brave/brave-browser/releases/tag/v1.78.97)

 - Fixed broken screenshot preview on the webcompat reporter. ([#45660](https://github.com/brave/brave-browser/issues/45660))
 - Upgraded Chromium to 136.0.7103.93. ([#45894](https://github.com/brave/brave-browser/issues/45894)) ([Changelog for 136.0.7103.93](https://chromium.googlesource.com/chromium/src/+log/136.0.7103.60..136.0.7103.93?pretty=fuller&n=1000))

## [1.78.94](https://github.com/brave/brave-browser/releases/tag/v1.78.94)

### Web3

 - Fixed issue when importing Filecoin accounts from Ledger Hardware Wallet. ([#45650](https://github.com/brave/brave-browser/issues/45650))
 - Fixed missing header for BTC and Zcash on the "Deposit" screen. ([#41315](https://github.com/brave/brave-browser/issues/41315))

### Leo

 - Added support for image upload to Leo. ([#44311](https://github.com/brave/brave-browser/issues/44311) & [#44844](https://github.com/brave/brave-browser/issues/44844))
 - Implemented "Tab Focus Mode". ([#44679](https://github.com/brave/brave-browser/issues/44679))
 - Increased content lengths to improve Leo response when referencing a long page content. ([#43928](https://github.com/brave/brave-browser/issues/43928))

### Rewards

 - Fixed sizing issue with the adaptive CAPTCHA notification popup which occurred in certain cases. ([#45561](https://github.com/brave/brave-browser/issues/45561))

### General

 - Added brave://settings/accessibility page. ([#15844](https://github.com/brave/brave-browser/issues/15844))
 - [Security] Re-encoded images fetched for Brave News. ([#40620](https://github.com/brave/brave-browser/issues/40620))
 - Re-enabled Scroll To Text Fragment. ([#44265](https://github.com/brave/brave-browser/issues/44265))
 - Improved autocomplete suggestion matching for bookmarks. ([#44374](https://github.com/brave/brave-browser/issues/44374))
 - Improved how the "On mouseover" setting for sidebar works with split view tabs. ([#43848](https://github.com/brave/brave-browser/issues/43848))
 - Disabled WebTorrent by default for new installs. ([#44303](https://github.com/brave/brave-browser/issues/44303))
 - Removed "Set Brave as your default browser" from the hamburger menu. ([#42307](https://github.com/brave/brave-browser/issues/42307))
 - Removed "Don't warn me about this site again" on interstitial pages when using a Private Window. ([#44216](https://github.com/brave/brave-browser/issues/44216))
 - Removed known tracking parameter "ck_subscriber_id" from certain URLs. ([#44341](https://github.com/brave/brave-browser/issues/44341))
 - Removed non-localized "Applications" string from macOS DMG installer. ([#43881](https://github.com/brave/brave-browser/issues/43881))
 - Fixed crash which occurred when importing browser settings from Microsoft Edge in certain cases. ([#45603](https://github.com/brave/brave-browser/issues/45603))
 - Fixed crash which occurred in certain cases when visiting Google Suite pages while certain extensions are being used. ([#45109](https://github.com/brave/brave-browser/issues/45109))
 - Fixed navigation-set cookies on HTTP redirect not being queued for deletion if "Forget me when I close this site" is enabled. ([#44368](https://github.com/brave/brave-browser/issues/44368))
 - Fixed issue where brave://settings/content/all did not display all sites. ([#45036](https://github.com/brave/brave-browser/issues/45036))
 - Fixed flicker effect when clicking out of the search widget on the New Tab Page. ([#44220](https://github.com/brave/brave-browser/issues/44220))
 - Fixed issue where some unloaded tabs were not distinguishable from loaded tabs. ([#36720](https://github.com/brave/brave-browser/issues/36720))
 - Fixed "Esc" key closing Private Window instead of displaying warning message. ([#25768](https://github.com/brave/brave-browser/issues/25768))
 - Upgraded Chromium to 136.0.7103.60. ([#45767](https://github.com/brave/brave-browser/issues/45767)) ([Changelog for 136.0.7103.60](https://chromium.googlesource.com/chromium/src/+log/135.0.7049.115..136.0.7103.60?pretty=fuller&n=1000))

## [1.77.101](https://github.com/brave/brave-browser/releases/tag/v1.77.101)

 - Upgraded Chromium to 135.0.7049.115. ([#45615](https://github.com/brave/brave-browser/issues/45615)) ([Changelog for 135.0.7049.115](https://chromium.googlesource.com/chromium/src/+log/135.0.7049.100..135.0.7049.115?pretty=fuller&n=1000))

## [1.77.100](https://github.com/brave/brave-browser/releases/tag/v1.77.100)

 - Upgraded Chromium to 135.0.7049.100. ([#45458](https://github.com/brave/brave-browser/issues/45458)) ([Changelog for 135.0.7049.100](https://chromium.googlesource.com/chromium/src/+log/135.0.7049.84..135.0.7049.100?pretty=fuller&n=1000))

## [1.77.97](https://github.com/brave/brave-browser/releases/tag/v1.77.97)

 - Updated "Top sites" to "Top Suggestions" under brave://settings/appearance. ([#44592](https://github.com/brave/brave-browser/issues/44592))
 - Reduced the width of the bookmarks application menu. ([#45165](https://github.com/brave/brave-browser/issues/45165))
 - Fixed crash which occurred when a tab is sent from mobile to desktop. ([#45198](https://github.com/brave/brave-browser/issues/45198))
 - Fixed insecure download indicator not being displayed. ([#45159](https://github.com/brave/brave-browser/issues/45159))
 - Upgraded Chromium to 135.0.7049.84. ([#45297](https://github.com/brave/brave-browser/issues/45297)) ([Changelog for 135.0.7049.84](https://chromium.googlesource.com/chromium/src/+log/135.0.7049.52..135.0.7049.84?pretty=fuller&n=1000))

## [1.77.95](https://github.com/brave/brave-browser/releases/tag/v1.77.95)

### Web3

 - Added Zcash shielded support. ([#44432](https://github.com/brave/brave-browser/issues/44432))
 - Added a prompt to "Select Account" when clicking "Swap" or "Bridge" from the "Portfolio" page. ([#43441](https://github.com/brave/brave-browser/issues/43441))
 - Updated Brave Wallet to check portfolio balance using optimized balance scanner. ([#44018](https://github.com/brave/brave-browser/issues/44018))
 - Updated UI to always display "Buy", "Send", "Swap", "Bridge", and "Deposit" in the "Asset Details" screen. ([#43198](https://github.com/brave/brave-browser/issues/43198))
 - Expanded tokens list to fetch top 5000 ranked tokens. ([#44019](https://github.com/brave/brave-browser/issues/44019))
 - Fixed Web3 DApp explorer section to list DApps. ([#44929](https://github.com/brave/brave-browser/issues/44929))

### Leo

 - Added the ability to show/hide reasoning for supported models like Deepseek. ([#43497](https://github.com/brave/brave-browser/issues/43497))
 - Added "Qwen 14B" to the list of pre-loaded models. ([#43677](https://github.com/brave/brave-browser/issues/43677))
 - Updated Leo to show web sources used to generate query response from Brave Search. ([#39630](https://github.com/brave/brave-browser/issues/39630))

### Rewards

 - Added "Next earnings payout date" to the "Home" view. ([#43715](https://github.com/brave/brave-browser/issues/43715))

### General

 - Added "Use Vertical Tabs" option to the toolbar context menu. ([#41721](https://github.com/brave/brave-browser/issues/41721))
 - [Security] Updated brave://downloads to always display the download URL as reported on HackerOne by cj27_. ([#43501](https://github.com/brave/brave-browser/issues/43501))
 - [Security] Prevent extensions from injecting content scripts on https://account.brave.com as reported on HackerOne by newfunction. ([#42998](https://github.com/brave/brave-browser/issues/42998))
 - Enabled on-device suggestions model for all search providers. ([#43762](https://github.com/brave/brave-browser/issues/43762))
 - Updated default search engine to Yahoo! JAPAN for new installations in Japan region. ([#44148](https://github.com/brave/brave-browser/issues/44148))
 - Updated the Safe Browsing "Standard protection" setting description under brave://settings/security. ([#44377](https://github.com/brave/brave-browser/issues/44377))
 - Updated the focus border color on the URL bar to match user selected theme. ([#44389](https://github.com/brave/brave-browser/issues/44389))
 - Updated icons on the Tab Groups menu. ([#43792](https://github.com/brave/brave-browser/issues/43792))
 - Updated menu icon on the Extensions drop down. ([#43872](https://github.com/brave/brave-browser/issues/43872))
 - Updated header order displayed on brave://settings. ([#43718](https://github.com/brave/brave-browser/issues/43718))
 - Fixed performance/animation jank when dragging tabs in vertical tab mode. ([#44050](https://github.com/brave/brave-browser/issues/44050))
 - Fixed issue where some pinned tabs are hidden at startup in vertical tab mode on Windows. ([#44276](https://github.com/brave/brave-browser/issues/44276))
 - Fixed detached window being hidden during tab dragging when in vertical tab mode. ([#44397](https://github.com/brave/brave-browser/issues/44397))
 - Fixed detached tab in new window not being rendered properly until releasing the mouse press when using vertical tab mode. ([#44032](https://github.com/brave/brave-browser/issues/44032))
 - Fixed inability to resize sidebar panels in certain cases. ([#43507](https://github.com/brave/brave-browser/issues/43507))
 - Fixed issue where various websites were broken with fingerprinting protections enabled. ([#43555](https://github.com/brave/brave-browser/issues/43555))
 - Fixed hamburger menu being cut off in certain locales on Windows and Linux. ([#41364](https://github.com/brave/brave-browser/issues/41364))
 - Upgraded Chromium to 135.0.7049.52. ([#45124](https://github.com/brave/brave-browser/issues/45124)) ([Changelog for 135.0.7049.52](https://chromium.googlesource.com/chromium/src/+log/134.0.6998.178..135.0.7049.52?pretty=fuller&n=1000))

## [1.76.82](https://github.com/brave/brave-browser/releases/tag/v1.76.82)

 - Upgraded Chromium to 134.0.6998.178. ([#44940](https://github.com/brave/brave-browser/issues/44940)) ([Changelog for 134.0.6998.178](https://chromium.googlesource.com/chromium/src/+log/134.0.6998.166..134.0.6998.178?pretty=fuller&n=1000))

## [1.76.81](https://github.com/brave/brave-browser/releases/tag/v1.76.81)

 - Upgraded Chromium to 134.0.6998.166. ([#44856](https://github.com/brave/brave-browser/issues/44856)) ([Changelog for 134.0.6998.166](https://chromium.googlesource.com/chromium/src/+log/134.0.6998.118..134.0.6998.166?pretty=fuller&n=1000))

## [1.76.80](https://github.com/brave/brave-browser/releases/tag/v1.76.80)

 - Updated the "Portfolio" page to have "Price History" hidden by default. ([#44512](https://github.com/brave/brave-browser/issues/44512))
 - Removed "Market Prices" from the Meld token list. ([#44626](https://github.com/brave/brave-browser/issues/44626))
 - Upgraded Chromium to 134.0.6998.118. ([#44786](https://github.com/brave/brave-browser/issues/44786)) ([Changelog for 134.0.6998.118](https://chromium.googlesource.com/chromium/src/+log/134.0.6998.89..134.0.6998.118?pretty=fuller&n=1000))

## [1.76.74](https://github.com/brave/brave-browser/releases/tag/v1.76.74)

 - Fixed crash which occurred when visiting brave://rewards with certain locales. ([#44459](https://github.com/brave/brave-browser/issues/44459))
 - Upgraded Chromium to 134.0.6998.89. ([#44553](https://github.com/brave/brave-browser/issues/44553)) ([Changelog for 134.0.6998.89](https://chromium.googlesource.com/chromium/src/+log/134.0.6998.45..134.0.6998.89?pretty=fuller&n=1000))

## [1.76.73](https://github.com/brave/brave-browser/releases/tag/v1.76.73)

### Web3

 - Added "Out of sync" alert and "Sync Account Status" warning to allow users to sync their shielded Zcash account. ([#42851](https://github.com/brave/brave-browser/issues/42851))
 - Fixed inability to click away from the "Transaction Details" modal. ([#43223](https://github.com/brave/brave-browser/issues/43223))
 - Fixed casing for Zcash on the "Accounts" page. ([#43278](https://github.com/brave/brave-browser/issues/43278))

### Leo

 - Added the ability to stop a streamed Leo response. ([#38337](https://github.com/brave/brave-browser/issues/38337))
 - Updated UI for brave://settings/leo-ai. ([#42589](https://github.com/brave/brave-browser/issues/42589))
 - Updated Leo paywall to include "Annual" pricing. ([#41994](https://github.com/brave/brave-browser/issues/41994))
 - Fixed missing "Learn more" links in the model-intro popup for Claude 3 Haiku and Sonnet. ([#38171](https://github.com/brave/brave-browser/issues/38171))

### General

 - Added localization support for several new languages including Serbian (Latin), Serbian (Cyrillic), and others. ([#39792](https://github.com/brave/brave-browser/issues/39792) & [#43444](https://github.com/brave/brave-browser/issues/43444))
 - Added shield settings for "Block scripts" and "Cookies" when reporting a site via the webcompat reporter. ([#42062](https://github.com/brave/brave-browser/issues/42062))
 - [Security] Fixed Tor leaks as reported on HackerOne by 0x999. ([#44299](https://github.com/brave/brave-browser/issues/44299), [#44333](https://github.com/brave/brave-browser/issues/44333), & [#44334](https://github.com/brave/brave-browser/issues/44334))
 - Improved translations on shields for Swedish locale. ([#42145](https://github.com/brave/brave-browser/issues/42145))
 - Fixed persistent Google cookie not being removed when "Forget Me When I Close This Site" is enabled. ([#42798](https://github.com/brave/brave-browser/issues/42798))
 - Fixed issue where forgetful browsing was deleting local storage in certain cases when launching in incognito mode. ([#39107](https://github.com/brave/brave-browser/issues/39107))
 - Fixed crash which could occur when detaching a vertical tab in certain cases. ([#44362](https://github.com/brave/brave-browser/issues/44362))
 - Fixed cursor being displayed with incorrect position when detaching a vertical tab to its own window. ([#44282](https://github.com/brave/brave-browser/issues/44282))
 - Upgraded Chromium to 134.0.6998.45. ([#44410](https://github.com/brave/brave-browser/issues/44410)) ([Changelog for 134.0.6998.45](https://chromium.googlesource.com/chromium/src/+log/133.0.6943.141..134.0.6998.45?pretty=fuller&n=1000))

## [1.75.181](https://github.com/brave/brave-browser/releases/tag/v1.75.181)

 - Fixed crash when using Brave VPN on specific timezone(s). ([#44181](https://github.com/brave/brave-browser/issues/44181))
 - Fixed missing flag for Israel on Brave VPN. ([#44093](https://github.com/brave/brave-browser/issues/44093))
 - Upgraded Chromium to 133.0.6943.141. ([#44217](https://github.com/brave/brave-browser/issues/44217)) ([Changelog for 133.0.6943.141](https://chromium.googlesource.com/chromium/src/+log/133.0.6943.126..133.0.6943.141?pretty=fuller&n=1000))

## [1.75.180](https://github.com/brave/brave-browser/releases/tag/v1.75.180)

 - Fixed hang/crash when clicking on newly created tabs while using vertical tabs. ([#43980](https://github.com/brave/brave-browser/issues/43980))
 - Fixed incorrect icons being displayed under the URL bar in certain cases. ([#43823](https://github.com/brave/brave-browser/issues/43823))
 - Upgraded Chromium to 133.0.6943.126. ([#44075](https://github.com/brave/brave-browser/issues/44075)) ([Changelog for 133.0.6943.126](https://chromium.googlesource.com/chromium/src/+log/133.0.6943.98..133.0.6943.126?pretty=fuller&n=1000))

## [1.75.178](https://github.com/brave/brave-browser/releases/tag/v1.75.178)

 - Added "Visit Web Store" under "Extensions" via the hamburger menu. ([#43807](https://github.com/brave/brave-browser/issues/43807))
 - Added links to the Chrome Web Store under brave://extensions when extensions have been added. ([#43805](https://github.com/brave/brave-browser/issues/43805))
 - Fixed intermittent cursor issues on Windows. ([#43824](https://github.com/brave/brave-browser/issues/43824))
 - Fixed missing "Same as Linux" option for "Brave colors" under brave://settings/appearance. ([#43834](https://github.com/brave/brave-browser/issues/43834))
 - Fixed issue where "Word count" when setting up sync maybe incorrect in certain cases. ([#43635](https://github.com/brave/brave-browser/issues/43635))
 - Upgraded Chromium to 133.0.6943.98. ([#43927](https://github.com/brave/brave-browser/issues/43927)) ([Changelog for 133.0.6943.98](https://chromium.googlesource.com/chromium/src/+log/133.0.6943.54..133.0.6943.98?pretty=fuller&n=1000))

## [1.75.175](https://github.com/brave/brave-browser/releases/tag/v1.75.175)

### Web3

 - Added Zcash "Deposit" modal. ([#42221](https://github.com/brave/brave-browser/issues/42221))
 - Added "Shielded" label to all shielded ZEC tokens in Brave Wallet. ([#42285](https://github.com/brave/brave-browser/issues/42285))
 - Added support for resolving new Unstoppable Domains TLDs. ([#42368](https://github.com/brave/brave-browser/issues/42368))
 - Added a prompt to "Select Account" when clicking "Send" from the "Portfolio" page. ([#43131](https://github.com/brave/brave-browser/issues/43131))
 - Added a "Memo" field to the Zcash transaction's "Confirm Transaction" screen. ([#42078](https://github.com/brave/brave-browser/issues/42078))
 - Added a "Memo" field to the Zcash transaction's "Send" screen. ([#41986](https://github.com/brave/brave-browser/issues/41986))
 - Added the "Activity" tab to the "Portfolio" segmented control on full page view. ([#43024](https://github.com/brave/brave-browser/issues/43024))
 - Removed the "Bridge to Aurora" button. ([#42943](https://github.com/brave/brave-browser/issues/42943))
 - Updated "Portfolio" page to always display "Buy", "Send", "Swap", "Deposit", and "Bridge" buttons. ([#43073](https://github.com/brave/brave-browser/issues/43073))
 - Fixed Brave icon being cut off on the wallet unlock screen. ([#42866](https://github.com/brave/brave-browser/issues/42866))
 - Fixed broken gas slider track under the "Edit" gas fee screen. ([#42775](https://github.com/brave/brave-browser/issues/42775))

### Rewards

 - Added Web Discovery Project opt-in prompt during Brave Rewards onboarding. ([#43757](https://github.com/brave/brave-browser/issues/43757))
 - Implemented Brave Rewards 3.0, a completely redesigned user experience for Brave Rewards including an "Explore" page and many other new elements (being rolled out in phases using Griffin starting at 25%). ([#43756](https://github.com/brave/brave-browser/issues/43756))

### Leo

 - Implemented full page chat for Brave Leo. ([#42844](https://github.com/brave/brave-browser/issues/42844))
 - Added support to install Brave Leo as a Progressive Web App (PWA). ([#42701](https://github.com/brave/brave-browser/issues/42701))
 - Added support to save Brave Leo conversation history. ([#42576](https://github.com/brave/brave-browser/issues/42576) & [#42854](https://github.com/brave/brave-browser/issues/42854))
 - Added support to retain Brave Leo conversation history between browser restarts. ([#42800](https://github.com/brave/brave-browser/issues/42800))
 - Added a page context toggle under the chat sidebar. ([#42982](https://github.com/brave/brave-browser/issues/42982))
 - Added URL based routing for Brave Leo chats. ([#42055](https://github.com/brave/brave-browser/issues/42055))
 - Added support for custom site distillers. ([#40794](https://github.com/brave/brave-browser/issues/40794))
 - Updated Brave Leo URL to chrome://leo-ai. ([#42817](https://github.com/brave/brave-browser/issues/42817))
 - Updated the Progressive Web App (PWA) icons for Brave Leo and the password manager. ([#43114](https://github.com/brave/brave-browser/issues/43114))

### General

 - Added the ability to capture a screenshot using "Ctrl+Shift+S" on Windows and Linux and "Cmd+Shift+S" on macOS. ([#42682](https://github.com/brave/brave-browser/issues/42682))
 - Added support for deep linking to the Search Engine edit popup in settings. ([#42999](https://github.com/brave/brave-browser/issues/42999))
 - Added a warning when disabling Manifest V2 uBlock Origin via brave://settings/extensions/v2. ([#42608](https://github.com/brave/brave-browser/issues/42608))
 - Added right click context menu for vertical tab bar. ([#41825](https://github.com/brave/brave-browser/issues/41825))
 - Added the ability for users to load custom adblock scriptlets under brave://settings/shields/filters. ([#25586](https://github.com/brave/brave-browser/issues/25586))
 - Added per-site farbling token support. ([#28904](https://github.com/brave/brave-browser/issues/28904))
 - Added brave://flags/#block-all-cookies-toggle to enable the ability to block all cookies. ([#42061](https://github.com/brave/brave-browser/issues/42061))
 - Added a keyboard shortcut for exporting all bookmarks. ([#41412](https://github.com/brave/brave-browser/issues/41412))
 - Added a command line switch to disable user education popups. ([#43481](https://github.com/brave/brave-browser/issues/43481))
 - [Security] Fixed issue where audio was not being farbled in certain cases as reported on HackerOne by cesium_fusilli. ([#42356](https://github.com/brave/brave-browser/issues/42356))
 - [Security] Disabled block element picker in Private Windows as reported on HackerOne by newfunction. ([#43495](https://github.com/brave/brave-browser/issues/43495))
 - Improved contrast on active tab for dark theme. ([#42751](https://github.com/brave/brave-browser/issues/42751))
 - Updated the Brave VPN icon. ([#42226](https://github.com/brave/brave-browser/issues/42226))
 - Updated position for the "New Tab" button when using vertical tabs. ([#42533](https://github.com/brave/brave-browser/issues/42533))
 - Updated the Private window search engine selection UI under brave://settings/search. ([#41499](https://github.com/brave/brave-browser/issues/41499))
 - Updated the webcompat reporter to remember and autofill a user's contact information. ([#40021](https://github.com/brave/brave-browser/issues/40021))
 - Disabled cosmetic filtering on Speedreader pages. ([#40642](https://github.com/brave/brave-browser/issues/40642))
 - Disabled field data fetching in DevTools. ([#41934](https://github.com/brave/brave-browser/issues/41934))
 - Removed known Emarsys trackers "sc_customer", "sc_eh", and "sc_uid" from URLs. ([#43077](https://github.com/brave/brave-browser/issues/43077))
 - Fixed external favicon fetch on the password manager. ([#42955](https://github.com/brave/brave-browser/issues/42955))
 - Fixed "Clear all" button on brave://downloads not being selectable in certain cases. ([#42924](https://github.com/brave/brave-browser/issues/42924))
 - Fixed "Connect" button being displayed for a region when already connected to that region using Brave VPN. ([#42544](https://github.com/brave/brave-browser/issues/42544))
 - Fixed extraneous tabs created when detaching a tab from a window. ([#42588](https://github.com/brave/brave-browser/issues/42588))
 - Fixed Brave News "Add this RSS feed" functionality to respect the HTTPS upgrade setting. ([#38282](https://github.com/brave/brave-browser/issues/38282))
 - Fixed artifacts being displayed after merging tabs into a browser window. ([#41272](https://github.com/brave/brave-browser/issues/41272))
 - Fixed shields panel being able to be opened on chrome-extension:// pages. ([#43135](https://github.com/brave/brave-browser/issues/43135))
 - Fixed shield icon alignment in the URL bar. ([#39976](https://github.com/brave/brave-browser/issues/39976))
 - Upgraded Chromium to 133.0.6943.54. ([#43720](https://github.com/brave/brave-browser/issues/43720)) ([Changelog for 133.0.6943.54](https://chromium.googlesource.com/chromium/src/+log/132.0.6834.160..133.0.6943.54?pretty=fuller&n=1000))

## [1.74.51](https://github.com/brave/brave-browser/releases/tag/v1.74.51)

 - Upgraded Chromium to 132.0.6834.160. ([#43550](https://github.com/brave/brave-browser/issues/43550)) ([Changelog for 132.0.6834.160](https://chromium.googlesource.com/chromium/src/+log/132.0.6834.111..132.0.6834.160?pretty=fuller&n=1000))

## [1.74.50](https://github.com/brave/brave-browser/releases/tag/v1.74.50)

 - Upgraded Chromium to 132.0.6834.111. ([#43424](https://github.com/brave/brave-browser/issues/43424)) ([Changelog for 132.0.6834.111](https://chromium.googlesource.com/chromium/src/+log/132.0.6834.83..132.0.6834.111?pretty=fuller&n=1000))

## [1.74.48](https://github.com/brave/brave-browser/releases/tag/v1.74.48)

### Web3

 - Added support for BTC Ledger hardware accounts. ([#38447](https://github.com/brave/brave-browser/issues/38447))
 - Added Base to the list of preloaded EVM networks. ([#42885](https://github.com/brave/brave-browser/issues/42885))
 - Added Squid as a cross-chain "Swap" provider. ([#41049](https://github.com/brave/brave-browser/issues/41049))
 - Added support for signing "Typed Data V3/V4" on Trezor devices. ([#41864](https://github.com/brave/brave-browser/issues/41864))
 - Enabled BTC Ledger support by default. ([#41574](https://github.com/brave/brave-browser/issues/41574))
 - Implemented ZCash Shielded account modal. ([#41780](https://github.com/brave/brave-browser/issues/41780))
 - Integrated Meld as a provider for "Buy" crypto assets. ([#38985](https://github.com/brave/brave-browser/issues/38985))
 - Updated 0x "Swap" API to v2. ([#41891](https://github.com/brave/brave-browser/issues/41891))
 - Removed Aurora from preloaded EVM networks. ([#42884](https://github.com/brave/brave-browser/issues/42884))
 - Removed divider line in Brave Wallet page headers. ([#41458](https://github.com/brave/brave-browser/issues/41458))

### General

 - Added "Show Apps" under "More Tools" via the hamburger menu. ([#16898](https://github.com/brave/brave-browser/issues/16898))
 - Added the ability to set a custom "System Prompt" for BYOM (Bring Your Own Model) in Brave Leo. ([#40690](https://github.com/brave/brave-browser/issues/40690))
 - Added the ability to set "Context size" for BYOM (Bring Your Own Model) in Brave Leo. ([#41167](https://github.com/brave/brave-browser/issues/41167))
 - [Security] Fixed iframe download popup origin confusion as reported on HackerOne by syarif07. ([#42939](https://github.com/brave/brave-browser/issues/42939))
 - Improved error messaging for certain Brave VPN cases. ([#33031](https://github.com/brave/brave-browser/issues/33031))
 - Updated the background color of the search widget on the New Tab Page. ([#42845](https://github.com/brave/brave-browser/issues/42845))
 - Updated brave://settings to use system fonts. ([#41559](https://github.com/brave/brave-browser/issues/41559))
 - Fixed intermittent issue where sometimes links opened in a new tab without loading any content. ([#39570](https://github.com/brave/brave-browser/issues/39570))
 - Fixed issue with Brave Leo where trying to add a new custom model showed edit info for an existing custom model in certain cases. ([#41345](https://github.com/brave/brave-browser/issues/41345))
 - Upgraded Chromium to 132.0.6834.83. ([#43183](https://github.com/brave/brave-browser/issues/43183)) ([Changelog for 132.0.6834.83](https://chromium.googlesource.com/chromium/src/+log/131.0.6778.265..132.0.6834.83?pretty=fuller&n=1000))

## [1.73.105](https://github.com/brave/brave-browser/releases/tag/v1.73.105)

 - [Security] Fixed race condition which caused a crash in Brave Wallet as reported on HackerOne by renwa. ([#43147](https://github.com/brave/brave-browser/issues/43147))
 - Fixed "Send" transactions not working for transparent address in certain scenarios. ([#42951](https://github.com/brave/brave-browser/issues/42951))
 - Upgraded Chromium to 131.0.6778.265. ([#43154](https://github.com/brave/brave-browser/issues/43154)) ([Changelog for 131.0.6778.265](https://chromium.googlesource.com/chromium/src/+log/131.0.6778.204..131.0.6778.265?pretty=fuller&n=1000))

## [1.73.104](https://github.com/brave/brave-browser/releases/tag/v1.73.104)

### Web3

 - Fixed an issue where the "Speedup transaction" button was not initiating a new transaction. ([#42799](https://github.com/brave/brave-browser/issues/42799))
 - Fixed an issue where the "Post Confirmation" screen was showing incorrect transfer value. ([#42770](https://github.com/brave/brave-browser/issues/42770))

### General

 - Removed "ScreenAI Library" component. ([#41629](https://github.com/brave/brave-browser/issues/41629))
 - Upgraded Chromium to 131.0.6778.204. ([#42971](https://github.com/brave/brave-browser/issues/42971)) ([Changelog for 131.0.6778.204](https://chromium.googlesource.com/chromium/src/+log/131.0.6778.139..131.0.6778.204?pretty=fuller&n=1000))

## [1.73.101](https://github.com/brave/brave-browser/releases/tag/v1.73.101)

### Web3

 - Fixed broken Solana "Swap" and "Bridge" transaction details in the "Post" confirmation screen. ([#42516](https://github.com/brave/brave-browser/issues/42516))
 - Fixed dropped Solana transactions displaying a loading spinner in the panel. ([#42514](https://github.com/brave/brave-browser/issues/42514))

### General

 - Added a Brave VPN widget to the New Tab Page. ([#41778](https://github.com/brave/brave-browser/issues/41778))
 - Fixed Brave Leo conversations not being persisted when closing and opening the panel on the same content. ([#42510](https://github.com/brave/brave-browser/issues/42510))
 - Upgraded Chromium to 131.0.6778.139. ([#42804](https://github.com/brave/brave-browser/issues/42804)) ([Changelog for 131.0.6778.139](https://chromium.googlesource.com/chromium/src/+log/131.0.6778.108..131.0.6778.139?pretty=fuller&n=1000))

## [1.73.97](https://github.com/brave/brave-browser/releases/tag/v1.73.97)

### Web3

 - Improved Solana swap failure rate. ([#42434](https://github.com/brave/brave-browser/issues/42434))
 - Removed "Speed Up" alert for Solana transactions. ([#42379](https://github.com/brave/brave-browser/issues/42379))

### Rewards

 - Replaced the "Earnings so far" indicator in Brave Rewards UI. ([#42475](https://github.com/brave/brave-browser/issues/42475))

### General

 - Fixed Brave Leo "Retry" button not working after network connection has been lost. ([#42405](https://github.com/brave/brave-browser/issues/42405))
 - Fixed quick actions under "/" in Brave Leo. ([#42279](https://github.com/brave/brave-browser/issues/42279))
 - Upgraded Chromium to 131.0.6778.108. ([#42639](https://github.com/brave/brave-browser/issues/42639)) ([Changelog for 131.0.6778.108](https://chromium.googlesource.com/chromium/src/+log/131.0.6778.85..131.0.6778.108?pretty=fuller&n=1000))

## [1.73.91](https://github.com/brave/brave-browser/releases/tag/v1.73.91)

 - Fixed toolbar separator color. ([#42286](https://github.com/brave/brave-browser/issues/42286))
 - Upgraded Chromium to 131.0.6778.85. ([#42377](https://github.com/brave/brave-browser/issues/42377)) ([Changelog for 131.0.6778.85](https://chromium.googlesource.com/chromium/src/+log/131.0.6778.69..131.0.6778.85?pretty=fuller&n=1000))

## [1.73.89](https://github.com/brave/brave-browser/releases/tag/v1.73.89)

### Web3

 - Added Brave Wallet logo to login UI on the panel. ([#40296](https://github.com/brave/brave-browser/issues/40296))
 - Implemented new side navigation for Brave Wallet. ([#40913](https://github.com/brave/brave-browser/issues/40913))
 - Updated transaction panel design for different statuses. ([#40373](https://github.com/brave/brave-browser/issues/40373))
 - Updated Brave Wallet banner alerts UI.  ([#41036](https://github.com/brave/brave-browser/issues/41036))
 - Updated Brave Wallet panel background image. ([#41035](https://github.com/brave/brave-browser/issues/41035))
 - Moved the "Activity" tab into the "Portfolio" panel view. ([#41498](https://github.com/brave/brave-browser/issues/41498))
 - Fixed various renderer crashes when initializing Brave Wallet. ([#41475](https://github.com/brave/brave-browser/issues/41475))

### General

 - Added the ability to set "--sync-url=" via Admin Policy. ([#20431](https://github.com/brave/brave-browser/issues/20431))
 - Added support for procedural cosmetic filtering. ([#16935](https://github.com/brave/brave-browser/issues/16935))
 - Improved Brave Leo internationalization support for French, Spanish, German, and Italian. ([#41554](https://github.com/brave/brave-browser/issues/41554))
 - Improved Brave News peeking card selection on the New Tab Page. ([#35659](https://github.com/brave/brave-browser/issues/35659))
 - Updated the "Open with Tor" button style. ([#41546](https://github.com/brave/brave-browser/issues/41546))
 - Disabled brave://flags/#https-first-balanced-mode. ([#41933](https://github.com/brave/brave-browser/issues/41933))
 - Fixed issue where Brave Leo panel would not open in certain cases. ([#41154](https://github.com/brave/brave-browser/issues/41154))
 - Fixed focus ring placement for the information icon under the "Bring your own model" section of brave://settings/leo-assistant. ([#41379](https://github.com/brave/brave-browser/issues/41379))
 - Upgraded Chromium to 131.0.6778.69. ([#42245](https://github.com/brave/brave-browser/issues/42245)) ([Changelog for 131.0.6778.69](https://chromium.googlesource.com/chromium/src/+log/130.0.6723.116..131.0.6778.69?pretty=fuller&n=1000))

## [1.71.123](https://github.com/brave/brave-browser/releases/tag/v1.71.123)

 - Improved Brave News performance. ([#42021](https://github.com/brave/brave-browser/issues/42021))
 - Upgraded Chromium to 130.0.6723.116. ([#42088](https://github.com/brave/brave-browser/issues/42088)) ([Changelog for 130.0.6723.116](https://chromium.googlesource.com/chromium/src/+log/130.0.6723.91..130.0.6723.116?pretty=fuller&n=1000))

## [1.71.121](https://github.com/brave/brave-browser/releases/tag/v1.71.121)

 - Improved performance in Safe Browsing. ([#41681](https://github.com/brave/brave-browser/issues/41681))
 - Fixed "Aw, Snap!" error which could occur when using Geolocation API in certain cases. ([#41859](https://github.com/brave/brave-browser/issues/41859))
 - Upgraded Chromium to 130.0.6723.91. ([#41960](https://github.com/brave/brave-browser/issues/41960)) ([Changelog for 130.0.6723.91](https://chromium.googlesource.com/chromium/src/+log/130.0.6723.70..130.0.6723.91?pretty=fuller&n=1000))

## [1.71.118](https://github.com/brave/brave-browser/releases/tag/v1.71.118)

### Web3

 - [Security] Added warning message when submitting transactions containing system program instructions as reported on HackerOne by topenga. ([#41219](https://github.com/brave/brave-browser/issues/41219))

### General

 - Updated default search engine to Brave Search for new installations in Australia. ([#41451](https://github.com/brave/brave-browser/issues/41451))
 - Fixed crash which occurred when the browser window was reduced to the smallest size in certain cases. ([#40059](https://github.com/brave/brave-browser/issues/40059))
 - Fixed certain cases where synced devices could be duplicated on the sync chain. ([#41615](https://github.com/brave/brave-browser/issues/41615))
 - Upgraded Chromium to 130.0.6723.70. ([#41804](https://github.com/brave/brave-browser/issues/41804)) ([Changelog for 130.0.6723.70](https://chromium.googlesource.com/chromium/src/+log/130.0.6723.58..130.0.6723.70?pretty=fuller&n=1000))

## [1.71.114](https://github.com/brave/brave-browser/releases/tag/v1.71.114)

### Web3

 - Added support for resolving new UD TLDs. ([#40543](https://github.com/brave/brave-browser/issues/40543))
 - Updated placement of deposit address in the wallet panel for "Deposit" screen. ([#40826](https://github.com/brave/brave-browser/issues/40826))
 - Updated Brave Wallet background with gradient color. ([#40948](https://github.com/brave/brave-browser/issues/40948))

### General

 - Added support for local vector search for the selection of key text segments of page and video context while using Brave Leo. ([#36801](https://github.com/brave/brave-browser/issues/36801))
 - Added search query and summary from Brave Search SERP when available while using Brave Leo. ([#40615](https://github.com/brave/brave-browser/issues/40615))
 - Added advanced server selection to Brave VPN. ([#38186](https://github.com/brave/brave-browser/issues/38186))
 - Added Italy content feed support for Brave News. ([#40957](https://github.com/brave/brave-browser/issues/40957))
 - Added support for Chromium's tri-color profile schemes. ([#40689](https://github.com/brave/brave-browser/issues/40689))
 - Added a native menu and inject for the adblock content picker. ([#40821](https://github.com/brave/brave-browser/issues/40821))
 - Updated the source within the URL for search suggestions. ([#41112](https://github.com/brave/brave-browser/issues/41112))
 - Moved the "Inactive tabs appearance" setting to brave://settings/appearance. ([#41482](https://github.com/brave/brave-browser/issues/41482))
 - Moved "Copy clean link" to be listed first in the share menu. ([#40614](https://github.com/brave/brave-browser/issues/40614))
 - Removed known tracking parameter "srsltid" from URLs. ([#40912](https://github.com/brave/brave-browser/issues/40912))
 - Removed known tracking parameter "_bhlid" from URLs. ([#40716](https://github.com/brave/brave-browser/issues/40716))
 - Removed caption options from the media control popup. ([#41527](https://github.com/brave/brave-browser/issues/41527))
 - Fixed crash which occurred when visiting brave://branded-wallpaper or brave://background-wallpaper. ([#40807](https://github.com/brave/brave-browser/issues/40807))
 - Fixed crash which occurred when pinning a tab that is part of a tab group while using vertical tabs. ([#40365](https://github.com/brave/brave-browser/issues/40365))
 - Fixed scriptlets not working in about:blank frames. ([#40703](https://github.com/brave/brave-browser/issues/40703))
 - Fixed styling not being applied for "Filter lists" and "Add custom filter lists" under brave://settings/shields/filters. ([#27647](https://github.com/brave/brave-browser/issues/27647))
 - Upgraded Chromium to 130.0.6723.58. ([#41651](https://github.com/brave/brave-browser/issues/41651)) ([Changelog for 130.0.6723.58](https://chromium.googlesource.com/chromium/src/+log/129.0.6668.100..130.0.6723.58?pretty=fuller&n=1000))

## [1.70.126](https://github.com/brave/brave-browser/releases/tag/v1.70.126)

 - Fixed issue where unchecking the "Show on startup" checkbox of the profile picker was not being retained. ([#41194](https://github.com/brave/brave-browser/issues/41194))
 - Fixed toggling on "Enable AdGuard" under brave://settings/extensions/v2 was installing the MV3 version of the AdGuard Blocker extension. ([#41173](https://github.com/brave/brave-browser/issues/41173))
 - Upgraded Chromium to 129.0.6668.100. ([#41494](https://github.com/brave/brave-browser/issues/41494)) ([Changelog for 129.0.6668.100](https://chromium.googlesource.com/chromium/src/+log/129.0.6668.89..129.0.6668.100?pretty=fuller&n=1000))

## [1.70.123](https://github.com/brave/brave-browser/releases/tag/v1.70.123)

 - Fixed issue where the clock would not display on the New Tab Page in certain cases. ([#41226](https://github.com/brave/brave-browser/issues/41226))
 - Upgraded Chromium to 129.0.6668.89. ([#41338](https://github.com/brave/brave-browser/issues/41338)) ([Changelog for 129.0.6668.89](https://chromium.googlesource.com/chromium/src/+log/129.0.6668.70..129.0.6668.89?pretty=fuller&n=1000))

## [1.70.119](https://github.com/brave/brave-browser/releases/tag/v1.70.119)

 - Fixed "Copy clean link" being used incorrectly in certain cases. ([#41064](https://github.com/brave/brave-browser/issues/41064))
 - Fixed Proofpoint's urldefense.com redirects. ([#41134](https://github.com/brave/brave-browser/issues/41134))
 - Fixed crash when downloading using various extensions. ([#41179](https://github.com/brave/brave-browser/issues/41179))
 - Upgraded Chromium to 129.0.6668.70. ([#41234](https://github.com/brave/brave-browser/issues/41234)) ([Changelog for 129.0.6668.70](https://chromium.googlesource.com/chromium/src/+log/129.0.6668.59..129.0.6668.70?pretty=fuller&n=1000))

## [1.70.117](https://github.com/brave/brave-browser/releases/tag/v1.70.117)

### Web3

 - Added available route selection for "Swap" and "Bridge" transactions. ([#38648](https://github.com/brave/brave-browser/issues/38648))
 - Added EVM NFT owner address to the "NFT" details screen. ([#32622](https://github.com/brave/brave-browser/issues/32622))
 - [Security] Added simulation support for EVM transactions. ([#24271](https://github.com/brave/brave-browser/issues/24271))
 - [Security] Added simulation support for Solana transactions. ([#24269](https://github.com/brave/brave-browser/issues/24269))
 - Updated Brave Wallet to keep the panel open when pending requests exist. ([#40226](https://github.com/brave/brave-browser/issues/40226))
 - Updated the confirmation transaction panel "Details" tab to localize transaction type names. ([#40336](https://github.com/brave/brave-browser/issues/40336))
 - Updated DApp Explorer design. ([#39850](https://github.com/brave/brave-browser/issues/39850))
 - Fixed issue where some NFT balances are not fetched when "Ankr Balances" is enabled. ([#40368](https://github.com/brave/brave-browser/issues/40368))
 - Fixed Brave Wallet not correctly displaying the amount of tokens to be transferred when unstaking from Rocketpool or bridging from Polygon. ([#25755](https://github.com/brave/brave-browser/issues/25755))

### Rewards

 - Updated “indirect support” messaging in Brave Rewards for non-connected users. ([#40906](https://github.com/brave/brave-browser/issues/40906))

### General

 - Added the ability to edit replies generated by Brave Leo. ([#35343](https://github.com/brave/brave-browser/issues/35343))
 - Added the ability to modify user prompts on Brave Leo. ([#35342](https://github.com/brave/brave-browser/issues/35342))
 - Added UI for the webcompat exceptions service. ([#39510](https://github.com/brave/brave-browser/issues/39510))
 - Added "Clear Brave Ads data..." link under brave://settings/clearBrowserData when a user is not opted into Brave Rewards. ([#39051](https://github.com/brave/brave-browser/issues/39051))
 - Added brave://flags/#brave-compact-horizontal-tabs to enable compact mode for horizontal tabs. ([#40044](https://github.com/brave/brave-browser/issues/40044))
 - Enabled "Show search suggestions" by default under brave://settings/search for new users in regions where Brave Search is the default search engine. ([#29517](https://github.com/brave/brave-browser/issues/29517))
 - Improved debouncing protections by utilizing both RFC and Chromium URL parsing. ([#39866](https://github.com/brave/brave-browser/issues/39866))
 - Improved responsiveness on the New Tab Page for lower screen resolutions and window sizes. ([#39735](https://github.com/brave/brave-browser/issues/39735))
 - Improved fingerprint farbling across different profiles. ([#38067](https://github.com/brave/brave-browser/issues/38067))
 - Improved adblocking by continuing to execute ":remove*" filters regardless of "$generichide". ([#39907](https://github.com/brave/brave-browser/issues/39907))
 - Updated parsing of the "Onion-Location" header to be like the "Location" header. ([#39578](https://github.com/brave/brave-browser/issues/39578))
 - Updated initial Brave VPN panel text. ([#38799](https://github.com/brave/brave-browser/issues/38799))
 - Updated Brave VPN panel UI. ([#40253](https://github.com/brave/brave-browser/issues/40253))
 - Updated UI colors in various areas of the browser. ([#39045](https://github.com/brave/brave-browser/issues/39045))
 - Updated icons and font sizes for Brave Leo. ([#39819](https://github.com/brave/brave-browser/issues/39819))
 - Fixed startup crash which occurred in certain cases. ([#41080](https://github.com/brave/brave-browser/issues/41080))
 - Fixed white flash when launching or opening a new window or tab on Windows. ([#38214](https://github.com/brave/brave-browser/issues/38214))
 - Fixed white flash when minimizing or restoring a browser window on Windows. ([#40271](https://github.com/brave/brave-browser/issues/40271))
 - Fixed cosmetic filtering in cases where some filter rules include invalid CSS. ([#40177](https://github.com/brave/brave-browser/issues/40177))
 - Fixed "Password Manager" modals showing "chrome://" scheme instead of "brave://". ([#38836](https://github.com/brave/brave-browser/issues/38836))
 - Upgraded Chromium to 129.0.6668.59. ([#41111](https://github.com/brave/brave-browser/issues/41111)) ([Changelog for 129.0.6668.59](https://chromium.googlesource.com/chromium/src/+log/127.0.6533.138..129.0.6668.59?pretty=fuller&n=1000))

## [1.69.168](https://github.com/brave/brave-browser/releases/tag/v1.69.168)

 - Upgraded Chromium to 128.0.6613.138. ([#40972](https://github.com/brave/brave-browser/issues/40972)) ([Changelog for 128.0.6613.138](https://chromium.googlesource.com/chromium/src/+log/128.0.6613.120..128.0.6613.138?pretty=fuller&n=1000))

## [1.69.162](https://github.com/brave/brave-browser/releases/tag/v1.69.162)

 - Fixed Brave News button not being displayed on the New Tab Page prior to opt-in for Argentina and Germany locales. ([#37839](https://github.com/brave/brave-browser/issues/37839))
 - Upgraded Chromium to 128.0.6613.120. ([#40804](https://github.com/brave/brave-browser/issues/40804)) ([Changelog for 128.0.6613.120](https://chromium.googlesource.com/chromium/src/+log/128.0.6613.114..128.0.6613.120?pretty=fuller&n=1000))

## [1.69.160](https://github.com/brave/brave-browser/releases/tag/v1.69.160)

### Web3

 - Fixed crash when trying to bridge from ETH on Ethereum to SOL on Solana. ([#40674](https://github.com/brave/brave-browser/issues/40674))
 - Fixed ZCash balance resolution issue. ([#40635](https://github.com/brave/brave-browser/issues/40635))

### General

 - Updated model names in Brave Leo models menu. ([#40464](https://github.com/brave/brave-browser/issues/40464))
 - Updated tab separator contrast and height. ([#40714](https://github.com/brave/brave-browser/issues/40714))
 - Fixed issue where synced devices could be duplicated in certain cases. ([#40130](https://github.com/brave/brave-browser/issues/40130))
 - Fixed three dot menu not being displayed on Brave News cards. ([#40621](https://github.com/brave/brave-browser/issues/40621))
 - Upgraded Chromium to 128.0.6613.114. ([#40738](https://github.com/brave/brave-browser/issues/40738)) ([Changelog for 128.0.6613.114](https://chromium.googlesource.com/chromium/src/+log/128.0.6613.85..128.0.6613.114?pretty=fuller&n=1000))

## [1.69.153](https://github.com/brave/brave-browser/releases/tag/v1.69.153)

### Web3

 - Added support for Solana Compressed NFTs (cNFTs). ([#39408](https://github.com/brave/brave-browser/issues/39408))
 - Added support for Solana Priority Fees. ([#35866](https://github.com/brave/brave-browser/issues/35866))
 - Added an image preview to the "Add NFT" modal. ([#39092](https://github.com/brave/brave-browser/issues/39092))
 - Added LiFi support for "Swap" transactions on Gnosis. ([#40407](https://github.com/brave/brave-browser/issues/40407))
 - Added "View on block explorer" option to the "Account Details" menu. ([#39655](https://github.com/brave/brave-browser/issues/39655))
 - Added a "More" menu to Portfolio actions. ([#38935](https://github.com/brave/brave-browser/issues/38935))
 - Added a loading spinner to the "Select account" prompt when address is being generated for BTC or ZCash. ([#38931](https://github.com/brave/brave-browser/issues/38931))
 - Added a "Refresh Quote" button to the "Swap" and "Bridge" screens. ([#39513](https://github.com/brave/brave-browser/issues/39513))
 - Added info tooltip to the "Price impact" section for "Swap" and "Bridge". ([#39683](https://github.com/brave/brave-browser/issues/39683))
 - Added "Group by collection" option to NFT display settings. ([#38865](https://github.com/brave/brave-browser/issues/38865))
 - Added the ability to load more than 50 NFTs in a Portfolio. ([#39970](https://github.com/brave/brave-browser/issues/39970))
 - Added a "Watch-Only" label to NFT grid items. ([#39652](https://github.com/brave/brave-browser/issues/39652))
 - Added a watch list message to unowned NFTs on the "NFT Details" screen. ([#39653](https://github.com/brave/brave-browser/issues/39653))
 - Added "New quote" countdown ticker for "Swap" and "Bridge" transactions. ([#34583](https://github.com/brave/brave-browser/issues/34583))
 - Enabled Bridge support for Brave Wallet. ([#38527](https://github.com/brave/brave-browser/issues/38527))
 - Implemented "Choose quote provider" modal for "Swap" and "Bridge" transactions. ([#39472](https://github.com/brave/brave-browser/issues/39472))
 - Implemented "Max slippage" modal for "Swap" and "Bridge" transactions. ([#39514](https://github.com/brave/brave-browser/issues/39514))
 - Implemented 0x as provider for ExactOut "Swap" transactions when provider is set to "Auto". ([#39070](https://github.com/brave/brave-browser/issues/39070))
 - Improved display of ZEC addresses and additional details when using dark theme. ([#35827](https://github.com/brave/brave-browser/issues/35827))
 - Increased estimated Solana priority fee compute budget by 10%. ([#39498](https://github.com/brave/brave-browser/issues/39498))
 - Updated Brave Wallet to use LiFi provider for EVM swaps. ([#36436](https://github.com/brave/brave-browser/issues/36436))
 - Updated Brave Wallet to prevent edits to pre-filled NFT information. ([#39929](https://github.com/brave/brave-browser/issues/39929))
 - Updated Brave logo in Brave Wallet. ([#39059](https://github.com/brave/brave-browser/issues/39059))
 - Updated UI for the "Account" list. ([#38923](https://github.com/brave/brave-browser/issues/38923))
 - Removed support for IPFS local node and ipfs:// scheme. ([#37735](https://github.com/brave/brave-browser/issues/37735))
 - Removed deprecated Goerli Network from default network list. ([#37369](https://github.com/brave/brave-browser/issues/37369))
 - Fixed panel crash which occurred when attempting to lookup EIP1159 estimates for non EVM or FIL transactions. ([#38970](https://github.com/brave/brave-browser/issues/38970))
 - Fixed in ability to transfer Solana NFTs. ([#40489](https://github.com/brave/brave-browser/issues/40489))
 - Fixed issue where editing an NFT was adding a new token instead of updating the existing token. ([#39921](https://github.com/brave/brave-browser/issues/39921))
 - Fixed issue where editing an owned NFT would be re-added when switching between "NFT" and "Portfolio" views. ([#36197](https://github.com/brave/brave-browser/issues/36197))
 - Fixed the "Send" button on the "NFT" details screen not being displayed for owned EVM NFTs. ([#39882](https://github.com/brave/brave-browser/issues/39882))
 - Fixed missing space between the message and "Learn more" link on the SPL send token confirmation screen. ([#39159](https://github.com/brave/brave-browser/issues/39159))
 - Fixed issue where expanding "Activity" view from panel didn't reset view in panel and loaded "Portfolio" in expanded view. ([#38949](https://github.com/brave/brave-browser/issues/38949))

### General

 - Added the ability to "Bring Your Own Model" (BYOM) to Brave Leo. ([#38646](https://github.com/brave/brave-browser/issues/38646))
 - Added a Brave Leo icon to the toolbar and hamburger menu. ([#39713](https://github.com/brave/brave-browser/issues/39713))
 - Added "Sidebar" settings to the top level in the hamburger menu. ([#38708](https://github.com/brave/brave-browser/issues/38708))
 - Added "Show full screen reminder to press Esc on exit" under brave://settings/system. ([#38928](https://github.com/brave/brave-browser/issues/38928))
 - Added YouTube "si" parameter to the "Copy Clean Link" filter. ([#33037](https://github.com/brave/brave-browser/issues/33037))
 - [Security] Implemented process hardening for the Brave VPN services on Windows. ([#39230](https://github.com/brave/brave-browser/issues/39230))
 - [Security] Implemented a trusted source check for "Elevator::InstallVPNServices". ([#39029](https://github.com/brave/brave-browser/issues/39029))
 - [Security] Updated code to use JSON serialization to escape all unsafe symbols in SpeedReader. ([#39499](https://github.com/brave/brave-browser/issues/39499))
 - [Security] Limited extension features to allow listed extensions. ([#39478](https://github.com/brave/brave-browser/issues/39478))
 - Enabled Web Serial by default. ([#38791](https://github.com/brave/brave-browser/issues/38791))
 - Improved adblocking by supporting ":remove", ":remove-attr", and ":remove-class" adblock filter syntax. ([#33881](https://github.com/brave/brave-browser/issues/33881))
 - Increased size of the "Delete browsing data" modal. ([#38898](https://github.com/brave/brave-browser/issues/38898))
 - Updated adblocking to apply generic "$removeparam" rules to document, subdocument, or xhr requests by default. ([#38753](https://github.com/brave/brave-browser/issues/38753))
 - Updated WebTorrent library version. ([#35385](https://github.com/brave/brave-browser/issues/35385))
 - Removed "Hangouts" from brave://settings/extensions. ([#39660](https://github.com/brave/brave-browser/issues/39660))
 - Removed known tracking parameter "_branch_match_id" and "_branch_referrer" from URLs. ([#39575](https://github.com/brave/brave-browser/issues/39575))
 - Fixed crash which occurred on navigation in certain cases. ([#38333](https://github.com/brave/brave-browser/issues/38333))
 - Fixed selecting "Bring all tabs to this window" incorrectly moving Progressive Web Apps (PWAs) into the window as tabs. ([#40287](https://github.com/brave/brave-browser/issues/40287))
 - Fixed local Brave Leo models incorrectly attaching page contents to system prompt. ([#39525](https://github.com/brave/brave-browser/issues/39525))
 - Fixed side panel open and close animation not working properly in certain cases. ([#39376](https://github.com/brave/brave-browser/issues/39376))
 - Fixed the Brave News RSS dialog not being closed when clicking the RSS button in the URL bar. ([#37216](https://github.com/brave/brave-browser/issues/37216))
 - Upgraded Chromium to 128.0.6613.85. ([#40586](https://github.com/brave/brave-browser/issues/40586)) ([Changelog for 128.0.6613.85](https://chromium.googlesource.com/chromium/src/+log/127.0.6533.120..128.0.6613.85?pretty=fuller&n=1000))

## [1.68.141](https://github.com/brave/brave-browser/releases/tag/v1.68.141)

### Web3

 - Fixed issue where crashes on certain pages occurred due to having local IPFS installed. ([#40102](https://github.com/brave/brave-browser/issues/40102))

### General

 - [Security] Fixed passwords not being displayed under brave://password-manager/passwords on macOS and Linux in certain cases. ([#33548](https://github.com/brave/brave-browser/issues/33548))
 - Fixed crash which occurred in certain cases when using side panel extensions. ([#40262](https://github.com/brave/brave-browser/issues/40262))
 - Fixed issue where deleting a browser profile from sync chain caused sync data to be removed from other devices in the chain. ([#39503](https://github.com/brave/brave-browser/issues/39503))
 - Upgraded Chromium to 127.0.6533.120. ([#40431](https://github.com/brave/brave-browser/issues/40431)) ([Changelog for 127.0.6533.120](https://chromium.googlesource.com/chromium/src/+log/127.0.6533.100..127.0.6533.120?pretty=fuller&n=1000))

## [1.68.137](https://github.com/brave/brave-browser/releases/tag/v1.68.137)

 - Upgraded Chromium to 127.0.6533.100. ([#40314](https://github.com/brave/brave-browser/issues/40314)) ([Changelog for 127.0.6533.100](https://chromium.googlesource.com/chromium/src/+log/127.0.6533.88..127.0.6533.100?pretty=fuller&n=1000))

## [1.68.134](https://github.com/brave/brave-browser/releases/tag/v1.68.134)

### Web3

 - Fixed crash which occurred when manually deleting the connection under brave://settings/content/ethereum or brave://settings/content/solana. ([#40072](https://github.com/brave/brave-browser/issues/40072))
 - Fixed inability to hide or unhide NFTs. ([#36754](https://github.com/brave/brave-browser/issues/36754))
 - Fixed NFT "Portfolio" tab not correctly filtering NFTs by selected account. ([#39978](https://github.com/brave/brave-browser/issues/39978))

### General

 - Fixed passwords not being displayed under brave://password-manager/passwords on Windows in certain cases. ([#40091](https://github.com/brave/brave-browser/issues/40091))
 - Upgraded Chromium to 127.0.6533.88. ([#40120](https://github.com/brave/brave-browser/issues/40120)) ([Changelog for 127.0.6533.88](https://chromium.googlesource.com/chromium/src/+log/127.0.6533.73..127.0.6533.88?pretty=fuller&n=1000))

## [1.68.131](https://github.com/brave/brave-browser/releases/tag/v1.68.131)

 - Fixed startup crash due to profile avatars in certain cases. ([#40005](https://github.com/brave/brave-browser/issues/40005))

## [1.68.128](https://github.com/brave/brave-browser/releases/tag/v1.68.128)

### Web3

 - Added the ability to import BTC accounts (BIP84) into Brave Wallet. ([#38446](https://github.com/brave/brave-browser/issues/38446))
 - Added pagination to the "Portfolio NFT" page. ([#38547](https://github.com/brave/brave-browser/issues/38547))
 - Added the ability to allow hiding un-owned NFTs on the "Portfolio NFT" page. ([#38549](https://github.com/brave/brave-browser/issues/38549))
 - Added support for the Solana Token Extensions, part of the Solana Token-2022 program. ([#36699](https://github.com/brave/brave-browser/issues/36699))
 - Updated Brave Wallet to use Chainstack RPC proxy endpoints. ([#38872](https://github.com/brave/brave-browser/issues/38872))
 - Updated Avalanche to use Chainstack proxy. ([#39299](https://github.com/brave/brave-browser/issues/39299))
 - Updated the wallet panel to truncate long token names and balances in certain cases. ([#38064](https://github.com/brave/brave-browser/issues/38064))
 - Updated UI for the "Select Token" modal. ([#37838](https://github.com/brave/brave-browser/issues/37838))
 - Updated design for wallet settings modals. ([#37362](https://github.com/brave/brave-browser/issues/37362))
 - Updated length of "Account" name to 30 characters. ([#23361](https://github.com/brave/brave-browser/issues/23361))
 - Fixed inability to sign-in on "https://tally.xyz". ([#38878](https://github.com/brave/brave-browser/issues/38878))
 - Fixed Brave Wallet performance in certain cases. ([#26782](https://github.com/brave/brave-browser/issues/26782))
 - Fixed issue where clicking "Send" on the NFT details screen did not pre-fill the send amount. ([#39916](https://github.com/brave/brave-browser/issues/39916))

### General

 - Added a search widget to the New Tab Page. ([#35535](https://github.com/brave/brave-browser/issues/35535))
 - Added Nebula support for P3A. ([#35841](https://github.com/brave/brave-browser/issues/35841))
 - [Security] Reduced WireGuard tunnel service permissions on Windows as reported on HackerOne by newfunction. ([#37846](https://github.com/brave/brave-browser/issues/37846))
 - Enabled rich version of Brave Search autocomplete suggestions. ([#29997](https://github.com/brave/brave-browser/issues/29997))
 - Improved Brave Leo conversation UI layout. ([#37792](https://github.com/brave/brave-browser/issues/37792))
 - Improved component updater to check for updates more often. ([#35164](https://github.com/brave/brave-browser/issues/35164))
 - Updated Omaha installer version for Windows to v1.3.361.151 for new users. ([#38597](https://github.com/brave/brave-browser/issues/38597))
 - Updated the styling of the widgets on the New Tab Page. ([#37213](https://github.com/brave/brave-browser/issues/37213))
 - Updated Tor windows to show Tor daemon status when the window was opened via the "Tor" button in the URL bar. ([#37927](https://github.com/brave/brave-browser/issues/37927))
 - Removed Safety Check warning for local passwords. ([#39212](https://github.com/brave/brave-browser/issues/39212))
 - Fixed issue where LastPass extension failed to open. ([#39759](https://github.com/brave/brave-browser/issues/39759))
 - Fixed incorrect radius and colors for URL bar icon in certain cases. ([#39561](https://github.com/brave/brave-browser/issues/39561))
 - Fixed omnibox flicker when the "Download" button on the toolbar is clicked. ([#39373](https://github.com/brave/brave-browser/issues/39373))
 - Fixed visibility of "Import bookmarks now..." link via the infobar when using certain theme colors. ([#38354](https://github.com/brave/brave-browser/issues/38354))
 - Fixed error loading Brave VPN credentials in certain cases. ([#36321](https://github.com/brave/brave-browser/issues/36321))
 - Upgraded Chromium to 127.0.6533.73. ([#39948](https://github.com/brave/brave-browser/issues/39948)) ([Changelog for 127.0.6533.73](https://chromium.googlesource.com/chromium/src/+log/126.0.6478.186..127.0.6533.73?pretty=fuller&n=1000))

## [1.67.134](https://github.com/brave/brave-browser/releases/tag/v1.67.134)

 - Disabled "Hangouts" under brave://settings/extensions by default. ([#39664](https://github.com/brave/brave-browser/issues/39664))
 - Removed "Cookies and Site Data" option from individual site detail pages under brave://settings/content/all. ([#39033](https://github.com/brave/brave-browser/issues/39033))
 - Fixed WebGL pages failing to load due to "getAttachedShaders" always returning "null". ([#37044](https://github.com/brave/brave-browser/issues/37044))
 - Upgraded Chromium to 126.0.6478.186. ([#39799](https://github.com/brave/brave-browser/issues/39799)) ([Changelog for 126.0.6478.168](https://chromium.googlesource.com/chromium/src/+log/126.0.6478.126..126.0.6478.186?pretty=fuller&n=1000))

## [1.67.123](https://github.com/brave/brave-browser/releases/tag/v1.67.123)

 - [Security] Fixed unreadable button labels on certain YubiKey modals when using light theme. ([#39072](https://github.com/brave/brave-browser/issues/39072))
 - Fixed unreadable button in the download manager. ([#38905](https://github.com/brave/brave-browser/issues/38905))
 - Upgraded Chromium to 126.0.6478.126. ([#39329](https://github.com/brave/brave-browser/issues/39329)) ([Changelog for 126.0.6478.126](https://chromium.googlesource.com/chromium/src/+log/126.0.6478.114..126.0.6478.126?pretty=fuller&n=1000))

## [1.67.119](https://github.com/brave/brave-browser/releases/tag/v1.67.119)

 - Fixed "Learn More" link within the Solana Associated SPL token account creation tooltip. ([#32016](https://github.com/brave/brave-browser/issues/32016))
 - Fixed crash when switching between grouped tabs in certain cases. ([#38201](https://github.com/brave/brave-browser/issues/38201))
 - Fixed crash on Linux when certain keyboard shortcuts have been removed via brave://settings/system/shortcuts while vertical tabs are enabled. ([#39052](https://github.com/brave/brave-browser/issues/39052))
 - Upgraded Chromium to 126.0.6478.114. ([#39138](https://github.com/brave/brave-browser/issues/39138)) ([Changelog for 126.0.6478.114](https://chromium.googlesource.com/chromium/src/+log/126.0.6478.71..126.0.6478.114?pretty=fuller&n=1000))

## [1.67.116](https://github.com/brave/brave-browser/releases/tag/v1.67.116)

 - Upgraded Chromium to 126.0.6478.71. ([#39032](https://github.com/brave/brave-browser/issues/39032)) ([Changelog for 126.0.6478.71](https://chromium.googlesource.com/chromium/src/+log/126.0.6478.56..126.0.6478.71?pretty=fuller&n=1000))

## [1.67.115](https://github.com/brave/brave-browser/releases/tag/v1.67.115)

### Web3

 - Added support for "Retry transaction" for failed Solana transactions. ([#37776](https://github.com/brave/brave-browser/issues/37776))
 - [Security] Fixed Brave Wallet WebHID connection prompt for Solana. ([#24981](https://github.com/brave/brave-browser/issues/24981))
 - Updated onboarding for Brave Wallet. ([#37871](https://github.com/brave/brave-browser/issues/37871))
 - Updated Solana transactions to rebroadcast every five seconds. ([#37310](https://github.com/brave/brave-browser/issues/37310))
 - Updated ZCash endpoint URL. ([#38782](https://github.com/brave/brave-browser/issues/38782))
 - Updated the deposit icon on the "Accounts" page. ([#38403](https://github.com/brave/brave-browser/issues/38403))
 - Updated the deposit icon on the "Asset Details" account menu. ([#38077](https://github.com/brave/brave-browser/issues/38077))
 - Updated the "LiFiTransactionResponse" JSON to show string value for "chainID". ([#37930](https://github.com/brave/brave-browser/issues/37930))
 - Updated all "More Menu" icons to be vertically aligned. ([#37767](https://github.com/brave/brave-browser/issues/37767))
 - Updated the size of the "Review send" button on the panel. ([#37530](https://github.com/brave/brave-browser/issues/37530))
 - Updated "Deposit" screen to full window height. ([#37479](https://github.com/brave/brave-browser/issues/37479))
 - Updated "Buy" screen to full window height. ([#37437](https://github.com/brave/brave-browser/issues/37437))
 - Renamed "Binance Smart Chain" to "BNB Smart Chain". ([#29110](https://github.com/brave/brave-browser/issues/29110))
 - Removed “Brave Fee” for all “Swap” transactions in Brave Wallet. ([#38566](https://github.com/brave/brave-browser/issues/38566))
 - Fixed incorrect deposit address being shown on the "Deposit" screen. ([#38833](https://github.com/brave/brave-browser/issues/38833))
 - Fixed missing "Connected sites" option when non-Solana network is selected. ([#38868](https://github.com/brave/brave-browser/issues/38868))
 - Fixed "Receipt" button in transaction status panel to show transaction receipt within the panel. ([#37835](https://github.com/brave/brave-browser/issues/37835))
 - Fixed missing network icon on "Asset Details". ([#37818](https://github.com/brave/brave-browser/issues/37818))
 - Fixed inconsistent size of card header buttons on "Account Details" and "Asset Details" screens. ([#37801](https://github.com/brave/brave-browser/issues/37801))
 - Fixed the token list alignment on the panel. ([#37525](https://github.com/brave/brave-browser/issues/37525))
 - Fixed "Portfolio" filter visibility on dark theme. ([#37173](https://github.com/brave/brave-browser/issues/37173))
 - Fixed Brave Wallet not using device locale formatting on "Portfolio" time graph. ([#22816](https://github.com/brave/brave-browser/issues/22816))

### Rewards

 - Added “Brave Search Ads” toggle to “Manage Brave Ads” on brave://rewards page and updated default display behavior. ([#37695](https://github.com/brave/brave-browser/issues/37695))

### General

 - Added Brave Search support to Brave Leo. ([#37575](https://github.com/brave/brave-browser/issues/37575) & [#38155](https://github.com/brave/brave-browser/issues/38155))
 - Added ability to use quick actions via "/" under Brave Leo panel. ([#37294](https://github.com/brave/brave-browser/issues/37294))
 - Added markdown rendering to certain Brave Leo responses. ([#35891](https://github.com/brave/brave-browser/issues/35891))
 - Added permission for location service to help improve geolocation accuracy on Windows and macOS. ([#16897](https://github.com/brave/brave-browser/issues/16897))
 - Added "Update lists" button under brave://adblock to force-update all adblock components. ([#35216](https://github.com/brave/brave-browser/issues/35216))
 - Enabled Media Router feature by default. ([#37109](https://github.com/brave/brave-browser/issues/37109))
 - Implemented dark mode scrollbars on Windows. ([#37882](https://github.com/brave/brave-browser/issues/37882))
 - Re-added "Safety check" section under brave://settings/privacy. ([#38850](https://github.com/brave/brave-browser/issues/38850))
 - Improved Google Docs compatibility with Brave Leo by supporting full page summarization. ([#36649](https://github.com/brave/brave-browser/issues/36649))
 - Improved PDF compatibility with Brave Leo by supporting image based PDFs. ([#36403](https://github.com/brave/brave-browser/issues/36403)) 
 - Updated pricing for Brave Leo. ([#37459](https://github.com/brave/brave-browser/issues/37459))
 - Updated Brave Leo model intro and added tooltip for more details. ([#37825](https://github.com/brave/brave-browser/issues/37825))
 - Updated Brave Leo CTA button text for non-premium users. ([#38695](https://github.com/brave/brave-browser/issues/38695))
 - Updated product header for Brave Leo. ([#36202](https://github.com/brave/brave-browser/issues/36202))
 - Updated labelling on certain language models listed in Brave Leo. ([#35611](https://github.com/brave/brave-browser/issues/35611))
 - Updated Brave wordmark on the New Tab Page for both Private and Tor windows. ([#37946](https://github.com/brave/brave-browser/issues/37946))
 - Updated "Share" menu icons. ([#35758](https://github.com/brave/brave-browser/issues/35758))
 - Updated header for side panel to be lowercase. ([#37715](https://github.com/brave/brave-browser/issues/37715))
 - Replaced "Llama 2" with "Llama 3". ([#38071](https://github.com/brave/brave-browser/issues/38071))
 - Deprecated "Claude Instant" model. ([#37988](https://github.com/brave/brave-browser/issues/37988))
 - Removed background graphics from Brave Leo onboarding. ([#37344](https://github.com/brave/brave-browser/issues/37344))
 - Removed known Salesforce Marketing Cloud tracking parameter "et_rid" from URLs. ([#37847](https://github.com/brave/brave-browser/issues/37847))
 - Removed known Blackbaud tracking parameter "bbeml" from URLs. ([#37971](https://github.com/brave/brave-browser/issues/37971))
 - Fixed labelling and rate-limit messaging for Brave Leo as well as removed the "Switch to basic model" button from rate-limiting modal. ([#38676](https://github.com/brave/brave-browser/issues/38676))
 - Fixed the "Snowflake" option for Tor bridges not working on Linux. ([#37896](https://github.com/brave/brave-browser/issues/37896))
 - Fixed de-AMP to only apply to HTML pages. ([#37406](https://github.com/brave/brave-browser/issues/37406))
 - Fixed items which have been removed from the sidebar being re-enabled. ([#37394](https://github.com/brave/brave-browser/issues/37394))
 - Upgraded Chromium to 126.0.6478.56. ([#38974](https://github.com/brave/brave-browser/issues/38974)) ([Changelog for 126.0.6478.56](https://chromium.googlesource.com/chromium/src/+log/125.0.6422.147..126.0.6478.56?pretty=fuller&n=1000))

 Please click [here](https://github.com/brave/brave-browser/blob/master/CHANGELOG_DESKTOP_ARCHIVE.md) for the CHANGELOG of previous releases which has been archived.