const { describe, beforeEach, afterEach, it } = require('kocha')
const genel = require('genel')
const { make } = require('capsid')
const assert = require('assert')
const { Action } = require('~/src')
require('../new-item-card')

let el
let card

describe('new-item-card', () => {
  beforeEach(() => {
    el = genel.div`
      <input class="new-item-card__date" value="2018-05-31" />
      <input class="new-item-card__desc" value="Sales for May" />
      <div class="new-item-card__debit">
        <input class="new-item-card__debit-type" value="Account Receivable" />
        <input class="new-item-card__debit-amount" value="20000" />
      </div>
      <div class="new-item-card__credit">
        <input class="new-item-card__credit-type" value="Sales" />
        <input class="new-item-card__credit-amount" value="20000" />
      </div>
    `
    card = make('new-item-card', el)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('onCreate', () => {
    it('dispatches Action.CREATE_TRADE', done => {
      el.addEventListener(Action.CREATE_TRADE, e => {
        done()
      })

      card.onCreate(new UIEvent('click'))
    })
  })

  describe('onCancel', done => {
    it('removes the element from the document tree', done => {
      card.onCancel(new UIEvent('click'))

      setTimeout(() => {
        assert(el.parentElement == null)

        done()
      }, 10)
    })
  })
})
