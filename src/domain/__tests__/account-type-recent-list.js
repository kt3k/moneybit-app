const { AccountType } = require('../')
const { describe, it } = require('kocha')
const { expect } = require('chai')

describe('AccountTypeRecentList', () => {
  describe('update', () => {
    it('updates the list', () => {
      const list = new AccountType.RecentList()

      list.update(new AccountType('foo'))

      expect(list).to.eql(new AccountType.RecentList([new AccountType('foo')]))

      list.update(new AccountType('bar'), new AccountType('baz'))

      expect(list).to.eql(new AccountType.RecentList([new AccountType('bar'), new AccountType('baz'), new AccountType('foo')]))
    })

    it('filters out the duplicated entries', () => {
      const list = new AccountType.RecentList([new AccountType('foo'), new AccountType('bar'), new AccountType('baz')])

      list.update(new AccountType('bar'))

      expect(list).to.eql(new AccountType.RecentList([new AccountType('bar'), new AccountType('foo'), new AccountType('baz')]))
    })
  })
})
