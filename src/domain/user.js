class User {
  /**
   * @param {string} id The id
   * @param {Document[]} documents The documents
   * @param {UserSettings} settings The user settings
   */
  constructor ({ id, documents, settings }) {
    this.id = id
    this.documents = documents
    this.settings = settings
  }
}

module.exports = User
