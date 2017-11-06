const { SWITCH_LANGUAGE, INIT_LANGUAGE, MODEL_SAVE, UI_LANGUAGE_READY } = require('../action-types')

const { on, emits, wire } = capsid

class LanguageModule {
  @wire('js-model-hub')
  get hub () {}

  @on(SWITCH_LANGUAGE)
  @emits(MODEL_SAVE)
  onSwitchLanguage ({ detail: code }) {
    this.hub.user.settings.language = this.hub.domain.Language.getByCode(code)

    return { reload: true }
  }

  /**
   * Initializes the language on the ui.
   */
  @on(INIT_LANGUAGE)
  @emits(UI_LANGUAGE_READY)
  async initUiLanguage () {
    await $.getScript(`${basepath}/i18n/${this.getLanguage().code}.js`)

    t10.scan() // translate
  }

  /**
   * Gets the language.
   * @return {Language}
   */
  getLanguage () {
    return this.hub.user.settings.language || this.hub.appState.deviceLanguage
  }
}

module.exports = LanguageModule
