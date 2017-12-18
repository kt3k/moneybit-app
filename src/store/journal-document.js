const uuid = require('uuid')
const moment = require('moment')
const {
  domain: { AccountTypeChart, Journal, JournalDocument },
  Action: {
    MODEL_SAVE,
    CREATE_JOURNAL_DOCUMENT,
    CHANGE_CURRENT_DOCUMENT,
    UPDATE_CURRENT_DOCUMENT
  }
} = require('~')

const { action, dispatches } = require('evex')

class JournalDocumentModule {
  constructor () {
    this.journalFactory = new Journal.Factory()
    this.journalRepository = new Journal.Repository()
    this.chartRepository = new AccountTypeChart.Repository()
    this.chartFactory = new AccountTypeChart.Factory()
    this.documentFactory = new JournalDocument.Factory()
  }

  @action(CREATE_JOURNAL_DOCUMENT)
  @dispatches(MODEL_SAVE)
  async createJournal (hub, e) {
    const { user } = hub

    const journal = await this.createEmptyJournal()
    const chart = await this.cloneFromDefaultChart(hub)

    const documentObj = Object.assign({}, e.detail)

    documentObj.id = uuid.v4()
    documentObj.journalId = journal.id
    documentObj.chartId = chart.id

    const document = this.documentFactory.createFromObject(documentObj)

    user.setCurrentDocument(document)
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
  async cloneFromDefaultChart (hub) {
    const { user } = hub

    const defaultChart = await this.chartRepository.getById(user.settings.defaultChartId)

    const newChart = defaultChart.clone(uuid.v4())

    await this.chartRepository.save(newChart)

    return newChart
  }

  /**
   * Changes the current document.
   */
  @action(CHANGE_CURRENT_DOCUMENT)
  @dispatches(MODEL_SAVE)
  async changeCurrentDocument (hub, { detail: id }) {
    const { user } = hub

    const selectedDocument = user.documents.find(doc => doc.id === id)

    if (!selectedDocument) {
      throw new Error(`Invalid document id selected: ${id}`)
    }

    user.currentDocument = selectedDocument

    return { reload: true }
  }

  /**
   * Updates the current document's properties.
   */
  @action(UPDATE_CURRENT_DOCUMENT)
  @dispatches(MODEL_SAVE)
  async updateCurrentDocument (hub, { detail: { title, commaPeriodSetting, start, end } }) {
    const { user: { currentDocument }, domain: { CommaPeriodSetting } } = hub

    if (title) {
      currentDocument.title = title
    }
    if (commaPeriodSetting) {
      currentDocument.commaPeriodSetting = CommaPeriodSetting[commaPeriodSetting]
    }
    if (start) {
      currentDocument.start = moment(start)
    }
    if (end) {
      currentDocument.end = moment(end)
    }
  }
}
module.exports = JournalDocumentModule
