// ==UserScript==
// @name         Remove Shorts from Youtube
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.5.0
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noYoutubeShort.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/noYoutubeShort.js
// @description  Save your time
// @author       Maggio
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_addStyle
// @grant        window.onurlchange
// @run-at       document-start
// ==/UserScript==

(function () {
  function replacePathToWatch(url) {
    const newUrl = url.replace('youtube.com/shorts/', 'youtube.com/watch?v=')
    window.location.replace(newUrl)
  }
  function redirectPathToWatch(url) {
    const newUrl = url.replace('youtube.com/shorts/', 'youtube.com/watch?v=')
    window.location.href = newUrl
  }
  function openInNewTab(url) {
    const newUrl = url.replace('youtube.com/shorts/', 'youtube.com/watch?v=')
    window.open(newUrl, '_blank')
  }

  document.addEventListener('click', (e) => {
    const aTag = e.target.closest("a[href*='/shorts/']")
    if (aTag && aTag.href) {
      e.preventDefault()
      redirectPathToWatch(aTag.href)
    }
  })
  document.addEventListener('auxclick', (e) => {
    const aTag = e.target.closest("a[href*='/shorts/']")
    if (aTag && aTag.href && e.button == 1) {
      e.preventDefault()
      openInNewTab(aTag.href)
    }
  })

  GM_addStyle(`
    /* Home page */
    ytd-rich-shelf-renderer[is-shorts] {
      display: none !important;
    }

    /* Side suggestions */
    ytd-reel-shelf-renderer {
      display: none !important;
    }

    /* Shorts btn on side bar */
    #guide-content a.ytd-guide-entry-renderer[title="Shorts"] {
      display: none !important;
    }
  `)

  if (window.location.href.includes('youtube.com/shorts')) {
    replacePathToWatch(window.location.href)
  }
  if (window.onurlchange === null) {
    window.addEventListener('urlchange', () => {
      if (window.location.href.includes('youtube.com/shorts')) {
        replacePathToWatch(window.location.href)
      }
    })
  }

})();