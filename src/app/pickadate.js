require('pickadate/lib/picker')
require('pickadate/lib/picker.date')

/*
const initPickadate = () => {
  const $inputs = $('.js-pickadate').pickadate({
    format: t10.t('locale.date_format')
  })
  $inputs.each(function () {
    $(this).pickadate('picker').on({
    })
  })
}
*/

const { component, emit } = capsid

@component('js-pickadate')
class Pickadate {
  __init__ () {
    this.$el.pickadate({
      format: t10.t('locale.date_format')
    })
    .pickadate('picker').on({
      set: (val) => {
        this.input()
      }
    })
  }

  @emit('input') input () {}
}

module.exports = Pickadate
