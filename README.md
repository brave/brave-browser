![Brave Browser](./docs/source/_static/Brave.svg)

## Overview

This repository holds the build tools needed to build the Brave desktop browser for macOS, Windows, and Linux. In particular, it fetches and synchronizes code from the projects defined in `package.json` and `src/brave/DEPS`:

  - [Chromium](https://chromium.googlesource.com/chromium/src.git)
    - Fetches code via `depot_tools`.
    - Sets the branch for Chromium (e.g., `65.0.3325.181`).
  - [Brave-Core](https://github.com/brave/brave-core)
    - Mounted in `src/brave`.
    - Maintains patches for third-party Chromium code.
  - [adblock-rust](https://github.com/brave/adblock-rust)
    - Implements Brave's ad-block engine.
    - Linked through [brave/adblock-rust-ffi](https://github.com/brave/brave-core/tree/master/components/adblock_rust_ffi).

## Downloads

You can [visit our website](https://brave.com/download) to get the latest stable release.

## Contributing

Please see the [contributing guidelines](./CONTRIBUTING.md).

Our [Wiki](https://github.com/brave/brave-browser/wiki) also has useful technical information.

## Community

[Join the Q&A community](https://community.brave.com/) if you'd like to get more involved with Brave. You can [ask for help](https://community.brave.com/c/support-and-troubleshooting) or [discuss features you'd like to see](https://community.brave.com/c/brave-feature-requests). We'd love your help to continue improving Brave.

Help us translate Brave into your language by submitting translations at [Transifex](https://explore.transifex.com/brave/brave_en/).

Follow [@brave](https://x.com/brave) on X for important news and announcements.

## Install Prerequisites

Follow the instructions for your platform:

- [macOS](https://github.com/brave/brave-browser/wiki/macOS-Development-Environment)
- [iOS](https://github.com/brave/brave-browser/wiki/iOS-Development-Environment)
- [Windows](https://github.com/brave/brave-browser/wiki/Windows-Development-Environment)
- [Linux](https://github.com/brave/brave-browser/wiki/Linux-Development-Environment)
- [Android](https://github.com/brave/brave-browser/wiki/Android-Development-Environment)

> **Note:** Ensure that you have at least **30GB of free disk space** before cloning Chromium, as the source can exceed 20GB.

## Clone and Initialize the Repo

Once you have the prerequisites installed, you can clone the code and initialize the build environment.

```bash
git clone git@github.com:brave/brave-core.git path-to-your-project-folder/src/brave
cd path-to-your-project-folder/src/brave
npm install

# The Chromium source is downloaded, which has a large history (gigabytes of data).
# This process may take a long time depending on your internet speed.
npm run init
```

For Brave-Core based Android builds, use:
```bash
npm run init -- --target_os=android --target_arch=arm
```
(for the desired CPU type)

For Brave-Core based iOS builds, use:
```bash
npm run init -- --target_os=ios
```

You can also set the `target_os` and `target_arch` for both `init` and `build` using:

```bash
npm config set target_os android
npm config set target_arch arm
```

Additional parameters needed to build are documented at [Build Configuration](https://github.com/brave/brave-browser/wiki/Build-configuration).

Internal developers can find more information at [`.env` Config for Brave Developers](https://github.com/brave/devops/wiki/%60.env%60-config-for-Brave-Developers).

## Build Brave

The default build type is "component".

```bash
# Start the component build compile
npm run build
```

To perform a release build:

```bash
# Start the release compile
npm run build Release
```

For Brave-Core based Android builds, use:
```bash
npm run build -- --target_os=android --target_arch=arm
```
or set the npm config variables as specified above for `init`.

For Brave-Core based iOS builds, use the Xcode project found in `ios/brave-ios/App`. You can open this project directly or run:
```bash
npm run ios_bootstrap -- --open_xcodeproj
```
to open it in Xcode. See the [iOS Developer Environment](https://github.com/brave/brave-browser/wiki/iOS-Development-Environment#Building) for more details.

### Build Configurations

Running a release build with `npm run build Release` can be very slow and consume a lot of RAM, especially on Linux with the Gold LLVM plugin.

To run a statically linked build (which takes longer to build, but starts faster):

```bash
npm run build -- Static
```

To run a debug build (component build with `is_debug=true`):

```bash
npm run build -- Debug
```

**NOTE:** The build time depends on your system’s processor and memory. It may take several hours on lower-end systems.

## Run Brave

To start the build, choose one of the following options:

```bash
npm start Release
```
or
```bash
npm start Component
```
or
```bash
npm start Static
```
or
```bash
npm start Debug
```

## Update Brave

Use the following commands to update Brave:

```bash
npm run sync -- --force    # Force updates
npm run sync -- --init     # Force re-initialization
npm run sync -- --create   # Create missing dependencies
npm run sync brave_core_ref  # Sync to a specific Brave-Core reference
```

**Important:** This command will attempt to stash your local changes in Brave-Core, but it's safer to commit your local changes before running it.

Depending on the flags used, `npm run sync` will:
1. 📥 Update sub-projects (Chromium, Brave-Core) to the latest commit of a given git ref (e.g., a tag or branch).
2. 🤕 Apply patches.
3. 🔄 Update gclient DEPS dependencies.
4. ⏩ Run hooks (e.g., perform `npm install` on child projects).

| Flag                         | Description                                                                                                                                                                                                                                                                                                                               |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **No flags**                 | Updates Chromium if needed and re-applies patches. If the Chromium version did not change, it will only re-apply patches that have changed. It will update child dependencies only if any project needed updating during this script run. <br><br>*Use this if you want the script to keep you up to date instead of manually pulling or switching branches.* |
| **--force**                  | Updates both Chromium and Brave-Core to the latest remote commit for the current Brave-Core branch and the Chromium reference specified in `brave-browser/package.json` (e.g., `master` or `74.0.0.103`). It will re-apply all patches and force update all child dependencies. <br><br>*Use this if you're having trouble and want to force the branches back to a known state.* |
| **--init**                   | Force updates both Chromium and Brave-Core to the versions specified in `brave-browser/package.json` and force updates all dependent repositories (equivalent to running `npm run init`).                                                                                                                                              |
| **--sync_chromium (true/false)** | Forces or skips the Chromium version update when applicable. Useful if you want to avoid a minor update when not ready for the longer build time a Chromium update may cause. A warning will be output if the current code state expects a different Chromium version, which may cause the build to fail.                                                                   |
| **-D, --delete_unused_deps** | Deletes from the working copy any dependencies that have been removed since the last sync, mimicking `gclient sync -D`.                                                                                                                                                                                                                 |

## Scenarios

#### Create a New Branch
```bash
brave-browser> cd src/brave
brave-browser/src/brave> git checkout -b branch_name
```

#### Checkout an Existing Branch or Tag
```bash
brave-browser/src/brave> git fetch origin
brave-browser/src/brave> git checkout [-b] branch_name
brave-browser/src/brave> npm run sync
```
This will update patches and child dependencies as needed.

#### Update the Current Branch to the Latest Remote
```bash
brave-browser/src/brave> git pull
brave-browser/src/brave> npm run sync
```

#### Reset to the Latest Brave-Browser Master and Brave-Core Master
```bash
brave-browser> git checkout master
brave-browser> git pull
brave-browser> npm run sync -- --init
```
> **Warning:** This will remove any pending changes in your Brave-Core working directory.

#### When DEPS Didn't Change, But .patch Files Did
For a quick mini-sync before a build:
```bash
brave-browser/src/brave> git checkout featureB
brave-browser/src/brave> git pull
brave-browser/src/brave> cd ../..
brave-browser> npm run apply_patches
```

## Enabling Third-Party APIs

1. **Google Safe Browsing:**  
   Get an API key with the SafeBrowsing API enabled from the [Google Developers Console](https://console.developers.google.com/). Update the `GOOGLE_API_KEY` environment variable with your key as described in the [Chromium API Keys guide](https://www.chromium.org/developers/how-tos/api-keys) to enable Google Safe Browsing.

## Development

- [Security Rules from Chromium](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/security/rules.md)
- [IPC Review Guidelines](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/ipc-reviews.md) (in particular, [this reference](https://docs.google.com/document/d/1Kw4aTuISF7csHnjOpDJGc7JYIjlvOAKRprCTBVWw_E4/edit#heading=h.84bpc1e9z1bg))
- [Brave's Internal Security Guidelines](https://github.com/brave/internal/wiki/Pull-request-security-audit-checklist) *(for employees only)*
- [Rust Usage](https://github.com/brave/brave-core/blob/master/docs/rust.md)

## Troubleshooting

See the [Troubleshooting](https://github.com/brave/brave-browser/wiki/Troubleshooting) page for solutions to common problems.
