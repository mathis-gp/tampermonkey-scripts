// ==UserScript==
// @name         Myfitnesspal Premium Free
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.0
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/myfitnesspalPremiumFree.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/myfitnesspalPremiumFree.js
// @description  Unhide premium features on myfitnesspal
// @author       Maggio
// @match        https://www.myfitnesspal.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=myfitnesspal.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  GM_addStyle(`
    .css-1c8d0hv {
      display: none !important;
    }
    .css-1av7vdc {
      filter: none !important;
    }
  `);
})();