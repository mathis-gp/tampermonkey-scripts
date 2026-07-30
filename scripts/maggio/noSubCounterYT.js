// ==UserScript==
// @name         No sub counter YT
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.2
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noSubCounterYT.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noSubCounterYT.js
// @description  hidden channel sub counter on YouTube
// @author       Maggio
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
  GM_addStyle(`
      #owner-sub-count {
         display: none !important;
      }
  `)
})();