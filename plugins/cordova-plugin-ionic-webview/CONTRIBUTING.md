# Contributing

:mega: **Support/Questions?**: Please see our [Support Page](https://ionicframework.com/support) for general support questions. The issues on GitHub should be reserved for bug reports and feature requests.

### Bug Reports

Please create an issue describing the bug in detail.

### Feature Requests

Please create an issue!

## Developing

Please familiarize yourself with [Cordova plugin development](https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/).

You can use `cordova plugin add` with a local directory to copy and compile plugin changes into a test project.

### Workflow

This repo uses [semantic-release](https://github.com/semantic-release/semantic-release), so it's important to follow a strict workflow to ensure properly automated releases.

* Work off of `master` branch (create new branch or fork)
* Make changes
* Use `npm run cz` (or `git cz` if [commitizen](https://github.com/commitizen/cz-cli) is installed globally) to make commits
* Create a pull request
    * Pull requests will be approved and squashed into the `master` branch
    * Try to make pull requests with a single objective (don't have multiple features in one PR, don't mix fixes and features in one PR, etc.)

### Publishing

Releases are automated in CI using [semantic-release](https://github.com/semantic-release/semantic-release) when the `stable` branch is pushed to Github. Rebase `master` with `stable`. Commits in `master` should be appropriately formatted from the PR workflow (see [Workflow](#workflow)).
