const { describe, it, beforeEach } = require('kocha')
const { Action } = require('~')
const { createStore } = require('./helper')
const { expect } = require('chai')

let store

describe('LanguageModule', () => {
  beforeEach(async () => {
    store = await createStore()
  })

  describe('Action.SWITCH_LANGUAGE', () => {
    it('switches the current langauge', async () => {
      await store.dispatch({
        type: Action.SWITCH_LANGUAGE,
        detail: store.domain.Language.JA.code
      })

      expect(store.user.settings.language).to.equal(store.domain.Language.JA)
    })
  })
})
