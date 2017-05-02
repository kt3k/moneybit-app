const td = require('testdouble')
const { expect } = require('chai')

const { Journal } = require('../')
const { journal, journalObj } = require('../__mocks__')

describe('JournalRepository', () => {
  let repo

  beforeEach(() => {
    repo = new Journal.Repository()
  })

  afterEach(() => {
    td.reset()
  })

  describe('getById', () => {
    it('gets the journal by the id', () => {
      td.replace(infrastructure.storage, 'get')
      td.when(infrastructure.storage.get('journal-foo', null))
        .thenResolve(journalObj)

      return repo.getById('foo').then(journal => {
        expect(journal).to.be.instanceof(Journal)
      })
    })
  })

  describe('save', () => {
    it('saves the journal to infrastructure.storage', () => {
      const captor = td.matchers.captor()

      td.replace(infrastructure.storage, 'set')
      td.when(infrastructure.storage.set('journal-foo', td.matchers.anything())).thenResolve()

      return repo.save(journal).then(() => {
        td.verify(infrastructure.storage.set('journal-foo', captor.capture()))

        const obj = captor.value

        expect(obj).to.be.a('object')
        expect(obj.id).to.equal('foo')
        expect(obj.trades[0].date).to.equal('2015-01-01')
        expect(obj.trades[0].desc).to.equal('Start the business')
      })
    })
  })
})
