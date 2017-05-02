const moment = require('moment')
const Currency = require('./currency')
const CommaPeriodSetting = require('./comma-period-setting')
const Document = require('./document')

class DocumentFactory {
  /**
   * @param {Object} obj The object
   * @return {Document}
   */
  createFromObject (obj) {
    return new Document({
      id: obj.id,
      name: obj.name,
      journalId: obj.journalId,
      chartId: obj.chartId,
      currency: Currency[obj.currencyCode],
      start: moment(obj.start),
      end: moment(obj.end),
      commaPeriodSetting: CommaPeriodSetting[obj.commaPeriodSetting]
    })
  }

  /**
   * @param {Array} array The array
   * @return {Document[]}
   */
  createDocumentsFromArray (array) {
    if (!array) {
      return []
    }

    return array.map(obj => this.createFromObject(obj))
  }
}

module.exports = DocumentFactory
