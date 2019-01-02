const genel = require('genel')
const { component, on, emits, wired } = capsid
const { OPEN_SUBLEDGER_MODAL, CLOSE_SUBLEDGER_MODAL } = require('../bs-page')

@component('subledger-modal')
class SubledgerModal {
  @wired('.account-title') title

  @wired('.subledger-modal__month-list') monthList

  @on(OPEN_SUBLEDGER_MODAL)
  open ({ detail: { accountType, majorAccountType, subledger, months } }) {
    this.el.classList.add('is-visible')
    this.title.textContent = accountType.name
    this.majorAccountType = majorAccountType
    console.log(subledger)
    this.monthlyBalance = 0
    this.balance = 0
    const accMap = {}

    subledger.accounts.forEach(acc => {
      const m = acc.date.format('YYYY-MM')
      accMap[m] = accMap[m] || []
      accMap[m].push(acc)
    })

    this.monthList.innerHTML = ''

    months
      .map(m => [m, accMap[m.format('YYYY-MM')]])
      .filter(([m, accounts]) => accounts)
      .forEach(([m, accounts]) => {
        this.appendMonthArea(this.monthList, m, accounts)
      })
  }

  /**
   * @param {HTMLElement} el
   * @param {moment} month
   * @param {Account[]} Accounts
   */
  appendMonthArea (el, month, accounts) {
    const div = genel.div`
      <h2 class="title">
        ${month.format(t10.t('locale.month_format'))}
      </h2>
      <div class="content">
        <table>
          <tr>
            <th>${t10.t('app.monthly_total')}</th>
            <td class="monthly-total"></td>
          </tr>
          <tr>
            <th>${t10.t('domain.balance')}</th>
            <td class="monthly-balance"></td>
          </tr>
        </table>
      </div>
    `
    accounts.sort((x, y) => {
      const x0 = x.date.valueOf()
      const y0 = y.date.valueOf()
      if (x0 < y0) {
        return -1
      } else if (x0 > y0) {
        return 1
      }
      return 0
    })

    const columns = genel.div``
    columns.classList.add('columns', 'is-multiline')

    this.monthlyTotal = 0

    accounts.forEach(acc => {
      this.appendAccountCard(columns, acc)
    })

    this.monthlyBalance += this.monthlyTotal

    this.formatMoney(div.querySelector('.monthly-total'), this.monthlyTotal)
    this.formatMoney(div.querySelector('.monthly-balance'), this.monthlyBalance)

    div.appendChild(columns)
    div.appendChild(genel.hr``)

    el.appendChild(div)
  }

  /**
   *
   * @param {HTMLElement} el
   * @param {Account} account
   */
  appendAccountCard (el, account) {
    const description = account.trade ? account.trade.description : ''
    const isDebit = account.constructor.name === 'Debit'
    const card = genel.div`
      <div class="card">
      <div class="card-header">
        <div class="card-header-title">
          ${account.date.format(t10.t('locale.date_format'))}
        </div>
      </div>
      <div class="card-content">
        <div class="content">
          <p>${description}</p>
          <table>
            <tr>
              <th>${
                isDebit ? t10.t('domain.debit') : t10.t('domain.credit')
              }</th>
              <td class="account-amount"></td>
            </tr>
            <tr>
              <th>${t10.t('domain.balance')}</th>
              <td class="balance"></td>
            </tr>
          </table>
        </div>
      </div>
      </div>
    `
    const amount = account.amount.amount

    if (this.isPositiveAccount(account)) {
      this.monthlyTotal += amount
      this.balance += amount
    } else {
      this.monthlyTotal -= amount
      this.balance -= amount
    }
    this.formatMoney(card.querySelector('.account-amount'), amount)
    this.formatMoney(card.querySelector('.balance'), this.balance)

    card.classList.add('column', 'is-one-quarter')
    el.appendChild(card)
  }

  isPositiveAccount (account) {
    return (
      this.majorAccountType.side.name.toLowerCase() ===
      account.constructor.name.toLowerCase()
    )
  }

  @emits(Action.REQUEST_MONEY_FORMAT)
  formatMoney (el, amount) {
    return {
      send: amount => {
        el.textContent = amount
      },
      amount
    }
  }

  @on.click.at('.close-button')
  @emits(CLOSE_SUBLEDGER_MODAL)
  close () {
    this.el.classList.remove('is-visible')
  }
}

module.exports = SubledgerModal
