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
    const [_, user] = await Promise.all([this.initLanguage(), this.initUser()])

    return user
  }

  /**
   * Initializes the language.
   * @return {Promise}
   */
  async initLanguage () {
    const tag = await infrastructure.locale.getLangTag()

    await $.getScript(`${basepath}/i18n/${tag}.js`)

    t10.scan() // translate
  }

  /**
   * @return {Promise<User>}
   */
  initUser () {
    return new User.InitService().getOrCreate(USER_ID)
  }
}

module.exports = InitService
