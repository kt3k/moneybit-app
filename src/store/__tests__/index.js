const { describe, it, beforeEach } = require('kocha')
const { createStore, documentObject } = require('./helper')
const genel = require('genel')
const { expect } = require('chai')
const { Action } = require('~')

const { make } = capsid

let store

describe('Store', () => {
  beforeEach(async () => {
    store = await createStore()
  })

  describe('save', () => {
    it('saves the user object', done => {
      store.userRepository = {
        save (user) {
          expect(user).to.equal(store.user)
          done()
        }
      }

      store.save()
    })

    it('saves the currentJournal if exists', async () => {
      await store.dispatch({
        type: Action.CREATE_JOURNAL_DOCUMENT,
        detail: documentObject
      })
      await store.dispatch({ type: Action.LOAD_CHART })

      const journalSaved = new Promise(resolve => {
        store.journalRepository = {
          save (journal) {
            expect(journal).to.equal(store.currentJournal)
            resolve()
          }
        }
      })

      await store.save()

      return journalSaved
    })
  })

  describe('notifyUpdate', () => {
    it('notifies the model update', async () => {
      const store = make(
        'js-store',
        genel.div`<p class="is-model-observer">hello</p>`
      )
      store.languageReady = Promise.resolve()

      const p = new Promise(resolve => {
        store.el.firstChild.addEventListener(Action.MODEL_UPDATE, () =>
          resolve()
        )
      })

      expect(await store.notifyUpdate()).to.equal(store)

      return p
    })
  })
})
