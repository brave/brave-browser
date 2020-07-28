## Submitter Checklist:

- [ ] Submitted a [ticket](https://github.com/brave/brave-browser/issues) for my issue if one did not already exist.
- [ ] Used Github [auto-closing keywords](https://help.github.com/articles/closing-issues-via-commit-messages/) in the commit message.
- [ ] Added/updated tests for this change (for new code or code which already has tests).
- Verified that these changes build without errors on
  - [ ] Android
  - [ ] iOS
  - [ ] Linux
  - [ ] macOS
  - [ ] Windows
- Verified that these changes pass automated tests (unit, browser, security tests) on
  - [ ] iOS
  - [ ] Linux
  - [ ] macOS
  - [ ] Windows
- [ ] Ran `git rebase master` (if needed).
- [ ] Ran `git rebase -i` to squash commits (if needed).
- [ ] Tagged reviewers and labelled the pull request as needed.
- [ ] Requested a security/privacy review as needed.
- [ ] Public documentation has been updated as necessary. For instance:
  - [ ] https://github.com/brave/brave-browser/wiki/Deviations-from-Chromium-(features-we-disable-or-remove)
  - [ ] https://github.com/brave/brave-browser/wiki/Proxy-redirected-URLs
  - [ ] https://github.com/brave/brave-browser/wiki/Fingerprinting-Protections
  - [ ] https://github.com/brave/brave-browser/wiki/Brave%E2%80%99s-Use-of-Referral-Codes
  - [ ] https://github.com/brave/brave-browser/wiki/Custom-Headers
  - [ ] https://github.com/brave/brave-browser/wiki/Web-compatibility-issues-with-tracking-protection

## Test Plan:


## Reviewer Checklist:

- [ ] New files have MPL-2.0 license header.
- [ ] Request a security/privacy review as needed.
- [ ] Adequate test coverage exists to prevent regressions.

## After-merge Checklist:

- [ ] The associated issue milestone is set to the smallest version that the
  changes has landed on.
- [ ] All relevant documentation has been updated.
