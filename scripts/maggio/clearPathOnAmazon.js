// ==UserScript==
// @name         Clear path on Amazon
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.2.8
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/clearPathOnAmazon.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/clearPathOnAmazon.js
// @description  Bye bye huge paths on Amazon
// @author       Maggio
// @match        https://*.amazon.fr/*
// @match        https://amazon.fr/*
// @match        https://*.amazon.com/*
// @match        https://amazon.com/*
// @exclude      https://*.amazon.fr/gp/your-account/*
// @exclude      https://amazon.fr/gp/your-account/*
// @exclude      https://*.amazon.com/gp/your-account/*
// @exclude      https://amazon.com/gp/your-account/*
// @exclude      https://amazon.com/gp/your-account/*
// @exclude      https://*.amazon.fr/s?*
// @exclude      https://amazon.fr/s?*
// @exclude      https://*.amazon.com/s?*
// @exclude      https://amazon.com/s?*
// @exclude      https://*.aws.amazon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.fr
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict'

  function clearUrl() {
    if (
      window.location.href.match(/^http[s]?:\/\/\S+amazon\.\D+\/gp\/your-account\/order-details\?./) ||
      window.location.href.match(/^http[s]?:\/\/\S+amazon\.\D+\/s\?./)
    ) {
      return
    }

    window.history.replaceState('object or string', 'Title', window.location.origin + window.location.pathname)
    const match = window.location.href.match(/^http[s]?:\/\/\S+amazon\.\D+[\/\S+]?\/dp\/([^\/^\s^\?]*)[\/]?/)
    if (match) {
      const productRef = match[1]
      window.history.replaceState('object or string', 'Title', window.location.origin + '/dp/' + productRef)
    }

    const matchWithRef = window.location.href.match(/^http[s]?:\/\/\S+amazon\.\D+\/gp\/product\/(\S+)\/ref=/)
    if (matchWithRef) {
      const productRef = matchWithRef[1]
      window.history.replaceState('object or string', 'Title', window.location.origin + '/gp/product/' + productRef)
    }
  }

  clearUrl()
})()
