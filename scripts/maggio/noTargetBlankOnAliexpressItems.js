// ==UserScript==
// @name         Disable target="_blank" on Aliexpress items
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.5
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noTargetBlankOnAliexpressItems.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noTargetBlankOnAliexpressItems.js
// @description  Oui
// @author       Maggio
// @match        https://aliexpress.com/*
// @match        https://*.aliexpress.com/*
// @exclude      https://*.aliexpress.com/gcp/*
// @exclude      https://*.aliexpress.com/ssr/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aliexpress.com
// @run-at       document-start
// ==/UserScript==

(function () {
  document.addEventListener('click', (e) => {
    const aTag = e.target.closest("a[href*='aliexpress.com/item/'][target='_blank']")
    if (aTag && aTag.href) {
      e.preventDefault()
      window.location.href = aTag.href
    }
  })
})()
