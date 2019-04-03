const { component, on, wired, notifies } = capsid

@component('chart-settings-page')
class ChartSettingsPage {
  @wired('.edit-chart-tooltip') editTooltip

  @on('open-tooltip')
  @notifies('open-tooltip', '.edit-chart-tooltip')
  openTooltip ({ detail }) {
    return detail
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
