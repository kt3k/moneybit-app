const { describe, it } = require('kocha')
const ModelHub = require('../model-hub')
const { User } = require('../../domain')
const { expect } = require('chai')
const td = require('testdouble')

describe('ModelHub', () => {
  describe('__init__', () => {
    it('initializes the user', async () => {
      const modelHub = new ModelHub()
      const user = new User({ id: 'foo' })

      td.replace(modelHub.initService, 'init')
      td.when(modelHub.initService.init()).thenResolve(user)

      modelHub.el = document.createElement('div')

      await modelHub.__init__()

      expect(modelHub.user).to.equal(user)
    })
  })
})
