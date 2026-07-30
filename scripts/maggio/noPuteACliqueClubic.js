// ==UserScript==
// @name         No pute à click Clubic
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.2.1
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noPuteACliqueClubic.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noPuteACliqueClubic.js
// @description  NTM Clubic
// @author       Maggio
// @match        https://www.clubic.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=clubic.com
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
  const toBlock = [
      "à prix fou",
      "offres",
  ]
  let allItems = Array.from(document.getElementsByClassName('posts'))
  let itemsToDelete = []
  toBlock.forEach(ele => {
      itemsToDelete = itemsToDelete.concat(allItems.filter(e => {
          return e.innerText.includes(ele)
      }))
  })
  itemsToDelete.forEach(e => {
      e.parentNode.removeChild(e)
  })
})();