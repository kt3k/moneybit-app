require('pickadate/lib/picker')
require('pickadate/lib/picker.date')

const initPickadate = () => {
  $('.js-pickadate').pickadate({
    format: t10.t('locale.date_format')
  })
}

module.exports = initPickadate
