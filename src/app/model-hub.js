const InitService = require('./init-service')
const domain = require('../domain')
const { User } = require('../domain')

const { on, component, wire } = capsid

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

  @on('switch-language') async onLanguageChange (e) {
    const code = e.detail
    const language = this.domain.Language.getByCode(code)

    this.user.settings.language = language
    await this.save()
    location.reload()
  }

  notifyUpdate () {
    this.notifyEvent('model-update', { detail: this, bubbles: false })
  }

  notifyEvent (event, options) {
    this.observers.forEach(node => {
      node.dispatchEvent(new CustomEvent(event, options))
    })
  }

  async save () {
    await Promise.all([this.userRepository.save(this.user)])
  }
}

module.exports = ModelHub
