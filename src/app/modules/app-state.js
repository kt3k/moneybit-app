const { INIT_APP_STATE, APP_STATE_READY } = require('../action-types')

const { emits, on, wire } = capsid

module.exports = class AppStateModule {
  @wire('js-model-hub') get hub () {}

  @on(INIT_APP_STATE)
  @emits(APP_STATE_READY)
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
