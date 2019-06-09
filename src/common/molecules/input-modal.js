const nextTick = require('../quarks/next-tick')
const { on, component, wired } = capsid

const OPEN = 'mb/input-modal/OPEN'
const CLOSE = 'mb/input-modal/CLOSE'

@component('input-modal')
class InputModal {
  @wired('.input-modal__input') input
  @wired('.input-modal__message') message

  @on(OPEN)
  @nextTick
  open ({ detail: { value, message, onSave } }) {
    this.input.value = value
    if (message) {
      this.message.textContent = message
    } else {
      this.message.textContent = ''
    }
    this.onSaveHandler = onSave
    this.el.parentElement.classList.add('is-visible')
  }

  @on.click.at('.input-modal__save')
  onSave () {
    this.onSaveHandler(this.input.value)
  }

  @on.outside('click')
  @on.click.at('.input-modal__cancel')
  @on(CLOSE)
  close () {
    this.el.parentElement.classList.remove('is-visible')
  }
}

module.exports = InputModal
module.exports.OPEN = OPEN
module.exports.CLOSE = CLOSE
