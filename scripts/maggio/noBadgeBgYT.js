// ==UserScript==
// @name         No badge bg YT
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.3.2
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noBadgeBgYT.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noBadgeBgYT.js
// @description  disable badge background on Youtube
// @author       Maggio
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
  GM_addStyle(`
      ytd-rich-metadata-renderer[darker-dark-theme] {
        background-color: transparent !important;
      }
      :root {
        --yt-spec-badge-chip-background: transparent !important;
        --yt-spec-mono-tonal-hover: rgba(255, 255, 255, 0.05) !important;
        --yt-spec-button-chip-background-hover: rgba(255, 255, 255, 0.05) !important;
      }
      /*ytd-popup-container {
        background-color: rgba(0, 0, 0, 0.5);
      }*/
      #endpoint.yt-simple-endpoint.ytd-guide-entry-renderer:hover, #endpoint.yt-simple-endpoint.ytd-guide-entry-renderer:focus {
        background-color: var(--yt-spec-mono-tonal-hover);
      }
      ytd-playlist-video-renderer:hover:not(.dragging) {
        background-color: var(--yt-spec-mono-tonal-hover);
      }
      #items.yt-multi-page-menu-section-renderer>*.yt-multi-page-menu-section-renderer:not([compact-link-style=compact-link-style-type-disclaimer]).yt-multi-page-menu-section-renderer:not([component-style=RENDER_STYLE_SIMPLE_HEADER]).yt-multi-page-menu-section-renderer:hover {
        background-color: var(--yt-spec-mono-tonal-hover) !important;
      }
      ytd-playlist-panel-video-renderer[watch-color-update][can-reorder]:hover.dragging, ytd-playlist-panel-video-renderer[watch-color-update][can-reorder].dragging, ytd-playlist-panel-video-renderer[watch-color-update]:hover:not(.dragging) {
        background-color: var(--yt-spec-mono-tonal-hover) !important;
      }
  `)

  /*const style = document.createElement('style');
  style.innerHTML = `
      ytd-rich-metadata-renderer[darker-dark-theme] {
        background-color: transparent !important;
      }
      :root {
        --yt-spec-badge-chip-background: transparent !important;
      }
  `
  document.head.appendChild(style);*/

  /*document.head.appendChild(document.createElement('style').innerHTML = `
      ytd-rich-metadata-renderer[darker-dark-theme] {
        background-color: transparent !important;
      }
      :root {
        --yt-spec-badge-chip-background: transparent !important;
      }
  `)*/
})();