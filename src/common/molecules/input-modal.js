const nextTick = require('../quarks/next-tick')
const { emits, on, component, wire } = capsid

const OPEN = 'mb/input-modal/OPEN'
const CLOSE = 'mb/input-modal/CLOSE'
const INPUT = 'mb/input-modal/INPUT'

@component('input-modal')
class InputModal {
  @wire.el('input') get input () {}

  @on(OPEN)
  @nextTick
  open ({ detail: title }) {
    this.input.value = title
    this.el.parentElement.classList.add('is-visible')
  }

  @on('click', { at: 'button' })
  @emits(INPUT)
  onSave () {
    return this.input.value
  }

  @on.outside('click')
  @on(CLOSE)
  close () {
    this.el.parentElement.classList.remove('is-visible')
  }
}

module.exports = InputModal
module.exports.OPEN = OPEN
module.exports.CLOSE = CLOSE
module.exports.INPUT = INPUT
