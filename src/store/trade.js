const { Action } = require('~')
const uuid = require('uuid')

const { action, dispatches } = require('evex')

class TradeModule {
  /**
   * Creates an trade
   */
  @action(Action.CREATE_TRADE)
  @dispatches(Action.MODEL_SAVE)
  createTrade (store, { detail: { date, desc, dr, cr } }) {
    const trade = new store.domain.Trade.Factory().createFromObject({
      id: uuid.v4(),
      date,
      desc,
      dr,
      cr
    })

    store.currentJournal.addTrade(trade)
  }
}

module.exports = TradeModule
