---
name: Chromium Minor Bump Issue
about: 'Template for creating a Chromium Minor Bump issues'
title: "Upgrade from Chromium **PREVIOUS_VERSION** to Chromium **NEW_VERSION**."
labels: OS/Desktop, OS/Android, Chromium/upgrade minor, QA/Yes, QA/Test-Plan-Specified, release-notes/include
assignees: emerick, mkarolin

---

# Minor Chromium bump

https://chromium.googlesource.com/chromium/src/+log/PREVIOUS_VERSION..NEW_VERSION?pretty=fuller&n=10000

# QA tests:

* Check branding items
* Check for version bump

# Additional checks:
* No specific code changes in Brave (only line number changes in patches)
