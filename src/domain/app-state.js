const uuid = require('uuid')

class AppState {
  /**
   * @param {string} userId The user id
   * @param {Language} deviceLanguage The device language
   */
  constructor ({ userId, deviceLanguage }) {
    this.userId = userId
    this.deviceLanguage = deviceLanguage
  }

  hasUserId () {
    return this.userId != null
  }

  initUserId () {
    this.userId = uuid.v4()
  }
}

module.exports = AppState
