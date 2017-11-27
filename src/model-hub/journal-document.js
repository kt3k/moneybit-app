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

const { wire, on, emits } = capsid

module.exports = class JournalDocumentModule {
  constructor () {
    this.journalFactory = new Journal.Factory()
    this.journalRepository = new Journal.Repository()
    this.chartRepository = new AccountTypeChart.Repository()
    this.chartFactory = new AccountTypeChart.Factory()
    this.documentFactory = new JournalDocument.Factory()
  }

  @wire('js-model-hub') get hub () {}

  @on(CREATE_JOURNAL_DOCUMENT)
  @emits(MODEL_SAVE)
  async createJournal (e) {
    const { user } = this.hub

    const journal = await this.createEmptyJournal()
    const chart = await this.cloneFromDefaultChart()

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
  async cloneFromDefaultChart () {
    const { user } = this.hub

    const defaultChart = await this.chartRepository.getById(user.settings.defaultChartId)

    const newChart = defaultChart.clone(uuid.v4())

    await this.chartRepository.save(newChart)

    return newChart
  }

  /**
   * Changes the current document.
   */
  @on(CHANGE_CURRENT_DOCUMENT)
  @emits(MODEL_SAVE)
  changeCurrentDocument ({ detail: id }) {
    const { user } = this.hub

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
  @on(UPDATE_CURRENT_DOCUMENT)
  @emits(MODEL_SAVE)
  updateCurrentDocument ({ detail: { title, commaPeriodSetting, start, end } }) {
    const { user: { currentDocument }, domain: { CommaPeriodSetting } } = this.hub

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
