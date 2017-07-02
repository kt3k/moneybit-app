const { describe, it } = require('kocha')
const ModelHub = require('../model-hub')
const { User } = require('../../domain')
const { expect } = require('chai')
const td = require('testdouble')

describe('ModelHub', () => {
  describe('init', () => {
    it('initializes the user', async () => {
      const modelHub = new ModelHub()
      const user = new User({ id: 'foo' })

      td.replace(modelHub.initService, 'init')
      td.when(modelHub.initService.init()).thenResolve(user)

      await modelHub.init()

      expect(modelHub.user).to.equal(user)
    })
  })
})
