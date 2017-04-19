class Currency {
  constructor ({ name, code, symbol }) {
    this.name = name
    this.code = code
    this.symbol = symbol
  }
}

Currency.BGP = new Currency({ name: 'British Pound', code: 'BGP', symbol: '£' })
Currency.JPY = new Currency({ name: 'Japanese Yen', code: 'JPY', symbol: '¥' })
Currency.USD = new Currency({ name: 'US Dollar', code: 'USD', symbol: '$' })

module.exports = Currency
