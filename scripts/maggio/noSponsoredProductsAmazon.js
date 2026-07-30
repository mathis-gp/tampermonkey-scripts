// ==UserScript==
// @name         No sponsored products on Amazon (FR) search results
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.3.2
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noSponsoredProductsAmazon.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noSponsoredProductsAmazon.js
// @description  NTM Amazon
// @author       Maggio
// @match        https://*.amazon.fr/s*
// @match        https://amazon.fr/s*
// @match        https://*.amazon.com/s*
// @match        https://amazon.com/s*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.fr
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  // let sponsoredProducts = Array.from(document.querySelectorAll('.s-result-item.s-asin.AdHolder'))
  //   sponsoredProducts.forEach(e => {
  //     e.parentNode.removeChild(e)
  // })
  GM_addStyle(`
    .s-result-item.AdHolder {
      display: none !important;
    }
  `)
})()
