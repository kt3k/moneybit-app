const { Action, Page } = require('~')
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

  store.location = {
    reload: td.func(),
    replace: td.func(),
    pathname: Page.APP_SETTINGS
  }

  return store
}

module.exports.createStore = createStore
