const { describe, it, afterEach } = require('kocha')
const { expect } = require('chai')
const td = require('testdouble')
const { AppState, Language } = require('../')

const repository = new AppState.Repository()

describe('AppState.Repository', () => {
  afterEach(() => td.reset())

  describe('save', () => {
    it('saves the app state', async () => {
      td.replace(infrastructure.storage, 'set')

      const appState = new AppState({ userId: 'foo' })

      await repository.save(appState)

      td.verify(
        infrastructure.storage.set(
          'mb-app-state',
          td.matchers.contains({ userId: 'foo' })
        )
      )
    })
  })

  describe('get', () => {
    it('gets the app state', async () => {
      td.replace(infrastructure.storage, 'get')
      td.when(
        infrastructure.storage.get('mb-app-state', td.matchers.isA(Object))
      ).thenResolve({ userId: 'foo' })

      const appState = await repository.get()

      expect(appState).to.instanceof(AppState)
      expect(appState.userId).to.equal('foo')
      expect(appState.deviceLanguage).to.equal(Language.EN)
    })
  })
})
