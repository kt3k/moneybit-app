const InitService = require('./init-service')
const EventEmitter = require('events')

/**
 * The hub of the all models handled in this app.
 */
class ModelHub extends EventEmitter {
  constructor () {
    super()
    this.initService = new InitService()
    this.user = null
  }

  async init () {
    this.user = await this.initService.init()
    this.emit('changed', this.user)
  }
}

module.exports = ModelHub
