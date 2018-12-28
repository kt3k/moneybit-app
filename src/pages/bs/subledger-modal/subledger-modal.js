const { component, on, emits, wired } = capsid
const { OPEN_SUBLEDGER_MODAL, CLOSE_SUBLEDGER_MODAL } = require('../bs-page')

@component('subledger-modal')
class SubledgerModal {
  @wired('.account-title') title

  @on(OPEN_SUBLEDGER_MODAL)
  open ({ detail }) {
    this.el.classList.add('is-visible')
    this.title.textContent = detail.title
  }

  @on.click.at('.close-button')
  @emits(CLOSE_SUBLEDGER_MODAL)
  close () {
    this.el.classList.remove('is-visible')
  }
}

module.exports = SubledgerModal
