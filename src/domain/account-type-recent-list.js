const { AccountType } = require('moneybit-domain')

/**
 * List of account types which are recently used.
 */
class AccountTypeRecentList {
  /**
   * {AccountTypes} accountTypes The account types
   */
  constructor (accountTypes) {
    this.accountTypes = accountTypes || []
    this.nameMap = {}
    this.updateNameMap()
  }

  updateNameMap () {
    this.accountTypes.forEach(type => {
      this.nameMap[type.name] = true
    })
  }

  /**
   * {AccountTypes} accountTypes The account types
   */
  update (...accountTypes) {
    this.filter(...accountTypes)
    this.accountTypes.unshift(...accountTypes)
    this.updateNameMap()
  }

  /**
   * {AccountTypes} accountTypes The account types
   */
  filter (...accountTypes) {
    const filteredName = {}

    accountTypes.forEach(type => {
      filteredName[type.name] = true
    })

    this.accountTypes = this.accountTypes.filter(
      type => !filteredName[type.name]
    )
  }

  /**
   * @param {AccountTypeChart} chart
   * @return {AccountType[]}
   */
  sortChartKeys (chart) {
    const types = []

    for (const [name] of chart.majorTypes) {
      if (!this.nameMap[name]) {
        types.push(new AccountType(name))
      }
    }

    return [].concat(this.accountTypes, types)
  }
}

module.exports = AccountTypeRecentList
