const moment = require('moment')
const Currency = require('./currency')
const CommaPeriodSetting = require('./comma-period-setting')
const JournalDocument = require('./journal-document')
const { AccountType } = require('moneybit-domain')
const AccountTypeRecentList = require('./account-type-recent-list')

class JournalDocumentFactory {
  /**
   * @param {Object} obj The object
   * @return {JournalDocument}
   */
  createFromObject (obj) {
    return new JournalDocument({
      id: obj.id,
      title: obj.title,
      journalId: obj.journalId,
      chartId: obj.chartId,
      currency: Currency[obj.currencyCode],
      start: moment(obj.start),
      end: moment(obj.end),
      commaPeriodSetting: CommaPeriodSetting[obj.commaPeriodSetting],
      debitTypeRecentList: new AccountTypeRecentList(
        obj.debitTypeRecentList
          ? obj.debitTypeRecentList.map(name => new AccountType(name))
          : null
      ),
      creditTypeRecentList: new AccountTypeRecentList(
        obj.creditTypeRecentList
          ? obj.creditTypeRecentList.map(name => new AccountType(name))
          : null
      )
    })
  }

  /**
   * @param {Array} array The array
   * @return {JournalDocument[]}
   */
  createDocumentsFromArray (array) {
    if (!array) {
      return []
    }

    return array.map(obj => this.createFromObject(obj))
  }
}

module.exports = JournalDocumentFactory
