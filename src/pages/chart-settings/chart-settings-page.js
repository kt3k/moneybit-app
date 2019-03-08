const { component, on, wired } = capsid

@component('chart-settings-page')
class ChartSettingsPage {
  @wired('.edit-tooltip') editTooltip

  @on('open-tooltip')
  openTooltip ({ detail: { id } }) {
    this.editTooltip.dataset.popperRef = `[id="${id}"]`
    this.editTooltip.dispatchEvent(new CustomEvent(capsidPopper.UPDATE))
    this.editTooltip.classList.add('is-visible')
  }
}

module.exports = ChartSettingsPage
