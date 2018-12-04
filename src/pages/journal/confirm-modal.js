const { component, emits, on, wired } = capsid

const SHOW = 'mb/confirm-modal/SHOW'
const HIDE = 'mb/confirm-modal/HIDE'

const CLASS_VISIBLE = 'is-visible'

@component('confirm-modal')
class ConfirmModal {
  @wired('.confirm-modal__message') message

  @on(SHOW)
  show ({ detail: { message, onOk } }) {
    this.onOk = onOk
    this.message.textContent = message

    this.el.classList.add(CLASS_VISIBLE)
  }

  @on(HIDE)
  hide () {
    this.el.classList.remove(CLASS_VISIBLE)
  }

  @on.click.at('.confirm-modal__ok')
  @emits(HIDE)
  onClickOk () {
    if (typeof this.onOk === 'function') {
      this.onOk.call(null)
    }
  }

  @on.click.at('.confirm-modal__cancel')
  @emits(HIDE)
  onClickCancel () {}
}

module.exports = ConfirmModal
module.exports.SHOW = SHOW
module.exports.HIDE = HIDE
