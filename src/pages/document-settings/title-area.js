const { emits, on, notifies, wired, component } = capsid
const {
  actions: { MODEL_UPDATE, UPDATE_CURRENT_DOCUMENT }
} = require('~')
const { OPEN, CLOSE } = require('../../common/molecules/input-modal')

@component('settings-title-area')
class TitleArea {
  @wired('.journal-title') title

  @wired('.input-modal') inputModal

  @on(MODEL_UPDATE)
  @notifies(CLOSE, '.input-modal')
  onModelUpdate ({ detail: { user } }) {
    this.title.textContent = user.currentDocument.title
  }

  @notifies(OPEN, '.input-modal')
  @on('click', { at: 'button.opens-input-modal' })
  onClickButton () {
    return {
      message: t10.t('app.document.input_title'),
      value: this.title.textContent,
      onSave: value => this.onInput(value)
    }
  }

  @emits(UPDATE_CURRENT_DOCUMENT)
  onInput (title) {
    return { title }
  }
}

module.exports = TitleArea
