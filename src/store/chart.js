const { Action } = require('~')

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

    const [defaultChart, currentChart, currentJournal] = await Promise.all(promises)

    store.defaultChart = defaultChart
    store.currentChart = currentChart
    store.currentJournal = currentJournal
  }
}

module.exports = ChartModule
