// ==UserScript==
// @name         Timer to redirect on other URL
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      1.1
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/timerToRedirect.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/timerToRedirect.js
// @description  Set a timer to rediret page to another URL -- open your console  and type timeToRedirect() to start
// @author       Maggio
// @match        *://*/*
// @icon         https://yt3.googleusercontent.com/ytc/AL5GRJWaqxB3spjajcaLiUd-K0MgbkTAwUzmhh18Hs0AOQ=s176-c-k-c0x00ffffff-no-rj
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
  function timeToRedirect () {
      let url = prompt("Redirect url: ")
      /*while(url === '' || url === null) {
          url = prompt("Redirect url: ")
      }*/
      while(url === '') {
          url = prompt("Redirect url: ")
      }
      if(url === null) {
          return
      }

      let minutes = prompt("How soon do you want to redirect the page (in minutes): ")
      /*while(minutes === '' || minutes == 0 || minutes === null || !/^\d+$/.test(minutes)) {
          minutes = prompt("How soon do you want to redirect the page (in minutes): ")
      }*/
      while((minutes === '0' || !/^\d+$/.test(minutes)) && minutes !== null) {
          minutes = prompt("How soon do you want to redirect the page (in minutes): ")
      }
      if(minutes === null) {
          return
      }

      let minutesCountDown = minutes
      setTimeout(() => {
          window.location.href = url
      }, minutes * 1000 * 60)
      console.info(`${minutes} minute(s) timer on`)
      setInterval(() => {
          minutesCountDown -= 1
          const now = new Date()
          console.info(`${now.toLocaleString()}: ${minutesCountDown} minute(s) before redirect`)
      }, 1000 * 60)
  }

  if(!unsafeWindow.timeToRedirect)
  {
      unsafeWindow.timeToRedirect = timeToRedirect
  }
})();