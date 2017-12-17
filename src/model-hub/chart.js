const {
  Action: {
    INIT_CHART,
    CHART_READY
  }
} = require('~')

const { action, dispatches } = require('evex')

class ChartModule {
  @action(INIT_CHART)
  @dispatches(CHART_READY)
  async loadCharts (hub) {
    const { domain } = hub
    const chartRepository = new domain.AccountTypeChart.Repository()
    const journalRepository = new domain.Journal.Repository()

    const promises = [chartRepository.getById(hub.user.settings.defaultChartId)]

    if (hub.user.currentDocument) {
      promises.push(chartRepository.getById(hub.user.currentDocument.chartId))
      promises.push(journalRepository.getById(hub.user.currentDocument.journalId))
    }

    const [defaultChart, currentChart, currentJournal] = await Promise.all(promises)

    hub.defaultChart = defaultChart
    hub.currentChart = currentChart
    hub.currentJournal = currentJournal
  }
}

module.exports = ChartModule
