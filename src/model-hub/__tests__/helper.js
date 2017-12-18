const { Action } = require('~')
const Store = require('../')
const once = require('once')

/**
 * Creats a store for testing
 */
const createStore = done => {
  const store = new Store()

  store.save = once(() => done())
  store.locationReload = () => {}
  store.locationReplace = () => {}
  store.installDefaultModules()
  store.dispatch({ type: Action.HUB_READY })

  return store
}

module.exports.createStore = createStore
