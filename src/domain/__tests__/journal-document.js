const { describe, it } = require('kocha')
const { expect } = require('chai')
const { JournalDocument } = require('../')
const { Money } = require('moneybit-domain')

const factory = new JournalDocument.Factory()

describe('JournalDocument', () => {
  describe('format', () => {
    it('formats the given money according to the settings', () => {
      const docJpy = factory.createFromObject({
        currencyCode: 'JPY',
        commaPeriodSetting: 'comma-period'
      })

      expect(docJpy.format(new Money(100))).to.equal('¥100')
      expect(docJpy.format(new Money(100000))).to.equal('¥100,000')
      expect(docJpy.format(new Money(100000000))).to.equal('¥100,000,000')

      const docUsd = factory.createFromObject({
        currencyCode: 'USD',
        commaPeriodSetting: 'comma-period'
      })

      expect(docUsd.format(new Money(0.01))).to.equal('$0.01')
      expect(docUsd.format(new Money(0.02))).to.equal('$0.02')
      expect(docUsd.format(new Money(0.03))).to.equal('$0.03')
      expect(docUsd.format(new Money(0.15))).to.equal('$0.15')
      expect(docUsd.format(new Money(1))).to.equal('$1.00')
      expect(docUsd.format(new Money(100))).to.equal('$100.00')
      expect(docUsd.format(new Money(10000.75))).to.equal('$10,000.75')
      expect(docUsd.format(new Money(10000000.75))).to.equal('$10,000,000.75')

      const docEur = factory.createFromObject({
        currencyCode: 'EUR',
        commaPeriodSetting: 'period-comma'
      })

      expect(docEur.format(new Money(0.01))).to.equal('€0,01')
      expect(docEur.format(new Money(0.02))).to.equal('€0,02')
      expect(docEur.format(new Money(0.03))).to.equal('€0,03')
      expect(docEur.format(new Money(0.15))).to.equal('€0,15')
      expect(docEur.format(new Money(1))).to.equal('€1,00')
      expect(docEur.format(new Money(2))).to.equal('€2,00')
      expect(docEur.format(new Money(2.01))).to.equal('€2,01')
      expect(docEur.format(new Money(15))).to.equal('€15,00')
      expect(docEur.format(new Money(100.75))).to.equal('€100,75')
      expect(docEur.format(new Money(10000.75))).to.equal('€10.000,75')
      expect(docEur.format(new Money(10000000.75))).to.equal('€10.000.000,75')
    })
  })

  describe('getMonths', () => {
    it('returns the months during the docuemnt range', () => {
      const doc0 = factory.createFromObject({
        start: '2018-01-01',
        end: '2018-12-31'
      })

      const months0 = doc0.getMonths()

      expect(months0.length).to.equal(12)
      expect(months0[0].format('YYYY-MM-DD')).to.equal('2018-01-01')
      expect(months0[11].format('YYYY-MM-DD')).to.equal('2018-12-01')

      const doc1 = factory.createFromObject({
        start: '2018-04-07',
        end: '2019-04-06'
      })

      const months1 = doc1.getMonths()

      expect(months1.length).to.equal(13)
      expect(months1[0].format('YYYY-MM-DD')).to.equal('2018-04-01')
      expect(months1[12].format('YYYY-MM-DD')).to.equal('2019-04-01')
    })
  })
})
