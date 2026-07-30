// ==UserScript==
// @name         Display places available on Maisavia
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.0.1
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/displayPlacesAvailableOnMaisavia.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/displayPlacesAvailableOnMaisavia.js
// @description  Get and display places available on Maisavia
// @author       Maggio
// @match        https://www.maisavia.fr/product/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=maisavia.fr
// @run-at       document-body
// @grant        GM_log
// ==/UserScript==

(function () {
  const TARGET_PATH = '/wp-admin/admin-ajax.php'
  const CLONE_HEADER = 'X-TM-Clone'
  let alreadySent = false

  function shouldHandle (url) {
    try {
      const u = new URL(url, location.origin)
      return u.pathname.endsWith(TARGET_PATH)
    } catch {
      return false
    }
  }

  function headersHasClone (hdrs) {
    try {
      if (!hdrs) return false
      if (hdrs instanceof Headers) return !!hdrs.get(CLONE_HEADER)
      const lower = CLONE_HEADER.toLowerCase()
      return !!(hdrs[CLONE_HEADER] || hdrs[lower])
    } catch {
      return false
    }
  }

  // Convert the original body to [k,v] pairs
  function bodyToEntries (body) {
    try {
      if (!body) return []
      if (body instanceof FormData) return [...body.entries()]
      if (body instanceof URLSearchParams) return [...body.entries()]
      if (typeof body === 'string') {
        // try JSON, otherwise x-www-form-urlencoded
        try { return Object.entries(JSON.parse(body)) } catch {}
        return [...new URLSearchParams(body).entries()]
      }
      return []
    } catch {
      return []
    }
  }

  // Build the replayed FormData from the original entries, overriding some fields
  function buildNewFormData (originalEntries) {
    // Simplify to key/value object (override duplicates, OK for our usage qte/article)
    const obj = {}
    for (const [k, v] of originalEntries) obj[k] = String(v)

    // Overrides to adapt:
    if ('qte' in obj) obj.qte = '1000'

    const fd = new FormData()
    for (const [k, v] of Object.entries(obj)) fd.append(k, v)
    return fd
  }

  async function replayWithFormData (fd) {
    if (alreadySent) return
    try {
      const resp = await fetch(TARGET_PATH, {
        method: 'POST',
        headers: { [CLONE_HEADER]: '1' }, // don't fix Content-Type to let the boundary
        body: fd,
        credentials: 'same-origin'
      })
      const text = await resp.text()
      try {
        const data = JSON.parse(text)
        // GM_log('[TM] Replayed response (JSON):', data)
        const availablePlaces = getAvailablePlacesFromJson(data)
        if (availablePlaces != null) {
          GM_log('[TM] Available places:', availablePlaces)
          displayAvailablePlaces(availablePlaces)
        } else {
          const availabilityQuantity = getAvailablePlacesFromJson(data)
          GM_log('[TM] Stock quantity:', availabilityQuantity)
          displayAvailablePlaces(availabilityQuantity)
        }
      } catch {
        GM_log('[TM] Replayed response (TEXT):', text)
      }
      alreadySent = true
    } catch (e) {
      GM_log('[TM] Error replaying request', e)
    }
  }

  function getAvailablePlacesFromJson(json_str) {
    const json = JSON.parse(json_str)
    if (json && json.sync && typeof json.sync.available_places === 'number') {
      return String(json.sync.available_places)
    }
    return null
  }

  function displayAvailablePlaces (availabilityQuantity) {
    const orderTotalContainer = document.getElementsByClassName('order_total')[0]
    const availablePlacesElement = document.createElement('div')
    availablePlacesElement.style.marginBottom = '10px'
    availablePlacesElement.innerHTML = `Places disponibles : <span style="font-weight: bolder;">${availabilityQuantity}</span>`
    orderTotalContainer.insertAdjacentElement('beforebegin', availablePlacesElement)
  }

  // Intercept fetch
  const origFetch = window.fetch
  window.fetch = async function (input, init) {
    if (!alreadySent) {
      try {
        const url = typeof input === 'string' ? input : input.url
        const method = (init && init.method) || (typeof input !== 'string' && input.method) || 'GET'
        const isClone = headersHasClone((init && init.headers) || (typeof input !== 'string' && input.headers))

        if (shouldHandle(url) && method.toUpperCase() === 'POST' && !isClone) {
          let entries = []
          if (init && init.body != null) {
            entries = bodyToEntries(init.body)
          } else if (typeof input !== 'string' && input.bodyUsed === false) {
            // Best effort if a Request is passed without init
            try { entries = bodyToEntries(await input.clone().text()) } catch {}
          }
          if (entries.length) {
            const fd = buildNewFormData(entries)
            setTimeout(() => {
              replayWithFormData(fd).catch(GM_log)
            }, 1000)
          }
        }
      } catch (e) {
        GM_log('[TM] Error intercepting fetch', e)
      }
    }
    return origFetch.apply(this, arguments)
  }

  // Intercept XMLHttpRequest
  const origOpen = XMLHttpRequest.prototype.open
  const origSend = XMLHttpRequest.prototype.send

  XMLHttpRequest.prototype.open = function (method, url) {
    this._tm_url = url
    this._tm_method = method
    return origOpen.apply(this, arguments)
  }

  XMLHttpRequest.prototype.send = function (body) {
    if (!alreadySent) {
      try {
        if (this._tm_method && this._tm_method.toUpperCase() === 'POST' && shouldHandle(this._tm_url)) {
          const entries = bodyToEntries(body)
          if (entries.length) {
            const fd = buildNewFormData(entries)
            replayWithFormData(fd).catch(GM_log)
          }
        }
      } catch (e) {
        GM_log('[TM] Error intercepting XMLHttpRequest', e)
      }
    }
    return origSend.apply(this, arguments)
  }
})()