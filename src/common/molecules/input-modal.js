const nextTick = require('../quarks/next-tick')
const { on, component, wired } = capsid

const OPEN = 'mb/input-modal/OPEN'
const CLOSE = 'mb/input-modal/CLOSE'

@component('input-modal')
class InputModal {
  @wired('.input-modal__input') input
  @wired('.input-modal__message') message
  @wired('.input-modal__save') saveButton
  @wired('.input-modal__delete') deleteButton

  @on(Action.INPUT_MODAL_OPEN)
  @nextTick
  open ({ detail: { value, message, onSave, onDelete, needsInput = true } }) {
    if (needsInput) {
      this.input.classList.remove('hidden')
    } else {
      this.input.classList.add('hidden')
    }
    this.input.value = typeof value === 'string' ? value : ''
    if (message) {
      this.message.textContent = message
    } else {
      this.message.textContent = ''
    }
    this.onSaveHandler = onSave
    this.saveButton.classList.toggle('hidden', typeof onSave !== 'function')
    this.onDeleteHandler = onDelete
    this.deleteButton.classList.toggle('hidden', typeof onDelete !== 'function')

    this.el.parentElement.classList.add('is-visible')
  }

  @on.click.at('.input-modal__save')
  onSave () {
    this.onSaveHandler(this.input.value)
  }

  @on.click.at('.input-modal__delete')
  onDelete () {
    this.onDeleteHandler(this.input.value)
  }

  @on.outside('click')
  @on.click.at('.input-modal__cancel')
  @on(Action.INPUT_MODAL_CLOSE)
  close () {
    this.el.parentElement.classList.remove('is-visible')
  }
}

module.exports = InputModal
module.exports.OPEN = OPEN
module.exports.CLOSE = CLOSE
