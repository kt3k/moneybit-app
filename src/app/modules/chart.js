const { AccountTypeChart } = require('../../domain')
const { on, wire, emits } = capsid
const { MODEL_SAVE, USER_READY } = require('../action-types')

class ChartModule {
  @wire('js-model-hub') get hub () {}

  constructor () {
    this.repository = new AccountTypeChart.Repository()
  }

  @on(USER_READY)
  @emits(MODEL_SAVE)
  async loadCharts () {
    const [defaultChart, currentChart] = await Promise.all([
      this.repository.getById(this.hub.user.settings.defaultChartId),
      this.repository.getById(this.hub.user.currentDocument.chartId)
    ])

    this.hub.defaultChart = defaultChart
    this.hub.currentChart = currentChart
  }
}

module.exports = ChartModule
