// ==UserScript==
// @name         No premium ad on Finary
// @namespace    https://github.com/Mathis-Gasparotto/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.0.2
// @updateURL    https://mathis-gasparotto.github.io/tampermonkey-scripts/scripts/maggio/noPremiumAdOnFinary.js
// @downloadURL  https://mathis-gasparotto.github.io/tampermonkey-scripts/scripts/maggio/noPremiumAdOnFinary.js
// @description  No premium ad on Finary
// @author       Maggio
// @match        https://app.finary.com/v2/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=finary.com
// @grant        window.onurlchange
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict'

  const PREMIUM_MODAL_URL = 'https://app.finary.com/v2/premium?origin=finary_plus_modal'
  const HOME_URL = 'https://app.finary.com/v2/'

  function redirectIfPremiumModal () {
    if (window.location.href.includes(PREMIUM_MODAL_URL)) {
      window.location.replace(HOME_URL)
    }
  }

  redirectIfPremiumModal()

  if (window.onurlchange === null) {
    window.addEventListener('urlchange', redirectIfPremiumModal)
  }
})()
