const { component, on, make, wired } = capsid
const genel = require('genel')

@component('js-trade-list')
class TradeList {
  @wired.all('.trade-card')
  get tradeCards () {}

  @on(Action.MODEL_UPDATE)
  onUpdate ({ detail: { user, currentJournal } }) {
    if (!currentJournal || !currentJournal.trades) {
      return
    }

    Array.prototype.forEach.call(this.tradeCards, el => {
      if (!currentJournal.getTradeById(el.dataset.tradeId)) {
        this.el.removeChild(el)
      }
    })

    currentJournal.trades.forEach(trade => {
      const el =
        this.el.querySelector(`[data-trade-id="${trade.id}"]`) ||
        make('trade-card', genel.div``).el

      el.dispatchEvent(
        new CustomEvent(Action.UPDATE_TRADE, {
          detail: { journalDocument: user.currentDocument, trade }
        })
      )

      this.el.appendChild(el)
    })

    t10.scan()
  }
}

module.exports = TradeList
