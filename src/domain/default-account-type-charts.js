const { AccountTypeChart } = require('moneybit-domain')
const { EN, JA } = require('./language')

const factory = new AccountTypeChart.Factory()

const defaultAccountTypeCharts = {
  /**
   * This default is taken from https://en.wikipedia.org/wiki/Chart_of_accounts
   * # Simple Example chapter.
   * Maybe this is not useful for anybody in the real world.
   */
  [EN.code]: factory.createFromObject({
    id: 'en-default',
    asset: ['Cash at Bank', 'Cash', 'Deferred Expense', 'Other Assets', 'Accounts Receivable', 'Supplies', 'Prepaid Insurance', 'Equipment', 'Accumulated Depreciation Equipment'],
    liability: ['Notes Payable', 'Accounts Payable', 'Unearned Service Revenue', 'Tax Payable', 'Bonds Payable', 'Salaries and Wages Payable', 'Interest Payable'],
    equity: ["Owner's capital", 'Share Capital-Ordinary', 'Retained Earnings', 'Capital contributions', 'Dividends', 'Income Summary', 'Drawings'],
    revenue: ['Service Income', 'Sales', 'Rental Income', 'Interest Income'],
    expense: [
      'Office Expense',
      'Computer Expenses',
      'Communication Expense',
      'Labour & Welfare Expenses',
      'Advertising Expenses',
      'Printing & Stationery Expenses',
      'Supplies Expense',
      'Depreciation Expense',
      'Insurance Expense',
      'Salaries and Wages Expense',
      'Rent Expense',
      'Utilities Expense',
      'Interest Expense'
    ]
  }),
  /**
   * This chart is taken from Japanese tax document template for private business, called
   * 所得税青色申告決算書（一般用）【平成25年分以降用】
   * available at https://www.nta.go.jp/tetsuzuki/shinkoku/shotoku/yoshiki01/shinkokusho/02.htm
   */
  [JA.code]: factory.createFromObject({
    id: 'ja-default',
    asset: [
      '現金',
      '当座預金',
      '定期預金',
      'その他の預金',
      '受取手形',
      '売掛金',
      '有価証券',
      '棚卸資産',
      '前払金',
      '貸付金',
      '建物',
      '建物付属設備',
      '機械装置',
      '車両運搬具',
      '工具 器具 備品',
      '土地',
      '事業主貸'
    ],
    liability: ['支払手形', '買掛金', '借入金', '未払金', '前受金', '預り金', '貸倒引当金'],
    equity: ['事業主借', '元入金', '所得'],
    revenue: ['売上', '雑収入'],
    expense: [
      '租税公課',
      '荷造運賃',
      '水道光熱費',
      '旅費交通費',
      '通信費',
      '広告宣伝費',
      '接待交際費',
      '損害保険料',
      '修繕費',
      '消耗品費',
      '原価償却費',
      '福利厚生費',
      '給料賃金',
      '外注工賃',
      '利子割引料',
      '地代家賃',
      '貸倒金',
      '雑費'
    ]
  })
}

module.exports = defaultAccountTypeCharts
