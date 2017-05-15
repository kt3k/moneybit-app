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
   */
  async init () {
    await this.initLanguage()
    await this.initUser()
  }

  /**
   * Initializes the language.
   * @return {Promise}
   */
  async initLanguage () {
    const tag = await infrastructure.locale.getLangTag()

    $.ajaxSetup({ cache: true }) // TODO: remove when vinyl-serve is updated

    await $.getScript(`${basepath}/i18n/${tag}.js`)
  }

  /**
   * @return {Promise<User>}
   */
  initUser () {
    return new User.InitService().getOrCreate(USER_ID)
  }
}

module.exports = InitService
