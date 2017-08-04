const USER_ID = '1'
const { User } = require('../domain')

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
    const user = await this.initUser()

    const language = user.settings.language

    await this.initLanguage(language ? language.code : null)

    return user
  }

  /**
   * Initializes the language.
   * @param {string} langTag The language tag
   * @return {Promise}
   */
  async initLanguage (langTag) {
    const tag = langTag || await infrastructure.locale.getLangTag()

    await $.getScript(`${basepath}/i18n/${tag}.js`)

    t10.scan() // translate

    require('./pickadate') // init pickadate component
  }

  /**
   * @return {Promise<User>}
   */
  initUser () {
    return new User.InitService().getOrCreate(USER_ID)
  }
}

module.exports = InitService
