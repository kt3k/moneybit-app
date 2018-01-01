const { capsid: { component, on, emits, wired }, Action } = require('~')

@component('js-new-item-card')
export default class NewItemCard {
  @wired('.new-item-card__date')
  get date () {}
  @wired('.new-item-card__desc')
  get desc () {}
  @wired.all('.new-item-card__debit')
  get debits () {}
  @wired.all('.new-item-card__credit')
  get credits () {}

  @on('click', { at: '.new-item-save-button' })
  @emits(Action.CREATE_TRADE)
  onCreateNewTrade () {
    const date = this.date.dataset.date
    const desc = this.desc.value
    const dr = this.createDebitObject()
    const cr = this.createCreditObject()

    return { date, desc, dr, cr }
  }

  validate () {
    console.log('TODO: validate')
  }

  createDebitObject () {
    const dr = {}
    ;[].forEach.call(this.debits, row => {
      const type = row.querySelector('.new-item-card__debit-type').value
      const amount = +row.querySelector('.new-item-card__debit-amount').value
      dr[type] = amount
    })

    return dr
  }

  createCreditObject () {
    const dr = {}
    ;[].forEach.call(this.credits, row => {
      const type = row.querySelector('.new-item-card__credit-type').value
      const amount = +row.querySelector('.new-item-card__credit-amount').value
      dr[type] = amount
    })

    return dr
  }
}
