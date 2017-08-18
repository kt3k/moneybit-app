const InitService = require('./init-service')
const domain = require('../domain')

const { MODEL_SAVE, MODEL_SAVE_AND_RELOAD, MODEL_UPDATE } = require('./action-types')

require('./modules/language')
require('./modules/journal-document')

const { on, component, wire, make, pub } = capsid

/**
 * The hub of the all models handled in this app.
 */
@component('js-model-hub')
class ModelHub {
  constructor () {
    this.user = null
    this.domain = domain
  }

  async __init__ () {
    make('language-module', this.el)
    make('journal-module', this.el)

    this.user = await new InitService().init()

    this.notifyUpdate()
  }

  @on(MODEL_SAVE) async onModelSave () {
    await this.save()

    this.notifyUpdate()
  }

  @on(MODEL_SAVE_AND_RELOAD) async onModelSaveAndReload () {
    await this.save()

    window.location.reload()
  }

  @pub(MODEL_UPDATE, '.is-model-observer')
  notifyUpdate () {
    return this
  }

  async save () {
    const userRepository = new this.domain.User.Repository()

    await Promise.all([
      userRepository.save(this.user)
    ])
  }
}

module.exports = ModelHub
module.exports.MODEL_SAVE = MODEL_SAVE
module.exports.MODEL_SAVE_AND_RELOAD = MODEL_SAVE_AND_RELOAD
module.exports.MODEL_UPDATE = MODEL_UPDATE
