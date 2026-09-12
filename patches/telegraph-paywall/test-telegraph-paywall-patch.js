/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * test-telegraph-paywall-patch.js
 *
 * Node test for telegraph-paywall-patch.js using a minimal DOM stub (no
 * jsdom dependency, so it runs anywhere Node does).
 *
 * Run:  node test-telegraph-paywall-patch.js
 */
'use strict';

const assert = require('assert');
const path = require('path');
const createTelegraphPatch = require(path.join(__dirname, 'telegraph-paywall-patch.js'));

// ---------------------------------------------------------------------------
// Minimal DOM stub: just enough for the patch's selector + mutation surface.
// ---------------------------------------------------------------------------
class El {
  constructor(tag) {
    this.tagName = tag.toUpperCase();
    this.id = '';
    this._classes = [];
    this.attrs = {};
    this.children = [];
    this.parentNode = null;
    this._text = '';
    this.innerHTML = '';
    this.style = {
      _props: {},
      setProperty(name, value) { this._props[name] = value; },
      getPropertyValue(name) { return this._props[name] || ''; }
    };
  }
  get className() { return this._classes.join(' '); }
  set className(v) { this._classes = String(v).split(/\s+/).filter(Boolean); }
  get textContent() {
    // text of self + descendants (leaf text only)
    if (this.children.length === 0) {
      return this._text;
    }
    return this.children.map((c) => c.textContent).join('');
  }
  set textContent(v) { this._text = String(v); this.children = []; }
  getAttribute(name) {
    if (name === 'class') return this.className;
    if (name === 'id') return this.id;
    return (name in this.attrs) ? this.attrs[name] : null;
  }
  setAttribute(name, value) {
    if (name === 'class') { this.className = value; return; }
    if (name === 'id') { this.id = value; return; }
    this.attrs[name] = String(value);
  }
  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }
  removeChild(child) {
    const i = this.children.indexOf(child);
    if (i !== -1) this.children.splice(i, 1);
    child.parentNode = null;
    return child;
  }
  // Walk all descendants (pre-order).
  *walk() {
    for (const c of this.children) {
      yield c;
      yield* c.walk();
    }
  }
  // Element-scoped query (real DOM elements have these).
  querySelector(sel) {
    const all = this.querySelectorAll(sel);
    return all.length ? all[0] : null;
  }
  querySelectorAll(sel) {
    const out = [];
    for (const el of this.walk()) {
      if (matchesSelector(el, sel)) out.push(el);
    }
    return out;
  }
}

// Compact CSS-selector matcher covering the forms the patch uses:
//   tag, .class, #id, [attr], [attr="v"], [attr^="v"], tag[attr], comma lists.
function matchesSelector(el, selector) {
  // Comma = any.
  const parts = selector.split(',').map((s) => s.trim()).filter(Boolean);
  return parts.some((part) => matchesSimple(el, part));
}

function matchesSimple(el, sel) {
  sel = sel.trim();
  // Split into tag + a sequence of simple selectors.
  let tag = null;
  let rest = sel;
  const tagMatch = rest.match(/^([a-zA-Z][a-zA-Z0-9-]*)/);
  if (tagMatch) {
    tag = tagMatch[1].toLowerCase();
    rest = rest.slice(tagMatch[0].length);
  }
  if (tag && el.tagName.toLowerCase() !== tag) return false;

  // Consume .class, #id, [attr...], [attr="v"], [attr^="v"] tokens.
  let i = 0;
  while (i < rest.length) {
    const ch = rest[i];
    if (ch === '.') {
      const m = rest.slice(i).match(/^\.([a-zA-Z0-9_-]+)/);
      if (!m) return false;
      if (!el._classes.includes(m[1])) return false;
      i += m[0].length;
    } else if (ch === '#') {
      const m = rest.slice(i).match(/^#([a-zA-Z0-9_-]+)/);
      if (!m) return false;
      if (el.id !== m[1]) return false;
      i += m[0].length;
    } else if (ch === '[') {
      const m = rest.slice(i).match(/^\[([a-zA-Z0-9_-]+)(?:([~^$*]?=)?"?([^"\]]*)"?)?\]/);
      if (!m) return false;
      const attr = m[1];
      const op = m[2] || '';
      const val = m[3];
      const actual = el.getAttribute(attr);
      if (op === '') {
        if (actual === null) return false; // presence
      } else if (op === '=') {
        if (actual !== val) return false;
      } else if (op === '^=') {
        if (actual === null || actual.indexOf(val) !== 0) return false;
      } else if (op === '$=') {
        if (actual === null || actual.lastIndexOf(val) !== actual.length - val.length) return false;
      } else if (op === '*=') {
        if (actual === null || actual.indexOf(val) === -1) return false;
      } else {
        return false;
      }
      i += m[0].length;
    } else if (ch === ' ') {
      i += 1;
    } else {
      return false;
    }
  }
  return true;
}

class Doc {
  constructor() {
    this.title = '';
    this.documentElement = new El('html');
    this.body = new El('body');
    this.documentElement.appendChild(this.body);
    this._mo = null;
  }
  querySelector(sel) {
    const all = this.querySelectorAll(sel);
    return all.length ? all[0] : null;
  }
  querySelectorAll(sel) {
    const out = [];
    for (const el of this.documentElement.walk()) {
      if (matchesSelector(el, sel)) out.push(el);
    }
    return out;
  }
}

// Minimal MutationObserver stub: records the callback; test triggers it.
class MutationObserverStub {
  constructor(cb) { this.cb = cb; this.observed = null; }
  observe(target, opts) { this.observed = { target, opts }; }
  disconnect() { this.observed = null; }
  // Test helper: simulate a mutation batch.
  fire(mutations) { this.cb(mutations || []); }
}

function makeWindow(doc) {
  return {
    location: { href: 'https://www.telegraph.co.uk/politics/2026/09/12/reform-receives-second-36m-donation-to-fight-next-election/', hostname: 'www.telegraph.co.uk' },
    MutationObserver: MutationObserverStub,
    document: doc
  };
}

// Build a Telegraph-like article page.
function buildPage() {
  const doc = new Doc();
  doc.title = 'Nigel Farage receives second £36m donation in two days';

  const article = new El('article');
  article.setAttribute('data-qa', 'article-body');
  // innerHTML is a plain string property in the stub; seed it so the capture
  // snapshot has a non-empty HTML body (mirrors a real rendered article).
  article.innerHTML =
    '<div data-qa="byline">By James O\'Connell</div>' +
    '<p>Nigel Farage has received a second \u00a336m donation in two days.</p>' +
    '<p>The cash is intended to fund Reform UK\'s campaign for the next election.</p>' +
    '<img src="https://www.telegraph.co.uk/image.jpg">';
  const byline = new El('div');
  byline.setAttribute('data-qa', 'byline');
  byline._text = 'By James O\'Connell';
  article.appendChild(byline);
  const p1 = new El('p');
  p1._text = 'Nigel Farage has received a second £36m donation in two days.';
  const p2 = new El('p');
  p2._text = 'The cash is intended to fund Reform UK\'s campaign for the next election.';
  article.appendChild(p1);
  article.appendChild(p2);
  const img = new El('img');
  img.setAttribute('src', 'https://www.telegraph.co.uk/image.jpg');
  article.appendChild(img);
  doc.body.appendChild(article);

  // A paywall wall that "loads up" (present in the DOM).
  const wall = new El('div');
  wall.id = 'tollbit';
  wall.className = 'paywall paywall__container';
  wall._text = 'Subscribe to unlock the full article';
  doc.body.appendChild(wall);

  return { doc, article, wall };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ok - ' + name);
  } catch (e) {
    console.error('  FAIL - ' + name);
    console.error('    ' + (e && e.stack ? e.stack : e));
    process.exitCode = 1;
  }
}

console.log('telegraph-paywall-patch tests');

test('captures the loaded article (title, paragraphs, images, byline)', () => {
  const { doc } = buildPage();
  const win = makeWindow(doc);
  const patch = createTelegraphPatch();
  patch.start(doc, win, { logPrefix: '' });
  const cap = patch.capture();
  assert.ok(cap.title.indexOf('Farage') !== -1, 'title captured');
  assert.strictEqual(cap.paragraphs.length, 2, 'two paragraphs captured');
  assert.ok(cap.paragraphs[0].indexOf('second £36m donation') !== -1, 'para text');
  assert.strictEqual(cap.images.length, 1, 'image captured');
  assert.ok(cap.byline.indexOf('James') !== -1, 'byline captured');
  assert.ok(cap.html.length > 0, 'html snapshot captured');
  patch.stop();
});

test('neutralizes paywall walls that are present (tollbit + paywall class)', () => {
  const { doc, wall } = buildPage();
  const win = makeWindow(doc);
  const patch = createTelegraphPatch();
  patch.start(doc, win, { logPrefix: '' });
  assert.strictEqual(wall.getAttribute('data-telegraph-patch-hidden'), 'true', 'wall flagged hidden');
  assert.strictEqual(wall.style.getPropertyValue('display'), 'none', 'wall display:none');
  patch.stop();
});

test('freeze reverts later mutations to the captured article body', () => {
  const { doc, article } = buildPage();
  const win = makeWindow(doc);
  const patch = createTelegraphPatch();
  patch.start(doc, win, { logPrefix: '' });
  const frozen = article.innerHTML;
  // Simulate a paywall truncation: the wall rewrites the article body.
  article.innerHTML = frozen + '<p>...subscribe to read more...</p>';
  assert.notStrictEqual(article.innerHTML, frozen, 'body was mutated');
  // Trigger the freeze observer (simulate the mutation batch).
  const mo = patch._state._freezeObserver;
  assert.ok(mo, 'freeze observer installed');
  mo.fire([{ type: 'childList' }]);
  // After revert, the truncation is gone (innerHTML restored to the snapshot).
  assert.strictEqual(article.innerHTML, frozen, 'article body reverted to frozen HTML');
  patch.stop();
});

test('neutralizeWalls() re-hides a wall that loads later', () => {
  const { doc } = buildPage();
  const win = makeWindow(doc);
  const patch = createTelegraphPatch();
  patch.start(doc, win, { logPrefix: '' });
  // A new wall appears after start. Real Telegraph walls carry an id; the
  // hint-fallback keys off id/class hints, so give it a realistic id.
  const late = new El('div');
  late.id = 'late-metering-wall';
  late.className = 'metering-banner';
  late._text = 'You have used your free articles';
  doc.body.appendChild(late);
  const n = patch.neutralizeWalls();
  assert.ok(n >= 1, 'found walls to neutralize');
  assert.strictEqual(late.getAttribute('data-telegraph-patch-hidden'), 'true', 'late wall hidden');
  patch.stop();
});

test('isStarted / stop lifecycle', () => {
  const { doc } = buildPage();
  const win = makeWindow(doc);
  const patch = createTelegraphPatch();
  assert.strictEqual(patch.isStarted(), false, 'not started initially');
  patch.start(doc, win, { logPrefix: '' });
  assert.strictEqual(patch.isStarted(), true, 'started');
  patch.stop();
  assert.strictEqual(patch.isStarted(), false, 'stopped');
});

console.log('\n' + passed + ' test(s) passed' + (process.exitCode ? ' (with failures)' : ''));
