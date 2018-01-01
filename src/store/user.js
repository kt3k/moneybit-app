const { Action: { INIT_USER, USER_READY } } = require('~')

const { action, dispatches } = require('evex')

class UserModule {
  @action(INIT_USER)
  @dispatches(USER_READY)
  async init (hub) {
    hub.user = await this.initUser(hub, hub.appState)
  }

  /**
   * @param {Store} hub
   * @param {AppState} appState
   * @return {User}
   */
  async initUser (hub, appState) {
    return new hub.domain.User.InitService().getOrCreate(appState.userId, appState.deviceLanguage)
  }
}

module.exports = UserModule
