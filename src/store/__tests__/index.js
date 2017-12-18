const { describe, it } = require('kocha')
const genel = require('genel')
const { expect } = require('chai')
const { Action } = require('~')

const { make } = capsid

describe('ModelHub', () => {
  describe('onModelSave', () => {
  })

  describe('save', () => {
  })

  describe('notifyUpdate', () => {
    it('notifies the model update', async () => {
      const hub = make('js-model-hub', genel.div`<p class="is-model-observer">hello</p>`)
      hub.languageReady = Promise.resolve()

      const p = new Promise(resolve => {
        hub.el.firstChild.addEventListener(Action.MODEL_UPDATE, () => resolve())
      })

      expect(await hub.notifyUpdate()).to.equal(hub)

      return p
    })
  })
})
