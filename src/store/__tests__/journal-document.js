const { describe, it, context, beforeEach } = require('kocha')
const { Action } = require('~')
const { expect } = require('chai')
const { createStore } = require('./helper')

describe('JournalDocumentModule', () => {
  let store

  beforeEach(async () => {
    store = await createStore()
  })

  describe('Action.CREATE_JOURNAL_DOCUMENT', () => {
    it('creates the new document and set it to the user', async () => {
      await store.dispatch({ type: Action.CREATE_JOURNAL_DOCUMENT })

      expect(store.user.currentDocument).to.be.instanceof(store.domain.JournalDocument)
    })
  })

  describe('CHANGE_CURRENT_DOCUMENT', () => {
    it('changes the current document by the id', async () => {
      await store.dispatch({ type: Action.CREATE_JOURNAL_DOCUMENT })

      const id0 = store.user.currentDocument.id

      await store.dispatch({ type: Action.CREATE_JOURNAL_DOCUMENT })

      await store.dispatch({
        type: Action.CHANGE_CURRENT_DOCUMENT,
        detail: id0
      })

      expect(store.user.currentDocument.id).to.equal(id0)
    })

    context('when the id is invalid', () => {
      it('throws', async () => {
        await store.dispatch({ type: Action.CREATE_JOURNAL_DOCUMENT })
        await store.dispatch({ type: Action.CREATE_JOURNAL_DOCUMENT })
        expect(() => {
          store.dispatch({
            type: Action.CHANGE_CURRENT_DOCUMENT,
            detail: 'dummy-id'
          })
        }).to.throw()
      })
    })
  })

  describe('UPDATE_CURRENT_DOCUMENT', () => {
    it('updates the current document', async () => {
      await store.dispatch({ type: Action.CREATE_JOURNAL_DOCUMENT })

      await store.dispatch({
        type: Action.UPDATE_CURRENT_DOCUMENT,
        detail: {
          title: 'foo',
          commaPeriodSetting: 'period-comma',
          start: '2017-01-01',
          end: '2017-12-31'
        }
      })

      expect(store.user.currentDocument.title).to.equal('foo')
    })
  })
})
