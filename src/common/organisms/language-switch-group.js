const { component, on, emits, wired } = capsid
const {
  actions: { SWITCH_LANGUAGE, MODEL_UPDATE }
} = require('~')

@component('js-language-switch-group')
class LanguageSwitchGroup {
  @wired.all('button') buttons

  @wired('button[lang=""]') buttonAuto

  @wired('button[lang="en"]') buttonEn

  @wired('button[lang="ja"]') buttonJa

  __mount__ () {
    this.el.classList.add('is-model-observer')
  }

  @on.click
  @emits(SWITCH_LANGUAGE)
  onClick (e) {
    return $(e.target).attr('lang')
  }

  @on(MODEL_UPDATE)
  update (e) {
    const { domain, user } = e.detail
    const { EN, JA } = domain.Language
    const { language } = user.settings

    const isActive = 'is-primary'
    this.buttons.forEach(btn => {
      btn.classList.remove(isActive)
    })

    if (language === EN) {
      this.buttonEn.classList.add(isActive)
    } else if (language === JA) {
      this.buttonJa.classList.add(isActive)
    } else {
      this.buttonAuto.classList.add(isActive)
    }
  }
}

module.exports = LanguageSwitchGroup
