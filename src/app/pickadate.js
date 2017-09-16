const moment = require('moment')
require('pickadate/lib/picker')
require('pickadate/lib/picker.date')

const { component, emits } = capsid

@component('js-pickadate')
class Pickadate {
  __init__ () {
    this.$el.pickadate({ format: 'yyyy-mm-dd' })
      .pickadate('picker').on({
        set: d => this.pickDate(d)
      })
  }

  /**
   * @param {string} date The ISO 8601 date string
   */
  @emits('input') pickDate (d) {
    const selected = moment(d.select)

    this.el.dataset.date = selected.format()
    this.el.value = selected.format(t10.t('locale.date_format'))
  }
}

module.exports = Pickadate
