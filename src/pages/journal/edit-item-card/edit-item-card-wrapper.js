const { component, on, emits, wired, notifies } = capsid

export const SHOW = 'mb/edit-item-card/SHOW'
export const HIDE = 'mb/edit-item-card/HIDE'
export const OPEN = 'mb/edit-item-card/OPEN'
export const RESET_SCROLL = 'mb/edit-item-card-wrapper/RESET_SCROLL'

const { LOCK, UNLOCK } = global.capsidScrollLock
const CLASS_VISIBLE = 'is-visible'

@component('edit-item-card-wrapper')
class EditItemCardWrapper {
  @wired.component('edit-item-card') card

  @on(RESET_SCROLL)
  resetScroll () {
    this.el.scrollTop = 0
  }

  @on(SHOW)
  @emits(LOCK)
  show ({ detail: { trade } }) {
    this.el.classList.add(CLASS_VISIBLE)
    this.openEditItemCard(trade)
  }

  @notifies(OPEN, '.edit-item-card')
  openEditItemCard (trade) {
    return { trade }
  }

  @on(HIDE)
  @emits(UNLOCK)
  hide () {
    this.el.classList.remove(CLASS_VISIBLE)
  }
}

module.exports = EditItemCardWrapper
