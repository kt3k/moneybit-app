const { Action } = require('~')

const { action, dispatches } = require('evex')

class UserModule {
  @action(Action.INIT_USER)
  @dispatches(Action.USER_READY)
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
