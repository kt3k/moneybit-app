const domain = require('../domain')
const { User } = domain

const {
  HUB_READY,
  MODEL_SAVE,
  MODEL_UPDATE,
  INIT_APP_STATE,
  APP_STATE_READY,
  INIT_USER,
  USER_READY,
  INIT_LANGUAGE,
  INIT_CHART,
  CHART_READY
} = require('./action-types')

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
  }

  @emits(HUB_READY)
  __init__ () {
    mount(require('./modules/app-state'), this.el)
    mount(require('./modules/user'), this.el)
    mount(require('./modules/language'), this.el)
    mount(require('./modules/journal-document'), this.el)
    mount(require('./modules/chart'), this.el)
  }

  @on(MODEL_SAVE)
  async onModelSave (e) {
    await this.save()

    if (e.detail && e.detail.reload) {
      window.location.reload()
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
  notifyUpdate () {
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

  @on(CHART_READY)
  @emits(MODEL_SAVE)
  chartsReadyToModelSave () {}
}

module.exports = ModelHub
