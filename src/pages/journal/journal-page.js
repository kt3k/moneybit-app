const { capsid: { component, on, wired } } = require('~')
const { SHOW, HIDE } = require('./new-item-card')

@component('journal-page')
export class JournalPage {
  @wired('.new-item-card-wrapper')
  get newItemWrapper () {}

  @wired('.add-entry-button')
  get addEntryButton () {}

  @on('click', { at: '.add-entry-button' })
  onClick () {
    this.newItemWrapper.dispatchEvent(new CustomEvent(SHOW))
    this.addEntryButton.setAttribute('disabled', 'disabled')
  }

  @on(HIDE)
  onHideNewItemCard () {
    this.addEntryButton.removeAttribute('disabled')
  }
}
