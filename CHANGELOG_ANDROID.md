# Changelog

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