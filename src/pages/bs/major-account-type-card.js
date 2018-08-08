const { component, on, wired, emits } = capsid
const genel = require('genel')

class MajorAccountTypeCard {
  @wired('tbody')
  get table () {}

  __mount__ () {
    this.el.innerHTML = `
      <header class="card-header">
        <div class="card-header-title">
          <t>${this.title()}</t>
        </div>
      </header>
      <div class="card-content">
        <div class="content">
          <table>
            <tbody></tbody>
          </table>
        </div>
      </div>
    `

    this.el.classList.add('card', 'is-model-observer')
  }

  title () {
    return 'MajorAccountType'
  }

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

  @emits(Action.REQUEST_MONEY_FORMAT)
  assignMoneyFormat (amount, el) {
    return {
      amount,
      send (format) {
        el.textContent = format
      }
    }
  }
}

@component('asset-card')
class AssetCard extends MajorAccountTypeCard {
  title () {
    return 'domain.assets'
  }

  majorAccountType (MajorAccountType) {
    return MajorAccountType.ASSET
  }
}
@component('liability-card')
class LiabilityCard extends MajorAccountTypeCard {
  title () {
    return 'domain.liabilities'
  }

  majorAccountType (MajorAccountType) {
    return MajorAccountType.LIABILITY
  }
}
@component('equity-card')
class EquityCard extends MajorAccountTypeCard {
  title () {
    return 'domain.equity'
  }

  majorAccountType (MajorAccountType) {
    return MajorAccountType.EQUITY
  }
}
@component('revenue-card')
class RevenueCard extends MajorAccountTypeCard {
  title () {
    return 'domain.revenues'
  }

  majorAccountType (MajorAccountType) {
    return MajorAccountType.REVENUE
  }
}
@component('expense-card')
class ExpenseCard extends MajorAccountTypeCard {
  title () {
    return 'domain.expenses'
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
