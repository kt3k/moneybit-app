const { component, on, make, wired } = capsid
const genel = require('genel')

@component('trade-list')
class TradeList {
  @wired.all('.trade-card')
  get tradeCards () {}

  @wired('.trade-list__main')
  get main () {}

  @wired('.title')
  get title () {}

  __mount__ () {
    this.el.innerHTML = `<hr /><h2 class="title"></h2><div class="trade-list__main columns is-multiline"></div>`
  }

  setTitle (title) {
    this.title.textContent = title
  }

  @on('trade-updated')
  update ({ detail: { trades, currentDocument } }) {
    if (trades.length === 0) {
      this.el.style.display = 'none'
      return
    }

    this.el.style.display = ''

    Array.prototype.forEach.call(this.tradeCards, el => {
      // TODO: do not use find each time
      if (!trades.find(([trade, i]) => trade.id === el.dataset.tradeId)) {
        this.main.removeChild(el)
      }
    })

    trades.forEach(([trade, number]) => {
      const el =
        this.el.querySelector(`[data-trade-id="${trade.id}"]`) ||
        make('trade-card', genel.div``).el

      el.dispatchEvent(
        new CustomEvent(Action.UPDATE_TRADE, {
          detail: { journalDocument: currentDocument, trade, number }
        })
      )

      this.main.appendChild(el)
    })
  }
}

module.exports = TradeList
