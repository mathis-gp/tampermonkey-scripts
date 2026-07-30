// ==UserScript==
// @name         No ads results on bing search
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.4.2
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noAdsInBingSearch.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noAdsInBingSearch.js
// @description  ui
// @author       Maggio
// @match        bing.com/search?*
// @match        www.bing.com/search?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
    GM_addStyle(`
      .b_adTop, .b_topw_rrat, #adstop_gradiant_separator {
        display: none !important;
      }
    `);
})();