const { component, on } = capsid
const genel = require('genel')
const { SummaryCard } = require('./summary-cards')

class MajorAccountTypeCard extends SummaryCard {
  majorAccountType (MajorAccountType) {
    return MajorAccountType.ASSET
  }

  @on(Action.MODEL_UPDATE)
  update ({ detail: { currentJournal, currentChart, domain } }) {
    const subledgers = currentJournal
      .toLedger(currentChart)
      .getSubledgersByMajorType(this.majorAccountType(domain.MajorAccountType))

    this.table.innerHTML = ''

    const amounts = []

    subledgers.forEach(subledger => {
      amounts.push(subledger.total().amount)
      this.createSubledgerTotalRow(subledger)
    })

    this.createTotalRow(
      amounts.reduce((x, y) => x + y, 0),
      currentJournal,
      currentChart,
      domain.MajorAccountType
    )

    t10.scan()
  }

  /**
   * @param {Subledger} subledger
   */
  createSubledgerTotalRow (subledger) {
    const tr = genel.tr`
      <td>${subledger.type.name}</td>
      <td>-</td>
    `
    this.table.appendChild(tr)

    this.assignMoneyFormat(subledger.total().amount, tr.lastChild)
  }

  createRetainedEarningsRow (retainedEarnings) {
    const tr = genel.tr`
      <td><t>domain.retained_earnings</t></td>
      <td>-</td>
    `
    this.table.appendChild(tr)
    this.assignMoneyFormat(retainedEarnings, tr.lastChild)
  }

  createTotalRow (total, currentJournal, currentChart, MajorAccountType) {
    if (this.majorAccountType(MajorAccountType) === MajorAccountType.EQUITY) {
      const retainedEarnings = currentJournal
        .toBalanceSheet(currentChart)
        .retainedEarnings().amount
      total += retainedEarnings
      this.createRetainedEarningsRow(retainedEarnings)
    }

    const row = genel.tr`
      <th><t>app.total</t></th>
      <th>-</th>
    `

    this.table.appendChild(row)

    this.assignMoneyFormat(total, row.lastChild)
  }
}

@component('asset-card')
class AssetCard extends MajorAccountTypeCard {
  title () {
    return '<t>domain.assets</t>'
  }

  majorAccountType (MajorAccountType) {
    return MajorAccountType.ASSET
  }
}
@component('liability-card')
class LiabilityCard extends MajorAccountTypeCard {
  title () {
    return '<t>domain.liabilities</t>'
  }

  majorAccountType (MajorAccountType) {
    return MajorAccountType.LIABILITY
  }
}
@component('equity-card')
class EquityCard extends MajorAccountTypeCard {
  title () {
    return '<t>domain.equity</t>'
  }

  majorAccountType (MajorAccountType) {
    return MajorAccountType.EQUITY
  }
}
@component('revenue-card')
class RevenueCard extends MajorAccountTypeCard {
  title () {
    return '<t>domain.revenues</t>'
  }

  majorAccountType (MajorAccountType) {
    return MajorAccountType.REVENUE
  }
}
@component('expense-card')
class ExpenseCard extends MajorAccountTypeCard {
  title () {
    return '<t>domain.expenses</t>'
  }

  majorAccountType (MajorAccountType) {
    return MajorAccountType.EXPENSE
  }
}

exports.AssetCard = AssetCard
exports.LiabilityCard = LiabilityCard
exports.EquityCard = EquityCard
exports.RevenueCard = RevenueCard
exports.ExpenseCard = ExpenseCard
