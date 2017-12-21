const { describe, it, beforeEach } = require('kocha')
const { createStore } = require('./helper')
const { Action, Page } = require('~')

let store

describe('LocationModule', () => {
  beforeEach(async () => {
    store = await createStore()
  })

  describe('Action.CHECK_LOCATION', () => {
    it('dispatches LOCATION_OK when the user has current document', async () => {
      await store.dispatch({ type: Action.CREATE_JOURNAL_DOCUMENT })

      const done = new Promise(resolve => {
        store.on(Action.LOCATION_OK, () => resolve())
      })

      store.dispatch({ type: Action.CHECK_LOCATION })

      return done
    })

    it('dispatches LOCATION_OK when pathname is not one of main pages', () => {
      store.location = {
        pathname: '/foo/index.html',
        reload: () => {},
        replace: () => {}
      }

      const done = new Promise(resolve => {
        store.on(Action.LOCATION_OK, () => resolve())
      })

      store.dispatch({ type: Action.CHECK_LOCATION })

      return done
    })

    it('dispatches LOCATION_NG when pathname is one of main pages and the user does not have current document', () => {
      store.location = {
        pathname: Page.BS,
        reload: () => {},
        replace: () => {}
      }

      const done = new Promise(resolve => {
        store.on(Action.LOCATION_NG, () => resolve())
      })

      store.dispatch({ type: Action.CHECK_LOCATION })

      return done
    })
  })
})
