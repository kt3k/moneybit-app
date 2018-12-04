const { component, on, wired, notifies } = capsid
const {
  SHOW: SHOW_EDIT_ITEM_CARD,
  HIDE: HIDE_EDIT_ITEM_CARD
} = require('./edit-item-card')
const {
  SHOW: SHOW_CONFIRM_MODAL,
  HIDE: HIDE_CONFIRM_MODAL
} = require('./confirm-modal.js')
const { REQUEST_EDIT } = require('./trade-card')

@component('journal-page')
class JournalPage {
  @wired('.edit-item-card-wrapper') editItemWrapper

  @wired('.add-entry-button') addEntryButton

  @on('click', { at: '.add-entry-button' })
  onClickAddEntryButton () {
    this.openEditItemCard(null) // creates new entry
  }

  @on(REQUEST_EDIT)
  onClickEditButton ({ detail: { trade } }) {
    this.openEditItemCard(trade) // start editing the item
  }

  /**
   * @param {Trade | null} tradeId
   */
  @notifies(Action.UI_SHOW, '.modal-overlay-shadow')
  openEditItemCard (trade) {
    this.editItemWrapper.dispatchEvent(
      new CustomEvent(SHOW_EDIT_ITEM_CARD, { detail: { trade } })
    )
    this.addEntryButton.setAttribute('disabled', 'disabled')
  }

  @on(HIDE_EDIT_ITEM_CARD)
  @notifies(Action.UI_HIDE, '.modal-overlay-shadow')
  onHideNewItemCard () {
    this.addEntryButton.removeAttribute('disabled')
  }

  @on(SHOW_CONFIRM_MODAL)
  @notifies(Action.UI_SHOW, '.confirm-modal-overlay-shadow')
  @notifies(SHOW_CONFIRM_MODAL, '.confirm-modal')
  openConfirmModal ({ detail }) {
    return detail
  }

  @on(HIDE_CONFIRM_MODAL)
  @notifies(Action.UI_HIDE, '.confirm-modal-overlay-shadow')
  hideConfirmModal () {}
}

module.exports = JournalPage
