# Secretariat Browser

> **Privacy-focused browser with revolutionary Discovery Engine search**

## 🌟 What is Secretariat?

**Secretariat** is a privacy-focused web browser with a groundbreaking **Discovery Engine** that revolutionizes how you search and explore the web. Built on the solid foundation of [Brave Browser](https://github.com/brave/brave-browser) and Chromium, Secretariat introduces:

- **🎯 Discovery Engine**: Customizable search that breaks free from SEO-dominated results
- **🎲 Serendipity-First**: Rediscover the joy of unexpected web finds
- **🔒 Privacy-Focused**: No tracking, no profiling, no ads
- **📚 Search Archives**: Never lose an interesting discovery again
- **🌍 Source Diversity**: Surface small blogs, hobbyist content, and hidden gems

## 📖 Documentation

- **[SECRETARIAT_README.md](./SECRETARIAT_README.md)** - Complete project overview
- **[SETUP.md](./SETUP.md)** - Development environment setup guide
- **[SECRETARIAT_ROADMAP.md](./SECRETARIAT_ROADMAP.md)** - Development roadmap and milestones
- **[Discovery Engine Design](./Secretariat%20Search%20-%20_Discovery%20Engine_%20Design%20Document.md)** - Full feature specification

## 🚀 Quick Start

See **[SETUP.md](./SETUP.md)** for detailed setup instructions.

```bash
# Clone the repository
git clone https://github.com/jpugh7/Secretariat-from-Brave-browser-.git
cd Secretariat-from-Brave-browser-

# Install dependencies
npm install

# Initialize (downloads Chromium - takes a while!)
npm run init

# Build Secretariat
npm run build Release

# Run the browser
npm start Release
```

## 🏗️ Architecture

This repository holds the build tools for Secretariat Browser. It fetches and syncs code from:

  - [Chromium](https://chromium.googlesource.com/chromium/src.git)
    - The base browser engine
  - [brave-core](https://github.com/brave/brave-core)
    - Brave's privacy-focused implementation
    - Mounted at `src/brave/`
  - **Secretariat Discovery Engine** (to be created)
    - Custom search and discovery system
    - Will be located at `src/brave/components/discovery_search/`

## 🙏 Credits

Secretariat is built upon the excellent work of:
- **Brave Software** - Privacy-focused browser foundation
- **Chromium Project** - Browser engine
- **DuckDuckGo** - Privacy-respecting search backend

Original Brave Browser: [brave/brave-browser](https://github.com/brave/brave-browser)

## Contributing

Please see the [contributing guidelines](./CONTRIBUTING.md).

Our [Wiki](https://github.com/brave/brave-browser/wiki) also has some useful technical information.

## Community

[Join the Q&A community](https://community.brave.app/) if you'd like to get more involved with Brave. You can [ask for help](https://community.brave.app/c/support-and-troubleshooting),
[discuss features you'd like to see](https://community.brave.app/c/brave-feature-requests), and a lot more. We'd love to have your help so that we can continue improving Brave.

Help us translate Brave to your language by submitting translations at https://explore.transifex.com/brave/brave_en/.

Follow [@brave](https://x.com/brave) on X for important news and announcements.

## Install prerequisites

Follow the instructions for your platform:

- [macOS](https://github.com/brave/brave-browser/wiki/macOS-Development-Environment)
- [iOS](https://github.com/brave/brave-browser/wiki/iOS-Development-Environment)
- [Windows](https://github.com/brave/brave-browser/wiki/Windows-Development-Environment)
- [Linux](https://github.com/brave/brave-browser/wiki/Linux-Development-Environment)
- [Android](https://github.com/brave/brave-browser/wiki/Android-Development-Environment)

## Clone and initialize the repo

Once you have the prerequisites installed, you can get the code and initialize the build environment.

```bash
git clone git@github.com:brave/brave-core.git path-to-your-project-folder/src/brave
cd path-to-your-project-folder/src/brave
npm install

# the Chromium source is downloaded, which has a large history (gigabytes of data)
# this might take really long to finish depending on internet speed

npm run init
```
brave-core based android builds should use `npm run init -- --target_os=android --target_arch=arm` (or whichever CPU type you want to build for)
brave-core based iOS builds should use `npm run init -- --target_os=ios`

You can also set the target_os and target_arch for init and build using:

```
npm config set target_os android
npm config set target_arch arm
```

Additional parameters needed to build are documented at https://github.com/brave/brave-browser/wiki/Build-configuration

Internal developers can find more information at https://github.com/brave/devops/wiki/%60.env%60-config-for-Brave-Developers

## Build Brave
The default build type is component.

```
# start the component build compile
npm run build
```

To do a release build:

```
# start the release compile
npm run build Release
```

brave-core based android builds should use `npm run build -- --target_os=android --target_arch=arm` or set the npm config variables as specified above for `init`

brave-core based iOS builds should use the Xcode project found in `ios/brave-ios/App`. You can open this project directly or run `npm run ios_bootstrap -- --open_xcodeproj` to have it opened in Xcode. See the [iOS Developer Environment](https://github.com/brave/brave-browser/wiki/iOS-Development-Environment#Building) for more information on iOS builds.

### Build Configurations

Running a release build with `npm run build Release` can be very slow and use a lot of RAM, especially on Linux with the Gold LLVM plugin.

To run a statically linked build (takes longer to build, but starts faster):

```bash
npm run build -- Static
```

To run a debug build (Component build with is_debug=true):

```bash
npm run build -- Debug
```
NOTE: the build will take a while to complete. Depending on your processor and memory, it could potentially take a few hours.

## Run Brave
To start the build:

`npm start [Release|Component|Static|Debug]`

# Update Brave

`npm run sync -- [--force] [--init] [--create] [brave_core_ref]`

**This will attempt to stash your local changes in brave-core, but it's safer to commit local changes before running this**

`npm run sync` will (depending on the below flags):

1. 📥 Update sub-projects (chromium, brave-core) to latest commit of a git ref (e.g. tag or branch)
2. 🤕 Apply patches
3. 🔄 Update gclient DEPS dependencies
4. ⏩ Run hooks (e.g. to perform `npm install` on child projects)

| flag | Description |
|---|---|
|`[no flags]`|updates chromium if needed and re-applies patches. If the chromium version did not change, it will only re-apply patches that have changed. Will update child dependencies **only if any project needed updating during this script run**. <br> **Use this if you want the script to manage keeping you up to date instead of pulling or switching branches manually. **|
|`--force`|updates both _Chromium_ and _brave-core_ to the latest remote commit for the current brave-core branch and the _Chromium_ ref specified in brave-browser/package.json (e.g. `master` or `74.0.0.103`). Will re-apply all patches. Will force update all child dependencies. <br> **Use this if you're having trouble and want to force the branches back to a known state. **|
|`--init`|force update both _Chromium_ and _brave-core_ to the versions specified in brave-browser/package.json and force updates all dependent repos - same as `npm run init`|
|`--sync_chromium (true/false)`|Will force or skip the chromium version update when applicable. Useful if you want to avoid a minor update when not ready for the larger build time a chromium update may result in. A warning will be output about the current code state expecting a different chromium version. Your build may fail as a result.|
|`-D, --delete_unused_deps`|Will delete from the working copy any dependencies that have been removed since the last sync. Mimics `gclient sync -D`.|

Run `npm run sync brave_core_ref` to checkout the specified _brave-core_ ref and update all dependent repos including chromium if needed.

## Scenarios

#### Create a new branch:
```bash
brave-browser> cd src/brave
brave-browser/src/brave> git checkout -b branch_name
```

#### Checkout an existing branch or tag:
```bash
brave-browser/src/brave> git fetch origin
brave-browser/src/brave> git checkout [-b] branch_name
brave-browser/src/brave> npm run sync
...Updating 2 patches...
...Updating child dependencies...
...Running hooks...
```

#### Update the current branch to the latest remote:
```bash
brave-browser/src/brave> git pull
brave-browser/src/brave> npm run sync
...Updating 2 patches...
...Updating child dependencies...
...Running hooks...
```

#### Reset to latest brave-browser master and brave-core master (via `init`, will always result in a longer build and will remove any pending changes in your brave-core working directory):
```bash
brave-browser> git checkout master
brave-browser> git pull
brave-browser> npm run sync -- --init
```

#### When you know that DEPS didn't change, but .patch files did (quickest attempt to perform a mini-sync before a build):
```bash
brave-browser/src/brave> git checkout featureB
brave-browser/src/brave> git pull
brave-browser/src/brave> cd ../..
brave-browser> npm run apply_patches
...Applying 2 patches...
```

# Enabling third-party APIs:

1. **Google Safe Browsing**: Get an API key with SafeBrowsing API enabled from https://console.developers.google.com/. Update the `GOOGLE_API_KEY` environment variable with your key as per https://www.chromium.org/developers/how-tos/api-keys to enable Google SafeBrowsing.

# Development

- [Security rules from Chromium](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/security/rules.md)
- [IPC review guidelines](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/ipc-reviews.md) (in particular [this reference](https://docs.google.com/document/d/1Kw4aTuISF7csHnjOpDJGc7JYIjlvOAKRprCTBVWw_E4/edit#heading=h.84bpc1e9z1bg))
- [Brave's internal security guidelines](https://github.com/brave/internal/wiki/Pull-request-security-audit-checklist) (for employees only)
- [Rust usage](https://github.com/brave/brave-core/blob/master/docs/rust.md)

# Troubleshooting

See [Troubleshooting](https://github.com/brave/brave-browser/wiki/Troubleshooting) for solutions to common problems.
