const { component, on, emits, wired } = capsid

export const SHOW = 'mb/edit-item-card/SHOW'
export const HIDE = 'mb/edit-item-card/HIDE'
export const RESET_SCROLL = 'mb/edit-item-card-wrapper/RESET_SCROLL'

const { LOCK, UNLOCK } = global.capsidScrollLock
const CLASS_VISIBLE = 'is-visible'

@component('edit-item-card-wrapper')
export default class EditItemCardWrapper {
  @wired.component('edit-item-card')
  get card () {}

  @on(RESET_SCROLL)
  resetScroll () {
    this.el.scrollTop = 0
  }

  @on(SHOW)
  @emits(LOCK)
  show () {
    this.el.classList.add(CLASS_VISIBLE)
    this.card.resetHtml()
  }

  @on(HIDE)
  @emits(UNLOCK)
  hide () {
    this.el.classList.remove(CLASS_VISIBLE)
  }
}
