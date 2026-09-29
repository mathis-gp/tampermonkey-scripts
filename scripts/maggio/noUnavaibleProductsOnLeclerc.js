// ==UserScript==
// @name         No unavaible products on Leclerc search results
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.1
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noUnavaibleProductsOnLeclerc.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noUnavaibleProductsOnLeclerc.js
// @description  disable unavaible products on Leclerc search results
// @author       Maggio
// @match        https://www.e.leclerc/recherche?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=e.leclerc
// @grant        GM_addStyle
// @grant        window.onurlchange
// @run-at       document-start
// ==/UserScript==

(function() {
  function addStyle() {
    GM_addStyle(`
      article.bRxZe:has(.bhVNE) {
        display: none;
      }
    `)
  }
  window.onurlchange = addStyle;
})();