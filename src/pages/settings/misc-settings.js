const { wire, on, emits, component } = capsid
const {
  actions: { MODEL_UPDATE, UPDATE_CURRENT_DOCUMENT }
} = require('~')

@component
class MiscSettings {
  @wire.el('.misc-settings__currency')
  get currencyLabel () {}
  @wire.el('.misc-settings__comma-style select')
  get commaStyleSelectBox () {}
  @wire.el('.misc-settings__start-date input')
  get startDateInput () {}
  @wire.el('.misc-settings__end-date input')
  get endDateInput () {}

  @on(MODEL_UPDATE)
  onModelUpdate ({
    detail: {
      user: { currentDocument }
    }
  }) {
    const { currency, commaPeriodSetting, start, end } = currentDocument

    this.currencyLabel.textContent = `${currency.symbol} - ${currency.code}`
    this.commaStyleSelectBox.value = commaPeriodSetting.name
    this.startDateInput.value = start.format(t10.t('locale.date_format'))
    this.endDateInput.value = end.format(t10.t('locale.date_format'))
  }

  @on('change', { at: '.misc-settings__comma-style' })
  @emits(UPDATE_CURRENT_DOCUMENT)
  onCommaStyleChange (e) {
    return {
      commaPeriodSetting: e.target.value
    }
  }

  @on('input', { at: '.misc-settings__start-date' })
  @emits(UPDATE_CURRENT_DOCUMENT)
  onStartDateChange (e) {
    return {
      start: e.target.dataset.date
    }
  }

  @on('input', { at: '.misc-settings__end-date' })
  @emits(UPDATE_CURRENT_DOCUMENT)
  onEndDateChange (e) {
    return {
      end: e.target.dataset.date
    }
  }
}

module.exports = MiscSettings
