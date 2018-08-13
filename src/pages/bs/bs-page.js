const { component, on, notifies } = capsid

const UPDATE_BS_DATE = 'mb/bs/UPDATE_BS_DATE'
const CHANGE_BS_DATE = 'mb/bs/CHANGE_BS_DATE'
const CLASS_UPDATE_BS_DATE = 'observes-bs-date'

@component('bs-page')
class BsPage {
  /**
   * @param {moment} date
   */
  @notifies(UPDATE_BS_DATE, '.' + CLASS_UPDATE_BS_DATE)
  notifyUpdates () {
    let journal = this.journal

    if (this.date) {
      journal = new this.domain.Journal.Factory().createFromArray([])
      journal.addTrades(
        this.journal.trades.filter(trade => trade.date <= this.date)
      )
    }

    return {
      date: this.date,
      journal,
      chart: this.chart,
      domain: this.domain
    }
  }

  @on(Action.MODEL_UPDATE)
  update ({ detail: { currentJournal, currentChart, domain } }) {
    this.journal = currentJournal
    this.chart = currentChart
    this.domain = domain
    this.notifyUpdates()
  }

  @on(CHANGE_BS_DATE)
  updateDate ({ detail: date }) {
    this.date = moment(date)

    this.notifyUpdates()
  }
}

module.exports = BsPage
module.exports.UPDATE_BS_DATE = UPDATE_BS_DATE
module.exports.CLASS_UPDATE_BS_DATE = CLASS_UPDATE_BS_DATE
module.exports.CHANGE_BS_DATE = CHANGE_BS_DATE
