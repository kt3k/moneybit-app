const { component, on, wired, notifies } = capsid
const { SHOW, HIDE } = require('./edit-item-card')

@component('journal-page')
export class JournalPage {
  @wired('.edit-item-card-wrapper')
  get editItemWrapper () {}

  @wired('.add-entry-button')
  get addEntryButton () {}

  @on('click', { at: '.add-entry-button' })
  @notifies(Action.UI_SHOW, '.modal-overlay-shadow')
  onClick () {
    this.editItemWrapper.dispatchEvent(new CustomEvent(SHOW))
    this.addEntryButton.setAttribute('disabled', 'disabled')
  }

  @on(HIDE)
  @notifies(Action.UI_HIDE, '.modal-overlay-shadow')
  onHideNewItemCard () {
    this.addEntryButton.removeAttribute('disabled')
  }
}
