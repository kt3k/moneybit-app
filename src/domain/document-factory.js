const moment = require('moment')
const Currency = require('./currency')
const CommaPeriodSetting = require('./comma-period-setting')
const Document = require('./document')

class DocumentFactory {
  /**
   * @param {Object} obj The object
   */
  createFromObject (obj) {
    return new Document({
      id: obj.id,
      name: obj.name,
      journalId: obj.journalId,
      chart: obj.chartId,
      currency: Currency[obj.currencyCode],
      start: moment(obj.start),
      end: moment(obj.end),
      commaPeriodSetting: CommaPeriodSetting[obj.commaPeriodSetting]
    })
  }
}

module.exports = DocumentFactory
