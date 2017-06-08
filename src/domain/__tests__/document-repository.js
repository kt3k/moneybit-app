const { Document } = require('../')

const { expect } = require('chai')
const { describe, it } = require('kocha')

describe('DocumentRepository', () => {
  describe('getById', () => {
    it('gets the document by the id', () => {
      const repository = new Document.Repository()

      return repository.getById('foo').then(document => {
        expect(document).to.be.instanceof(Document)
      })
    })
  })
})
