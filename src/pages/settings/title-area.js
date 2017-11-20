const { emits, on, notifies, wire, component } = capsid
const {
  actions: {
    MODEL_UPDATE,
    UPDATE_CURRENT_DOCUMENT
  }
} = require('~')
const { OPEN, CLOSE, INPUT } = require('../../common/molecules/input-modal')

@component('settings-title-area')
class TitleArea {
  @wire.el('.journal-title') get title () {}
  @wire.el('.input-modal') get inputModal () {}

  @on(MODEL_UPDATE)
  @notifies(CLOSE, '.input-modal')
  onModelUpdate ({ detail: { user } }) {
    this.title.textContent = user.currentDocument.title
  }

  @notifies(OPEN, '.input-modal')
  @on('click', { at: 'button.opens-input-modal' })
  onClickButton () {
    return this.title.textContent
  }

  @on(INPUT)
  @emits(UPDATE_CURRENT_DOCUMENT)
  onInput ({ detail: title }) {
    return { title }
  }
}

module.exports = TitleArea
