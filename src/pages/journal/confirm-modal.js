const { component, emits, on, wired } = capsid

export const SHOW = 'mb/confirm-modal/SHOW'
export const HIDE = 'mb/confirm-modal/HIDE'

const CLASS_VISIBLE = 'is-visible'

@component('confirm-modal')
export default class ConfirmModal {
  @wired('.confirm-modal__message')
  get message () {}

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
