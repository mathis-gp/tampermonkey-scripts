// ==UserScript==
// @name         Copy Aliexpress order datas
// @namespace    https://github.com/mathis-gp/tampermonkey-scripts/tree/master/scripts/maggio
// @version      0.1.8
// @updateURL    https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/copyAliexpressOrderDatas.js
// @downloadURL  https://mathis-gp.github.io/tampermonkey-scripts/scripts/maggio/copyAliexpressOrderDatas.js
// @description  Copy Aliexpress order datas for past on a google sheet
// @author       Maggio
// @match        https://www.aliexpress.com/p/order/index.html
// @match        https://www.aliexpress.com/p/order/index.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aliexpress.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict'

  const tab = '	'
  const ordersDone = []
  let interval = null

  function addButton(orders) {
    if (!Array.from(orders).every((order) => ordersDone.includes(order))) clearInterval(interval)

    function getOrderDate(order) {
      const orderDateStr = order
        .getElementsByClassName('order-item-header-right-info')[0]
        .getElementsByTagName('div')[0]
        .innerText.match(/:\s(.+)/)[1]

      let orderDate = new Date(
        orderDateStr
      )
      if (orderDate == 'Invalid Date') {
        const months = {
          "janv.": 0,
          "févr.": 1,
          "mars": 2,
          "avr.": 3,
          "mai": 4,
          "juin": 5,
          "juil.": 6,
          "août": 7,
          "sept.": 8,
          "oct.": 9,
          "nov.": 10,
          "déc.": 11
        }
        const parts = orderDateStr.split(' ')
        const day = parseInt(parts[0], 10)
        const month = months[parts[1]]
        const year = parseInt(parts[2], 10)
        orderDate = new Date(year, month, day)
      }
      return orderDate.toLocaleDateString('en-US')
    }

    function getOrderNumber(order) {
      return order.getElementsByClassName('order-item-header-right-info')[0].getElementsByTagName('div')[1].innerText.match(/(\d+)/)[0]
    }

    function getOrderTotal(order) {
      return order
        .getElementsByClassName('order-item-content-opt-price-total')[0]
        .innerText.match(/(\d+),(\d{2})/)[0]
        .replace(',', '.')
    }

    function getProductName(order) {
      return order.getElementsByClassName('order-item-content-info-name')[0]?.innerText ?? ''
    }

    function getProductLink(order) {
      return order.getElementsByClassName('order-item-content-info-name')[0]?.getElementsByTagName('a')[0].href ?? ''
    }

    function getProductQuantity(order) {
      return order.getElementsByClassName('order-item-content-info-number-quantity')[0]?.innerText.match(/(\d+)/)[0] ?? ''
    }

    function getProductUnitPrice(order) {
      return order
        .getElementsByClassName('order-item-content-info-number')[0]
        ?.getElementsByTagName('div')[0]
        .innerText.match(/(\d+),(\d{2})/)[0]
        .replace(',', '.')
    }

    Array.from(orders)
      .filter((order) => !ordersDone.includes(order))
      .forEach((order) => {
        const header = order.getElementsByClassName('order-item-header-status')[0]

        const orderNumber = getOrderNumber(order)

        const copySpan = document.createElement('span')
        copySpan.style.fontSize = '13px'
        copySpan.style.fontWeight = 500
        copySpan.style.lineHeight = 1.5
        copySpan.classList.add('order-item-header-right-copy')
        copySpan.id = orderNumber
        copySpan.innerText = 'Copier les données'

        copySpan.addEventListener('click', () => {
          const orderDate = getOrderDate(order)

          const orderTotal = getOrderTotal(order)

          const productName = getProductName(order).replaceAll('"', '""')
          const productLink = getProductLink(order)
          const productQuantity = getProductQuantity(order)
          const productUnitPrice = getProductUnitPrice(order)

          navigator.clipboard.writeText(orderDate + tab + '=HYPERLINK("' + productLink + '", "' + productName + '")' + tab + '=HYPERLINK("https://www.aliexpress.com/p/order/detail.html?orderId=' + orderNumber + '", "' + orderNumber + '")' + tab + productUnitPrice + tab + productQuantity + tab + orderTotal)

          //const range = document.createRange()
          //range.selectNode(productName)
          //const selection = window.getSelection()
          //selection.remo/llRanges()
          //selection.addRange(range)
          //document.execCommand('copy')
        })

        header.appendChild(copySpan)

        ordersDone.push(order)
      })
  }

  setTimeout(addButton(document.getElementsByClassName('order-item')), 3000)

  const orderMoreBtn = document.getElementsByClassName('order-more')[0]?.getElementsByTagName('button')[0]
  if (orderMoreBtn) {
    orderMoreBtn.addEventListener('click', () => {
      interval = setInterval(() => {
        addButton(document.getElementsByClassName('order-item'))
      }, 2000)
    })
  }
})()
