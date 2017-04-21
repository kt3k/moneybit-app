const Factory = require('./document-factory')

const factory = new Factory()

class DocumentRepository {
  /**
   * @param {Document} document The document
   */
  save (document) {
  }

  /**
   * @param {string} id The id of the document
   * @return {Promise<Document>}
   */
  getById (id) {
    return infrastructure.storage.get(this.createStorageKey(id), null).then(data => {
      return factory.createFromObject(data)
    })
  }

  /**
   * @param {string} id The id
   * @return {string}
   */
  createStorageKey (id) {
    return `document-${id}`
  }
}

module.exports = DocumentRepository
