const domain = require('../domain')
const { User } = domain

const { HUB_READY, MODEL_SAVE, MODEL_UPDATE } = require('./action-types')

require('./modules/app-state')
require('./modules/user')
require('./modules/language')
require('./modules/journal-document')

const { emit, on, component, make, pub } = capsid

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

  @emit(HUB_READY)
  async __init__ () {
    make('app-state-module', this.el)
    make('user-module', this.el)
    make('language-module', this.el)
    make('journal-document-module', this.el)
  }

  @on(MODEL_SAVE) async onModelSave (e) {
    await this.save()

    if (e.detail && e.detail.reload) {
      window.location.reload()
    } else {
      this.notifyUpdate()
    }
  }

  @pub(MODEL_UPDATE, '.is-model-observer')
  notifyUpdate () {
    return this
  }

  async save () {
    await Promise.all([
      this.userRepository.save(this.user)
    ])
  }
}

module.exports = ModelHub
