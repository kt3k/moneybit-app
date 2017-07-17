const InitService = require('./init-service')
const domain = require('../domain')
const { User } = require('../domain')

const { on, component, wire, make } = capsid

const MODEL_SAVE = 'mb/model/SAVE'
const MODEL_SAVE_AND_RELOAD = 'mb/model/SAVE_AND_RELOAD'
const MODEL_UPDATE = 'mb/model/UPDATE'

/**
 * The hub of the all models handled in this app.
 */
@component('js-model-hub')
class ModelHub {
  @wire.elAll('.is-model-observer') get observers () {}

  constructor () {
    this.user = null
    this.domain = domain
  }

  async __init__ () {
    make('language-module', this.el)

    this.user = await new InitService().init()

    this.notifyUpdate()
  }

  @on(MODEL_SAVE) async onModelSave () {
    await this.save()

    this.notifyUpdate()
  }

  @on(MODEL_SAVE_AND_RELOAD) async onModelSave () {
    await this.save()

    window.location.reload()
  }

  notifyUpdate () {
    this.notifyEvent(MODEL_UPDATE, { detail: this, bubbles: false })
  }

  notifyEvent (event, options) {
    this.observers.forEach(node => node.dispatchEvent(new CustomEvent(event, options)))
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
