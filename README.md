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

## Running in Docker

You can compile Brave for Linux using a Docker container.

First clone this repo and enter the repo directory:
```
git clone https://github.com/brave/brave-browser.git
cd brave-browser
```

Start Docker then build the image from the Dockerfile:
```
docker build -t blb .
```

Now run the image interactively, mounting the appropriate directories:
```
docker run --rm -it -v $(pwd):/src -v $(pwd)/.sccache:/root/.cache/sccache blb
```

Dependencies are included in the image so there's no need to run `./src/build/install-build-deps.sh`.

Now you can proceed with build scripts such as `yarn install`, `yarn run init`, `yarn sync --all` and `yarn build --debug_build=true --official_build=false`. See `./src/out` for the results.  For incremental builds you can also pass `--no_branding_update` for a faster build.
