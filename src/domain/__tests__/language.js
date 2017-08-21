const { describe, it } = require('kocha')
const { expect } = require('chai')

const { Language } = require('..')

describe('Language', () => {
  describe('getByCode', () => {
    it('gets the language by its code', () => {
      expect(Language.getByCode('en')).to.equal(Language.EN)
      expect(Language.getByCode('ja')).to.equal(Language.JA)
    })

    it('returns null when the code does not exist', () => {
      expect(Language.getByCode('--')).to.equal(null)
    })
  })
})
