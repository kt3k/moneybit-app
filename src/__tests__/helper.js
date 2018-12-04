require('@babel/polyfill')
require('../infrastructure')
require('./fixture')
const { before } = require('kocha')
const uuid = require('uuid')
global.$ = require('jquery')
global.t10 = require('t10')
global.basepath = '/'
global.capsid = require('capsid')
global.capsid.on.useHandler('change')
global.capsid.on.useHandler('input')
global.capsidScrollLock = require('capsid-scroll-lock')
global.domain = require('../domain')
global.Action = require('../const/action-types')
require('../common/atoms')

before(async done => {
  const {
    AppState,
    User,
    AccountTypeChart,
    Journal,
    JournalDocument
  } = global.domain
  localStorage.clear()

  const appState = (global.appState = await new AppState.Repository().get())
  appState.initUserId()

  const user = (global.user = await new User.InitService().getOrCreate(
    appState.userId,
    appState.deviceLanguage
  ))

  global.defaultChart = await new AccountTypeChart.Repository().getById(
    user.settings.defaultChartId
  )

  const currentJournal = (global.currentJournal = new Journal.Factory().createFromIdAndArray(
    uuid.v4(),
    []
  ))
  const currentChart = (global.currentChart = global.defaultChart.clone(
    uuid.v4()
  ))

  const doc = new JournalDocument.Factory().createFromObject({
    id: uuid.v4(),
    journalId: currentJournal.id,
    chartId: currentChart.id,
    title: 'foo'
  })

  user.setCurrentDocument(doc)

  done()
})
