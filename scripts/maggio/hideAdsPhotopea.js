// ==UserScript==
// @name         Hide ads pannel on Photopea
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.0
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/hideAdsPhotopea.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/hideAdsPhotopea.js
// @description  No ads on Photopea without ads blocker
// @author       Maggio
// @match        https://www.photopea.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=photopea.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  GM_addStyle(`
    .flexrow.app>div:nth-child(2) {
      display: none;
    }

    .flexrow.app>div:nth-child(1), .flexrow.app>div:nth-child(1)>div:nth-child(3), .panelblock.mainblock, .mainblock .body {
      width: 100% !important;
    }

    .panelhead {
      max-width: -webkit-fill-available !important;
    }
    .body .pbody>canvas {
      width: 100% !important;
    }
  `);
})();
