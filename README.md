# Brave Browser


## Overview 

This repository holds the build tools needed to build the Brave desktop browser for macOS, Windows, and Linux.  In particular, it fetches and syncs code from the projects we define in `package.json` and `src/brave/DEPS`:

  - [Chromium](https://chromium.googlesource.com/chromium/src.git)
    - Fetches code via `depot_tools`.
    - sets the branch for Chromium (ex: 65.0.3325.181).
  - [brave-core](https://github.com/brave/brave-core)
    - Mounted at `src/brave`.
    - Maintains patches for 3rd party Chromium code.
  - [brave-extension](https://github.com/brave/brave-extension)
    - Mounted at `src/brave/vendor/brave-extension`.
    - Browser action extension which implements the UI for the shields panel.
  - [ad-block](https://github.com/brave/ad-block)
    - Mounted at `src/brave/vendor/ad-block`.
    - Implements Brave's ad-block engine.
  - [tracking-protection](https://github.com/brave/tracking-protection)
    - Mounted at `src/brave/vendor/tracking-protection`.
    - Implements Brave's tracking-protection engine.
    
## Build instructions

See the [Brave Wiki](https://github.com/brave/brave-browser/wiki).

## Downloads

You can [visit our website](https://brave.com/downloads.html) to get the latest stable release.

## Other repositories

For other versions of our browser, please see:

* iPhone - [brave/browser-ios](https://github.com/brave/browser-ios)
* Android - [brave/browser-android-tabs](https://github.com/brave/browser-android-tabs)

## Community

[Join the Q&A community](https://community.brave.com/) if you'd like to get more involved with Brave. You can [ask for help](https://community.brave.com/c/help-me),
[discuss features you'd like to see](https://community.brave.com/c/feature-requests), and a lot more. We'd love to have your help so that we can continue improving Brave.

Help us translate Brave to your language by submitting translations at https://www.transifex.com/brave/brave/

Join our [Discord community chat](https://discordapp.com/invite/k57tYrS) for higher bandwidth discussions.

Follow [@brave](https://twitter.com/brave) on Twitter for important news and announcements.
