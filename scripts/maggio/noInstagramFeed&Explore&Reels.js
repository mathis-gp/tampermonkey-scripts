// ==UserScript==
// @name         Block Instagram feed & explore & reels
// @namespace    https://github.com/Mathis-Gasparotto/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.2
// @updateURL    https://mathis-gasparotto.github.io/tampermonkey-scripts/scripts/maggio/noInstagramFeed&Explore&Reels.js
// @downloadURL  https://mathis-gasparotto.github.io/tampermonkey-scripts/scripts/maggio/noInstagramFeed&Explore&Reels.js
// @description  Save your time
// @author       Maggio
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @grant        GM_addStyle
// @grant        window.onurlchange
// @run-at       document-start
// ==/UserScript==

(function () {
  GM_addStyle(`
    .x1xgvd2v.x1o5hw5a .x1iyjqo2.xh8yej3 span[aria-describedby=":r2:"],
    .x1xgvd2v.x1o5hw5a .x1iyjqo2.xh8yej3 span[aria-describedby=":r4:"],
    .x1xgvd2v.x1o5hw5a .x1iyjqo2.xh8yej3 span[aria-describedby=":r5:"],
    .x1xgvd2v.x1cy8zhl:not(.x1o5hw5a) .x1iyjqo2.xh8yej3 span[aria-describedby=":r3:"],
    .x1xgvd2v.x1cy8zhl:not(.x1o5hw5a) .x1iyjqo2.xh8yej3 span[aria-describedby=":r5:"],
    .x1xgvd2v.x1cy8zhl:not(.x1o5hw5a) .x1iyjqo2.xh8yej3 span[aria-describedby=":r6:"]
    {
      display: none;
    }
  `)
  if (window.onurlchange === null) {
    window.addEventListener('urlchange', () => {
      if (window.location.href.includes('/reels') || window.location.href === 'https://www.instagram.com/') {
        window.location.href = 'https://www.instagram.com/direct/inbox/'
      }
    })
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btnWithUnauthorizedHref = document.querySelectorAll('a[href="/"], a[href="/explore/"], a[href="/reels/"]')
    btnWithUnauthorizedHref.forEach(btn => {
      btn.href = '/direct/inbox/'
    })
  })
})();