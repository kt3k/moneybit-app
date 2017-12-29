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

  /**
   * Formats the given money.
   */
  format (money) {
    return `${this.currency.symbol}${this.commaPeriodSetting.format(Math.floor(money.amount))}${this.formatMoneyFractionPart(money)}`
  }

  /**
   * Formats the given money's fraction part.
   */
  formatMoneyFractionPart (money) {
    if (this.currency.ratioToMinimumCurrency <= 1) {
      // If the minimum currency ratio is less than or equal to 1
      // Then the fraction part does not exist. e.g. JPY, KRW
      return ''
    }

    const digits = Math.log10(this.currency.ratioToMinimumCurrency)

    let fraction = money.amount - Math.floor(money.amount)
    fraction = Math.floor(this.currency.ratioToMinimumCurrency * fraction)
    fraction = (Array(digits).join('0') + fraction).substr(-digits, digits)

    return `${this.commaPeriodSetting.decimalPoint}${fraction}`
  }
}

module.exports = JournalDocument
