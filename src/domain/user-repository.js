const DocumentFactory = require('./document-factory')
const UserSettingsFactory = require('./user-settings-factory')
const User = require('./user')

class UserRepository {
  /**
   * Gets the user by id.
   * @param {string} id The id
   * @return {User}
   */
  getById (id) {
    return infrastructure.storage.get(this.createKey(id), null)
      .then(data => this.deserialize(data))
  }

  /**
   * @param {User} user The user
   * @return {Promise}
   */
  save (user) {
    return infrastructure.storage.set(this.createKey(user.id), this.serialize(user))
  }

  /**
   * @param {User} user The user
   * @return {object}
   */
  serialize (user) {
    return {
      id: user.id,
      documents: this.documentsToArray(user.documents),
      settings: this.settingsToObject(user.settings),
      currentDocumentId: user.currentDocument.id
    }
  }

  /**
   * @param {Document[]} documents
   * @return {Object[]}
   */
  documentsToArray (documents) {
    return documents.map(doc => this.documentToObject(doc))
  }

  /**
   * @param {Document} document
   * @return {Object}
   */
  documentToObject (document) {
    return {
      id: document.id,
      name: document.name,
      journalId: document.journalId,
      chartId: document.chartId,
      currencyCode: document.currency.code,
      start: document.start.format('YYYY-MM-DD'),
      end: document.end.format('YYYY-MM-DD'),
      commaPeriodSetting: document.commaPeriodSetting.name,
    }
  }

  /**
   * @param {UserSettings} settings The user settings
   * @return {Object}
   */
  settingsToObject (settings) {
    return {
      defaultChartId: settings.defaultChartId,
      languageCode: settings.language.code
    }
  }

  /**
   * @param {Object} obj
   * @return {User}
   */
  deserialize (obj) {
    const documentFactory = new DocumentFactory()
    const userSettingsFactory = new UserSettingsFactory()
    const documents = documentFactory.createDocumentsFromArray(obj.documents)

    const currentDocument = documents.filter(document => document.id === obj.currentDocumentId)[0]

    return new User({
      id: obj.id,
      documents,
      settings: userSettingsFactory.createFromObject(obj.settings),
      currentDocument
    })
  }

  /**
   * Creates the key for serialization.
   * @param {string} id The id
   * @return {string}
   */
  createKey (id) {
    return `user-${id}`
  }
}

module.exports = UserRepository
