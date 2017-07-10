const UserSettings = require('./user-settings')
const Language = require('./language')

class UserSettingsFactory {
  createFromObject (obj) {
    return new UserSettings({
      defaultChartId: obj.defaultChartId,
      language: obj.languageCode ? new Language({ code: obj.languageCode }) : null
    })
  }
}

module.exports = UserSettingsFactory
