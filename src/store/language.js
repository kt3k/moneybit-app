const { Action } = require('~')

const { action, dispatches } = require('evex')

class LanguageModule {
  @action(Action.SWITCH_LANGUAGE)
  @dispatches(Action.MODEL_SAVE)
  onSwitchLanguage ({ user, domain }, { detail: code }) {
    user.settings.language = domain.Language.getByCode(code)

    return { reload: true }
  }

  /**
   * Initializes the language on the ui.
   */
  @action(Action.INIT_LANGUAGE)
  @dispatches(Action.UI_LANGUAGE_READY)
  async initUiLanguage (store) {
    await $.getScript(`${basepath}/i18n/${this.getLanguage(store).code}.js`)

    t10.scan() // translate
  }

  @action(Action.SCAN_LANGUAGE)
  scanLanguage () {
    t10.scan() // translate
  }

  /**
   * Gets the language.
   * @param {Store}
   * @return {Language}
   */
  getLanguage (store) {
    return store.user.settings.language || store.appState.deviceLanguage
  }
}

module.exports = LanguageModule
