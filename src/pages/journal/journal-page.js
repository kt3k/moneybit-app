const { component, on, wired, notifies } = capsid
const { SHOW, HIDE } = require('./edit-item-card')

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

  @on('click', { at: '.trade-card__edit-item-button' })
  onClickEditButton (e) {
    e.preventDefault()
    this.openEditItemCard(e.target.dataset.tradeId) // start editing the item
  }

  /**
   * @param {string | null} tradeId
   */
  @notifies(Action.UI_SHOW, '.modal-overlay-shadow')
  openEditItemCard (tradeId) {
    console.log(`tradeId=${tradeId}`)
    this.editItemWrapper.dispatchEvent(
      new CustomEvent(SHOW, { detail: tradeId })
    )
    this.addEntryButton.setAttribute('disabled', 'disabled')
  }

  @on(HIDE)
  @notifies(Action.UI_HIDE, '.modal-overlay-shadow')
  onHideNewItemCard () {
    this.addEntryButton.removeAttribute('disabled')
  }
}
