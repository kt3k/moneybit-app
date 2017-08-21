const td = require('testdouble')
const { describe, afterEach, it } = require('kocha')
const { expect } = require('chai')
const { AccountTypeChart } = require('../')

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
      console.log(chart)

      td.replace(storage, 'set')

      await repository.save(chart)

      td.verify(storage.set('account-type-chart-abcdef', captor.capture()))
      console.log(captor.value)
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
    it('gets the chart by the id', () => {
    })
  })
})
