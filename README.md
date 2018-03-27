# Brave

Everything you need to compile Brave.

- Fetches and syncs code from all projects we define in package.json.
  - [Chromium](https://chromium.googlesource.com/chromium/src.git)
    - Fetches code via depot_tools.
    - sets the branch for Chromium (ex: 65.0.3325.181).
  - [brave-core](https://github.com/brave/brave-core)
    - Mounted at src/brave.
    - Maintains patches for 3rd party Chromium code.

Please [check out our wiki](https://github.com/brave/brave-browser/wiki) for build instructions and other information.    
