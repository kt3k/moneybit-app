const { wire, on, component } = capsid
const { MODEL_UPDATE } = require('../../app/action-types')

@component
class MiscSettings {
  @wire.el('.misc-settings__currency') get currencyLabel () {}
  @wire.el('.misc-settings__comma-style select') get commaStyleSelectBox () {}
  @wire.el('.misc-settings__start-date input') get startDateInput () {}
  @wire.el('.misc-settings__end-date input') get endDateInput () {}

  @on(MODEL_UPDATE)
  onModelUpdate ({ detail: { user: { currentDocument } } }) {
    const { currency, commaPeriodSetting, start, end } = currentDocument

    this.currencyLabel.textContent = `${currency.symbol} - ${currency.code}`
    this.commaStyleSelectBox.value = commaPeriodSetting.name
    this.startDateInput.value = start.format('YYYY-MM-DD')
    this.endDateInput.value = end.format('YYYY-MM-DD')
  }
}

module.exports = MiscSettings
