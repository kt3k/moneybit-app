const { AccountTypeChart, MajorAccountType } = require('moneybit-domain')
const { ALL_TYPES } = MajorAccountType

/**
 * The repository of AccountTypeChart.
 */
class AccountTypeChartRepository {
  /**
   * @param {AccountTypeChart} chart The chart
   */
  async save (chart) {
    return infrastructure.storage.set(
      this.generateKeyById(chart.id),
      this.chartToObject(chart)
    )
  }

  /**
   * @param {string} id The id
   * @return {AccountTypeChart?}
   */
  async getById (id) {
    const obj = await infrastructure.storage.get(this.generateKeyById(id), null)

    if (!obj) {
      return null
    }

    return new AccountTypeChart.Factory().createFromObject(obj)
  }

  /**
   * Generates the persistent key from the id.
   * @param {string} id The id
   */
  generateKeyById (id) {
    return 'account-type-chart-' + id
  }

  /**
   * @private
   * @param {AccountTypeChart} chart The chart
   * @return {Object}
   */
  chartToObject (chart) {
    const accountTypes = {}

    ALL_TYPES.forEach(majorType => {
      accountTypes[majorType.name] = []
    })

    chart.majorTypes.forEach(([accountTypeName, majorType]) => {
      accountTypes[majorType.name].push(accountTypeName)
    })

    return Object.assign({ id: chart.id }, accountTypes)
  }
}

module.exports = AccountTypeChartRepository
