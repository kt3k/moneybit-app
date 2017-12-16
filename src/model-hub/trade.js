const { Action } = require('~')
const uuid = require('uuid')
const { on, emits, wire } = capsid

class TradeModule {
  @wire('js-model-hub') get hub () {}

  /**
   * Creates an trade
   */
  @on(Action.CREATE_TRADE)
  @emits(Action.MODEL_SAVE)
  createTrade ({ detail: { date, desc, dr, cr } }) {
    const trade = new this.hub.domain.Trade.Factory().createFromObject({
      id: uuid.v4(),
      date,
      desc,
      dr,
      cr
    })

    this.hub.currentJournal.addTrade(trade)
  }
}

module.exports = TradeModule
