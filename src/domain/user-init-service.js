const User = require('./user')
const UserSettings = require('./user-settings')

const repo = new User.Repository()

class UserInitService {
  /**
   * @param {string} id The id of the user
   * @return {User}
   */
  getOrCreate (id) {
    return repo.getById(id).then(user => user || this.createUser(id))
  }

  /**
   * @param {string} id The id
   * @return {User}
   */
  createUser (id) {
    return new User({
      id,
      documents: [],
      settings: this.createInitialSettings(),
      currentDocument: null
    })
  }

  createInitialSettings () {
    return new UserSettings({
      defaultChartId: null,
      language: null
    })
  }
}

module.exports = UserInitService
