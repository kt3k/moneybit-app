const { Journal, JournalDocument } = require('../../domain')
const { MODEL_SAVE, CREATE_JOURNAL_DOCUMENT } = require('../action-types')

const { component, wire, on, emit } = capsid

@component('journal-document-module')
class JournalDocumentModule {
  @wire('js-model-hub') get hub () {}

  @on(CREATE_JOURNAL_DOCUMENT)
  @emit(MODEL_SAVE)
  createJournal (e) {
    const journalFactory = Journal.Factory()
    const factory = new JournalDocument.Factory()

    const document = factory.createFromObject(e.detail)

    // this.hub.user.add
  }
}

module.exports = JournalDocumentModule
