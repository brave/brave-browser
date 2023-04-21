# Build Brave on `macOS Ventura`

1. download `Xcode`  
   search for `XCODE_VERSION = '` in [`brave-core/build/mac/download_hermetic_xcode.py`](https://github.com/brave/brave-core/blob/master/build/mac/download_hermetic_xcode.py) to find out which one we use currently and download it from [Xcode Releases](https://xcodereleases.com) to `~/Downloads`

From `Terminal`:

2. install `Xcode`
   ```
   cd /Applications; xip -x `find ~/Downloads -maxdepth 1 -name 'Xcode_[1-9][0-9]*.xip'`
   ```
   accept license
   ```
   sudo xcodebuild -license accept
   ```
3. install `Homebrew`
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   add it to your `PATH`
   ```
   (echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> ~/.zprofile; eval "$(/opt/homebrew/bin/brew shellenv)"
   ```
4. install `Node`
   ```
   brew install node
   ```
5. set your active developer directory to `Xcode`
   ```
   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
   ```
6. create a directory for [brave-core](https://github.com/brave/brave-core)
   ```
   mkdir -p ~/brave-browser/src/brave && cd "$_"
   ```
7. add `~/brave-browser` to Spotlight's exclusion list  
   `System Settings` `>` `Siri & Spotlight` `>` `Spotlight Privacy...`
8. get a copy of [brave-core](https://github.com/brave/brave-core)
   ```
   git clone https://github.com/brave/brave-core.git .
   ```
9. install `npm` packages
   ```
   npm install
   ```
10. initialize dependencies
    ```
    npm run init
    ```
11. build Brave
    ```
    npm run build
    ```
12. launch Brave
    ```
    npm start
    ```
