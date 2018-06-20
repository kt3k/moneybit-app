const { Journal } = require('moneybit-domain')

class JournalRepository {
  /**
   * Gets the journal by the id.
   * @param {string} id The id of the journal
   * @return {Promise<Journal>}
   */
  getById (id) {
    return infrastructure.storage
      .get(this.createKey(id), null)
      .then(data => this.deserialize(data))
  }

  /**
   * Creates the persistent key.
   * @param {string} id The id of the journal
   * @return {string}
   */
  createKey (id) {
    return `journal-${id}`
  }

  /**
   * Saves the journal.
   * @param {Journal} journal The journal
   * @return {Promise}
   */
  save (journal) {
    return infrastructure.storage.set(
      this.createKey(journal.id),
      this.serialize(journal)
    )
  }

  /**
   * @param {Journal} journal The journal
   * @return {Object}
   */
  serialize (journal) {
    return {
      id: journal.id,
      trades: journal.trades.map(trade => this.tradeToObject(trade))
    }
  }

  /**
   * @param {Trade} trade The trade
   * @return {Object}
   */
  tradeToObject (trade) {
    return {
      id: trade.id,
      desc: trade.description,
      date: trade.date.format('YYYY-MM-DD'),
      dr: this.accountsToObject(trade.debits),
      cr: this.accountsToObject(trade.credits)
    }
  }

  /**
   * @param {Account[]} accounts The accounts
   * @return {Object}
   */
  accountsToObject (accounts) {
    const obj = {}

    accounts.forEach(account => {
      obj[account.type.name] = account.amount.amount
    })

    return obj
  }

  /**
   * @param {Object} obj The object
   * @return {Journal}
   */
  deserialize (obj) {
    return new Journal.Factory().createFromIdAndArray(obj.id, obj.trades)
  }
}

module.exports = JournalRepository
