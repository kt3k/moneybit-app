const { component, on, wired } = capsid

const CLASS_IS_VISIBLE = 'is-visible'

@component('edit-chart-tooltip')
class EditChartTooltip {
  @wired('.edit-chart-tooltip__edit-button') editButton
  @wired('.edit-chart-tooltip__delete-button') deleteButton
  @wired('.edit-chart-tooltip__message') message

  @on.click.at('.is-primary')
  onClickEdit () {
    console.log('EDIT')
  }

  @on.click.at('.is-danger')
  onClickDelete () {
    console.log('DELETE')
  }

  @on('open-tooltip')
  onOpenTooltip ({ detail: { id, typeName, disabled } }) {
    this.el.dataset.popperRef = `[id="${id}"]`
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
