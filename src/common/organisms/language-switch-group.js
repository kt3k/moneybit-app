const { component, on, emit, wire } = capsid
const { SWITCH_LANGUAGE } = require('../../app/modules/language')
const { MODEL_UPDATE } = require('../../app/model-hub')

@component('js-language-switch-group')
class LanguageSwitchGroup {
  @wire.$el('button') get $buttons () {}
  @wire.$el('button[lang=""]') get $buttonAuto () {}
  @wire.$el('button[lang="en"]') get $buttonEn () {}
  @wire.$el('button[lang="ja"]') get $buttonJa () {}

  __init__ () {
    this.el.classList.add('is-model-observer')
  }

  @on.click
  @emit(SWITCH_LANGUAGE)
  onClick (e) {
    return $(e.target).attr('lang')
  }

  @on(MODEL_UPDATE) update (e) {
    const { domain, user } = e.detail
    const { EN, JA } = domain.Language
    const { language } = user.settings

    const isActive = 'is-primary'
    this.$buttons.removeClass(isActive)

    if (language === EN) {
      this.$buttonEn.addClass(isActive)
    } else if (language === JA) {
      this.$buttonJa.addClass(isActive)
    } else {
      this.$buttonAuto.addClass(isActive)
    }
  }
}

module.exports = LanguageSwitchGroup
