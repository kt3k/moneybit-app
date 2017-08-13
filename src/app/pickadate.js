require('pickadate/lib/picker')
require('pickadate/lib/picker.date')

const { component, emit } = capsid

@component('js-pickadate')
class Pickadate {
  __init__ () {
    this.$el.pickadate({
      format: t10.t('locale.date_format').toLowerCase()
    })
    .pickadate('picker').on({
      set: (val) => {
        this.emitInputEvent()
      }
    })
  }

  @emit('input') emitInputEvent () {}
}

module.exports = Pickadate
