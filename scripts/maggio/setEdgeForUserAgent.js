// ==UserScript==
// @name         Set Edge for user-agent
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.1
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/setEdgeForUserAgent.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/setEdgeForUserAgent.js
// @description  try to take over the world!
// @author       Maggio
// @match        https://www.bing.com/search*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    Object.defineProperty(navigator, 'userAgent', {
        get: function () { return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.57'; }
    });
})();