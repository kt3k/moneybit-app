const {
  CLASS_DISABLE_ON_ERROR,
  EVENT_VALIDATION_UPDATE
} = require('../validate')
const genel = require('genel')
const assert = require('assert')
const { make } = require('capsid')
const { describe, context, it, beforeEach } = require('kocha')

describe('js-form', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  context('on field-error event', () => {
    it('broadcasts EVENT_VALIDATION_UPDATE to DISABLE_ON_ERROR', done => {
      const el = genel.div`
        <button class="${CLASS_DISABLE_ON_ERROR}">button</button>
      `

      el.querySelector(`.${CLASS_DISABLE_ON_ERROR}`).addEventListener(
        EVENT_VALIDATION_UPDATE,
        e => {
          assert(!e.detail.error)
          done()
        }
      )

      document.body.appendChild(el)

      make('js-form', el)

      el.dispatchEvent(new CustomEvent('field-error'))
    })
  })
})
