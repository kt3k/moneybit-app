const { action, dispatches } = require('evex')

class ChartModule {
  @action(Action.INIT_CHART)
  @dispatches(Action.CHART_READY)
  async initCharts (store) {
    await this.loadCharts(store)
  }

  @action(Action.LOAD_CHART)
  async loadCharts (store) {
    const { domain, user } = store
    const chartRepository = new domain.AccountTypeChart.Repository()
    const journalRepository = new domain.Journal.Repository()

    const promises = [chartRepository.getById(user.settings.defaultChartId)]

    if (user.currentDocument) {
      promises.push(chartRepository.getById(user.currentDocument.chartId))
      promises.push(journalRepository.getById(user.currentDocument.journalId))
    }

    const [defaultChart, currentChart, currentJournal] = await Promise.all(
      promises
    )

    store.defaultChart = defaultChart
    store.currentChart = currentChart
    store.currentJournal = currentJournal
  }

  @action(Action.CHART_DELETE_ACCOUNT_TYPE)
  @dispatches(Action.CHART_SAVE)
  async deleteAccountType (store, { detail: { accountTypeName } }) {
    const { domain, currentChart } = store
    currentChart.delete(new domain.AccountType(accountTypeName))
  }

  @action(Action.CHART_ADD_ACCOUNT_TYPE)
  @dispatches(Action.CHART_SAVE)
  async addAccountType (store, { detail: { accountTypeName, majorType } }) {
    const { domain, currentChart } = store
    currentChart.set(new domain.AccountType(accountTypeName), majorType)
  }

  @action(Action.CHART_EDIT_ACCOUNT_TYPE)
  @dispatches(Action.CHART_SAVE)
  async renameAccountType (
    store,
    { detail: { accountTypeName, newAccountTypeName } }
  ) {
    const { domain, currentChart } = store
    currentChart.replace(
      new domain.AccountType(accountTypeName),
      new domain.AccountType(newAccountTypeName)
    )
  }

  @action(Action.CHART_SAVE)
  async saveChart (store) {
    const { domain } = store
    const chartRepository = new domain.AccountTypeChart.Repository()
    await chartRepository.save(store.currentChart)
    store.notifyUpdate()
  }

  @action(Action.CHART_SET_AS_DEFAULT)
  @dispatches(Action.MODEL_SAVE)
  async setAsDefault (store, { detail }) {
    const { domain, defaultChart, currentChart } = store
    const newDefaultChart = currentChart.clone(defaultChart.id)
    const chartRepository = new domain.AccountTypeChart.Repository()
    await chartRepository.save(newDefaultChart)

    if (detail && detail.callback) {
      detail.callback()
    }
  }
}

module.exports = ChartModule
