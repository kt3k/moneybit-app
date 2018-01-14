const { capsid: { prep, component, on, emits, wired }, Action } = require('~')

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


  __init__ () {
    this.el.classList.add('card')
    this.el.innerHTML = `
      <div class="card-header">
        <p class="card-header-title">
          Date
        </p>
        <div class="card-header-icon">
          <p class="control">
            <input
              class="input js-pickadate new-item-card__date"
              value=""
            />
          </p>
        </div>
      </div>
      <div class="card-content">
        <div class="content">
          <p class="t-text">app.description</p>
          <p class="control"><input class="input new-item-card__desc" value=""></p>
          <table>
            <tr>
              <th><t>domain.debit</t>
              <th>
            <tr class="new-item-card__debit">
              <td>
                <p class="control"><input class="input new-item-card__debit-type" value="普通預金"/>
              <td>
                <p class="control"><input class="input js-number-input new-item-card__debit-amount" />
            <tr>
              <td>
                <button class="button is-primary is-outlined">
                  <span class="icon">
                    <i class="fa fa-plus"></i>
                  </span>
                </button>
              <td>
            <tr>
              <th><t>domain.credit</t>
              <th>
            <tr class="new-item-card__credit">
              <td>
                <p class="control"><input class="input new-item-card__credit-type" value="元入金"/>
              <td>
                <p class="control"><input class="input js-number-input new-item-card__credit-amount" />
            <tr>
              <td>
                <button class="button is-primary is-outlined">
                  <span class="icon">
                    <i class="fa fa-plus"></i>
                  </span>
                </button>
              <td>
          </table>
        </div>
      </div>
      <div class="card-footer">
        <p class="card-footer-item">
          <a class="button is-danger t-text" href="#">ui.form.cancel</a>
        </p>
        <p class="card-footer-item">
          <button class="button is-primary t-text new-item-save-button">ui.form.save</button>
        </p>
      </div>
    `

    prep(null, this.el)
  }

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
      const amount = +row.querySelector('.new-item-card__debit-amount').dataset.amount
      dr[type] = amount
    })

    return dr
  }

  createCreditObject () {
    const dr = {}
    ;[].forEach.call(this.credits, row => {
      const type = row.querySelector('.new-item-card__credit-type').value
      const amount = +row.querySelector('.new-item-card__credit-amount').dataset.amount
      dr[type] = amount
    })

    return dr
  }
}
