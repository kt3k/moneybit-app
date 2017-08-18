class User {
  /**
   * @param {string} id The id
   * @param {JournalDocument[]} documents The documents
   * @param {UserSettings} settings The user settings
   * @param {JournalDocument} currentDocument The current document
   */
  constructor ({ id, documents, settings, currentDocument }) {
    this.id = id
    this.documents = documents
    this.settings = settings
    this.currentDocument = currentDocument
  }
}

module.exports = User
