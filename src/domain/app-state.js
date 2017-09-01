class AppState {
  /**
   * @param {string} userId The user id
   * @param {Language} deviceLanguage The device language
   */
  constructor ({ userId, deviceLanguage }) {
    this.userId = userId
    this.deviceLanguage = deviceLanguage
  }
}

module.exports = AppState
