const { Journal, AccountTypeChart } = require('moneybit-domain')

const journalObj = require('./journal')
const chartObj = require('./chart')
const userObj = require('./user')

exports.chart = new AccountTypeChart.Factory().createFromObject(chartObj)
exports.journal = new Journal.Factory().createFromIdAndArray(
  journalObj.id,
  journalObj.trades
)
exports.journalObj = journalObj
exports.chartObj = chartObj
exports.userObj = userObj
