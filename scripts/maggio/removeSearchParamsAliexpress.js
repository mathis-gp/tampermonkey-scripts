// ==UserScript==
// @name         Remove search params from path on Aliexpress
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.16
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/removeSearchParamsAliexpress.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/removeSearchParamsAliexpress.js
// @description  bye bye huge links on Aliexpress
// @author       Maggio
// @match        https://*.aliexpress.com/*
// @exclude      https://*.aliexpress.com/p/order/detail.html*
// @exclude      https://*.aliexpress.com/p/reverse-pages/*
// @exclude      https://*.aliexpress.com/p/trade/confirm.html*
// @exclude      https://*.aliexpress.com/p/second-payment/pay-result.html*
// @exclude      https://*.aliexpress.com/p/tax-ui/index.html*
// @exclude      https://m.aliexpress.com/p/refund-cancel/index.html*
// @exclude      https://*.aliexpress.com/p/tracking/index.html*
// @exclude      https://shoprenderview.aliexpress.com/credential/showcredential.htm*
// @exclude      https://*.aliexpress.com/p/message/index.html*
// @exclude      https://msg.aliexpress.com/buyerMsgListNew.htm*
// @exclude      https://*.aliexpress.com/p/wish-manage/detail.html*
// @exclude      https://helpcenter.aliexpress.com/s/BuyerHelp/search*
// @exclude      https://*.aliexpress.com/p/cro-violation-center/detail.html*
// @exclude      https://feedback.aliexpress.com/management/leaveFeedback.htm*
// @exclude      https://www.aliexpress.com/p/edm-setting/form.html*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aliexpress.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict'

  window.history.replaceState('object or string', 'Title', window.location.origin + window.location.pathname)
})()
