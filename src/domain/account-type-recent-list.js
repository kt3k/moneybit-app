/**
 * List of account types which are recently used.
 */
class AccountTypeRecentList {
  /**
   * {AccountTypes} accountTypes The account types
   */
  constructor (accountTypes) {
    this.accountTypes = accountTypes || []
  }

  /**
   * {AccountTypes} accountTypes The account types
   */
  update (...accountTypes) {
    this.filter(...accountTypes)
    this.accountTypes.unshift(...accountTypes)
  }

  /**
   * {AccountTypes} accountTypes The account types
   */
  filter (...accountTypes) {
    const filteredName = {}

    accountTypes.forEach(type => {
      filteredName[type.name] = true
    })

    this.accountTypes = this.accountTypes.filter(type => !filteredName[type.name])
  }
}

module.exports = AccountTypeRecentList
