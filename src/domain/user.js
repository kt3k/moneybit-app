class User {
  /**
   * @param {string} id The id
   * @param {string[]} documentIds The document ids
   * @param {Object<string>} documentNames The document names
   * @param {UserSettings} settings The user settings
   */
  constructor ({ id, documentIds, documentNames, settings }) {
    this.id = id
    this.documentIds = documentIds
    this.documentNames = documentNames
    this.settings = settings
  }
}

module.exports = User
