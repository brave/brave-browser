<!-- Add brave-browser issue bellow that this PR will resolve -->
Resolves 

## Submitter Checklist:

- [ ] There is a [ticket](https://github.com/brave/brave-browser/issues) for my issue.
- [ ] Used Github [auto-closing keywords](https://help.github.com/articles/closing-issues-via-commit-messages/) in the commit message.
- [ ] Wrote a good [PR/commit description](https://google.github.io/eng-practices/review/developer/cl-descriptions.html)
- [ ] Added appropriate labels (`QA/Yes` or `QA/No`; `release-notes/include` or `release-notes/exclude`; `OS/...`) to the associated issue
- [ ] Checked the PR locally: `npm run test -- brave_browser_tests`, `npm run test -- brave_unit_tests`, `npm run lint`, `npm run gn_check`, `npm run tslint`
- [ ] Ran `git rebase master` (if needed).
- [ ] Requested a security/privacy review as needed.

## Reviewer Checklist:

- [ ] New files have MPL-2.0 license header.
- [ ] Adequate test coverage exists to prevent regressions
- [ ] Major classes, functions and non-trivial code blocks are well-commented
- [ ] Changes in component dependencies are properly reflected in `gn`
- [ ] Code follows the [style guide](https://chromium.googlesource.com/chromium/src/+/HEAD/styleguide/c++/c++.md)
- [ ] Test plan is specified in PR before merging

## After-merge Checklist:

- [ ] The associated issue milestone is set to the smallest version that the
  changes has landed on.
- [ ] All relevant documentation has been updated, for instance:
  - [ ] https://github.com/brave/brave-browser/wiki/Deviations-from-Chromium-(features-we-disable-or-remove)
  - [ ] https://github.com/brave/brave-browser/wiki/Proxy-redirected-URLs
  - [ ] https://github.com/brave/brave-browser/wiki/Fingerprinting-Protections
  - [ ] https://github.com/brave/brave-browser/wiki/Brave%E2%80%99s-Use-of-Referral-Codes
  - [ ] https://github.com/brave/brave-browser/wiki/Custom-Headers
  - [ ] https://github.com/brave/brave-browser/wiki/Web-Compatibility-Exceptions-in-Brave
  - [ ] https://github.com/brave/brave-browser/wiki/QA-Guide
  - [ ] https://github.com/brave/brave-browser/wiki/P3A

## Test Plan:
