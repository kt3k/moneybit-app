const { CREATE_JOURNAL } = require('../../app/action-types')

const { component, on, emit } = capsid

@component('js-create-journal-form')
class CreateJournalForm {
  @on('click', { at: 'button.is-primary' })
  @emit(CREATE_JOURNAL)
  createJournal (e) {
    e.preventDefault()

    return {
    }
  }

  @on('click', { at: 'button.is-danger' })
  cancel (e) {
    e.preventDefault()
    history.back()
  }
}

module.exports = CreateJournalForm
