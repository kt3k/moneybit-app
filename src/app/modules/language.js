const { SWITCH_LANGUAGE, MODEL_SAVE_AND_RELOAD } = require('../action-types')

const { on, emit, wire, component } = capsid

@component('language-module')
class LanguageModule {
  @wire('js-model-hub')
  get hub () {}

  @on(SWITCH_LANGUAGE)
  @emit(MODEL_SAVE_AND_RELOAD)
  onSwitchLanguage (e) {
    const code = e.detail
    const language = this.hub.domain.Language.getByCode(code)

    this.hub.user.settings.language = language
  }
}

module.exports = LanguageModule
