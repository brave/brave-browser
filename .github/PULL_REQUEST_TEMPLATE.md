<!-- Add brave-browser issue below that this PR will resolve -->
Resolves 

## Submitter Checklist:

- [ ] I confirm that no security/privacy review [is needed](https://github.com/brave/brave-browser/wiki/Security-reviews), or that I have [requested](https://github.com/brave/security/issues/new/choose) one
- [ ] There is a [ticket](https://github.com/brave/brave-browser/issues) for my issue
- [ ] Used Github [auto-closing keywords](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue) in the PR description above
- [ ] Wrote a good [PR/commit description](https://google.github.io/eng-practices/review/developer/cl-descriptions.html)
- [ ] Added appropriate labels (`QA/Yes` or `QA/No`; `release-notes/include` or `release-notes/exclude`; `OS/...`) to the associated issue
- [ ] Checked the PR locally: `npm run test -- brave_browser_tests`, `npm run test -- brave_unit_tests`, `npm run lint`, `npm run gn_check`, `npm run tslint`
- [ ] Ran `git rebase master` (if needed)

## Reviewer Checklist:

- [ ] A security review [is not needed](https://github.com/brave/brave-browser/wiki/Security-reviews), or a link to one is included in the PR description
- [ ] New files have MPL-2.0 license header
- [ ] Adequate test coverage exists to prevent regressions
- [ ] Major classes, functions and non-trivial code blocks are well-commented
- [ ] Changes in component dependencies are properly reflected in `gn`
- [ ] Code follows the [style guide](https://chromium.googlesource.com/chromium/src/+/HEAD/styleguide/c++/c++.md)
- [ ] Test plan is specified in PR before merging

## After-merge Checklist:

- [ ] The associated issue milestone is set to the smallest version that the
  changes has landed on
- [ ] All relevant documentation has been updated, for instance:
  - [ ] https://github.com/brave/brave-browser/wiki/Deviations-from-Chromium-(features-we-disable-or-remove)
  - [ ] https://github.com/brave/brave-browser/wiki/Proxy-redirected-URLs
  - [ ] https://github.com/brave/brave-browser/wiki/Fingerprinting-Protections
  - [ ] https://github.com/brave/brave-browser/wiki/Brave%E2%80%99s-Use-of-Referral-Codes
  - [ ] https://github.com/brave/brave-browser/wiki/Custom-Headers
  - [ ] https://github.com/brave/brave-browser/wiki/Web-Compatibility-Exceptions-in-Brave
  - [ ] https://github.com/brave/brave-browser/wiki/QA-Guide
  - [ ] https://github.com/brave/brave-browser/wiki/P3A
  - [ ] https://github.com/brave/brave-browser/wiki/Brave-Wallet

## Test Plan:
