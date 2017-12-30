const { component, on, wire } = capsid
const { Action } = require('~')
const genel = require('genel')

@component('js-trade-card')
class TradeCard {
  @wire.el('.trade-card__date-label')
  get dateLabel () {}

  @wire.el('.trade-card__desc-label')
  get descLabel () {}

  @wire.el('.trade-card__debit-title-row')
  get debitTitleRow () {}

  @wire.el('.trade-card__credit-title-row')
  get creditTitleRow () {}

  __init__ () {
    this.el.classList.add('column')
    this.el.appendChild(genel`
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">
            No.16
          </p>
          <div class="card-header-icon">
            <span class=""><strong class="trade-card__date-label"></strong></span>
          </div>
          <div class="card-header-icon">
            <a class="button is-primary is-outlined t-text" href="">ui.form.edit</a>
          </div>
        </div>
        <div class="card-content">
          <div class="content">
            <p class="trade-card__desc-label"></p>
            <table>
              <tr class="trade-card__debit-title-row">
                <th><t>domain.debit</t></th>
                <th></th>
              </tr>
              <tr class="trade-card__credit-title-row">
                <th>
                  <t>domain.credit</t>
                <th>
              </tr>
            </table>
            </div>
        </div>
      </div>
    `)
  }

  @on(Action.UPDATE_TRADE)
  update ({ detail: { journalDocument: doc, trade } }) {
    console.log(trade)
    this.dateLabel.textContent = trade.date.format('YYYY/MM/DD')
    this.descLabel.textContent = trade.description

    const table = this.debitTitleRow.parentElement

    trade.debits.forEach(debit => {
      console.log(debit)
      table.insertBefore(genel.tr`<td>${debit.type.name}</td><td>${doc.format(debit.amount)}</td>`, this.creditTitleRow)
    })
    trade.credits.forEach(credit => {
      console.log(credit)
      table.insertBefore(genel.tr`<td>${credit.type.name}</td><td>${doc.format(credit.amount)}</td>`, null)
    })
  }
}

module.exports = TradeCard
