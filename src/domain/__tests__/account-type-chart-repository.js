const td = require('testdouble')
const { describe, afterEach, it } = require('kocha')
const { expect } = require('chai')
const { AccountType, MajorAccountType, AccountTypeChart } = require('../')

const repository = new AccountTypeChart.Repository()
const factory = new AccountTypeChart.Factory()
const { storage } = infrastructure

describe('AccountTypeChartRepository', () => {
  afterEach(() => {
    td.reset()
  })

  describe('save', () => {
    it('saves the chart', async () => {
      const captor = td.matchers.captor()
      const chart = factory.createFromObject({
        id: 'abcdef',
        asset: ['Cash'],
        liability: ['Account Payable'],
        equity: ['Capital'],
        revenue: ['Sales'],
        expense: ['Travel Expense']
      })

      td.replace(storage, 'set')

      await repository.save(chart)

      td.verify(storage.set('account-type-chart-abcdef', captor.capture()))

      expect(captor.value).to.eql({
        id: 'abcdef',
        asset: ['Cash'],
        liability: ['Account Payable'],
        equity: ['Capital'],
        revenue: ['Sales'],
        expense: ['Travel Expense']
      })
    })
  })

  describe('getById', () => {
    it('gets the chart by the id', async () => {
      td.replace(storage, 'get')
      td.when(storage.get('account-type-chart-abcdef', null)).thenResolve({
        id: 'abcdef',
        asset: ['Cash'],
        liability: ['Account Payable'],
        equity: ['Capital'],
        revenue: ['Sales'],
        expense: ['Travel Expense']
      })

      const chart = await repository.getById('abcdef')

      expect(chart).to.be.instanceof(AccountTypeChart)
      expect(chart.getMajorTypeByAccountType(new AccountType('Cash'))).to.equal(MajorAccountType.ASSET)
    })

    it('gets null if the object does not exist', async () => {
      td.replace(storage, 'get')
      td.when(storage.get(td.matchers.anything(), null)).thenResolve(null)

      const chart = await repository.getById('abcdef')

      expect(chart).to.equal(null)
    })
  })
})
