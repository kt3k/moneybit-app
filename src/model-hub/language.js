const {
  Action: {
    SWITCH_LANGUAGE,
    INIT_LANGUAGE,
    MODEL_SAVE,
    UI_LANGUAGE_READY
  }
} = require('~')

const { action, dispatches } = require('evex')

class LanguageModule {
  @action(SWITCH_LANGUAGE)
  @dispatches(MODEL_SAVE)
  onSwitchLanguage (hub, { detail: code }) {
    hub.user.settings.language = hub.domain.Language.getByCode(code)

    return { reload: true }
  }

  /**
   * Initializes the language on the ui.
   */
  @action(INIT_LANGUAGE)
  @dispatches(UI_LANGUAGE_READY)
  async initUiLanguage (hub) {
    await $.getScript(`${basepath}/i18n/${this.getLanguage(hub).code}.js`)

    t10.scan() // translate
  }

  /**
   * Gets the language.
   * @return {Language}
   */
  getLanguage (hub) {
    return hub.user.settings.language || hub.appState.deviceLanguage
  }
}

module.exports = LanguageModule
