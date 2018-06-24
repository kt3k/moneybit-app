const { describe, beforeEach, afterEach, it } = require('kocha')
const genel = require('genel')
const { make } = require('capsid')
const assert = require('assert')
const { Action } = require('~/src')
require('../edit-item-card')

let el
let card

describe('edit-item-card', () => {
  beforeEach(() => {
    el = genel.div`` /* `
      <input class="edit-item-card__id" value="1" />
      <input class="edit-item-card__date" value="2018-05-31" />
      <input class="edit-item-card__desc" value="Sales for May" />
      <div class="edit-item-card__debit">
        <input class="edit-item-card__account-type" value="Account Receivable" />
        <input class="edit-item-card__account-amount" value="20000" />
      </div>
      <div class="edit-item-card__credit">
        <input class="edit-item-card__account-type" value="Sales" />
        <input class="edit-item-card__account-amount" value="20000" />
      </div>
    ` */

    card = make('edit-item-card', el)
    card.update({
      detail: { user: global.user, currentChart: global.currentChart }
    })
    card.onOpen({ detail: { trade: null } })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('onSave', () => {
    it('dispatches Action.SAVE_TRADE', done => {
      el.addEventListener(Action.SAVE_TRADE, e => {
        done()
      })

      card.onSave(new UIEvent('click'))
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
