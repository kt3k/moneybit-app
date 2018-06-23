const moment = require('moment')

require('pickadate/lib/picker')
require('pickadate/lib/picker.date')

const { component, emits, on } = capsid
const PICKDATE = 'mb/pickadate/PICKDATE'
window.PICKDATE = PICKDATE

@component('js-pickadate')
class Pickadate {
  __mount__ () {
    this.$el
      .pickadate({ format: 'yyyy-mm-dd' })
      .pickadate('picker')
      .on({
        set: d =>
          this.el.dispatchEvent(new CustomEvent(PICKDATE, { detail: d.select }))
      })
  }

  /**
   * @param {string} detail The ISO 8601 date string
   */
  @on(PICKDATE)
  @emits('input')
  pickDate ({ detail }) {
    const selected = moment(detail)

    this.el.dataset.date = selected.format()
    this.el.value = selected.format(t10.t('locale.date_format'))
  }
}

module.exports = Pickadate
module.exports.PICKDATE = PICKDATE
