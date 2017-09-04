const { AppState, User } = require('../domain')

const repository = new AppState.Repository()

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
    const appState = await repository.get()

    if (!appState.hasUserId()) {
      appState.initUserId()

      await repository.save(appState)
    }

    const user = await this.initUser(appState)

    await this.initUiLanguage(user.settings.language || appState.deviceLanguage)

    return user
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
   * @param {AppState} appState
   * @return {User}
   */
  async initUser (appState) {
    return new User.InitService().getOrCreate(appState.userId, appState.deviceLanguage)
  }
}

module.exports = InitService
