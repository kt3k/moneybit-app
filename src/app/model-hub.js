const InitService = require('./init-service')
const domain = require('../domain')
const { User } = domain

const { MODEL_SAVE, MODEL_UPDATE } = require('./action-types')

require('./modules/language')
require('./modules/journal-document')

const { on, emit, component, make, pub } = capsid

/**
 * The hub of the all models handled in this app.
 */
@component('js-model-hub')
class ModelHub {
  constructor () {
    this.user = null
    this.userRepository = new User.Repository()
    this.domain = domain
    this.initService = new InitService()
  }

  @emit(MODEL_SAVE)
  async __init__ () {
    make('language-module', this.el)
    make('journal-document-module', this.el)

    this.user = await this.initService.init()
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
