const { prep, component, on, emits, wired, notifies } = capsid
const genel = require('genel')

export const SHOW = 'js-new-item-card/SHOW'
export const HIDE = 'js-new-item-card/HIDE'

const { LOCK, UNLOCK } = global.capsidScrollLock

const CLASS_VISIBLE = 'is-visible'
const RESET_SCROLL = 'mb/new-item-card-wrapper/RESET_SCROLL'

@component('new-item-card-wrapper')
export class NewItemCardWrapper {
  @wired.component('new-item-card')
  get card () {}

  @on(RESET_SCROLL)
  resetScroll () {
    this.el.scrollTop = 0
  }

  @on(SHOW)
  @emits(LOCK)
  show () {
    this.el.classList.add(CLASS_VISIBLE)
    this.card.resetHtml()
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

  @wired('.new-item-card__debit-total')
  get debitTotalLabel () {}

  @wired('.new-item-card__credit-total')
  get creditTotalLabel () {}

  @wired('.new-item-card__debit-total-diff')
  get debitTotalDiffLabel () {}

  @wired('.new-item-card__credit-total-diff')
  get creditTotalDiffLabel () {}

  @wired('.add-debit-button')
  get addDebitButton () {}

  @wired('.add-credit-button')
  get addCreditButton () {}

  @wired('.account-error-holder')
  get accountErrorHolder () {}

  @on(Action.MODEL_UPDATE)
  update ({ detail: { user, currentChart } }) {
    this.currentChart = currentChart
    this.debitTypes = user.currentDocument.recentDebitTypes(this.currentChart)
    this.creditTypes = user.currentDocument.recentCreditTypes(this.currentChart)
  }

  @emits(RESET_SCROLL)
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
            <h2>
              <t>domain.debits</t>
              <span class="new-item-card__debit-total"></span>
              <span class="new-item-card__debit-total-diff"></span>
            </h2>
            <button class="button is-primary is-outlined add-debit-button">
              <span class="icon">
                <i class="fa fa-plus"></i>
              </span>
            </button>
            <h2>
              <t>domain.credits</t>
              <span class="new-item-card__credit-total"></span>
              <span class="new-item-card__credit-total-diff"></span>
            </h2>
            <button class="button is-primary is-outlined add-credit-button">
              <span class="icon">
                <i class="fa fa-plus"></i>
              </span>
            </button>
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
        <div class="account-error-holder"></div>
      </form>
    `

    this.addDebitRow()
    this.addCreditRow()

    this.prep()
  }

  @on('click', { at: '.add-debit-button' })
  onClickAddDebitButton (e) {
    e.preventDefault()

    this.addDebitRow()

    this.prep()
  }

  addDebitRow () {
    const div = genel.div`
      <div class="field">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select class="input new-item-card__debit-type">
              <option value="" class="t-text">ui.form.select_account_title</option>
              ${this.options(this.debitTypes)}
            </select>
          </div>
        </div>
      </div>
      <div class="field js-field-wrapper">
        <p class="control">
          <input
            class="input js-field js-number-input t-attr new-item-card__debit-amount"
            data-validate="number"
            placeholder="t:domain.amount"
          />
        </p>
        <div
          class="popper error-tooltip"
          data-popper-ref=".input"
          data-popper-placement="top-end"
          style="display: none"
        ></div>
      </div>
      <hr />
    `

    div.classList.add('new-item-card__debit')

    this.addDebitButton.parentElement.insertBefore(div, this.addDebitButton)
  }

  @on('click', { at: '.add-credit-button' })
  onClickCreditButton (e) {
    e.preventDefault()

    this.addCreditRow()

    this.prep()
  }

  options (accountTypes) {
    return accountTypes
      .map(
        type =>
          `<option value="${type.name}">${type.name} (${t10.t(
            `domain.${this.currentChart.getMajorTypeByAccountType(type).name}`
          )})</option>`
      )
      .join('')
  }

  addCreditRow () {
    const div = genel.div`
      <div class="field">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select class="input new-item-card__credit-type">
              <option value="" class="t-text">ui.form.select_account_title</option>
              ${this.options(this.creditTypes)}
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <p class="control">
          <input
            class="input js-field js-number-input t-attr new-item-card__credit-amount"
            placeholder="t:domain.amount"
          />
        </p>
      </div>
      <hr />
    `

    div.classList.add('new-item-card__credit')

    this.addCreditButton.parentElement.insertBefore(div, this.addCreditButton)
  }

  @emits(Action.SCAN_LANGUAGE)
  prep () {
    prep(null, this.el)
  }

  @on('click', { at: '.new-item-save-button' })
  @emits(Action.CREATE_TRADE)
  onCreate (e) {
    e.preventDefault()

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

  @on('input')
  adjustPopper () {
    capsidPopper.updateAll()
  }

  @on('change', { at: '.new-item-card__debit-type' })
  @on('input', { at: '.new-item-card__debit-amount' })
  @on('change', { at: '.new-item-card__credit-type' })
  @on('input', { at: '.new-item-card__credit-amount' })
  @notifies('field-error', '.js-form')
  onAccountChange (e) {
    const dt = this.debitTotal()
    const ct = this.creditTotal()

    this.fillAccountTotalLabels(dt, ct)
    this.validate(dt, ct)
  }

  /**
   * @param {number} dt The debit total
   * @param {number} ct The credit total
   */
  fillAccountTotalLabels (dt, ct) {
    this.setAccountLabel(this.debitTotalLabel, dt)
    this.setAccountLabel(this.creditTotalLabel, ct)

    const diff = Math.abs(dt - ct)

    if (diff === 0) {
      this.debitTotalDiffLabel.textContent = ''
      this.creditTotalDiffLabel.textContent = ''
    } else if (dt > ct) {
      this.debitTotalDiffLabel.textContent = ''
      this.setAccountLabel(
        this.creditTotalDiffLabel,
        diff,
        label => `(-${label})`
      )
    } else {
      this.setAccountLabel(
        this.debitTotalDiffLabel,
        diff,
        label => `(-${label})`
      )
      this.creditTotalDiffLabel.textContent = ''
    }
  }

  @emits(Action.REQUEST_MONEY_FORMAT)
  setAccountLabel (el, amount, format = x => x) {
    return {
      amount,
      send: label => {
        el.textContent = format(label)
      }
    }
  }

  /**
   * @param {number} dt The debit total
   * @param {number} ct The credit total
   */
  validate (dt, ct) {
    if (dt > 0 && ct > 0 && dt === ct) {
      this.clearAccountError()

      return
    }

    this.setAccountError()
  }

  /**
   * Sets the account validation state error.
   */
  setAccountError () {
    this.accountErrorHolder.classList.add('has-error')
  }

  /**
   * Clears the account validation error state.
   */
  clearAccountError () {
    this.accountErrorHolder.classList.remove('has-error')
  }

  /**
   * @return {number}
   */
  debitTotal () {
    const arr = this.createDebitArray()
    return this.accountTotal(arr)
  }

  /**
   * @return {number}
   */
  creditTotal () {
    const arr = this.createCreditArray()
    return this.accountTotal(arr)
  }

  /**
   * @param {Object[]}
   * @return {number}
   */
  accountTotal (accountArray) {
    return accountArray.reduce((sum, account) => sum + account.amount, 0)
  }

  /**
   * @param {Object[]} accountArray
   */
  createAccountMap (accountArray) {
    const accountMap = {}

    accountArray.map(item => {
      accountMap[item.type] = item.amount
    })

    return accountMap
  }

  /**
   * @param {NodeList} accountRows
   * @param {string} typeSelector
   * @param {string} amountSelector
   * @return {Object[]}
   */
  createAccountArray (accountRows, typeSelector, amountSelector) {
    return [].map
      .call(accountRows, row => ({
        type: row.querySelector(typeSelector).value,
        amount: +row.querySelector(amountSelector).dataset.amount
      }))
      .filter(
        account =>
          !!account.type && account.amount > 0 && account.amount < Infinity
      )
  }

  createDebitArray () {
    return this.createAccountArray(
      this.debits,
      '.new-item-card__debit-type',
      '.new-item-card__debit-amount'
    )
  }

  createCreditArray () {
    return this.createAccountArray(
      this.credits,
      '.new-item-card__credit-type',
      '.new-item-card__credit-amount'
    )
  }

  createDebitObject () {
    return this.createAccountMap(this.createDebitArray())
  }

  createCreditObject () {
    return this.createAccountMap(this.createCreditArray())
  }
}
