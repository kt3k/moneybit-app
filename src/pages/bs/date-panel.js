const { component, on, wired } = capsid
const { CLASS_UPDATE_BS_DATE, UPDATE_BS_DATE } = require('./bs-page')

@component('date-panel')
class DatePanel {
  __mount__ () {
    this.el.classList.add(CLASS_UPDATE_BS_DATE)
  }

  @wired('.title') label

  @on(UPDATE_BS_DATE)
  update ({ detail: { date } }) {
    this.label.textContent = date.format(t10.t('locale.date_format'))
  }
}

module.exports = DatePanel
