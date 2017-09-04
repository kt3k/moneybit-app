const { SWITCH_LANGUAGE, MODEL_SAVE } = require('../action-types')

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
}

module.exports = LanguageModule
