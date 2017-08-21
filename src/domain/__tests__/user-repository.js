const { User } = require('../')

const { userObj } = require('../__mocks__')

const { expect } = require('chai')
const { describe, afterEach, it } = require('kocha')
const td = require('testdouble')
const { storage } = infrastructure

describe('UserRepository', () => {
  let repo = new User.Repository()

  afterEach(() => {
    td.reset()
  })

  describe('getById', () => {
    it('gets the user by the id', async () => {
      td.replace(storage, 'get')
      td.when(storage.get('user-john', null)).thenResolve(userObj)

      const user = await repo.getById('john')

      expect(user).to.be.instanceof(User)
      expect(user.id).to.equal('john')
      expect(user.currentDocument.id).to.equal('2')
    })
  })

  describe('save', () => {
    it('saves the user to infrastructure.storage', async () => {
      const captor = td.matchers.captor()

      const user = repo.deserialize(userObj)

      td.replace(infrastructure.storage, 'set')
      td.when(infrastructure.storage.set('user-john', td.matchers.anything()))
        .thenResolve()

      await repo.save(user)

      td.verify(infrastructure.storage.set('user-john', captor.capture()))
      expect(captor.value).to.eql(userObj)
    })
  })
})
