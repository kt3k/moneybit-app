const { AccountTypeChart } = require('../domain')
const { on, wire, emits } = capsid
const {
  actions: {
    INIT_CHART,
    CHART_READY
  }
} = require('~')

class ChartModule {
  @wire('js-model-hub') get hub () {}

  constructor () {
    this.repository = new AccountTypeChart.Repository()
  }

  @on(INIT_CHART)
  @emits(CHART_READY)
  async loadCharts () {
    const promises = [this.repository.getById(this.hub.user.settings.defaultChartId)]

    if (this.hub.user.currentDocument) {
      promises.push(this.repository.getById(this.hub.user.currentDocument.chartId))
    }

    const [defaultChart, currentChart] = await Promise.all(promises)

    this.hub.defaultChart = defaultChart
    this.hub.currentChart = currentChart
  }
}

module.exports = ChartModule
