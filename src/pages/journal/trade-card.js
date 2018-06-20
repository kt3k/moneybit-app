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

  __mount__ () {
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
              <tr class="trade-card__debit-title-row u-text-uc">
                <th><t>domain.debit</t></th>
                <th></th>
              </tr>
              <tr class="trade-card__credit-title-row u-text-uc">
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

  serializeAccounts (accounts) {
    return accounts
      .map(account => {
        return account.type.name + account.amount.amount
      })
      .join('|')
  }

  serializeTrade (trade) {
    return `${trade.date.format(t10.t('locale.date_format'))}|${
      trade.description
    }|${this.serializeAccounts(trade.debits)}|${this.serializeAccounts(
      trade.credits
    )}`
  }

  @on(Action.UPDATE_TRADE)
  update ({ detail: { journalDocument: doc, trade } }) {
    const serialized = this.serializeTrade(trade)

    if (this.lastTradeSerialized === serialized) {
      // not updated
      return
    }

    this.el.dataset.tradeId = trade.id
    this.dateLabel.textContent = trade.date.format(t10.t('locale.date_format'))
    this.descLabel.textContent = trade.description

    const table = this.debitTitleRow.parentElement

    table.querySelectorAll('.trade-card__account-row').forEach(el => {
      table.removeChild(el)
    })

    trade.debits.forEach(debit => {
      const tr = genel.tr`
        <td>${debit.type.name}</td>
        <td>${doc.format(debit.amount)}</td>
      `
      tr.classList.add('trade-card__account-row')
      table.insertBefore(tr, this.creditTitleRow)
    })
    trade.credits.forEach(credit => {
      const tr = genel.tr`
        <td>${credit.type.name}</td>
        <td>${doc.format(credit.amount)}</td>
      `
      tr.classList.add('trade-card__account-row')
      table.insertBefore(tr, null)
    })

    this.lastTradeSerialized = serialized
  }
}

module.exports = TradeCard
