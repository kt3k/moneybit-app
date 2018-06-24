const { describe, it, beforeEach } = require('kocha')
const { createStore, documentObject } = require('./helper')
const { Action } = require('~')
const { expect } = require('chai')

let store

describe('TradeModule', () => {
  beforeEach(async () => {
    store = await createStore()
    await store.dispatch({
      type: Action.CREATE_JOURNAL_DOCUMENT,
      detail: documentObject
    })
    await store.dispatch({ type: Action.LOAD_CHART })
  })

  describe('Action.SAVE_TRADE', () => {
    it('creates a trade', async () => {
      await store.dispatch({
        type: Action.SAVE_TRADE,
        detail: {
          date: '',
          desc: 'foo',
          debitArray: [
            {
              type: 'bar',
              amount: 123
            }
          ],
          creditArray: [
            {
              type: 'baz',
              amount: 123
            }
          ]
        }
      })

      expect(store.currentJournal.trades.length).to.equal(1)
    })
  })
})
