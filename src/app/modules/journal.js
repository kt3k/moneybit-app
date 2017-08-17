
const { MODEL_SAVE, CREATE_JOURNAL } = require('../action-types')

const { component, wire, on, emit } = capsid

@component('journal-module')
class JournalModule {
  @on(CREATE_JOURNAL)
  @emit(MODEL_SAVE)
  createJournal (e) {
    console.log('creating journal in journal-module')
    console.log(e.detail)
  }
}

module.exports = JournalModule
