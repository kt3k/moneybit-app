const { describe, it } = require('kocha')
const { CommaPeriodSetting } = require('../')
const { expect } = require('chai')

const cp = CommaPeriodSetting['comma-period']
const pc = CommaPeriodSetting['period-comma']

describe('CommaPeriodSetting', () => {
  describe('format', () => {
    it('formats the given number into the 3-digit delimited format', () => {
      expect(cp.format(10)).to.equal('10')
      expect(cp.format(100000)).to.equal('100,000')
      expect(cp.format(100000000)).to.equal('100,000,000')
      expect(pc.format(10)).to.equal('10')
      expect(pc.format(100000)).to.equal('100.000')
      expect(pc.format(100000000)).to.equal('100.000.000')
    })
  })
})
