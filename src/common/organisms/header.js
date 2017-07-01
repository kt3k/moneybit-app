const { component, on } = capsid

@component('app-menu-btn')
class AppMenu {
  __init__ () {
    $('body').on('click', e => {
      if ($(e.target).closest('.app-menu-dropdown').length === 0) {
        this.close()
      }
    })

    this.transitioning = false

    this.$target = $('.app-menu-dropdown')
      .on('transitionend', e => {
        if (e.originalEvent.propertyName !== 'opacity') {
          return
        }

        this.transitioning = false

        if (!this.$target.hasClass('is-visible')) {
          this.$target.css('display', 'none')
        }
      })
  }

  @on('click') open (e) {
    if (this.transitioning) { return }
    if (this.$target.hasClass('is-visible')) { return }
    this.transitioning = true

    e.stopPropagation()

    this.$target.css('display', 'block')
    requestAnimationFrame(() => this.$target.addClass('is-visible'))
  }

  close () {
    if (this.transitioning) { return }
    if (!this.$target.hasClass('is-visible')) { return }
    this.transitioning = true

    this.$target.removeClass('is-visible')
  }
}

module.exports = AppMenu
