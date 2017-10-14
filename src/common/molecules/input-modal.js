const { on, component } = capsid

@component('input-modal')
class InputModal {
  @on('input-modal-open')
  open ({ detail: { onSave } }) {
  }

  @on('click', { at: 'button' })
  onSave () {
  }

  @on.outside('click')
  close () {
    this.el.parentElement.classList.remove('is-visible')
  }
}

module.exports = InputModal
