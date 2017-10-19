# browser-laptop-bootstrap
Everything you need to compile [Muon](https://github.com/brave/muon) and run [Brave](https://github.com/brave/browser-laptop)
- fetches syncs code from all projects we define in package.json
  - fetches all 3rd party source code (Chromium) via depot_tools
  - sets the branch for Chromium (ex: 54.0.2840.100)
  - checks out [Muon](https://github.com/brave/muon)
  - checks out [our fork of node](https://github.com/brave/node/tree/chromium54) as a dependency under Muon (along with other deps)
  - checks out [browser-laptop](https://github.com/brave/browser-laptop)
- applies [patches we have](https://github.com/brave/muon/tree/master/patches) for 3rd party code (Chromium, node)

Please [check out our wiki](https://github.com/brave/browser-laptop-bootstrap/wiki) for build instructions and other information.

## Running in Docker

You can compile muon for Linux using a Docker container.

First clone this repo and enter the repo directory:
```
git clone https://github.com/brave/browser-laptop-bootstrap.git
cd browser-laptop-bootstrap
```

Start Docker then build the image from the Dockerfile:
```
docker build -t blb .
```

And run it, mounting the appropriate directories:
```
docker run --rm -it -v $(pwd):/src -v $(pwd)/.sccache:/root/.cache/sccache blb
```

Dependencies are included in the image so there's no need to run `./src/build/install-build-deps.sh`.

Now you can proceed with build scripts such as `npm run init`, `npm run sync -- --all` and `npm run build -- --debug_build=true --official_build=false`. See `./src/out` for the results.
