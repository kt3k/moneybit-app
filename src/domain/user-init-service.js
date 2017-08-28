const uuid = require('uuid')
const User = require('./user')
const UserSettings = require('./user-settings')
const { AccountTypeChart } = require('./')

const repo = new User.Repository()

class UserInitService {
  /**
   * @param {string} id The id of the user
   * @param {Language} language The language of the user
   * @return {User}
   */
  async getOrCreate (id, language) {
    const user = await repo.getById(id)

    if (user) {
      return user
    }

    return await this.createUser(id, language)
  }

  /**
   * @param {string} id The id
   * @param {Language} language The language
   * @return {User}
   */
  async createUser (id, language) {
    const settings = await this.createInitialSettings(language)

    const user = new User({
      id,
      settings,
      documents: [],
      currentDocument: null
    })

    await new User.Repository().save(user)

    return user
  }

  /**
   * @param {Language} language The default language
   */
  async createInitialSettings (language) {
    const defaultChart = AccountTypeChart.defaults[language.code]

    const chart = defaultChart.clone(uuid.v4())

    await new AccountTypeChart.Repository().save(chart)

    return new UserSettings({
      defaultChartId: chart.id,
      language,
    })
  }
}

module.exports = UserInitService
