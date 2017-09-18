const { on, wire, component } = capsid
const { MODEL_UPDATE } = require('../../app/action-types')

@component('settings-title-area')
class TitleArea {
  @wire.el('.journal-title') get title () {}

  @on(MODEL_UPDATE)
  onModelUpdate ({ detail: { user } }) {
    this.title.textContent = user.currentDocument.title
  }
}

module.exports = TitleArea
