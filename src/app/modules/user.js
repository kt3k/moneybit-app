const { INIT_USER, USER_READY } = require('../action-types')

const { on, emits, wire } = capsid

class UserModule {
  @wire('js-model-hub') get hub () {}

  @on(INIT_USER)
  @emits(USER_READY)
  async init () {
    this.hub.user = await this.initUser(this.hub.appState)
  }

  /**
   * @param {AppState} appState
   * @return {User}
   */
  async initUser (appState) {
    return new this.hub.domain.User.InitService().getOrCreate(appState.userId, appState.deviceLanguage)
  }
}

module.exports = UserModule
