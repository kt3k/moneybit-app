const moment = require('moment')
const Currency = require('./currency')
const CommaPeriodSetting = require('./comma-period-setting')
const Document = require('./document')
const { AccountTypeChart, Journal } = require('moneybit-domain')

const chartFactory = new AccountTypeChart.Factory()

class DocumentFactory {
  /**
   * @param {Object} obj The object
   */
  createFromObject (obj) {
    const chart = chartFactory.createFromObject(obj.chart)

    const journalFactory = new Journal.Factory(chart)

    return new Document({
      id: obj.id,
      name: obj.name,
      journal: journalFactory.createFromArray(obj.trades),
      chart: chart,
      currency: Currency[obj.currencyCode],
      start: moment(obj.start),
      end: moment(obj.end),
      commaPeriodSetting: CommaPeriodSetting[obj.commaPeriodSetting]
    })
  }
}

module.exports = DocumentFactory
