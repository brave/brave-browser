# Contribution guidelines

Table of contents
- [How can you contribute?](#how-can-you-contribute)
  - [Help triage issues](#help-triage-issues)
  - [Updating documentation](#updating-documentation)
  - [Help with translations](#help-with-translations)
  - [Work on the code](#work-on-the-code)
- [Getting started](#getting-started)
  - [Making changes](#making-changes)
  - [Pull requests](#pull-requests)
    - [Considerations before submitting a pull request](#considerations-before-submitting-a-pull-request)
    - [Each pull request should include](#each-pull-request-should-include)
    - [Employees should](#employees-should)
  - [Closing issues](#closing-issues)
  - [Triage help](#triage-help)

## How can you contribute?
Brave welcomes contributions of all kinds! You can make a huge impact without writing a single line of code

### Help triage issues
One of the easiest ways to help is to [look through our issues tab](https://github.com/brave/brave-browser/issues)
* Does the issue still happen? Sometimes we fix the problem and don't always close the issue
* Are there clear steps to reproduce the issue? If not, let's find and document some
* Is the issue a duplicate? If so, share the issue that is being duplicated in the conversation
* See our [Triage Guidelines page](https://github.com/brave/brave-browser/wiki/Triage-Guidelines) for more info about this process
* Making sure issues that are fixed have the appropriate milestone set. There may be pull requests fixing the bug on the different product channels and sometimes the issues are forgotten about (and aren't updated)

### Updating documentation
Documentation is extremely important. There are lots of areas we can improve:
* Having more clear or up-to-date instructions in the README for both [`brave-browser`](https://github.com/brave/brave-browser/blob/master/README.md) and [`brave-core`](https://github.com/brave/brave-core/blob/master/README.md).
* Capturing/updating helpful information [in our wiki](https://github.com/brave/brave-browser/wiki). You'll need to reach out to a Brave team member to request permission - you can do this by creating a new issue or tagging a Brave team member in an existing issue.
* Helping to propose a way to bring documentation to other languages. Right now, everything is in English
* Improving this document :smile:

### Help with translations
All text being added to Brave is done initially in English (en-US) and then is translated by real people into other languages.
We're missing translations for many languages and some translations might be incomplete or poor quality.

For everything you'd need to get started, check out https://explore.transifex.com/brave/brave_en/ :smile:

### Work on the code
* The [repo's wiki](https://github.com/brave/brave-browser/wiki) has instructions for cloning the repo and getting setup on your platform of choice
* Check out the [troubleshooting page](https://github.com/brave/brave-browser/wiki/Troubleshooting) if you get stuck
* Once you're up and running, find an interesting issue to fix. Check out issues labelled with [good first issue](https://github.com/brave/brave-browser/labels/good%20first%20issue)
  - some issues only require knowledge of JavaScript (for example, pages using React and our [Brave UI library](https://github.com/brave/brave-ui))
  - other issues may require C++ changes in either the Brave code or in Chromium

## Getting started
* Make sure you have a [GitHub account](https://github.com/join).
* Submit a [ticket](https://github.com/brave/brave-browser/issues) for your issue if one does not already exist. Please include the Brave version, operating system, and steps to reproduce the issue.
* Fork the repository on GitHub (this might be [`brave-browser`](https://github.com/brave/brave-browser), [`brave-core`](https://github.com/brave/brave-core), or both).
* For changes to JavaScript files, we recommend installing a [Standard](http://standardjs.com/) plugin for your preferred text editor in order to ensure code style consistency.
* For C++ changes, you can consider setting up [clang-format](https://chromium.googlesource.com/chromium/src/+/master/docs/sublime_ide.md#Format-Selection-with-Clang_Format-Chromium-only) for your editor.
* For changes which involve patches, please check out our [Patching Chromium](https://github.com/brave/brave-browser/wiki/Patching-Chromium) guide.

### Making changes
Once you've cloned the repo to your computer, you're ready to start making edits!

Please note that there are two repositories here:
* the root project (this repo, [`brave-browser`](https://github.com/brave/brave-browser)), which pulls down all of the Chromium code into `src/`
* [`brave-core`](https://github.com/brave/brave-core) is basically a sub-module (repo in a repo) which is located on disk under the root at `src/brave`

Depending on which you're editing, you'll need to add your fork to the remotes list. By default, `origin` is set to upstream.
For example, here's how GitHub user `bsclifton` would add BOTH remotes `brave-browser` and `brave-core`:
```sh
# root where project is cloned
cd ~/brave-browser/
git remote add bsclifton git@github.com:bsclifton/brave-browser.git
git fetch bsclifton
# root for the `brave-core` repo
cd src/brave
git remote add bsclifton git@github.com:bsclifton/brave-core.git
git fetch bsclifton
```

Once you're set up, there are a few tips we can suggest:

* Make a new branch for your work. It helps to have a descriptive name, like `fix-fullscreen-issue`.
* Make commits in logical units. If needed, run `git rebase -i` to squash commits before opening a pull request.
* New features and most other pull requests require a new [test](https://github.com/brave/brave-browser/wiki/Tests) to be written before the pull request will be accepted.  Some exceptions would be a tweak to an area of code that doesn't have tests yet, text changes, build config changes, things that can't be tested due to test suite limitations, etc.
* Use GitHub [auto-closing keywords](https://help.github.com/articles/closing-issues-via-commit-messages/) in the commit message, and make the commit message body as descriptive as necessary. Ex:

````
    Add contributing guide

    This is a first pass at a contributor's guide so now people will know how to
    get pull requests accepted faster.

    Fix https://github.com/brave/brave-browser/issues/108
````

* Run the tests by running `npm run test brave_unit_tests` and `npm run test brave_browser_tests`
* JavaScript unit tests can be run from the `src/brave` directory using `npm run test-unit`


### Keeping your fork up to sync
- Both `brave-browser` and `brave-core` clone themselves with the remote `origin` being upstream, so you can update either using `git pull`.
- Once `origin` is fetched, you can rebase your `master` branch against `origin/master`
    ```sh
    git fetch origin
    git fetch bsclifton
    git checkout -b fork_master bsclifton/master
    git rebase origin/master
    git push bsclifton fork_master:master
    ```

An easier strategy might be to keep `origin` in sync and then create branches based on that (and push those to your fork).


### Pull requests
After the changes are made in your branch, you're ready to submit a patch. Patches on GitHub are submitted in the format of a pull request.

#### Considerations before submitting a pull request
Some helpful things to consider before submitting your work
* Did you manually test your new change?
* Does your pull request fix multiple issues? If so, you may consider breaking into separate pull requests.
* Did you include tests? (we currently have unit tests, browser tests, and JavaScript unit tests)
* If you made a design or layout change, was there a mock-up provided? Do your changes match it?
* If your change affects session or preferences, did you include steps to test? You may also consider manually testing an upgrade.

#### Each pull request should include
* a descriptive title; this gets used in the release notes ([desktop](https://github.com/brave/brave-browser/blob/master/CHANGELOG_DESKTOP.md) or [android](https://github.com/brave/brave-browser/blob/master/CHANGELOG_ANDROID.md))
* a short summary of the changes
* a reference to the issue that it fixes
* steps to test the fix (if applicable)
* for design-related changes, it is helpful to include screenshots

Once you submit a pull request, you should tag reviewers and add labels if needed. If you do not have the necessary GitHub permissions to do so, a Brave member will take care of this for you.

#### Employees should
* Ensure the owner is tagged using the `Assignees` field
* Ensure at least one other employee or contributor is tagged using the `Reviewers` field
* Go through the checklist that's provided in the pull request template and check the appropriate boxes

### Closing issues

* Issues should be assigned the milestone when the PR is merged (and the fix is landed in Nightly aka master).
* Some issues may need to be uplifted to other channels (Dev / Beta / Release). Please see our notes on [uplifting a pull request](https://github.com/brave/brave-browser/wiki/Uplifting-a-pull-request).
* If an issue is closed without a fix, because it was a duplicate, or perhaps it was invalid, then any milestone markers should be removed.
* If a bug is not fully fixed after its issue is closed, open a new issue instead of re-opening the existing one (unless the code has been reverted).

### Triage help

* Invalid bugs should be closed, tagged with invalid, or a comment should be added indicating that they should if you do not have permission.
* Asking for more detail in an issue when it is needed is helpful.
* Adding applicable labels to an issue is helpful.
* Adding and finding duplicates, and linking them together is helpful.
* Creating tracking issues for an area of work with multiple related issues is helpful.
* Calling out things which seem important for extra attention is helpful.
* Improving steps to reproduce is helpful.
* Testing and adding a comment with "Could not reproduce" if an issue seems obscure is helpful.
* Testing open pull requests.
* You can be granted write permission if you've helped a lot with triage by pinging @bbondy, @bsclifton, @kjozwiak, or another Brave team member.
* Helping make sure issues have a clear and understandable name (ex: not something like "Brave is broken").
* The first comment in an issue ideally would have a clear description of the issue and describe the impact to users. Asking folks for screenshots, steps to reproduce, and more information is highly recommended so that the issue is as clear as possible.
* If the issue is a duplicate, please let the issue creator know in a polite way how they can follow and track progress of the parent issue (including an ETA if it's marked with a milestone).
