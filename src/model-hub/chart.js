const { on, wire, emits } = capsid

const {
  Action: {
    INIT_CHART,
    CHART_READY
  }
} = require('~')

class ChartModule {
  @wire('js-model-hub') get hub () {}

  @on(INIT_CHART)
  @emits(CHART_READY)
  async loadCharts () {
    const { domain } = this.hub
    const chartRepository = new domain.AccountTypeChart.Repository()
    const journalRepository = new domain.Journal.Repository()

    const promises = [chartRepository.getById(this.hub.user.settings.defaultChartId)]

    if (this.hub.user.currentDocument) {
      promises.push(chartRepository.getById(this.hub.user.currentDocument.chartId))
      promises.push(journalRepository.getById(this.hub.user.currentDocument.journalId))
    }

    const [defaultChart, currentChart, currentJournal] = await Promise.all(promises)

    this.hub.defaultChart = defaultChart
    this.hub.currentChart = currentChart
    this.hub.currentJournal = currentJournal
  }
}

module.exports = ChartModule
