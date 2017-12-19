const { Action } = require('~')
const Store = require('../')

/**
 * Creats a store for testing
 */
const createStore = async () => {
  const store = new Store()

  const saved = new Promise(resolve => { store.save = resolve })
  store.locationReload = () => {}
  store.locationReplace = () => {}
  store.installDefaultModules()
  store.dispatch({ type: Action.HUB_READY })

  await saved

  return store
}

module.exports.createStore = createStore
