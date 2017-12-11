const { make, mount } = capsid
const { describe, it, beforeEach } = require('kocha')
const genel = require('genel')
const { Action } = require('~')
const JournalDocumentModule = require('../journal-document')
const once = require('once')
const { expect } = require('chai')

describe('JournalModule', () => {
  let hub

  beforeEach(done => {
    const el = genel.div``
    el.addEventListener(Action.MODEL_SAVE, once(() => done()))
    hub = make('js-model-hub', el)
  })

  describe('CREATE_JORUNAL_DOCUMENT', () => {
    it('creates the new document and set it to the user', done => {
      hub.el.addEventListener(Action.MODEL_SAVE, once(() => {
        expect(hub.currentDocument).not.to.equal(null)
        done()
      }))

      hub.el.dispatchEvent(new CustomEvent(Action.CREATE_JOURNAL_DOCUMENT))
    })
  })

  describe('CHANGE_CURRENT_DOCUMENT', () => {
    it('changes the current document by the id', done => {
      hub.el.addEventListener(Action.MODEL_SAVE, once(() => {
        const id0 = hub.user.currentDocument.id

        hub.el.addEventListener(Action.MODEL_SAVE, once(() => {
          hub.el.addEventListener(Action.MODEL_SAVE, once(() => {
            expect(hub.user.currentDocument.id).to.equal(id0)
            done()
          }))

          hub.el.dispatchEvent(new CustomEvent(Action.CHANGE_CURRENT_DOCUMENT, {
            detail: id0
          }))
        }))

        hub.el.dispatchEvent(new CustomEvent(Action.CREATE_JOURNAL_DOCUMENT))
      }))

      hub.el.dispatchEvent(new CustomEvent(Action.CREATE_JOURNAL_DOCUMENT))
    })
  })

  describe('UPDATE_CURRENT_DOCUMENT', () => {
    it('updates the current document', done => {
      hub.el.addEventListener(Action.MODEL_SAVE, once(() => {
        hub.el.addEventListener(Action.MODEL_SAVE, once(() => {
          expect(hub.user.currentDocument.title).to.equal('foo')
          done()
        }))

        hub.el.dispatchEvent(new CustomEvent(Action.UPDATE_CURRENT_DOCUMENT, {
          detail: {
            title: 'foo',
            commaPeriodSetting: 'period-comma',
            start: '2017-01-01',
            end: '2017-12-31'
          }
        }))
      }))
      hub.el.dispatchEvent(new CustomEvent(Action.CREATE_JOURNAL_DOCUMENT))
    })
  })
})
