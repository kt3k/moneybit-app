const { context, describe, it, beforeEach } = require('kocha')
const { expect } = require('chai')
const { make } = capsid
const { Action } = require('~')
const genel = require('genel')

describe('number-input', () => {
  let ni

  beforeEach(() => {
    ni = make('js-number-input', genel.input``)
  })

  context('on focus', () => {
    context('if dataset.amount is empty', () => {
      it('does nothing', () => {
        ni.el.dispatchEvent(new CustomEvent('focus', {}))

        expect(ni.el.value).to.equal('')
      })
    })

    context('if dataset.amount is not empty', () => {
      it('sets dataset.amount to el.value', () => {
        ni.el.dataset.amount = '123'

        ni.el.dispatchEvent(new CustomEvent('focus', {}))

        expect(ni.el.value).to.equal('123')
      })
    })
  })

  context('on input', () => {
    it('assigns el.value to el.dataset.amount', () => {
      ni.el.value = '1234'
      ni.el.dispatchEvent(new CustomEvent('input'))
      expect(ni.el.dataset.amount).to.equal('1234')
    })
  })

  context('on blur', () => {
    it('dispatches REQUEST_MONEY_FIRMAT with dataset.amount', done => {
      ni.el.dataset.amount = '123'

      ni.el.addEventListener(Action.REQUEST_MONEY_FORMAT, ({ detail }) => {
        expect(detail.amount).to.equal('123')
        detail.send('$123')
        expect(ni.el.value).to.equal('$123')
        done()
      })

      ni.el.dispatchEvent(new CustomEvent('blur', {}))
    })
  })
})
