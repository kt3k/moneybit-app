const domain = require('../domain')
const { User } = domain
const { Page } = require('../const')

const {
  actions: {
    HUB_READY,
    MODEL_SAVE,
    MODEL_UPDATE,
    INIT_APP_STATE,
    APP_STATE_READY,
    INIT_USER,
    USER_READY,
    INIT_LANGUAGE,
    UI_LANGUAGE_READY,
    INIT_CHART,
    CHART_READY,
    CHECK_LOCATION,
    LOCATION_OK,
    LOCATION_NG
  }
} = require('~')

const { emits, on, component, mount, notifies } = capsid

/**
 * The hub of the all models handled in this app.
 */
@component('js-model-hub')
class ModelHub {
  constructor () {
    this.user = null
    this.userRepository = new User.Repository()
    this.domain = domain
    this.languageReady = new Promise(resolve => { this.resolveLanguageReady = resolve })
  }

  @emits(HUB_READY)
  __init__ () {
    mount(require('./app-state'), this.el)
    mount(require('./user'), this.el)
    mount(require('./language'), this.el)
    mount(require('./journal-document'), this.el)
    mount(require('./chart'), this.el)
    mount(require('./location'), this.el)
    mount(require('./trade'), this.el)
  }

  @on(MODEL_SAVE)
  async onModelSave ({ detail }) {
    await this.save()

    if (detail && detail.reload) {
      window.location.reload()
    } else if (detail && detail.replace) {
      window.location.replace(detail.replace)
    } else {
      this.notifyUpdate()
    }
  }

  async save () {
    await Promise.all([
      this.userRepository.save(this.user)
    ])
  }

  @notifies(MODEL_UPDATE, '.is-model-observer')
  async notifyUpdate () {
    await this.languageReady // wait until i18n resource ready

    return this
  }

  @on(HUB_READY)
  @emits(INIT_APP_STATE)
  hubReadyToInitAppState () {}

  @on(APP_STATE_READY)
  @emits(INIT_USER)
  appStateReadyToInitUser () {}

  @on(USER_READY)
  @emits(INIT_CHART)
  @emits(INIT_LANGUAGE)
  userReadyToInitChart () {}

  @on(UI_LANGUAGE_READY)
  onLanguageReady () {
    this.resolveLanguageReady()
  }

  @on(CHART_READY)
  @emits(CHECK_LOCATION)
  chartsReadyToCheckLocation () {}

  @on(LOCATION_OK)
  @emits(MODEL_SAVE)
  locationOkToModelSave () {
  }

  @on(LOCATION_NG)
  @emits(MODEL_SAVE)
  locationNgToModelSave () {
    return { replace: Page.APP_SETTINGS }
  }
}

module.exports = ModelHub
