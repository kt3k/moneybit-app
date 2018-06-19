const { prep, component, on, emits, wired, notifies } = capsid
const genel = require('genel')

export const SHOW = 'js-new-item-card/SHOW'
export const HIDE = 'js-new-item-card/HIDE'

const { LOCK, UNLOCK } = global.capsidScrollLock

const CLASS_VISIBLE = 'is-visible'
const CLASS_ERROR = 'has-error'
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

  @wired.all('.new-item-card__account-input')
  get accountInputs () {}

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
              />
            </p>
            <div
              class="popper error-tooltip"
              data-popper-ref=".new-item-card__date"
              data-popper-placement="top-end"
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
                  data-validate="required"
                />
              </p>
              <div
                class="popper error-tooltip"
                data-popper-ref=".input"
                data-popper-placement="top-end"
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

  @on('click', { at: '.add-credit-button' })
  onClickCreditButton (e) {
    e.preventDefault()

    this.addCreditRow()

    this.prep()
  }

  /**
   * @param {string} side debit or credit
   * @param {AccountType[]} accountTypes
   * @param {HTMLElement} insertBefore
   */
  addAccountInput (side, accountTypes, insertBefore) {
    const div = genel.div`
      <div class="field js-field-wrapper new-item-card__account-type-wrapper">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select class="input new-item-card__account-type">
              <option value="" class="t-text">ui.form.select_account_title</option>
              ${this.options(accountTypes)}
            </select>
          </div>
        </div>
        <div
          class="popper error-tooltip"
          data-popper-ref=".control"
          data-popper-placement="top-end"
        ><t>error.form.account_type_not_selected</t></div>
      </div>
      <div class="field js-field-wrapper">
        <p class="control">
          <input
            class="input js-field js-number-input t-attr new-item-card__account-amount"
            data-validate="number"
            placeholder="t:domain.amount"
          />
        </p>
        <div
          class="popper error-tooltip"
          data-popper-ref=".input"
          data-popper-placement="top-end"
        ></div>
      </div>
      <hr />
    `

    div.classList.add(`new-item-card__${side}`, 'new-item-card__account-input')

    insertBefore.parentElement.insertBefore(div, insertBefore)
  }

  addDebitRow () {
    this.addAccountInput('debit', this.debitTypes, this.addDebitButton)
  }

  addCreditRow () {
    this.addAccountInput('credit', this.creditTypes, this.addCreditButton)
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

  @on('change', { at: '.new-item-card__account-type' })
  @on('input', { at: '.new-item-card__account-amount' })
  @notifies('field-error', '.js-form')
  onAccountChange (e) {
    const dt = this.debitTotal()
    const ct = this.creditTotal()

    this.fillAccountTotalLabels(dt, ct)
    ;[].forEach.call(this.accountInputs, el => {
      this.validateAccountInput(el)
    })

    this.validateTotal(dt, ct)
  }

  /**
   * @param {HTMLElement} el
   */
  validateAccountInput (el) {
    const { type, amount } = this.getAccountObject(el)

    el.querySelector('.new-item-card__account-type-wrapper').classList.toggle(
      CLASS_ERROR,
      this.isValidAmount(amount) && type === ''
    )
  }

  /**
   * @param {number} dt The debit total
   * @param {number} ct The credit total
   */
  validateTotal (dt, ct) {
    this.accountErrorHolder.classList.toggle(
      CLASS_ERROR,
      !(dt > 0 && ct > 0 && dt === ct)
    )
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
   * @return {number}
   */
  debitTotal () {
    return this.accountTotal(this.createDebitArray())
  }

  /**
   * @return {number}
   */
  creditTotal () {
    return this.accountTotal(this.createCreditArray())
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
   * @param {string} side debit or credit
   * @return {Object[]}
   */
  createAccountArray (accountRows) {
    return [].map
      .call(accountRows, row => this.getAccountObject(row))
      .filter(account => !!account.type && this.isValidAmount(account.amount))
  }

  /**
   * @param {number} amount
   * @returns {boolean}
   */
  isValidAmount (amount) {
    return amount > 0 && amount < Infinity
  }

  /**
   * @param {HTMLElement} el
   * @returns {{type: string, amount: number}}
   */
  getAccountObject (el) {
    return {
      type: el.querySelector('.new-item-card__account-type').value,
      amount: +el.querySelector('.new-item-card__account-amount').dataset.amount
    }
  }

  createDebitArray () {
    return this.createAccountArray(this.debits)
  }

  createCreditArray () {
    return this.createAccountArray(this.credits)
  }

  createDebitObject () {
    return this.createAccountMap(this.createDebitArray())
  }

  createCreditObject () {
    return this.createAccountMap(this.createCreditArray())
  }
}
