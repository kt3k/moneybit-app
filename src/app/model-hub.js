const InitService = require('./init-service')
const { User } = require('../domain')
const EventEmitter = require('events')


/**
 * The hub of the all models handled in this app.
 */
class ModelHub extends EventEmitter {
  constructor () {
    super()
    this.initService = new InitService()
    this.user = null
    this.userRepository = new User.Repository()
  }

  async init () {
    this.user = await this.initService.init()
    this.emit('changed', this.user)
  }

  async save () {
    await Promise.all([this.userRepository.save(this.user)])
  }
}

module.exports = ModelHub
