const { Action } = require('~')
const { on, emits } = capsid

class TradeModule {
  @on(Action.CREATE_TRADE)
  @emits(Action.MODEL_SAVE)
  createTrade () {
  }
}

module.exports = TradeModule
