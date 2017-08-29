const { User, Language } = require('../')
const { userObj } = require('../__mocks__')
const { describe, afterEach, it } = require('kocha')

const { expect } = require('chai')
const td = require('testdouble')

const { storage } = infrastructure

describe('UserInitService', () => {
  const service = new User.InitService()

  afterEach(() => {
    td.reset()
  })

  describe('getOrCreate', () => {
    it('creates the user when not available', () => {
      return service.getOrCreate('jonathan', Language.EN).then(user => {
        expect(user).to.be.instanceof(User)
        expect(user.id).to.equal('jonathan')
      })
    })

    it('gets the user when available', () => {
      td.replace(storage, 'get')
      td.when(storage.get('user-john', null)).thenResolve(userObj)

      return service.getOrCreate('john').then(user => {
        expect(user).to.be.instanceof(User)
        expect(user.id).to.equal('john')
        expect(user.documents.length).to.equal(2)
      })
    })
  })
})
