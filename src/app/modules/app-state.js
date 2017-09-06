const { HUB_READY, APP_STATE_READY } = require('../action-types')

const { emit, on, wire } = capsid

module.exports = class AppStateModule {
  @wire('js-model-hub') get hub () {}

  @emit(APP_STATE_READY)
  @on(HUB_READY)
  async onInit () {
    const repository = new this.hub.domain.AppState.Repository()

    const appState = await repository.get()

    if (!appState.hasUserId()) {
      appState.initUserId()

      await repository.save(appState)
    }

    this.hub.appState = appState
  }
}
