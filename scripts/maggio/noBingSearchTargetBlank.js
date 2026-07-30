// ==UserScript==
// @name         Disable target="_blank" on Bing Search
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.3
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noBingSearchTargetBlank.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noBingSearchTargetBlank.js
// @description  Prevent Bing Search from opening links in a new tab (on default settings) by removing the target="_blank" attribute on search results links
// @author       Maggio
// @match        https://bing.com/search?*
// @match        https://www.bing.com/search?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @run-at       document-start
// ==/UserScript==

(function () {
  document.addEventListener('click', (e) => {
    const aTag = e.target.closest("a[target='_blank']")
    if (aTag && aTag.href) {
      e.preventDefault()
      window.location.href = aTag.href
    }
  })
})()
