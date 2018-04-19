const { capsid: { prep, component, on, emits, wired }, Action } = require('~')
const genel = require('genel')

export const SHOW = 'js-new-item-card/SHOW'
export const HIDE = 'js-new-item-card/HIDE'

const { LOCK, UNLOCK } = global.capsidScrollLock

const CLASS_VISIBLE = 'is-visible'

@component('new-item-card-wrapper')
export class NewItemCardWrapper {
  @wired.component('new-item-card')
  get card () {}

  @on(SHOW)
  @emits(LOCK)
  show () {
    this.el.classList.add(CLASS_VISIBLE)
    this.card.resetHtml()

    setTimeout(() => {
      capsidPopper.updateAll()
    }, 500)
  }

  @on(HIDE)
  @emits(UNLOCK)
  hide () {
    this.el.classList.remove(CLASS_VISIBLE)
  }
}

@component('new-item-card')
export default class NewItemCard {
  @wired('.new-item-card__date')
  get date () {}

  @wired('.new-item-card__desc')
  get desc () {}

  @wired.all('.new-item-card__debit')
  get debits () {}

  @wired.all('.new-item-card__credit')
  get credits () {}

  lastDebit () {
    return this.debits[this.debits.length - 1]
  }

  lastCredit () {
    return this.credits[this.credits.length - 1]
  }

  @emits(Action.SCAN_LANGUAGE)
  resetHtml () {
    this.el.innerHTML = `
      <form class="js-form">
        <div class="card-header">
          <p class="card-header-title">
            Date
          </p>
          <div class="card-header-icon js-field-wrapper pure">
            <p class="control">
              <input
                class="input js-field js-pickadate new-item-card__date"
                data-validate="required"
                value=""
              />
            </p>
            <div
              class="popper error-tooltip"
              data-popper-ref=".new-item-card__date"
              data-popper-placement="top-end"
              style="display: none"
            ></div>
          </div>
        </div>
        <div class="card-content">
          <div class="content">
            <p class="t-text">app.description</p>
            <div class="js-field-wrapper pure">
              <p class="control">
                <input
                  class="js-field input new-item-card__desc"
                  value=""
                  data-validate="required"
                />
              </p>
              <div
                class="popper error-tooltip"
                data-popper-ref=".input"
                data-popper-placement="top-end"
                style="display: none"
              ></div>
            </div>
            <table>
              <tr>
                <th><t>domain.debit</t>
                <th>
              <tr class="new-item-card__debit">
                <td>
                  <div class="control">
                    <div class="select">
                      <select class="input new-item-card__debit-type">
                        <option>Select</option>
                        <option value="A">B</option>
                        <option value="B">B</option>
                      </select>
                    </div>
                <td>
                  <p class="control"><input class="input js-number-input new-item-card__debit-amount" />
              <tr class="new-item-card__add-debit-row">
                <td>
                  <button class="button is-primary is-outlined add-debit-button">
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
                  <div class="control">
                    <div class="select">
                      <select class="input new-item-card__credit-type">
                        <option>Select</option>
                        <option value="A">Account Payable</option>
                        <option value="B">B</option>
                      </select>
                    </div>
                <td>
                  <p class="control"><input class="input js-number-input new-item-card__credit-amount" />
              <tr class="new-item-card__add-credit-row">
                <td>
                  <button class="button is-primary is-outlined add-credit-button">
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
            <a class="button is-danger t-text new-item-cancel-button" href="#">ui.form.cancel</a>
          </p>
          <p class="card-footer-item">
            <button class="button is-primary t-text new-item-save-button disable-on-error">ui.form.save</button>
          </p>
        </div>
      </form>
    `

    prep(null, this.el)
  }

  @on('click', { at: '.add-debit-button' })
  addDebitRow () {
    const last = this.lastDebit()

    const tr = genel.tr`
      <td>
        <p class="control"><input class="input new-item-card__debit-type" value=""/>
      <td>
        <p class="control"><input class="input js-number-input new-item-card__debit-amount" />
    `

    tr.classList.add('new-item-card__debit')

    last.parentElement.insertBefore(tr, last.nextSibling)

    prep()
  }

  @on('click', { at: '.add-credit-button' })
  addCreditRow () {
    const last = this.lastCredit()

    const tr = genel.tr`
      <td>
        <p class="control"><input class="input new-item-card__credit-type" value=""/>
      <td>
        <p class="control"><input class="input js-number-input new-item-card__credit-amount" />
    `

    tr.classList.add('new-item-card__credit')

    last.parentElement.insertBefore(tr, last.nextSibling)

    prep()
  }

  @on('click', { at: '.new-item-save-button' })
  @emits(Action.CREATE_TRADE)
  onCreate () {
    const date = this.date.dataset.date
    const desc = this.desc.value
    const dr = this.createDebitObject()
    const cr = this.createCreditObject()

    this.hide()

    return { date, desc, dr, cr }
  }

  @on('click', { at: '.new-item-cancel-button' })
  onCancel (e) {
    e.preventDefault()
    this.hide()
  }

  /**
   * Removes the component at the next tick.
   */
  @emits(HIDE)
  async hide () {
    await Promise.resolve()
  }

  validate () {
    console.log('TODO: validate')
  }

  /**
   * @param {NodeList} accountRows
   * @param {string} typeSelector
   * @param {string} amountSelector
   */
  createAccountMap (accountRows, typeSelector, amountSelector) {
    const accountMap = {}
    ;[].forEach.call(accountRows, row => {
      const type = row.querySelector(typeSelector).value
      const amount = +row.querySelector(amountSelector).dataset.amount
      accountMap[type] = amount
    })

    return accountMap
  }

  createDebitObject () {
    return this.createAccountMap(this.debits, '.new-item-card__debit-type', '.new-item-card__debit-amount')
  }

  createCreditObject () {
    return this.createAccountMap(this.credits, '.new-item-card__credit-type', '.new-item-card__credit-amount')
  }
}
