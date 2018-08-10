const { component, on, wired, emits } = capsid
const genel = require('genel')

class SummaryCard {
  @wired('tbody')
  get table () {}

  __mount__ () {
    this.el.innerHTML = `
      <header class="card-header">
        <div class="card-header-title">
          ${this.title()}
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
    return 'Title'
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

@component('liability-equity-total-card')
class LiabilityEquityTotalCard extends SummaryCard {
  title () {
    return '<t>domain.liabilities</t> + <t>domain.equity</t>'
  }

  @on(Action.MODEL_UPDATE)
  update ({ detail: { currentJournal, currentChart, domain } }) {
    const bs = currentJournal.toBalanceSheet(currentChart)
    const {
      MajorAccountType: { EQUITY, LIABILITY }
    } = domain
    const row = genel.tr`
      <th><t>app.total</t></th>
      <th>-</th>
    `

    this.table.appendChild(row)

    this.assignMoneyFormat(
      bs.totalByMajorType(EQUITY).plus(bs.totalByMajorType(LIABILITY)).amount,
      row.lastChild
    )
  }
}

@component('income-card')
class IncomeCard extends SummaryCard {
  title () {
    return '<t>domain.income</t>'
  }

  @on(Action.MODEL_UPDATE)
  update ({ detail: { currentJournal, currentChart, domain } }) {
    const bs = currentJournal.toBalanceSheet(currentChart)
    const {
      MajorAccountType: { REVENUE, EXPENSE }
    } = domain
    const row = genel.tr`
      <th><t>app.total</t></th>
      <th>-</th>
    `

    this.table.appendChild(row)

    this.assignMoneyFormat(
      bs.totalByMajorType(REVENUE).minus(bs.totalByMajorType(EXPENSE)).amount,
      row.lastChild
    )

    t10.scan()
  }
}

exports.SummaryCard = SummaryCard
exports.LiabilityEquityTotalCard = LiabilityEquityTotalCard
exports.IncomeCard = IncomeCard
