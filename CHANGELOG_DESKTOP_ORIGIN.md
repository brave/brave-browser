# Changelog

## [1.93.138](https://github.com/brave/brave-browser/releases/tag/v1.93.138)

 - Upgraded Chromium to 151.0.7922.173. ([#58314](https://github.com/brave/brave-browser/issues/58314)) ([Changelog for 151.0.7922.173](https://chromium.googlesource.com/chromium/src/+log/151.0.7922.169..151.0.7922.173?pretty=fuller&n=1000))

## [1.93.137](https://github.com/brave/brave-browser/releases/tag/v1.93.137)

 - Updated opening a link in a container to set "Sec-Fetch-Site:cross-origin" appropriately as reported on HackerOne by newfunction. ([#58230](https://github.com/brave/brave-browser/issues/58230))
 - Upgraded Chromium to 151.0.7922.169. ([#58247](https://github.com/brave/brave-browser/issues/58247)) ([Changelog for 151.0.7922.169](https://chromium.googlesource.com/chromium/src/+log/151.0.7922.137..151.0.7922.169?pretty=fuller&n=1000))

## [1.93.136](https://github.com/brave/brave-browser/releases/tag/v1.93.136)

 - Disabled HEVC software decoder by default on Linux. ([#57974](https://github.com/brave/brave-browser/issues/57974))
 - Fixed "getExtension" returning null script for extension. ([#57902](https://github.com/brave/brave-browser/issues/57902))
 - Upgraded Chromium to 151.0.7922.137. ([#58062](https://github.com/brave/brave-browser/issues/58062)) ([Changelog for 151.0.7922.137](https://chromium.googlesource.com/chromium/src/+log/151.0.7922.108..151.0.7922.137?pretty=fuller&n=1000))

## [1.93.134](https://github.com/brave/brave-browser/releases/tag/v1.93.134)

 - Added migration of browser level extension settings for Brave-hosted MV2 extensions. ([#57454](https://github.com/brave/brave-browser/issues/57454))
 - Fixed "getSupportedExtensions" overlap between "WebGL" and "WebGL2". ([#57736](https://github.com/brave/brave-browser/issues/57736))
 - Upgraded Chromium to 151.0.7922.108. ([#57922](https://github.com/brave/brave-browser/issues/57922)) ([Changelog for 151.0.7922.108](https://chromium.googlesource.com/chromium/src/+log/151.0.7922.76..151.0.7922.108?pretty=fuller&n=1000))

## [1.93.132](https://github.com/brave/brave-browser/releases/tag/v1.93.132)

 - [Security] Fixed Widevine install prompt as reported on HackerOne by syarif07. ([#57649](https://github.com/brave/brave-browser/issues/57649))
 - Fixed NoScript MV3 extension incorrectly being migrated to its Brave-hosted MV2 equivalent. ([#57760](https://github.com/brave/brave-browser/issues/57760))
 - Fixed multiple shield icons being displayed in PWA windows after going fullscreen on macOS. ([#57349](https://github.com/brave/brave-browser/issues/57349))
 - Fixed black bar being displayed on the tabs bar when using compact mode in fullscreen on macOS. ([#56914](https://github.com/brave/brave-browser/issues/56914))
 - Upgraded Chromium to 151.0.7922.76. ([#57849](https://github.com/brave/brave-browser/issues/57849)) ([Changelog for 151.0.7922.76](https://chromium.googlesource.com/chromium/src/+log/151.0.7922.71..151.0.7922.76?pretty=fuller&n=1000))

## [1.93.129](https://github.com/brave/brave-browser/releases/tag/v1.93.129)

### General

 - Added "Use compact mode" setting under brave://settings/appearance. ([#55506](https://github.com/brave/brave-browser/issues/55506))
 - Added "Local history retention" setting under brave://settings/privacy. ([#29045](https://github.com/brave/brave-browser/issues/29045))
 - Added context menu to the tab search button. ([#54887](https://github.com/brave/brave-browser/issues/54887))
 - Added new WebGPU webcompat content settings type. ([#55927](https://github.com/brave/brave-browser/issues/55927))
 - Improved adblocking. ([#57042](https://github.com/brave/brave-browser/issues/57042))
 - Improved fingerprint farbling by adding support for "getSupportedExtensions" and "WebGL". ([#15904](https://github.com/brave/brave-browser/issues/15904))
 - Updated location of tab search button. ([#56579](https://github.com/brave/brave-browser/issues/56579))
 - Updated the sidebar to work independently from side panels. ([#56491](https://github.com/brave/brave-browser/issues/56491))
 - Updated icons for Bookmarks side panel. ([#55826](https://github.com/brave/brave-browser/issues/55826))
 - Updated icon sizing on sidebar. ([#56258](https://github.com/brave/brave-browser/issues/56258))
 - Updated sync server configurability via brave://flags/#brave-override-sync-server-url. ([#48909](https://github.com/brave/brave-browser/issues/48909))
 - Removed blocked query parameters for values like "=". ([#55924](https://github.com/brave/brave-browser/issues/55924))
 - Fixed startup error messages not being localized. ([#56237](https://github.com/brave/brave-browser/issues/56237))
 - Fixed issue where custom high-resolution background uploads for the New Tab Page caused the browser to get stuck in a loading state. ([#55551](https://github.com/brave/brave-browser/issues/55551))
 - Fixed farbling of "Accept-Language" header position. ([#55271](https://github.com/brave/brave-browser/issues/55271))
 - Fixed inability to play H.265/HEVC videos on Windows and Linux. ([#40101](https://github.com/brave/brave-browser/issues/40101))
 - Upgraded Chromium to 151.0.7922.71. ([#57670](https://github.com/brave/brave-browser/issues/57670)) ([Changelog for 151.0.7922.71](https://chromium.googlesource.com/chromium/src/+log/150.0.7871.186..151.0.7922.71?pretty=fuller&n=1000))

## [1.92.144](https://github.com/brave/brave-browser/releases/tag/v1.92.144)

 - Upgraded Chromium to 150.0.7871.186. ([#57490](https://github.com/brave/brave-browser/issues/57490)) ([Changelog for 150.0.7871.186](https://chromium.googlesource.com/chromium/src/+log/150.0.7871.182..150.0.7871.186?pretty=fuller&n=1000))

## [1.92.143](https://github.com/brave/brave-browser/releases/tag/v1.92.143)

 - Upgraded Chromium to 150.0.7871.182. ([#57409](https://github.com/brave/brave-browser/issues/57409)) ([Changelog for 150.0.7871.182](https://chromium.googlesource.com/chromium/src/+log/150.0.7871.128..150.0.7871.182?pretty=fuller&n=1000))

## [1.92.141](https://github.com/brave/brave-browser/releases/tag/v1.92.141)

 - Fixed color picker displaying out of bounds when creating a new profile. ([#56808](https://github.com/brave/brave-browser/issues/56808))
 - Fixed icon displaying in the title bar on browser launch when using vertical tabs on Windows. ([#57123](https://github.com/brave/brave-browser/issues/57123))
 - Upgraded Chromium to 150.0.7871.128. ([#57262](https://github.com/brave/brave-browser/issues/57262)) ([Changelog for 150.0.7871.128](https://chromium.googlesource.com/chromium/src/+log/150.0.7871.125..150.0.7871.128?pretty=fuller&n=1000))

## [1.92.140](https://github.com/brave/brave-browser/releases/tag/v1.92.140)

 - Disabled extensions manifest V2 deprecation. ([#57155](https://github.com/brave/brave-browser/issues/57155))
 - Fixed permission prompts not appearing in Container tabs. ([#56943](https://github.com/brave/brave-browser/issues/56943))
 - Fixed unnecessary truncation of tab group titles. ([#56901](https://github.com/brave/brave-browser/issues/56901))
 - Upgraded Chromium to 150.0.7871.125. ([#57142](https://github.com/brave/brave-browser/issues/57142)) ([Changelog for 150.0.7871.125](https://chromium.googlesource.com/chromium/src/+log/150.0.7871.114..150.0.7871.125?pretty=fuller&n=1000))

## [1.92.139](https://github.com/brave/brave-browser/releases/tag/v1.92.139)

 - Upgraded Chromium to 150.0.7871.114. ([#57016](https://github.com/brave/brave-browser/issues/57016)) ([Changelog for 150.0.7871.114](https://chromium.googlesource.com/chromium/src/+log/150.0.7871.101..150.0.7871.114?pretty=fuller&n=1000))

## [1.92.138](https://github.com/brave/brave-browser/releases/tag/v1.92.138)

 - Fixed issue where previously used download location was not retained. ([#56594](https://github.com/brave/brave-browser/issues/56594))
 - Upgraded Chromium to 150.0.7871.101. ([#56956](https://github.com/brave/brave-browser/issues/56956)) ([Changelog for 150.0.7871.101](https://chromium.googlesource.com/chromium/src/+log/150.0.7871.63..150.0.7871.101?pretty=fuller&n=1000))

## [1.92.134](https://github.com/brave/brave-browser/releases/tag/v1.92.134)

 - Added Containers feature (being rolled out in phases using Griffin starting at 25%). ([#46349](https://github.com/brave/brave-browser/issues/46349))
 - Improved UI/UX for vertical tabs. ([#56815](https://github.com/brave/brave-browser/issues/56815))
 - Improved adblocking. ([#55430](https://github.com/brave/brave-browser/issues/55430))
 - Updated Brave Shields icon to display on Progressive Web App (PWA) windows. ([#7715](https://github.com/brave/brave-browser/issues/7715))
 - Updated settings under "Social media blocking" section of brave://settings/shields to be per-profile. ([#55277](https://github.com/brave/brave-browser/issues/55277))
 - Replaced known Web Store MV2 extensions with Brave-hosted equivalents. ([#56654](https://github.com/brave/brave-browser/issues/56654))
 - Fixed errors in macOS PKG "postinstall" script. ([#39567](https://github.com/brave/brave-browser/issues/39567))
 - Upgraded Chromium to 150.0.7871.63. ([#56791](https://github.com/brave/brave-browser/issues/56791)) ([Changelog for 150.0.7871.63](https://chromium.googlesource.com/chromium/src/+log/149.0.7827.201..150.0.7871.63?pretty=fuller&n=1000))

## [1.91.180](https://github.com/brave/brave-browser/releases/tag/v1.91.180)

 - Upgraded Chromium to 149.0.7827.201. ([#56669](https://github.com/brave/brave-browser/issues/56669)) ([Changelog for 149.0.7827.201](https://chromium.googlesource.com/chromium/src/+log/149.0.7827.196..149.0.7827.201?pretty=fuller&n=1000))

## [1.91.178](https://github.com/brave/brave-browser/releases/tag/v1.91.178)

 - Fixed certain extensions not working as expected. ([#56271](https://github.com/brave/brave-browser/issues/56271))
 - Fixed inability to use Brave Sync in certain cases. ([#55203](https://github.com/brave/brave-browser/issues/55203))
 - Upgraded Chromium to 149.0.7827.196. ([#56598](https://github.com/brave/brave-browser/issues/56598)) ([Changelog for 149.0.7827.196](https://chromium.googlesource.com/chromium/src/+log/149.0.7827.155..149.0.7827.196?pretty=fuller&n=1000))

## [1.91.175](https://github.com/brave/brave-browser/releases/tag/v1.91.175)

 - Upgraded Chromium to 149.0.7827.155. ([#56446](https://github.com/brave/brave-browser/issues/56446)) ([Changelog for 149.0.7827.155](https://chromium.googlesource.com/chromium/src/+log/149.0.7827.115..149.0.7827.155?pretty=fuller&n=1000))

## [1.91.172](https://github.com/brave/brave-browser/releases/tag/v1.91.172)

 - Upgraded Chromium to 149.0.7827.115. ([#56299](https://github.com/brave/brave-browser/issues/56299)) ([Changelog for 149.0.7827.115](https://chromium.googlesource.com/chromium/src/+log/149.0.7827.103..149.0.7827.115?pretty=fuller&n=1000))

## [1.91.171](https://github.com/brave/brave-browser/releases/tag/v1.91.171)

 - Removed "Survey Panelist" setting from brave://settings/privacy. ([#56123](https://github.com/brave/brave-browser/issues/56123))
 - Fixed P3A and usage ping under brave://settings/privacy being displayed on first launch on Linux. ([#56166](https://github.com/brave/brave-browser/issues/56166))
 - Upgraded Chromium to 149.0.7827.103. ([#56198](https://github.com/brave/brave-browser/issues/56198)) ([Changelog for 149.0.7827.103](https://chromium.googlesource.com/chromium/src/+log/149.0.7827.54..149.0.7827.103?pretty=fuller&n=1000))

## [1.91.168](https://github.com/brave/brave-browser/releases/tag/v1.91.168)

 - Initial Brave Origin release. ([#37127](https://github.com/brave/brave-browser/issues/37127))
