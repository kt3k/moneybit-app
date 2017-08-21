const uuid = require('uuid')
const { Journal, JournalDocument } = require('../../domain')
const { MODEL_SAVE, CREATE_JOURNAL_DOCUMENT } = require('../action-types')

const { component, wire, on, emit } = capsid

@component('journal-document-module')
class JournalDocumentModule {
  @wire('js-model-hub') get hub () {}

  @on(CREATE_JOURNAL_DOCUMENT)
  @emit(MODEL_SAVE)
  async createJournal (e) {
    const journalFactory = new Journal.Factory()
    const journal = journalFactory.createFromIdAndArray(uuid.v4(), [])

    await journalRepository.save(journal)

    const obj = Object.assign({}, e.detail)
    obj.journalId = journal.id

    const defaultChart = await accountTypeChartRepository

    const accountTypeChartFactory = new AccountTypeChart.Factory()
    const accountTypeChart = accountTypeChartFactory.createFromIdAndChart(uuid.v4(), defatulChart)

    const journalDocumentFactory = new JournalDocument.Factory()

    const document = journalDocumentFactory.createFromObject(e.detail)

    // this.hub.user.add
  }
}

module.exports = JournalDocumentModule
