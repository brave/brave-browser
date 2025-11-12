
### Submitter Checklist:
- I confirm that no security/privacy review is needed, or that I have requested one.
- There is a ticket for my issue.
- Used GitHub auto-closing keywords in the PR description above.
- Wrote a good PR/commit description.
- Added appropriate labels (QA/Yes or QA/No; release-notes/include or release-notes/exclude; OS/...) to the associated issue.
- Checked the PR locally: `npm run test -- brave_browser_tests`, `npm run test -- brave_unit_tests`, `npm run lint`, `npm run gn_check`, `npm run tslint`.
- Ran `git rebase master` (if needed).

### Reviewer Checklist:
- A security review is not needed, or a link to one is included in the PR description.
- New files have MPL-2.0 license header.
- Adequate test coverage exists to prevent regressions.
- Major classes, functions, and non-trivial code blocks are well-commented.
- Changes in component dependencies are properly reflected in `gn`.
- Code follows the style guide.
- Test plan is specified in PR before merging.

### After-merge Checklist:
- The associated issue milestone is set to the smallest version that the changes have landed on.
- All relevant documentation has been updated, for instance:
  - [Deviations from Chromium](https://github.com/brave/brave-browser/wiki/Deviations-from-Chromium-(features-we-disable-or-remove))
  - [Proxy-redirected URLs](https://github.com/brave/brave-browser/wiki/Proxy-redirected-URLs)
  - [Fingerprinting Protections](https://github.com/brave/brave-browser/wiki/Fingerprinting-Protections)
  - [Brave’s Use of Referral Codes](https://github.com/brave/brave-browser/wiki/Brave%E2%80%99s-Use-of-Referral-Codes)
  - [Custom Headers](https://github.com/brave/brave-browser/wiki/Custom-Headers)
  - [Web Compatibility Exceptions in Brave](https://github.com/brave/brave-browser/wiki/Web-Compatibility-Exceptions-in-Brave)
  - [QA Guide](https://github.com/brave/brave-browser/wiki/QA-Guide)
  - [P3A](https://github.com/brave/brave-browser/wiki/P3A)
  - [Brave Wallet](https://github.com/brave/brave-browser/wiki/Brave-Wallet)
