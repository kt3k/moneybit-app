const { component, on, emits, notifies } = capsid
const { LOCK, UNLOCK } = global.capsidScrollLock

const UPDATE_BS_DATE = 'mb/bs/UPDATE_BS_DATE'
const CHANGE_BS_DATE = 'mb/bs/CHANGE_BS_DATE'
const OPEN_SUBLEDGER_MODAL = 'mb/bs/OPEN_SUBLEDGER_MODAL'
const CLOSE_SUBLEDGER_MODAL = 'mb/bs/CLOSE_SUBLEDGER_MODAL'
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

    const date = journal.lastTrade().date

    return {
      date,
      journal,
      chart: this.chart,
      domain: this.domain,
      baseJournal: this.journal
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

  @on(OPEN_SUBLEDGER_MODAL)
  @emits(LOCK)
  @notifies(OPEN_SUBLEDGER_MODAL, '.subledger-modal')
  @notifies(Action.UI_SHOW, '.subledger-modal-overlay-shadow')
  openSubledgerModal ({ detail }) {
    return detail
  }

  @on(CLOSE_SUBLEDGER_MODAL)
  @emits(UNLOCK)
  @notifies(Action.UI_HIDE, '.subledger-modal-overlay-shadow')
  closeSubledgerModal () {}
}

module.exports = BsPage
module.exports.UPDATE_BS_DATE = UPDATE_BS_DATE
module.exports.CLASS_UPDATE_BS_DATE = CLASS_UPDATE_BS_DATE
module.exports.CHANGE_BS_DATE = CHANGE_BS_DATE
module.exports.OPEN_SUBLEDGER_MODAL = OPEN_SUBLEDGER_MODAL
module.exports.CLOSE_SUBLEDGER_MODAL = CLOSE_SUBLEDGER_MODAL
