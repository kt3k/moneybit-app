const UserSettings = require('./user-settings')
const Language = require('./language')

class UserSettingsFactory {
  createFromObject (obj) {
    return new UserSettings({
      defaultChartId: obj.defaultChartId,
      language: Language.getByCode(obj.languageCode)
    })
  }
}

module.exports = UserSettingsFactory
