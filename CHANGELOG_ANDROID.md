# Changelog

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