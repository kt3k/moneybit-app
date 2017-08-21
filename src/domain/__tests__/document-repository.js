const { JournalDocument } = require('../')

const { expect } = require('chai')
const { describe, it } = require('kocha')

describe('JournalDocumentRepository', () => {
  describe('getById', () => {
    it('gets the document by the id', () => {
      const repository = new JournalDocument.Repository()

      return repository.getById('foo').then(document => {
        expect(document).to.be.instanceof(JournalDocument)
      })
    })
  })
})
