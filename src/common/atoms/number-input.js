const { Action } = require('~')
const { component, on, emits } = capsid

@component('js-number-input')
class NumberInput {
  @on('focus')
  onFocus () {
    if (this.el.dataset.amount) {
      this.el.value = this.el.dataset.amount
    }
  }

  @on('input')
  onInput () {
    this.el.dataset.amount = this.el.value || 0
  }

  @on('blur')
  @emits(Action.REQUEST_MONEY_FORMAT)
  onBlur () {
    const amount = this.el.dataset.amount = this.el.dataset.amount || 0

    return {
      amount,
      send: label => { this.el.value = label }
    }
  }
}

module.exports = NumberInput
