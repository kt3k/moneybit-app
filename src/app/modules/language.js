const { MODEL_SAVE_AND_RELOAD } = require('../model-hub')
const SWITCH_LANGUAGE = 'mb/language/switch'
const { on, emit, wire, component } = capsid

@component('language-module')
class LanguageModule {
  @wire('js-model-hub') get hub () {}

  @emit(MODEL_SAVE_AND_RELOAD)
  @on(SWITCH_LANGUAGE) onSwitchLanguage (e) {
    const code = e.detail
    const language = this.hub.domain.Language.getByCode(code)

    this.hub.user.settings.language = language
  }
}

module.exports = LanguageModule
module.exports.SWITCH_LANGUAGE = SWITCH_LANGUAGE
