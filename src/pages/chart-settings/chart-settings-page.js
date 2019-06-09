const { component, on, wired, notifies } = capsid

const {
  OPEN_EDIT_MODAL,
  OPEN_DELETE_MODAL,
  OPEN_CREATE_MODAL,
  OPEN_TOOLTIP
} = require('./event-types')

@component('chart-settings-page')
class ChartSettingsPage {
  @wired('.edit-chart-tooltip') editTooltip

  @on(OPEN_TOOLTIP)
  @notifies(OPEN_TOOLTIP, '.edit-chart-tooltip')
  openTooltip ({ detail }) {
    return detail
  }

  @on(OPEN_EDIT_MODAL)
  @notifies(OPEN_EDIT_MODAL, '.is-open-modal-observer')
  @notifies(Action.UI_SHOW, '.overlay-shadow')
  onOpenEditModal ({ detail }) {
    return detail
  }

  @on(OPEN_DELETE_MODAL)
  @notifies(OPEN_DELETE_MODAL, '.is-open-modal-observer')
  @notifies(Action.UI_SHOW, '.overlay-shadow')
  onOpenDeleteModal ({ detail }) {
    return detail
  }

  @on(OPEN_CREATE_MODAL)
  @notifies(OPEN_CREATE_MODAL, '.is-open-modal-observer')
  @notifies(Action.UI_SHOW, '.overlay-shadow')
  onOpenCreateModal ({ detail }) {
    return detail
  }

  // TODO: use constants
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
