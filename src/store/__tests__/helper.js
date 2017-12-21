const { Action, Page } = require('~')
const Store = require('../')
const td = require('testdouble')
const domain = require('../../domain')

const documentObject = {
  title: 'Some Company\'s Journal 2017',
  start: '2017-01-01',
  end: '2017-12-31',
  currencyCode: domain.Currency.USD.code,
  commaPeriodSetting: 'comma-period'
}
/**
 * Creates a store for testing
 */
const createStore = async () => {
  localStorage.clear()

  const store = new Store()

  const save = store.save
  const saved = new Promise(resolve => {
    store.save = function () {
      resolve()
      return save.apply(this, arguments)
    }
  })
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
module.exports.documentObject = documentObject
