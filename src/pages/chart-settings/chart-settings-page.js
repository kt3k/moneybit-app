const { component, on, wired, notifies } = capsid

@component('chart-settings-page')
class ChartSettingsPage {
  @wired('.edit-chart-tooltip') editTooltip

  @on('open-tooltip')
  openTooltip ({ detail: { id } }) {
    this.editTooltip.dataset.popperRef = `[id="${id}"]`
    this.editTooltip.dispatchEvent(new CustomEvent(capsidPopper.UPDATE))
    this.editTooltip.classList.add('is-visible')
  }

  @notifies('ledger-update', '.is-ledger-observer')
  @on(Action.MODEL_UPDATE)
  onModelUpdate ({ detail: { currentChart, currentJournal, domain } }) {
    const ledger = currentJournal.toLedger(currentChart)

    return {
      ledger,
      currentChart,
      domain
    }
  }
}

module.exports = ChartSettingsPage
