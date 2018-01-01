class Currency {
  constructor ({ name, code, symbol, r }) {
    this.name = name
    this.code = code
    this.symbol = symbol
    this.ratioToMinimumCurrency = r
  }
}

Currency.CURRENCIES = [
  (Currency.USD = new Currency({
    name: 'US dollar',
    code: 'USD',
    symbol: '$',
    r: 100
  })),
  (Currency.JPY = new Currency({
    name: 'Japanese yen',
    code: 'JPY',
    symbol: '¥',
    r: 1
  })),
  (Currency.EUR = new Currency({
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
    r: 100
  })),
  (Currency.BGP = new Currency({
    name: 'Pound sterling',
    code: 'BGP',
    symbol: '£',
    r: 100
  })),
  (Currency.AUD = new Currency({
    name: 'Australian dollar',
    code: 'AUD',
    symbol: 'A$',
    r: 100
  })),
  (Currency.CAD = new Currency({
    name: 'Canadian dollar',
    code: 'CAD',
    symbol: 'C$',
    r: 100
  })),
  (Currency.CHF = new Currency({
    name: 'Swiss franc',
    code: 'CHF',
    symbol: 'Fr',
    r: 100
  })),
  (Currency.CNY = new Currency({
    name: 'Renminbi',
    code: 'CNY',
    symbol: '元',
    r: 100
  })),
  (Currency.SEK = new Currency({
    name: 'Swedish krona',
    code: 'SEK',
    symbol: 'kr',
    r: 100
  })),
  (Currency.NZD = new Currency({
    name: 'New Zealand dollar',
    code: 'NZD',
    symbol: 'NZ$',
    r: 100
  })),
  (Currency.MXN = new Currency({
    name: 'Mexican peso',
    code: 'MXN',
    symbol: '$',
    r: 1
  })),
  (Currency.SGD = new Currency({
    name: 'Singapore dollar',
    code: 'SGD',
    symbol: 'S$',
    r: 100
  })),
  (Currency.HKD = new Currency({
    name: 'Hong Kong dollar',
    code: 'HKD',
    symbol: 'HK$',
    r: 100
  })),
  (Currency.NOK = new Currency({
    name: 'Norwegian krone',
    code: 'NOK',
    symbol: 'kr',
    r: 100
  })),
  (Currency.KRW = new Currency({
    name: 'South Korean won',
    code: 'KRW',
    symbol: '₩',
    r: 1
  })),
  (Currency.TRY = new Currency({
    name: 'Turkish lira',
    code: 'TRY',
    symbol: '₺',
    r: 1
  })),
  (Currency.RUB = new Currency({
    name: 'Russian ruble',
    code: 'RUB',
    symbol: '₽',
    r: 100
  })),
  (Currency.INR = new Currency({
    name: 'Indian rupee',
    code: 'INR',
    symbol: '₹',
    r: 1
  })),
  (Currency.BRL = new Currency({
    name: 'Brazilian real',
    code: 'BRL',
    symbol: 'R$',
    r: 100
  })),
  (Currency.ZAR = new Currency({
    name: 'South African rand',
    code: 'ZAR',
    symbol: 'R',
    r: 100
  }))
]

module.exports = Currency
