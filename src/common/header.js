const { component, on } = capsid

@component('app-menu-btn')
class AppMenu {
  @on('click') open () {
    const $target = $('.app-menu-dropdown').css('display', 'block')

    setTimeout(() => {
      $target.toggleClass('is-visible')
      .on('transitionend', e => {
        if (!$target.hasClass('is-visible')) {
          $target.css('display', 'none')
        }
      })
    })
  }
}
