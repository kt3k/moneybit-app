const uuid = require('uuid')
const { AccountTypeChart, Journal, JournalDocument } = require('../../domain')
const { MODEL_SAVE, CREATE_JOURNAL_DOCUMENT } = require('../action-types')

const { component, wire, on, emit } = capsid

@component('journal-document-module')
class JournalDocumentModule {
  constructor () {
    this.journalFactory = new Journal.Factory()
    this.journalRepository = new Journal.Repository()
    this.chartRepository = new AccountTypeChart.Repository()
    this.chartFactory = new AccountTypeChart.Factory()
    this.documentFactory = new JournalDocument.Factory()
  }

  @wire('js-model-hub') get hub () {}

  @on(CREATE_JOURNAL_DOCUMENT)
  @emit(MODEL_SAVE)
  async createJournal (e) {
    const { user } = this.hub

    const journal = await this.createEmptyJournal()
    const chart = await this.cloneFromDefaultChart()

    const documentObj = Object.assign({}, e.detail)

    documentObj.id = uuid.v4()
    documentObj.journalId = journal.id
    documentObj.chartId = chart.id

    console.log(documentObj)

    const document = this.documentFactory.createFromObject(documentObj)

    this.hub.user.setCurrentDocument(document)
  }

  /**
   * @return {Journal}
   */
  async createEmptyJournal () {
    const journal = this.journalFactory.createFromIdAndArray(uuid.v4(), [])

    await this.journalRepository.save(journal)

    return journal
  }

  /**
   * @return {AccountTypeChart}
   */
  async cloneFromDefaultChart () {
    const { user } = this.hub

    const defaultChart = await this.chartRepository.getById(user.settings.defaultChartId)

    const newChart = defaultChart.clone(uuid.v4())

    await this.chartRepository.save(newChart)

    return newChart
  }
}

module.exports = JournalDocumentModule
