// ==UserScript==
// @name         No ads results on google search
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.0
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noAdsInGoogleSearch.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noAdsInGoogleSearch.js
// @description  no ads results on google search
// @author       Maggio
// @match        *.google.com/search?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict'

  GM_addStyle(`
      div[role="main"] div[aria-label="Ads"] {
        display: none !important;
      }
    `)
})()
