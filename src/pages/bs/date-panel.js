const { component, on, wired, emits } = capsid
const {
  CLASS_UPDATE_BS_DATE,
  UPDATE_BS_DATE,
  CHANGE_BS_DATE
} = require('./bs-page')

@component('date-panel')
class DatePanel {
  __mount__ () {
    this.el.classList.add(CLASS_UPDATE_BS_DATE)
  }

  @wired('.title')
  get label () {}

  @wired('.last-date')
  get lastDateLabel () {}

  @wired('.first-date')
  get firstDateLabel () {}

  @on.click.at('.last-date')
  @emits(CHANGE_BS_DATE)
  onClickLastDate () {
    return this.lastDate
  }

  @on.click.at('.first-date')
  @emits(CHANGE_BS_DATE)
  onClickFirstDate () {
    return this.firstDate
  }

  @on(UPDATE_BS_DATE)
  update ({ detail: { date, baseJournal } }) {
    this.label.textContent = date.format(t10.t('locale.date_format'))

    this.firstDate = baseJournal.firstTrade().date
    this.lastDate = baseJournal.lastTrade().date

    this.updateDisplay(date.isSame(this.firstDate), this.firstDateLabel)
    this.updateDisplay(date.isSame(this.lastDate), this.lastDateLabel)
  }

  updateDisplay (condition, el) {
    if (!el) {
      return
    }

    if (condition) {
      el.style.display = 'none'
    } else {
      el.style.display = ''
    }
  }
}

module.exports = DatePanel
