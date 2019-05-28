const { component, on, wired, notifies } = capsid

const {
  OPEN_EDIT_MODAL,
  OPEN_DELETE_MODAL,
  OPEN_CREATE_MODAL
} = require('./event-types')

@component('chart-settings-page')
class ChartSettingsPage {
  @wired('.edit-chart-tooltip') editTooltip

  // TODO: create const for event type
  @on('open-tooltip')
  @notifies('open-tooltip', '.edit-chart-tooltip')
  openTooltip ({ detail }) {
    return detail
  }

  @on(OPEN_EDIT_MODAL)
  @notifies(OPEN_EDIT_MODAL)
  onOpenEditModal () {}

  @on(OPEN_DELETE_MODAL)
  @notifies(OPEN_DELETE_MODAL)
  onOpenDeleteModal () {}

  @on(OPEN_CREATE_MODAL)
  @notifies(OPEN_CREATE_MODAL)
  onOpenCreateModal () {}

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
