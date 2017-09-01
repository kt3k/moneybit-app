const AppState = require('./app-state')

class AppStateFactory {
  createFromObject (obj) {
    return new AppState(obj)
  }
}

module.exports = AppStateFactory
