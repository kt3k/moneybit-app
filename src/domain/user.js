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

  /**
   * Sets the current document.
   * @param {Document} document The document to set
   */
  setCurrentDocument (document) {
    if (this.has(document)) {
      this.removeDocumentById(document.id)
    }

    this.documents.unshift(document)
    this.currentDocument = document
  }

  has (document) {
    return this.documents.some(doc => doc.id === document.id)
  }

  removeDocumentById (id) {
    this.documents.splice(this.documents.findIndex(doc => doc.id === id), 1)

    if (this.currentDocument && this.currentDocument.id === id) {
      this.currentDocument = null
    }
  }
}

module.exports = User
