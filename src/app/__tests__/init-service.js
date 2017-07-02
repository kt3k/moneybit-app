const { describe, it, afterEach } = require('kocha')
const InitService = require('../init-service')
const { User } = require('../../domain')
const { expect } = require('chai')
const td = require('testdouble')

describe('InitService', () => {
  afterEach(() => {
    td.reset()
  })

  describe('init', () => {
    it('initializes', async () => {
      td.replace($, 'getScript')
      td.when($.getScript()).thenResolve({})

      const user = await new InitService().init()
      expect(user).to.be.instanceof(User)
    })
  })
})
