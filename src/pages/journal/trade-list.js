const { component, on, make } = capsid
const genel = require('genel')

@component('js-trade-list')
class TradeList {
  @on(Action.MODEL_UPDATE)
  onUpdate ({ detail: { user, currentJournal } }) {
    if (!currentJournal || !currentJournal.trades) {
      return
    }

    currentJournal.trades.forEach(trade => {
      const el =
        this.el.querySelector(`[data-trade-id="${trade.id}"]`) ||
        make('js-trade-card', genel.div``).el

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
