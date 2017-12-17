const { describe, it, beforeEach } = require('kocha')
const once = require('once')
const { Action } = require('~')
const ModelHub = require('../')
const AppStateModule = require('../app-state')
const UserModule = require('../user')
const LanguageModule = require('../language')
const JournalDocumentModule = require('../journal-document')
const ChartModule = require('../chart')
const LocationModule = require('../location')
const { expect } = require('chai')

describe('JournalModule', () => {
  let store
  let module

  beforeEach(done => {
    store = new ModelHub()

    store.save = once(() => done())
    store.locationReload = () => {}
    store.locationReplace = () => {}
    store.installModules([
      module = new JournalDocumentModule(),
      new AppStateModule(),
      new UserModule(),
      new LanguageModule(),
      new ChartModule(),
      new LocationModule()
    ])

    store[':evex:store:handleAction']({ type: Action.HUB_READY })
  })

  describe('createJournal', () => {
    it('creates the new document and set it to the user', async () => {
      await module.createJournal(store, { detail: {} })

      expect(store.user.currentDocument).to.be.instanceof(store.domain.JournalDocument)
    })
  })

  describe('CHANGE_CURRENT_DOCUMENT', () => {
    it('changes the current document by the id', async () => {
      await module.createJournal(store, { detail: {} })

      const id0 = store.user.currentDocument.id

      await module.createJournal(store, { detail: {} })

      await module.changeCurrentDocument(store, { detail: id0 })

      expect(store.user.currentDocument.id).to.equal(id0)
    })
  })

  describe('UPDATE_CURRENT_DOCUMENT', () => {
    it('updates the current document', async () => {
      await module.createJournal(store, { detail: {} })

      await module.updateCurrentDocument(store, {
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
