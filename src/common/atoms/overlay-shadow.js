const { on, component } = capsid

@component('overlay-shadow')
class OverlayShadow {
  @on(Action.UI_SHOW)
  show () {
    this.el.classList.add('is-visible')
  }

  @on(Action.UI_HIDE)
  hide () {
    this.el.classList.remove('is-visible')
  }
}

module.exports = OverlayShadow
