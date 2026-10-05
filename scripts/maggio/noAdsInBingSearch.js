// ==UserScript==
// @name         No ads results on bing search
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.4.3
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noAdsInBingSearch.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noAdsInBingSearch.js
// @description  ui
// @author       Maggio
// @match        bing.com/search?*
// @match        www.bing.com/search?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function () {   
    setTimeout(() => {
      const elements = document.querySelectorAll('li.b_algo:has(.b_caption p)');
      elements.forEach(el => {
        const caption = el.querySelector('.b_caption p');
        if (window.getComputedStyle(caption, '::before').blockSize != "auto") {
          el.style.display = 'none';
        }
      });
    }, 1000);
})();