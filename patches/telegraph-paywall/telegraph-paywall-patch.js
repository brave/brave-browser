/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * telegraph-paywall-patch.js
 *
 * A quick, self-contained monkey patch for The Telegraph (telegraph.co.uk)
 * that:
 *
 *   1. CAPTURES the loaded article (title, byline, body text, images, and a
 *      frozen HTML snapshot) the moment the page is readable, so the "loaded"
 *      state is preserved even if a later paywall mutates the DOM.
 *
 *   2. FREEZES the captured article body against later mutations (a
 *      MutationObserver reverts paywall-driven truncation / rewrites).
 *
 *   3. OVERRIDES the paywall walls that load up afterwards (paywall / metering
 *      banners, subscribe modals, TollBit and Akamai bot/geo interstitials) by
 *      hiding them and re-hiding any that re-appear.
 *
 * The patch is selector-agnostic: it auto-detects the article container and the
 * walls, and every selector list can be overridden via the `config` option.
 *
 * It is written as a UMD-style IIFE so it runs in the page (auto-starting on a
 * telegraph.co.uk article) AND in Node (for tests) via `createTelegraphPatch`.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // Node / CommonJS (tests)
    module.exports = factory();
  } else {
    // Browser: expose factory and auto-start if on a Telegraph article.
    root.createTelegraphPatch = factory();
    if (root.document && root.location &&
        /(^|\.)telegraph\.co\.uk$/i.test(root.location.hostname)) {
      root.createTelegraphPatch.start(root.document, root);
    }
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Default configuration (all selector lists are overridable).
  // ---------------------------------------------------------------------------
  var DEFAULT_CONFIG = {
    // Article container: first match wins. Telegraph has used several of these
    // across redesigns; we try them in order and fall back to <article>.
    articleSelectors: [
      '[data-qa="article-body"]',
      '.article-body',
      '.article__body',
      'article',
      'main'
    ],
    // Paywall / metering / subscription walls to neutralize.
    wallSelectors: [
      '[data-qa="paywall"]',
      '[data-qa="metering"]',
      '.paywall',
      '.paywall__container',
      '.paywall-overlay',
      '.paywall-modal',
      '.metering',
      '.metering-banner',
      '.subscription-banner',
      '.subscribe-banner',
      '.wall',
      '.paywall-wall',
      // TollBit (Telegraph's paywall/bot vendor)
      '#tollbit',
      '.tollbit',
      '[id^="tollbit"]',
      // Akamai bot / geo interstitials
      '#akamai',
      '.akamai',
      '.akamai-geo',
      '.akamai-geo-redirect',
      '[id^="akamai"]'
    ],
    // Elements that, when present, indicate a wall is active even if not in the
    // list above (text/attribute sniffing fallback).
    wallTextHints: [
      'paywall', 'metering', 'subscribe', 'subscription', 'sign in to continue',
      'unlock', 'tollbit', 'akamai'
    ],
    // If true, hide walls (display:none) instead of removing them from the DOM.
    hideInsteadOfRemove: true,
    // If true, install the freeze MutationObserver on the article body.
    freeze: true,
    // If true, also neutralize late-arriving paywall <iframe>s.
    neutralizeIframes: true,
    // Log prefix (set to '' to silence).
    logPrefix: '[telegraph-patch]'
  };

  function mergeConfig(user) {
    var cfg = {};
    var k;
    for (k in DEFAULT_CONFIG) {
      if (Object.prototype.hasOwnProperty.call(DEFAULT_CONFIG, k)) {
        cfg[k] = DEFAULT_CONFIG[k];
      }
    }
    if (user) {
      for (k in user) {
        if (Object.prototype.hasOwnProperty.call(user, k)) {
          cfg[k] = user[k];
        }
      }
    }
    return cfg;
  }

  function log(cfg, msg) {
    if (cfg.logPrefix && typeof console !== 'undefined' && console.log) {
      console.log(cfg.logPrefix, msg);
    }
  }

  // ---------------------------------------------------------------------------
  // Core API
  // ---------------------------------------------------------------------------
  function createTelegraphPatch() {
    var state = {
      doc: null,
      win: null,
      cfg: null,
      articleEl: null,
      frozenHTML: null,
      capture: null,
      _freezeObserver: null,
      _wallObserver: null,
      _freezeGuard: false,
      _started: false
    };

    function findArticle(doc) {
      var i, sel, el;
      for (i = 0; i < state.cfg.articleSelectors.length; i++) {
        sel = state.cfg.articleSelectors[i];
        el = doc.querySelector(sel);
        if (el) {
          return el;
        }
      }
      return null;
    }

    function findWalls(doc) {
      var i, sel, nodes, out = [];
      var seen = {};
      for (i = 0; i < state.cfg.wallSelectors.length; i++) {
        sel = state.cfg.wallSelectors[i];
        try {
          nodes = doc.querySelectorAll(sel);
        } catch (e) {
          continue; // invalid selector in this engine
        }
        var j;
        for (j = 0; j < nodes.length; j++) {
          if (!seen[nodes[j]]) {
            seen[nodes[j]] = true;
            out.push(nodes[j]);
          }
        }
      }
      return out;
    }

    function isWallByHint(el) {
      if (!el || !el.getAttribute) {
        return false;
      }
      var id = (el.id || '').toLowerCase();
      var cls = (el.className && el.className.baseVal !== undefined
        ? el.className.baseVal : el.className) || '';
      var hay = (id + ' ' + String(cls)).toLowerCase();
      var i;
      for (i = 0; i < state.cfg.wallTextHints.length; i++) {
        if (hay.indexOf(state.cfg.wallTextHints[i]) !== -1) {
          return true;
        }
      }
      return false;
    }

    function neutralizeWall(el) {
      if (!el) {
        return;
      }
      if (state.cfg.hideInsteadOfRemove) {
        if (el.style) {
          el.style.setProperty('display', 'none', 'important');
        }
        el.setAttribute('data-telegraph-patch-hidden', 'true');
      } else if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }

    function neutralizeWalls(doc) {
      var walls = findWalls(doc);
      var i;
      for (i = 0; i < walls.length; i++) {
        neutralizeWall(walls[i]);
      }
      // Text/attribute hint fallback: catch walls we didn't have a selector for.
      var candidates = doc.querySelectorAll('[id], [class]');
      for (i = 0; i < candidates.length; i++) {
        var el = candidates[i];
        // Only treat top-level-ish containers as walls via hints, to avoid
        // hiding every element that merely mentions "subscribe".
        if (el.id && isWallByHint(el)) {
          neutralizeWall(el);
        }
      }
      // Late-arriving paywall iframes.
      if (state.cfg.neutralizeIframes) {
        var ifr = doc.querySelectorAll('iframe');
        for (i = 0; i < ifr.length; i++) {
          var src = (ifr[i].getAttribute('src') || '').toLowerCase();
          if (src.indexOf('tollbit') !== -1 || src.indexOf('akamai') !== -1 ||
              src.indexOf('paywall') !== -1 || src.indexOf('metering') !== -1) {
            neutralizeWall(ifr[i]);
          }
        }
      }
      return walls.length;
    }

    function captureLoadedPage(doc) {
      var article = findArticle(doc);
      var snap = {
        url: state.win && state.win.location ? state.win.location.href : '',
        title: doc.title || '',
        byline: '',
        published: '',
        paragraphs: [],
        images: [],
        text: '',
        html: '',
        capturedAt: new Date().toISOString()
      };
      if (article) {
        var ps = article.querySelectorAll('p');
        var i;
        for (i = 0; i < ps.length; i++) {
          var t = (ps[i].textContent || '').replace(/\s+/g, ' ').trim();
          if (t) {
            snap.paragraphs.push(t);
          }
        }
        var imgs = article.querySelectorAll('img');
        for (i = 0; i < imgs.length; i++) {
          snap.images.push(imgs[i].getAttribute('src') || '');
        }
        snap.text = (article.textContent || '').replace(/\s+/g, ' ').trim();
        snap.html = article.innerHTML || '';
      }
      // Byline / published: sniff common Telegraph meta + byline nodes.
      var byline = doc.querySelector('[data-qa="byline"], .byline, .article-byline, [rel="author"]');
      if (byline) {
        snap.byline = (byline.textContent || '').replace(/\s+/g, ' ').trim();
      }
      var pub = doc.querySelector('[data-qa="published-date"], .published-date, time[datetime]');
      if (pub) {
        snap.published = pub.getAttribute('datetime') ||
          (pub.textContent || '').replace(/\s+/g, ' ').trim();
      }
      return snap;
    }

    function freezeArticle(doc) {
      var article = findArticle(doc);
      if (!article || !state.cfg.freeze) {
        return false;
      }
      state.articleEl = article;
      state.frozenHTML = article.innerHTML;
      if (typeof MutationObserver === 'undefined' &&
          (typeof state.win === 'undefined' || !state.win.MutationObserver)) {
        return true; // snapshot captured; no observer available
      }
      var MO = state.win && state.win.MutationObserver ? state.win.MutationObserver
        : (typeof MutationObserver !== 'undefined' ? MutationObserver : null);
      if (!MO) {
        return true;
      }
      state._freezeObserver = new MO(function (mutations) {
        if (state._freezeGuard) {
          return;
        }
        // Revert any mutation to the captured article body.
        state._freezeGuard = true;
        try {
          article.innerHTML = state.frozenHTML;
        } finally {
          state._freezeGuard = false;
        }
      });
      state._freezeObserver.observe(article, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });
      return true;
    }

    function watchWalls(doc) {
      if (typeof state.win === 'undefined' || !state.win.MutationObserver) {
        if (typeof MutationObserver === 'undefined') {
          return;
        }
      }
      var MO = state.win && state.win.MutationObserver ? state.win.MutationObserver
        : (typeof MutationObserver !== 'undefined' ? MutationObserver : null);
      if (!MO) {
        return;
      }
      state._wallObserver = new MO(function () {
        neutralizeWalls(doc);
      });
      state._wallObserver.observe(doc.documentElement || doc.body, {
        childList: true,
        subtree: true
      });
    }

    function start(doc, win, userConfig) {
      state.doc = doc;
      state.win = win || (doc.defaultView || null);
      state.cfg = mergeConfig(userConfig);
      // 1. Capture the loaded page.
      state.capture = captureLoadedPage(doc);
      // 2. Freeze the article body.
      freezeArticle(doc);
      // 3. Neutralize current walls + watch for later ones.
      neutralizeWalls(doc);
      watchWalls(doc);
      state._started = true;
      log(state.cfg, 'started; captured ' + state.capture.paragraphs.length +
        ' paragraphs, ' + state.capture.images.length + ' images');
      return api;
    }

    function stop() {
      if (state._freezeObserver) {
        state._freezeObserver.disconnect();
        state._freezeObserver = null;
      }
      if (state._wallObserver) {
        state._wallObserver.disconnect();
        state._wallObserver = null;
      }
      state._started = false;
    }

    var api = {
      start: start,
      stop: stop,
      capture: function () {
        return state.capture;
      },
      // Re-capture (e.g. after the user forces a reload of content).
      recapture: function () {
        state.capture = captureLoadedPage(state.doc);
        return state.capture;
      },
      neutralizeWalls: function () {
        return neutralizeWalls(state.doc);
      },
      isStarted: function () {
        return state._started;
      },
      _state: state
    };
    return api;
  }

  return createTelegraphPatch;
});
