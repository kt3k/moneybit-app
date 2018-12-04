const { component, on, make, wired } = capsid
const genel = require('genel')

@component('trade-month-list')
class TradeMonthList {
  @wired.all('.trade-list') tradeLists

  classForMonth (month) {
    return 'trade-month-list_' + month.format('MMMM-YYYY')
  }

  monthsAreReady () {
    return this.tradeLists.length > 0
  }

  setUpMonths (months) {
    months.forEach(month => {
      const el = genel.div``

      el.classList.add(this.classForMonth(month))

      const tradeList = make('trade-list', el)

      tradeList.setTitle(month.format('MMMM YYYY'))

      this.el.appendChild(el)
    })
  }

  @on(Action.MODEL_UPDATE)
  update ({ detail: { user, currentJournal } }) {
    const months = user.currentDocument.getMonths().reverse()

    if (!this.monthsAreReady()) {
      this.setUpMonths(months)
    }

    const allTrades = Array.from(currentJournal.trades)
      .map((trade, i) => [trade, i + 1])
      .reverse()

    months.forEach(month => {
      // TODO: do not use filter on each item
      const trades = allTrades.filter(
        ([trade, i]) =>
          trade.date
            .clone()
            .startOf('month')
            .valueOf() === month.valueOf()
      )
      this.el.querySelector('.' + this.classForMonth(month)).dispatchEvent(
        new CustomEvent('trade-updated', {
          detail: { trades, currentDocument: user.currentDocument }
        })
      )
    })

    t10.scan()
  }
}

module.exports = TradeMonthList
