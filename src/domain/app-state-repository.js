const APP_STATE_KEY = 'mb-app-state'

const AppStateFactory = require('./app-state-factory')
const Language = require('./language')

const factory = new AppStateFactory()

class AppStateRepository {
  /**
   * Saves the app state
   * @param {AppState} appState
   */
  async save (appState) {
    await infrastructure.storage.set(APP_STATE_KEY, this.toObject(appState))
  }

  async get () {
    const [deviceLanguage, data] = await Promise.all([this.getDeviceLanguage(), infrastructure.storage.get(APP_STATE_KEY, {})])

    return factory.createFromObject({ ...data, deviceLanguage })
  }

  async getDeviceLanguage () {
    const code = await infrastructure.locale.getLangTag()

    return Language.getByCode(code) || Language.EN
  }

  /**
   * @param {AppState} appState
   */
  toObject (appState) {
    return {
      userId: appState.userId
    }
  }
}

module.exports = AppStateRepository
