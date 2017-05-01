/**
 * Document represents the accouting document.
 *
 * Document contains Journal and AccountTypeChart as basic accounting information.
 */
class Document {
  static get Factory () { return require('./document-factory') }
  static get Repository () { return require('./document-repository') }

  /**
   * @param {string} id The id
   * @param {string} name The name
   * @param {string} journalId The id of the journal
   * @param {string} chartId The id of the account type chart
   * @param {Currency} currency The currency
   * @param {moment} start The start date
   * @param {moment} end The end date
   * @param {CommaPeriodSetting} commaPeriodSetting The setting of comma and period usage in number expression.
   */
  constructor ({ id, name, journalId, chartId, currency, start, end, commaPeriodSetting }) {
    this.id = id
    this.name = name
    this.journalId = journalId
    this.chartId = chartId
    this.currency = currency
    this.start = start
    this.end = end
    this.commaPeriodSetting = commaPeriodSetting
  }
}

module.exports = Document
