const { component, on, wired, notifies, emits } = capsid

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
  @notifies(Action.INPUT_MODAL_OPEN, '.input-modal')
  onOpenEditModal ({ detail }) {
    return detail
  }

  @on(OPEN_DELETE_MODAL)
  @notifies(Action.INPUT_MODAL_OPEN, '.input-modal')
  onOpenDeleteModal ({ detail }) {
    return detail
  }

  @on(OPEN_CREATE_MODAL)
  @notifies(Action.INPUT_MODAL_OPEN, '.input-modal')
  onOpenCreateModal ({ detail }) {
    return detail
  }

  @on.click.at('.set-default-button')
  @notifies(Action.INPUT_MODAL_OPEN, '.input-modal')
  onSetDefaultChart () {
    return {
      message: t10.t('app.chart.set_this_chart_as_default'),
      needsInput: false,
      onSave: () => {
        this.setDefaultChart(() => {
          // TODO: トーストにする
          alert('saved!')
        })
      }
    }
  }

  @emits(Action.CHART_SET_AS_DEFAULT)
  setDefaultChart (callback) {
    return { callback }
  }

  @notifies(Action.LEDGER_UPDATE, '.is-ledger-observer')
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
