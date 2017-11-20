const { wire, component, on, emits } = capsid
const {
  actions: {
    MODEL_UPDATE,
    CHANGE_CURRENT_DOCUMENT
  }
} = require('~')

const genel = require('genel')

@component('app-header')
class AppHeader {
  @wire.el('.journal-document-select')
  get select () {}

  @on(MODEL_UPDATE) onModelUpdate ({ detail: { user } }) {
    this.select.innerHTML = ``

    user.documents.forEach(document => {
      this.select.appendChild(genel`<option value="${document.id}">${document.title}</option>`)
    })

    this.select.value = user.currentDocument.id
  }

  @on('change')
  @emits(CHANGE_CURRENT_DOCUMENT)
  onDocumentChange ({ target: { value: selectedId } }) {
    return selectedId
  }
}

@component('app-menu-btn')
class AppMenu {
  __init__ () {
    $('body').on('click', e => {
      if ($(e.target).closest('.app-menu-dropdown').length === 0) {
        this.close()
      }
    })

    this.transitioning = false

    this.$target = $('.app-menu-dropdown')
      .on('transitionend', e => {
        if (e.originalEvent.propertyName !== 'opacity') {
          return
        }

        this.transitioning = false

        if (!this.$target.hasClass('is-visible')) {
          this.$target.css('display', 'none')
        }
      })
  }

  @on.click open (e) {
    if (this.transitioning) { return }
    if (this.$target.hasClass('is-visible')) { return }
    this.transitioning = true

    e.stopPropagation()

    this.$target.css('display', 'block')
    requestAnimationFrame(() => this.$target.addClass('is-visible'))
  }

  close () {
    if (this.transitioning) { return }
    if (!this.$target.hasClass('is-visible')) { return }
    this.transitioning = true

    this.$target.removeClass('is-visible')
  }
}

module.exports = AppMenu
module.exports.AppHeader = AppHeader
