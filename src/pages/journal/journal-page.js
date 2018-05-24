const { component, on, wired, notifies } = capsid
const { SHOW, HIDE } = require('./new-item-card')

@component('journal-page')
export class JournalPage {
  @wired('.new-item-card-wrapper')
  get newItemWrapper () {}

  @wired('.add-entry-button')
  get addEntryButton () {}

  @on('click', { at: '.add-entry-button' })
  @notifies(Action.UI_SHOW, '.modal-overlay-shadow')
  onClick () {
    this.newItemWrapper.dispatchEvent(new CustomEvent(SHOW))
    this.addEntryButton.setAttribute('disabled', 'disabled')
  }

  @on(HIDE)
  @notifies(Action.UI_HIDE, '.modal-overlay-shadow')
  onHideNewItemCard () {
    this.addEntryButton.removeAttribute('disabled')
  }
}
