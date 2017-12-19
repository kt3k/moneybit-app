const { describe, it, beforeEach } = require('kocha')
const { createStore } = require('./helper')
const { Action } = require('~')
const { expect } = require('chai')

let store

describe('TradeModule', () => {
  beforeEach(done => {
    store = createStore(done)
  })

  describe('Action.CREATE_TRADE', () => {
    it('creates a trade', async () => {
      await store.dispatch({ type: Action.CREATE_JOURNAL_DOCUMENT })
      await store.dispatch({ type: Action.LOAD_CHART })
      await store.dispatch({
        type: Action.CREATE_TRADE,
        detail: {
          date: '',
          desc: 'foo',
          dr: {
            bar: 123
          },
          cr: {
            baz: 123
          }
        }
      })

      expect(store.currentJournal.trades.length).to.equal(1)
    })
  })
})
