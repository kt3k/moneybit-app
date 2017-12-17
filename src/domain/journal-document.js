/**
 * JournalDocument represents the accouting document.
 *
 * Document contains Journal and AccountTypeChart as basic accounting information.
 */
class JournalDocument {
  /**
   * @param {string} id The id
   * @param {string} title The title
   * @param {string} journalId The id of the journal
   * @param {string} chartId The id of the account type chart
   * @param {Currency} currency The currency
   * @param {moment} start The start date
   * @param {moment} end The end date
   * @param {CommaPeriodSetting} commaPeriodSetting The setting of comma and period usage in number expression.
   */
  constructor ({ id, title, journalId, chartId, currency, start, end, commaPeriodSetting }) {
    this.id = id
    this.title = title
    this.journalId = journalId
    this.chartId = chartId
    this.currency = currency
    this.start = start
    this.end = end
    this.commaPeriodSetting = commaPeriodSetting
  }

  async getJournal () {
    const { Journal } = require('./')
    return new Journal.Repository().getById(this.journalId)
  }
}

module.exports = JournalDocument
