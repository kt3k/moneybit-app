const { component, on, emits } = capsid

@component('js-start-date-input')
class StartDateInput {
  @on('input')
  @emits('start-date-selected')
  onInput () {
    return this.el.dataset.date
  }
}

module.exports = StartDateInput
