const {
  Page,
  Action: {
    CHECK_LOCATION,
    LOCATION_OK,
    LOCATION_NG
  }
} = require('~')

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
    return MAIN_PAGES.indexOf(pathname) >= 0
  }

  @action(CHECK_LOCATION)
  checkLocation (hub) {
    const { pathname } = window.location

    if (hub.user.currentDocument) {
      // If current document exists, then all pages are accesible
      return this.locationOk()
    }

    if (!this.isMainPage(pathname)) {
      // If it's not main page, then page is accessible
      return this.locationOk()
    }

    this.locationNg()
  }

  @dispatches(LOCATION_OK)
  locationOk () {}

  @dispatches(LOCATION_NG)
  locationNg () {}
}

module.exports = LocationModule
