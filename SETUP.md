# Secretariat Browser - Development Setup Guide

This guide will walk you through setting up the Secretariat Browser development environment.

## Overview

Secretariat is built on top of Brave Browser, which is itself built on Chromium. The build process involves:

1. Installing prerequisites for your platform
2. Cloning the Secretariat repository
3. Running initialization to download Chromium and brave-core
4. Building the browser
5. Running and testing

## Prerequisites

### System Requirements

**Minimum:**
- 8 GB RAM (16 GB recommended)
- 100 GB free disk space
- Fast internet connection (Chromium download is several GB)

**Recommended:**
- 16+ GB RAM
- 150+ GB SSD storage
- Multi-core processor

### Required Software

#### All Platforms
- **Node.js**: v24.0.0 - v24.x ([Download](https://nodejs.org/))
- **npm**: v11.0.0+ (comes with Node.js)
- **Git**: Latest version
- **Python**: 3.x

#### Platform-Specific

##### Linux (Ubuntu/Debian)

```bash
# Install build dependencies
sudo apt-get update
sudo apt-get install -y \
  build-essential \
  git \
  python3 \
  python3-pip \
  curl \
  ninja-build \
  pkg-config \
  libglib2.0-dev \
  libgtk-3-dev \
  libdbus-1-dev \
  libnss3-dev \
  libxss-dev \
  libasound2-dev \
  libcups2-dev \
  libpango1.0-dev \
  libatk1.0-dev \
  libatk-bridge2.0-dev \
  libgbm-dev \
  libjpeg-dev

# Install Node.js 24.x
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs
```

##### macOS

```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install dependencies
brew install node@24 python3 ninja

# Verify Node.js version
node --version  # Should be v24.x.x
```

##### Windows

1. **Install Visual Studio 2022 Community**
   - Download from: https://visualstudio.microsoft.com/downloads/
   - Select "Desktop development with C++"
   - Include: Windows 10/11 SDK, ATL, MFC

2. **Install Node.js**
   - Download from: https://nodejs.org/ (v24.x LTS)
   - Use the Windows installer

3. **Install Python 3**
   - Download from: https://www.python.org/downloads/
   - Check "Add Python to PATH" during installation

4. **Install Git**
   - Download from: https://git-scm.com/download/win
   - Use default settings

## Clone and Initialize

### Step 1: Clone the Repository

```bash
# Clone Secretariat repository
git clone https://github.com/jpugh7/Secretariat-from-Brave-browser-.git
cd Secretariat-from-Brave-browser-

# Verify you're on the correct branch
git branch
```

### Step 2: Install NPM Dependencies

```bash
# Install root package dependencies
npm install
```

### Step 3: Initialize Build Environment

This step downloads Chromium source code and brave-core. **This will take a while** (30 minutes to several hours depending on your internet speed).

```bash
# Initialize for your platform
npm run init

# For Linux builds:
npm run init -- --target_os=linux

# For Android builds:
# npm run init -- --target_os=android --target_arch=arm

# For iOS builds:
# npm run init -- --target_os=ios
```

**What this does:**
- Clones brave-core into `src/brave/`
- Downloads Chromium source (several GB)
- Downloads and installs depot_tools
- Syncs dependencies
- Applies Brave patches to Chromium

### Step 4: Verify Installation

```bash
# Check that brave-core was cloned
ls src/brave/

# You should see directories like:
# - app/
# - browser/
# - components/
# - build/
# - etc.
```

## Building Secretariat

### Component Build (Development)

Fastest build type, best for development iteration:

```bash
npm run build
```

This creates a component build in `src/out/Component/`.

### Release Build (Production)

Optimized build for distribution:

```bash
npm run build Release
```

This creates a release build in `src/out/Release/`.

### Debug Build

Build with debugging symbols:

```bash
npm run build Debug
```

### Static Build

Statically linked binary (slower to build, faster to start):

```bash
npm run build Static
```

### Build Times

Expected build times (first build):
- **Component**: 1-3 hours
- **Release**: 2-4 hours
- **Debug**: 1-3 hours

Subsequent incremental builds: 5-30 minutes

## Running Secretariat

After building, you can run the browser:

```bash
# Run the default (Component) build
npm start

# Run Release build
npm start Release

# Run Debug build
npm start Debug
```

### Platform-Specific Binaries

If you want to run the binary directly:

**Linux:**
```bash
./src/out/Release/brave
```

**macOS:**
```bash
./src/out/Release/Brave.app/Contents/MacOS/Brave
```

**Windows:**
```
src\out\Release\brave.exe
```

## Development Workflow

### Making Changes

1. **Edit source files** in `src/brave/`
2. **Rebuild**: `npm run build`
3. **Test**: `npm start`
4. **Iterate**

### Syncing Updates

To update Chromium and brave-core to latest versions:

```bash
# Sync to latest
cd src/brave
git pull
cd ../..
npm run sync

# Force sync (resets everything)
npm run sync -- --force
```

### Applying Patches

If you modify Chromium files directly, you need to update patches:

```bash
npm run update_patches
```

## Testing

### Run All Tests

```bash
npm run test
```

### Run Specific Tests

```bash
# Browser tests
npm run test brave_browser_tests

# Unit tests
npm run test brave_unit_tests

# Security tests
npm run test-security
```

## Common Issues

### Issue: "depot_tools not found"

**Solution:**
```bash
npm run init -- --force
```

### Issue: Build fails with "out of memory"

**Solution:**
- Close other applications
- Increase swap space (Linux)
- Use Component build instead of Release
- Add this to your build args:
  ```bash
  npm run build -- --args="is_component_build=true"
  ```

### Issue: "Python version mismatch"

**Solution:**
```bash
# Ensure Python 3.x is default
python --version

# On Linux, you may need to create a symlink
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
```

### Issue: Node version mismatch

**Solution:**
```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node 24.x
nvm install 24
nvm use 24

# Verify
node --version
```

### Issue: Build is very slow

**Tips:**
- Use Component build for development
- Use `ccache` on Linux/macOS to cache compiled objects
- Close other applications
- Build with fewer parallel jobs:
  ```bash
  npm run build -- --args="max_jobs_per_link=4"
  ```

## Next Steps

Once you have a working build:

1. **Read the architecture**: See `SECRETARIAT_README.md` and `SECRETARIAT_ROADMAP.md`
2. **Start with rebranding**: Follow Phase 1 of the roadmap
3. **Create Discovery Engine component**: Follow Phase 2 of the roadmap
4. **Join the community**: GitHub Discussions (coming soon)

## Additional Resources

### Official Documentation
- [Brave Browser Wiki](https://github.com/brave/brave-browser/wiki)
- [Chromium Development](https://www.chromium.org/developers/)
- [GN Build System](https://gn.googlesource.com/gn/)

### Platform-Specific Guides
- [Linux Development Environment](https://github.com/brave/brave-browser/wiki/Linux-Development-Environment)
- [macOS Development Environment](https://github.com/brave/brave-browser/wiki/macOS-Development-Environment)
- [Windows Development Environment](https://github.com/brave/brave-browser/wiki/Windows-Development-Environment)

### Secretariat Documentation
- `SECRETARIAT_README.md` - Project overview
- `SECRETARIAT_ROADMAP.md` - Development roadmap
- `Secretariat Search - _Discovery Engine_ Design Document.md` - Feature specification

## Getting Help

- **Build Issues**: Check [Brave's Troubleshooting Wiki](https://github.com/brave/brave-browser/wiki/Troubleshooting)
- **Chromium Issues**: Search [Chromium Bug Tracker](https://bugs.chromium.org/)
- **Secretariat Issues**: Open an issue on GitHub

---

**Happy Building!** 🚀

Once you have a successful build, you're ready to start working on the Discovery Engine and making Secretariat a reality.
