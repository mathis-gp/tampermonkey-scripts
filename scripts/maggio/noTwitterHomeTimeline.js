// ==UserScript==
// @name         Block Twitter home timeline
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.2.0
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noTwitterHomeTimeline.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noTwitterHomeTimeline.js
// @description  Save your time
// @author       Maggio
// @match        https://x.com/*
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        GM_addStyle
// @grant        window.onurlchange
// @run-at       document-start
// ==/UserScript==

(function () {
  GM_addStyle(`
    /* Home page button */
    nav[role="navigation"] a[href="/home"] {
      display: none;
    }

    /* Premium page button */
    nav[role="navigation"] a[href="/i/premium_sign_up"] {
      display: none;
    }

    /* Verified Orgs page button */
    nav[role="navigation"] a[href="/i/verified-orgs-signup"] {
      display: none;
    }
  `);
  if (window.onurlchange === null) {
    window.addEventListener("urlchange", () => {
      if (window.location.href.includes("/home")) {
        GM_addStyle(`
          /* Home main content */
          div[aria-label="Home timeline"] > div:last-child {
            display: none;
          }
        `);
      } else {
        GM_addStyle(`
          /* Home main content */
          div[aria-label="Home timeline"] > div:last-child {
            display: block;
          }
        `);
      }
    });
  }
})();
