const { SWITCH_LANGUAGE, USER_READY, MODEL_SAVE } = require('../action-types')

const { on, emit, wire, component } = capsid

@component('language-module')
class LanguageModule {
  @wire('js-model-hub')
  get hub () {}

  @on(SWITCH_LANGUAGE)
  @emit(MODEL_SAVE)
  onSwitchLanguage ({ detail: code }) {
    this.hub.user.settings.language = this.hub.domain.Language.getByCode(code)

    return { reload: true }
  }

  /**
   * Initializes the language on the ui.
   */
  @on(USER_READY)
  @emit(MODEL_SAVE)
  async initUiLanguage () {
    await $.getScript(`${basepath}/i18n/${this.getLanguage().code}.js`)

    t10.scan() // translate

    require('../pickadate') // init pickadate component
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
