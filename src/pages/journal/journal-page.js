const { component, on, wired, notifies } = capsid
const { SHOW, HIDE } = require('./edit-item-card')
const { REQUEST_EDIT } = require('./trade-card')

@component('journal-page')
export class JournalPage {
  @wired('.edit-item-card-wrapper')
  get editItemWrapper () {}

  @wired('.add-entry-button')
  get addEntryButton () {}

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
      new CustomEvent(SHOW, { detail: { trade } })
    )
    this.addEntryButton.setAttribute('disabled', 'disabled')
  }

  @on(HIDE)
  @notifies(Action.UI_HIDE, '.modal-overlay-shadow')
  onHideNewItemCard () {
    this.addEntryButton.removeAttribute('disabled')
  }
}
