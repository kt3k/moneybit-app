const { domain: { Currency } } = require('~')
const { component } = capsid

@component('js-currency-select')
class CurrencySelect {
  __init__ () {
    Currency.CURRENCIES.forEach(currency => {
      const label = `${currency.symbol} - ${currency.code}`

      this.$el.append(
        $('<option/>')
          .attr('value', currency.code)
          .text(label)
      )
    })
  }
}

module.exports = CurrencySelect
