const { describe, it } = require('kocha')
const { AccountTypeChart } = require('../')
const { expect } = require('chai')

describe('default charts', () => {
  it('has en default chart', () => {
    expect(AccountTypeChart.defaults.en).to.be.instanceof(AccountTypeChart)
  })

  it('has ja default chart', () => {
    expect(AccountTypeChart.defaults.ja).to.be.instanceof(AccountTypeChart)
  })
})
