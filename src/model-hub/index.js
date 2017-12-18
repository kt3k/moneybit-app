const {
  domain,
  Page,
  Action
} = require('~')

const { component, notifies } = capsid
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

  @dispatches(Action.HUB_READY)
  async __init__ () {}

  @action(Action.MODEL_SAVE)
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
    const promises = [
      this.userRepository.save(this.user)
    ]

    if (this.currentJournal) {
      promises.push(this.journalRepository.save(this.currentJournal))
    }

    await Promise.all(promises)
  }

  @notifies(Action.MODEL_UPDATE, '.is-model-observer')
  async notifyUpdate () {
    await this.languageReady // wait until i18n resource ready

    return this
  }

  @action(Action.HUB_READY)
  @dispatches(Action.INIT_APP_STATE)
  hubReadyToInitAppState () {}

  @action(Action.APP_STATE_READY)
  @dispatches(Action.INIT_USER)
  appStateReadyToInitUser () {}

  @action(Action.USER_READY)
  @dispatches(Action.INIT_CHART)
  @dispatches(Action.INIT_LANGUAGE)
  userReadyToInitChart () {}

  @action(Action.UI_LANGUAGE_READY)
  onLanguageReady () {
    this.resolveLanguageReady()
  }

  @action(Action.CHART_READY)
  @dispatches(Action.CHECK_LOCATION)
  chartsReadyToCheckLocation () {}

  @action(Action.LOCATION_OK)
  @dispatches(Action.MODEL_SAVE)
  locationOkToModelSave () {
  }

  @action(Action.LOCATION_NG)
  @dispatches(Action.MODEL_SAVE)
  locationNgToModelSave () {
    return { replace: Page.APP_SETTINGS }
  }
}

module.exports = ModelHub
