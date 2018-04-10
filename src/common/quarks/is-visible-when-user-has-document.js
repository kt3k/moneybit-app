const { Action: { MODEL_UPDATE } } = require('~')
const { component, on } = capsid

@component('is-visible-when-user-has-document')
class IsVisibleWhenUserHasDocument {
  __mount__ () {
    this.el.classList.add('is-model-observer')
  }

  @on(MODEL_UPDATE)
  onUpdate ({ detail: { user } }) {
    this.el.style.visibility = user.hasDocument() ? 'visible' : 'hidden'
  }
}

module.exports = IsVisibleWhenUserHasDocument
