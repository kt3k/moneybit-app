const { on, wired, emits } = capsid
const genel = require('genel')

class MajorAccountTypeCard {
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

    const row = genel.tr`
      <th><t>app.total</t></th>
      <th>-</th>
    `

    this.table.appendChild(row)

    this.assignMoneyFormat(amounts.reduce((x, y) => x + y, 0), row.lastChild)

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

module.exports = MajorAccountTypeCard
