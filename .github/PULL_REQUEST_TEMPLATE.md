## Submitter Checklist:

- [ ] Submitted a [ticket](https://github.com/brave/brave-browser/issues) for my issue if one did not already exist.
- [ ] Used Github [auto-closing keywords](https://help.github.com/articles/closing-issues-via-commit-messages/) in the commit message.
- [ ] Added/updated tests for this change (for new code or code which already has tests).
- Verified that these changes build without errors on
  - [ ] Windows
  - [ ] macOS
  - [ ] Linux
- Verified that these changes pass automated tests (`npm test brave_unit_tests && npm test brave_browser_tests`) on
  - [ ] Windows
  - [ ] macOS
  - [ ] Linux
- [ ] Ran `git rebase master` (if needed).
- [ ] Ran `git rebase -i` to squash commits (if needed).
- [ ] Tagged reviewers and labelled the pull request as needed.
- [ ] Requested a security/privacy review as needed.

## Test Plan:


## Reviewer Checklist:

- [ ] New files have MPL-2.0 license header.
- [ ] Request a security/privacy review as needed.
- [ ] Adequate test coverage exists to prevent regressions.
