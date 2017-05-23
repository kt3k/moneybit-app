const { component, on } = capsid

@component('app-menu-btn')
class AppMenu {
  @on('click') open () {
    $('.app-menu-dropdown').toggleClass('is-visible')
  }
}
