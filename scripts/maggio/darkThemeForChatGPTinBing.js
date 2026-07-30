// ==UserScript==
// @name         Dark theme for ChatGPT in Bing
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.2
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/darkThemeForChatGPTinBing.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/darkThemeForChatGPTinBing.js
// @description  try to take over the world!
// @author       Maggio
// @match        https://www.bing.com/search?q=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
  GM_addStyle(`
      html[data-darkreader-scheme="dark"] .cib-serp-main {
  --cib-color-neutral-layer-card-alt: #181a1b;
  --cib-color-neutral-layer-overlay: #1b1e1f;
  --cib-color-brand-secondary-background: #1b1e1f;
  --cib-color-brand-secondary-background-hover: rgb(27, 30, 31);
  --darkreader-text--cib-color-brand-secondary-foreground: rgb(168, 160, 149);
  --darkreader-text--cib-color-brand-secondary-foreground-hover: rgb(221, 218, 214);
  --darkreader-text--cib-color-brand-primary-foreground: rgb(221, 218, 214);
  --cib-color-neutral-foreground: rgb(221, 218, 214);
}
  `)
})();