const { describe, it } = require('kocha')
const genel = require('genel')
const { expect } = require('chai')
const { Action } = require('~')

const { make } = capsid

describe('Store', () => {
  describe('notifyUpdate', () => {
    it('notifies the model update', async () => {
      const store = make('js-store', genel.div`<p class="is-model-observer">hello</p>`)
      store.languageReady = Promise.resolve()

      const p = new Promise(resolve => {
        store.el.firstChild.addEventListener(Action.MODEL_UPDATE, () => resolve())
      })

      expect(await store.notifyUpdate()).to.equal(store)

      return p
    })
  })
})
