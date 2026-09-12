# Telegraph Paywall Monkey Patch

A quick, self-contained monkey patch for **The Telegraph**
(`telegraph.co.uk`) that captures the loaded article and prevents the
later-loading paywall walls from changing what you can read.

The Telegraph serves the full article in the initial HTML, then layers on
paywall/metering walls (TollBit, Akamai, "you've reached your free article
limit" banners) via late JavaScript. This patch:

1. **Captures** the loaded article — title, byline, published date, body
   paragraphs, images, and the full text — into a snapshot you can read or
   export.
2. **Freezes** the captured article body so later paywall mutations
   (truncation, "…subscribe to read more" splices) are reverted.
3. **Neutralizes** paywall walls — both the ones already in the DOM and the
   ones that load *later* — by hiding (or removing) them and killing the
   late paywall iframes.

It is deliberately **selector-agnostic**: it auto-detects the article and
walls, and every selector/hint is overridable via config, so it keeps
working as Telegraph's markup shifts.

## Files

| File | Purpose |
| --- | --- |
| `telegraph-paywall-patch.js` | The patch (UMD — runs in the page or in Node). |
| `test-telegraph-paywall-patch.js` | Node test with a minimal DOM stub (no jsdom). |

## Usage

### In the page (console / userscript / DevTools)

```js
// Load the file, then:
const patch = createTelegraphPatch();
patch.start(document, window, {
  // optional overrides:
  // wallSelectors: ['.paywall', '.metering-banner'],
  // freezeArticle: true,
  // hideInsteadOfRemove: true,
  // logPrefix: '[tg-patch]',
});

// Read the captured article:
console.log(patch.capture());
// { url, title, byline, published, paragraphs: [...], images: [...], text }

// Re-run wall neutralization on demand (e.g. after a new wall loads):
patch.neutralizeWalls();

// Stop all listeners / observers:
patch.stop();
```

### As a userscript

```js
// ==UserScript==
// @name         Telegraph Paywall Patch
// @match        https://www.telegraph.co.uk/*
// @run-at       document-start
// ==/UserScript==
// (paste telegraph-paywall-patch.js here, then:)
createTelegraphPatch().start(document, window);
```

`@run-at document-start` lets the patch install its `MutationObserver`
before Telegraph's own scripts add the walls.

### In Node (tests)

```sh
node test-telegraph-paywall-patch.js
```

## How it works

- **Capture** — finds the article container (by `data-qa="article-body"`,
  `article` tag, or a content heuristic), then snapshots its text,
  paragraphs, images, byline, and title.
- **Freeze** — a `MutationObserver` watches the captured article subtree;
  when a later mutation changes the body, the patch restores the captured
  HTML (so a paywall truncation is undone).
- **Neutralize** — finds walls by a set of known selectors **and** by
  id/class text hints (e.g. `tollbit`, `paywall`, `metering`, `subscribe`),
  hides them (`display:none !important`) or removes them, and kills late
  paywall iframes. A `MutationObserver` re-runs neutralization whenever new
  nodes are added, so walls that load *after* the patch still get caught.

## Config

All options are optional and have sensible defaults:

| Option | Default | Meaning |
| --- | --- | --- |
| `wallSelectors` | known Telegraph wall selectors | CSS selectors for walls. |
| `wallTextHints` | `tollbit`, `paywall`, `metering`, … | id/class substrings that mark a wall. |
| `freezeArticle` | `true` | Revert later mutations to the captured body. |
| `hideInsteadOfRemove` | `true` | Hide walls instead of removing them. |
| `neutralizeIframes` | `true` | Kill late paywall/metering iframes. |
| `logPrefix` | `[tg-patch]` | Prefix for `console` logs. |

## Notes / caveats

- This is a **quick monkey patch**, not a full paywall engine. It targets
  the common Telegraph wall patterns and is easy to extend via config.
- It does not modify Telegraph's network requests; it works on the DOM.
- The test uses a minimal DOM stub, so it verifies the patch's logic
  (capture, freeze, neutralize, lifecycle) without a full browser.
