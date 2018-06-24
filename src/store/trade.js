const { Action } = require('~')
const uuid = require('uuid')

const { action, dispatches } = require('evex')

class TradeModule {
  /**
   * Creates an trade
   */
  @action(Action.SAVE_TRADE)
  @dispatches(Action.MODEL_SAVE)
  createTrade (
    store,
    {
      detail: { id, date, desc, debitArray, creditArray }
    }
  ) {
    const { AccountType } = store.domain

    const dr = {}
    const cr = {}

    debitArray.forEach(debit => {
      store.user.currentDocument.updateRecentDebit(new AccountType(debit.type))
      dr[debit.type] = debit.amount
    })

    creditArray.forEach(credit => {
      store.user.currentDocument.updateRecentCredit(
        new AccountType(credit.type)
      )
      cr[credit.type] = credit.amount
    })

    const trade = new store.domain.Trade.Factory().createFromObject({
      id: id || uuid.v4(),
      date,
      desc,
      dr,
      cr
    })

    store.currentJournal.saveTrade(trade)
  }
}

module.exports = TradeModule
