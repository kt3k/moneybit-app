const {
  capsid: { make }
} = require('~')
const { describe, it, beforeEach } = require('kocha')
const genel = require('genel')
const assert = require('assert')

require('../journal-page')

let el
let comp

describe('journal-page component', () => {
  beforeEach(() => {
    el = genel.div`
      <div class="edit-item-card-wrapper"></div>
      <button class="add-entry-button"></button>
    `
    comp = make('journal-page', el)
  })

  describe('onClick', () => {
    it('disables add-entry-button', () => {
      comp.onClickAddEntryButton()
      assert(comp.addEntryButton.getAttribute('disabled') === 'disabled')
    })
  })

  describe('onHideNewItemCard', () => {
    it('enables add-entry-button', () => {
      comp.addEntryButton.setAttribute('disabled', 'disabled')
      comp.onHideNewItemCard()
      assert(!comp.addEntryButton.getAttribute('disabled'))
    })
  })
})
