const { Action } = require('~')
const Store = require('../')
const td = require('testdouble')

/**
 * Creats a store for testing
 */
const createStore = async () => {
  const store = new Store()

  const saved = new Promise(resolve => { store.save = resolve })
  store.installDefaultModules()
  store.dispatch({ type: Action.HUB_READY })

  td.replace($, 'getScript')
  td.when($.getScript(td.matchers.anything())).thenResolve()

  await saved

  store.locationReload = td.func()
  store.locationReplace = td.func()

  return store
}

module.exports.createStore = createStore
