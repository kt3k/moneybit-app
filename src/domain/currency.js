class Currency {
  constructor ({ name, code, symbol }) {
    this.name = name
    this.code = code
    this.symbol = symbol
  }
}

Currency.CURRENCIES = [
  Currency.USD = new Currency({ name: 'US dollar', code: 'USD', symbol: '$' }),
  Currency.JPY = new Currency({ name: 'Japanese yen', code: 'JPY', symbol: '¥' }),
  Currency.EUR = new Currency({ name: 'Euro', code: 'EUR', symbol: '€' }),
  Currency.BGP = new Currency({ name: 'Pound sterling', code: 'BGP', symbol: '£' }),
  Currency.AUD = new Currency({ name: 'Australian dollar', code: 'AUD', symbol: 'A$' }),
  Currency.CAD = new Currency({ name: 'Canadian dollar', code: 'CAD', symbol: 'C$' }),
  Currency.CHF = new Currency({ name: 'Swiss franc', code: 'CHF', symbol: 'Fr' }),
  Currency.CNY = new Currency({ name: 'Renminbi', code: 'CNY', symbol: '元' }),
  Currency.SEK = new Currency({ name: 'Swedish krona', code: 'SEK', symbol: 'kr' }),
  Currency.NZD = new Currency({ name: 'New Zealand dollar', code: 'NZD', symbol: 'NZ$' }),
  Currency.MXN = new Currency({ name: 'Mexican peso', code: 'MXN', symbol: '$' }),
  Currency.SGD = new Currency({ name: 'Singapore dollar', code: 'SGD', symbol: 'S$' }),
  Currency.HKD = new Currency({ name: 'Hong Kong dollar', code: 'HKD', symbol: 'HK$' }),
  Currency.NOK = new Currency({ name: 'Norwegian krone', code: 'NOK', symbol: 'kr' }),
  Currency.KRW = new Currency({ name: 'South Korean won', code: 'KRW', symbol: '₩' }),
  Currency.TRY = new Currency({ name: 'Turkish lira', code: 'TRY', symbol: '₺' }),
  Currency.RUB = new Currency({ name: 'Russian ruble', code: 'RUB', symbol: '₽' }),
  Currency.INR = new Currency({ name: 'Indian rupee', code: 'INR', symbol: '₹' }),
  Currency.BRL = new Currency({ name: 'Brazilian real', code: 'BRL', symbol: 'R$' }),
  Currency.ZAR = new Currency({ name: 'South African rand', code: 'ZAR', symbol: 'R' })
]

module.exports = Currency
