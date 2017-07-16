const { component, on, emit, wire } = capsid

@component('js-language-switch-group')
class LanguageSwitchGroup {
  @wire.$el('button') get $buttons () {}
  @wire.$el('button[lang=""]') get $buttonAuto () {}
  @wire.$el('button[lang="en"]') get $buttonEn () {}
  @wire.$el('button[lang="ja"]') get $buttonJa () {}

  __init__ () {
    this.el.classList.add('is-model-observer')
  }

  @emit('switch-language')
  @on.click onClick (e) {
    return $(e.target).attr('lang')
  }

  @on('model-update') update (e) {
    const { EN, JA } = e.detail.domain.Language
    const language = e.detail.user.settings.language

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
