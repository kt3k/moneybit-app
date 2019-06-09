const { on, component } = capsid
const { OPEN_DELETE_MODAL } = require('./event-types')

@component('delete-account-type-modal')
class DeleteAccountTypeModal {
  @on(OPEN_DELETE_MODAL)
  onOpenDeleteModal () {
    this.el.classList.add('is-visible')
  }
}

module.exports = DeleteAccountTypeModal
