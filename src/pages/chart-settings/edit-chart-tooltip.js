const { component, on, emits, wired } = capsid

const {
  OPEN_EDIT_MODAL,
  OPEN_DELETE_MODAL,
  OPEN_TOOLTIP
} = require('./event-types')
const CLASS_IS_VISIBLE = 'is-visible'

@component('edit-chart-tooltip')
class EditChartTooltip {
  @wired('.edit-chart-tooltip__edit-button') editButton
  @wired('.edit-chart-tooltip__delete-button') deleteButton
  @wired('.edit-chart-tooltip__message') message

  @on.click.at('.is-primary')
  @emits(OPEN_EDIT_MODAL)
  onClickEdit () {}

  @on.click.at('.is-danger')
  @emits(OPEN_DELETE_MODAL)
  onClickDelete () {
    return {
      message: `Are you sure deleting "${this.typeName}"?`,
      needsInput: false,
      onDelete: () => this.deleteAccountType(this.typeName)
    }
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
