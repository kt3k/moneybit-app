
class UserSettings {
  /**
   * @param {string?} defaultChartId
   * @param {Language?} language The preferred language. If null, then the preferred language is auto detected by the environment.
   */
  constructor ({ defaultChartId, language }) {
    this.defaultChartId = defaultChartId
    this.language = language
  }
}

module.exports = UserSettings
