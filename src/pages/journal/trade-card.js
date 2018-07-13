const { component, on, wired, emits } = capsid
const { Action } = require('~')
const genel = require('genel')

export const REQUEST_EDIT = 'mb/trade-card/REQUEST_EDIT'

@component('trade-card')
export class TradeCard {
  @wired('.trade-card__date-label')
  get dateLabel () {}

  @wired('.trade-card__edit-item-button')
  get editItemButton () {}

  @wired('.trade-card__desc-label')
  get descLabel () {}

  @wired('.trade-card__debit-title-row')
  get debitTitleRow () {}

  @wired('.trade-card__credit-title-row')
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
            <a class="button is-primary is-outlined t-text trade-card__edit-item-button">ui.form.edit</a>
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

  @on.click.at('.trade-card__edit-item-button')
  @emits(REQUEST_EDIT)
  onEditButtonClick () {
    return { trade: this.trade }
  }

  @on(Action.UPDATE_TRADE)
  update ({ detail: { journalDocument: doc, trade } }) {
    const serialized = this.serializeTrade(trade)

    if (this.lastTradeSerialized === serialized) {
      // not updated
      return
    }

    this.lastTradeSerialized = serialized
    this.trade = trade

    this.el.dataset.tradeId = trade.id
    this.editItemButton.dataset.tradeId = trade.id
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
  }
}
