const InitService = require('./init-service')
const domain = require('../domain')
const { User } = require('../domain')

const { component, wire } = capsid

/**
 * The hub of the all models handled in this app.
 */
@component('js-model-hub')
class ModelHub {

  @wire.elAll('.is-model-observer') get observers () {}

  constructor () {
    this.user = null
    this.userRepository = new User.Repository()
    this.domain = domain
  }

  async __init__ () {
    this.user = await new InitService().init()

    this.notifyUpdate()
  }

  notifyUpdate () {
    this.observers.forEach(node => {
      node.dispatchEvent(new CustomEvent('model-update', {
        detail: this,
        bubbles: false
      }))
    })
  }

  async save () {
    await Promise.all([this.userRepository.save(this.user)])
  }
}

module.exports = ModelHub
