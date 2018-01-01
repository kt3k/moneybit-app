const moment = require('moment')
const { component, on, wire, notifies } = capsid

@component('js-start-and-end-date-form')
class StartAndEndDateForm {
  @wire.el('[name="endDate"]')
  get endDate () {}

  @notifies('input', '[name="endDate"]')
  @on('start-date-selected')
  onStartDateSelected (e) {
    if (!e.detail) {
      return
    }

    const endDate = moment(e.detail)
      .add(1, 'year')
      .add(-1, 'day')

    this.endDate.dataset.date = endDate.format()
    this.endDate.value = endDate.format(t10.t('locale.date_format'))
  }
}

module.exports = StartAndEndDateForm
