const moment = require('moment')
const { component, on, wire, pub } = capsid

@component('js-start-and-end-date-form')
class StartAndEndDateForm {
  @wire.el('[name="end-date"]') get endDate () {}

  @pub('input', '[name="end-date"]')
  @on('start-date-selected') onStartDateSelected (e) {
    if (!e.detail) {
      return
    }

    console.log(moment(e.detail).add(1, 'year').add(-1, 'day'))
    this.endDate.value = moment(e.detail).add(1, 'year').add(-1, 'day').format(t10.t('locale.date_format'))
  }
}

module.exports = StartAndEndDateForm
