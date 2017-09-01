const USER_ID = '1'
const { User, Language } = require('../domain')

/**
 * The initialization service.
 *
 * This initializes the basic data for app.
 */
class InitService {
  /**
   * Initializes the basic data.
   * @resolve {User}
   */
  async init () {
    const language = await this.getDeviceLanguage()

    const user = await this.initUser(language)

    await this.initUiLanguage(user.settings.language)

    return user
  }

  /**
   * @return {Language}
   */
  async getDeviceLanguage () {
    const code = await infrastructure.locale.getLangTag()

    const language = Language.getByCode(code)

    return language || Language.EN
  }

  /**
   * Initializes the language on the ui.
   * @param {Language} language The language
   */
  async initUiLanguage (language) {
    await $.getScript(`${basepath}/i18n/${language.code}.js`)

    t10.scan() // translate

    require('./pickadate') // init pickadate component
  }

  /**
   * @param {Language} language
   * @return {User}
   */
  async initUser (language) {
    return new User.InitService().getOrCreate(USER_ID, language)
  }
}

module.exports = InitService
