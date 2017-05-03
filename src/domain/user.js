class User {
  /**
   * @param {string} id The id
   * @param {Document[]} documents The documents
   * @param {UserSettings} settings The user settings
   * @param {Document} currentDocument The current document
   */
  constructor ({ id, documents, settings, currentDocument }) {
    this.id = id
    this.documents = documents
    this.settings = settings
    this.currentDocument = currentDocument
  }
}

module.exports = User
