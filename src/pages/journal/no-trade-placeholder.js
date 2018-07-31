const { component, on } = capsid

@component('no-trade-placeholder')
class NoTradePlaceholder {
  @on(Action.MODEL_UPDATE)
  update ({
    detail: {
      currentJournal: { trades }
    }
  }) {
    if (trades.length > 0) {
      this.el.style.display = 'none'
      return
    }

    this.el.style.display = ''
  }
}

module.exports = NoTradePlaceholder
