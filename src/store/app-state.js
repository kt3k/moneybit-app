const { Action } = require('~')

const { action, dispatches } = require('evex')

module.exports = class AppStateModule {
  @action(Action.INIT_APP_STATE)
  @dispatches(Action.APP_STATE_READY)
  async onInit (hub) {
    const repository = new hub.domain.AppState.Repository()

    const appState = await repository.get()

    if (!appState.hasUserId()) {
      appState.initUserId()

      await repository.save(appState)
    }

    hub.appState = appState
  }
}
