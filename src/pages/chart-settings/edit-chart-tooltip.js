const { component, on, emits, wired } = capsid

const {
  OPEN_EDIT_MODAL,
  OPEN_DELETE_MODAL,
  OPEN_TOOLTIP
} = require('./event-types')

const CLASS_IS_VISIBLE = 'is-visible'
const SELECTOR_DELETE_BUTTON = '.edit-chart-tooltip__delete-button'
const SELECTOR_EDIT_BUTTON = '.edit-chart-tooltip__edit-button'

@component('edit-chart-tooltip')
class EditChartTooltip {
  @wired(SELECTOR_EDIT_BUTTON) editButton
  @wired(SELECTOR_DELETE_BUTTON) deleteButton
  @wired('.edit-chart-tooltip__message') message

  @on.click.at(SELECTOR_EDIT_BUTTON)
  @emits(OPEN_EDIT_MODAL)
  onClickEdit () {
    return {
      message: `Input a new name for "${this.typeName}"`, // TODO: i18n
      value: this.typeName,
      onSave: newName => this.editAccountType(this.typeName, newName)
    }
  }

  @on.click.at(SELECTOR_DELETE_BUTTON)
  @emits(OPEN_DELETE_MODAL)
  onClickDelete () {
    return {
      message: `Are you sure deleting "${this.typeName}"?`, // TODO: i18n
      needsInput: false,
      onDelete: () => this.deleteAccountType(this.typeName)
    }
  }

  @emits(Action.CHART_EDIT_ACCOUNT_TYPE)
  editAccountType (typeName, newName) {
    return { accountTypeName: typeName, newAccountTypeName: newName }
  }

  @emits(Action.CHART_DELETE_ACCOUNT_TYPE)
  deleteAccountType (typeName) {
    return { accountTypeName: typeName }
  }

  @on(OPEN_TOOLTIP)
  onOpenTooltip ({ detail: { id, typeName, disabled } }) {
    this.el.dataset.popperRef = `[id="${id}"]`
    this.typeName = typeName
    this.el.dispatchEvent(new CustomEvent(capsidPopper.UPDATE))
    if (disabled) {
      this.editButton.disabled = true
      this.deleteButton.disabled = true
      this.message.textContent =
        'You cannot modify the account type which is already used.'
      this.message.style.display = 'block'
    } else {
      this.editButton.disabled = false
      this.deleteButton.disabled = false
      this.message.textContent = ''
      this.message.style.display = 'none'
    }
    setTimeout(() => {
      this.el.classList.add(CLASS_IS_VISIBLE)
    })
  }

  @on.outside('click')
  onClickOutside () {
    if (this.el.classList.contains(CLASS_IS_VISIBLE)) {
      this.el.classList.remove(CLASS_IS_VISIBLE)
    }
  }
}

module.exports = EditChartTooltip
