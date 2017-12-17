const {
  domain,
  Page,
  Action: {
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

const { emits, component, notifies } = capsid
const { store, dispatches, action } = require('evex')

/**
 * The hub of the all models handled in this app.
 */
@component('js-model-hub')
@store({ modules: [
  require('./app-state'),
  require('./user'),
  require('./language'),
  require('./journal-document'),
  require('./chart'),
  require('./location'),
  require('./trade')
] })
class ModelHub {
  constructor () {
    this.user = null
    this.domain = domain
    this.userRepository = new this.domain.User.Repository()
    this.journalRepository = new this.domain.Journal.Repository()
    this.languageReady = new Promise(resolve => { this.resolveLanguageReady = resolve })
  }

  @dispatches(HUB_READY)
  async __init__ () {}

  @action(MODEL_SAVE)
  async onModelSave (hub, { detail }) {
    await this.save()

    if (detail && detail.reload) {
      this.locationReload()
    } else if (detail && detail.replace) {
      this.locationReplace(detail.replace)
    } else {
      this.notifyUpdate()
    }
  }

  locationReload () {
    window.location.reload()
  }

  locationReplace (path) {
    window.location.replace(path)
  }

  async save () {
    const promises =  [
      this.userRepository.save(this.user)
    ]

    if (this.currentJournal) {
      promises.push(this.journalRepository.save(this.currentJournal))
    }

    await Promise.all(promises)
  }

  @notifies(MODEL_UPDATE, '.is-model-observer')
  async notifyUpdate () {
    await this.languageReady // wait until i18n resource ready

    return this
  }

  @action(HUB_READY)
  @dispatches(INIT_APP_STATE)
  hubReadyToInitAppState () {}

  @action(APP_STATE_READY)
  @dispatches(INIT_USER)
  appStateReadyToInitUser () {}

  @action(USER_READY)
  @dispatches(INIT_CHART)
  @dispatches(INIT_LANGUAGE)
  userReadyToInitChart () {}

  @action(UI_LANGUAGE_READY)
  onLanguageReady () {
    this.resolveLanguageReady()
  }

  @action(CHART_READY)
  @dispatches(CHECK_LOCATION)
  chartsReadyToCheckLocation () {}

  @action(LOCATION_OK)
  @dispatches(MODEL_SAVE)
  locationOkToModelSave () {
  }

  @action(LOCATION_NG)
  @dispatches(MODEL_SAVE)
  locationNgToModelSave () {
    return { replace: Page.APP_SETTINGS }
  }
}

module.exports = ModelHub
