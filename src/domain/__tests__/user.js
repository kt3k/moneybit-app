const { User, JournalDocument } = require('../')
const { describe, it } = require('kocha')
const { expect } = require('chai')

const documentFactory = new JournalDocument.Factory()

describe('User', () => {
  describe('setCurrentDocument', () => {
    it('sets the current document', () => {
      const user = new User({ id: 'john', documents: [] })

      const foo = documentFactory.createFromObject({ id: 'foo' })

      user.setCurrentDocument(foo)

      expect(user.currentDocument).to.equal(foo)
    })

    it('replaces the current document if the id is the same', () => {
      const user = new User({ id: 'john', documents: [] })

      const foo = documentFactory.createFromObject({ id: 'foo' })

      user.setCurrentDocument(foo)

      const foo0 = documentFactory.createFromObject({ id: 'foo' })

      user.setCurrentDocument(foo0)

      expect(user.currentDocument).to.not.equal(foo)
      expect(user.currentDocument).to.equal(foo0)
    })
  })

  describe('removeDocumentById', () => {
    it('removes the document by its id', () => {
      const user = new User({ id: 'john', documents: [] })

      const foo = documentFactory.createFromObject({ id: 'foo' })
      const bar = documentFactory.createFromObject({ id: 'bar' })
      const baz = documentFactory.createFromObject({ id: 'baz' })

      user.setCurrentDocument(foo)
      user.setCurrentDocument(bar)
      user.setCurrentDocument(baz)

      expect(user.has(foo)).to.equal(true)
      expect(user.has(bar)).to.equal(true)
      expect(user.has(baz)).to.equal(true)

      user.removeDocumentById('bar')

      expect(user.has(foo)).to.equal(true)
      expect(user.has(bar)).to.equal(false)
      expect(user.has(baz)).to.equal(true)
    })

    it('removes currentDocument if the id is currentDocument\'s', () => {
      const user = new User({ id: 'john', documents: [] })

      const foo = documentFactory.createFromObject({ id: 'foo' })

      user.setCurrentDocument(foo)

      user.removeDocumentById('foo')

      expect(user.currentDocument).to.equal(null)
    })
  })
})
