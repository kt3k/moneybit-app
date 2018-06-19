const { Page, Action } = require('~')

const { action, dispatches } = require('evex')

// These pages don't work without current document set.
const MAIN_PAGES = [
  Page.BS,
  Page.JOURNAL,
  Page.SETTINGS,
  Page.EDIT_CHART_OF_ACCOUNTS
]

/*
// These pages work without current document set.
const LANDING_PAGES = [
  Page.NEW,
  Page.APP_SETTINGS
]
*/

class LocationModule {
  isMainPage (pathname) {
    if (/\/$/.test(pathname)) {
      pathname = pathname + 'index.html'
    }
    console.log(MAIN_PAGES)
    return MAIN_PAGES.find(page => pathname.includes(page))
  }

  /**
   * @param {domain.User} user The user
   */
  @action(Action.CHECK_LOCATION)
  checkLocation ({ user, location }) {
    const { pathname } = location

    if (user.currentDocument) {
      // If current document exists, then all pages are accesible
      return this.locationOk()
    }

    if (!this.isMainPage(pathname)) {
      // If it's not main page, then page is accessible
      return this.locationOk()
    }

    this.locationNg()
  }

  @dispatches(Action.LOCATION_OK)
  locationOk () {}

  @dispatches(Action.LOCATION_NG)
  locationNg () {}
}

module.exports = LocationModule
