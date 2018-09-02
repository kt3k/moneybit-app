const { component, on, wired, emits } = capsid
const {
  CLASS_UPDATE_BS_DATE,
  UPDATE_BS_DATE,
  CHANGE_BS_DATE
} = require('./bs-page')

@component('date-tabs')
class DateTabs {
  @wired('.first-tab')
  get firstTab () {}

  @wired('.last-tab')
  get lastTab () {}

  __mount__ () {
    this.el.classList.add(CLASS_UPDATE_BS_DATE)
  }

  @on(UPDATE_BS_DATE)
  update ({ detail: { date, baseJournal } }) {
    this.firstDate = baseJournal.firstTrade().date
    this.lastDate = baseJournal.lastTrade().date

    this.updateTab(
      this.firstTab,
      this.firstDate.format(t10.t('locale.date_format')),
      date.isSame(this.firstDate)
    )

    this.updateTab(
      this.lastTab,
      this.lastDate.format(t10.t('locale.date_format')),
      date.isSame(this.lastDate)
    )
  }

  updateTab (tab, label, isActive) {
    this.tab.querySelector('a').textContent = label
    this.tab.classList('is-active', isActive)
  }

  @on.click.at('.first-tab')
  @emits(CHANGE_BS_DATE)
  onClickFirstDate () {
    return this.firstDate
  }

  @on.click.at('.last-tab')
  @emits(CHANGE_BS_DATE)
  onClickLastDate () {
    return this.lastDate
  }
}

module.exports = DateTabs
