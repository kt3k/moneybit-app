const Factory = require('./document-factory')

const factory = new Factory()

class DocumentRepository {
  save (document) {
  }

  getById (id) {
    infrastructure.get(this.createStorageKey(id), null).then(data => {
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
