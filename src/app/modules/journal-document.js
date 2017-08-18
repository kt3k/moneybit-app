
const { MODEL_SAVE, CREATE_JOURNAL } = require('../action-types')

const { component, wire, on, emit } = capsid

@component('journal-document-module')
class JournalDocumentModule {
  @wire('js-model-hub') get hub () {}

  @on(CREATE_JOURNAL_DOCUMENT)
  @emit(MODEL_SAVE)
  createJournal (e) {
    const factory = new JournalDocument.Factory()

    const document = factory.createFromParams(e.detail)

    // this.hub.user.add
  }
}

module.exports = JournalModule
