const { SWITCH_LANGUAGE, MODEL_SAVE_AND_RELOAD } = require('../action-types')

const { on, emit, wire, component } = capsid

@component('language-module')
class LanguageModule {
  @wire('js-model-hub')
  get hub () {}

  @on(SWITCH_LANGUAGE)
  @emit(MODEL_SAVE_AND_RELOAD)
  onSwitchLanguage ({ detail: code }) {
    this.hub.user.settings.language = this.hub.domain.Language.getByCode(code)
  }
}

module.exports = LanguageModule
