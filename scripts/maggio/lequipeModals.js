// ==UserScript==
// @name         Remove the "No AdBlock" && cookies modals on L'Équipe
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.0
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/lequipeModals.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/lequipeModals.js
// @description  Remove the "No AdBlock" && cookies modals on L'Équipe
// @author       Maggio
// @match        https://www.lequipe.fr/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lequipe.fr
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  GM_addStyle(`
    html.no-scroll {
      overflow: auto !important;
    }
    #modal-root {
      display: none !important;
    }
    .CmpContainer {
      display: none !important;
    }
  `);
})();