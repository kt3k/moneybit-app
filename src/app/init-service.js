const USER_ID = '1'

/**
 * The initialization service.
 *
 * This initializes the
 */
class InitService {
  /**
   * @return {Promise<User>}
   */
  initUser () {
    return new User.InitService().getOrCreate(USER_ID)
  }
}

module.exports = InitService
