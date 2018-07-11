const { prep, component, on, emits, wired, notifies } = capsid
const genel = require('genel')

const { HIDE, RESET_SCROLL, OPEN } = require('./edit-item-card-wrapper')
const { SHOW: SHOW_CONFIRM_MODAL } = require('../confirm-modal.js')

const CLASS_ERROR = 'has-error'

@component('edit-item-card')
export class EditItemCard {
  @wired('.edit-item-card__id')
  get id () {}

  @wired('.edit-item-card__date')
  get date () {}

  @wired('.edit-item-card__desc')
  get desc () {}

  @wired.all('.edit-item-card__debit')
  get debits () {}

  @wired.all('.edit-item-card__credit')
  get credits () {}

  @wired('.edit-item-card__debit-total')
  get debitTotalLabel () {}

  @wired('.edit-item-card__credit-total')
  get creditTotalLabel () {}

  @wired('.edit-item-card__debit-total-diff')
  get debitTotalDiffLabel () {}

  @wired('.edit-item-card__credit-total-diff')
  get creditTotalDiffLabel () {}

  @wired('.add-debit-button')
  get addDebitButton () {}

  @wired('.add-credit-button')
  get addCreditButton () {}

  @wired('.account-error-holder')
  get accountErrorHolder () {}

  @wired.all('.edit-item-card__account-input')
  get accountInputs () {}

  @on(Action.MODEL_UPDATE)
  update ({ detail: { user, currentChart } }) {
    this.currentChart = currentChart
    this.debitTypes = user.currentDocument.recentDebitTypes(this.currentChart)
    this.creditTypes = user.currentDocument.recentCreditTypes(this.currentChart)
  }

  /**
   * @param {Trade} trade The trade
   */
  @on(OPEN)
  @emits(RESET_SCROLL)
  onOpen ({ detail: { trade } }) {
    this.el.innerHTML = `
      <form class="js-form">
        <input type="hidden" class="edit-item-card__id"/>
        <div class="card-header">
          <p class="card-header-title">
            Date
          </p>
          <div class="card-header-icon js-field-wrapper pure">
            <p class="control">
              <input
                class="input js-field js-pickadate edit-item-card__date"
                data-validate="required"
              />
            </p>
            <div
              class="popper error-tooltip"
              data-popper-ref=".edit-item-card__date"
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
                  class="js-field input edit-item-card__desc"
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
              <span class="edit-item-card__debit-total"></span>
              <span class="edit-item-card__debit-total-diff"></span>
            </h2>
            <button class="button is-primary is-outlined add-debit-button">
              <span class="icon">
                <i class="fa fa-plus"></i>
              </span>
            </button>
            <h2>
              <t>domain.credits</t>
              <span class="edit-item-card__credit-total"></span>
              <span class="edit-item-card__credit-total-diff"></span>
            </h2>
            <button class="button is-primary is-outlined add-credit-button">
              <span class="icon">
                <i class="fa fa-plus"></i>
              </span>
            </button>
          </div>
        </div>
        <div class="card-footer">
          ${
            trade
              ? '<p class="card-footer-item"><a class="button is-dark t-text edit-item-card__delete-button" href="#">ui.form.delete</a></p>'
              : ''
          }
          <p class="card-footer-item">
            <a class="button is-danger t-text edit-item-cancel-button" href="#">ui.form.cancel</a>
          </p>
          <p class="card-footer-item">
            <button class="button is-primary t-text edit-item-save-button disable-on-error">ui.form.save</button>
          </p>
        </div>
        <div class="account-error-holder"></div>
      </form>
    `

    this.prep()

    if (trade) {
      this.fillTradeInForm(trade)
    } else {
      this.addDebitRow()
      this.addCreditRow()
      this.prep()
    }
  }

  @notifies('blur', '.js-number-input')
  fillTradeInForm (trade) {
    this.id.value = trade.id
    this.desc.value = trade.description
    this.date.dispatchEvent(
      new CustomEvent(window.PICKDATE, { detail: trade.date })
    )
    trade.debits.forEach(debit => {
      this.addDebitRow(debit)
    })
    trade.credits.forEach(credit => {
      this.addCreditRow(credit)
    })

    this.prep()
  }

  @on.click.at('.add-debit-button')
  onClickAddDebitButton (e) {
    e.preventDefault()

    this.addDebitRow()

    this.prep()
  }

  @on.click.at('.add-credit-button')
  onClickCreditButton (e) {
    e.preventDefault()

    this.addCreditRow()

    this.prep()
  }

  /**
   * @param {string} side debit or credit
   * @param {Account} account The account
   * @param {AccountType[]} accountTypes
   * @param {HTMLElement} insertBefore
   */
  addAccountInput (side, account, accountTypes, insertBefore) {
    const div = genel.div`
      <div class="field js-field-wrapper edit-item-card__account-type-wrapper">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select class="input edit-item-card__account-type">
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
            class="input js-field js-number-input t-attr edit-item-card__account-amount"
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

    div.classList.add(
      `edit-item-card__${side}`,
      'edit-item-card__account-input'
    )

    if (account) {
      div.querySelector('.edit-item-card__account-amount').dataset.amount =
        account.amount.amount
      div.querySelector('select').value = account.type.name
    }

    insertBefore.parentElement.insertBefore(div, insertBefore)
  }

  /**
   * @param {Debit | undefined} debit
   */
  addDebitRow (debit) {
    this.addAccountInput('debit', debit, this.debitTypes, this.addDebitButton)
  }

  /**
   * @param {Credit | undefined} credit
   */
  addCreditRow (credit) {
    this.addAccountInput(
      'credit',
      credit,
      this.creditTypes,
      this.addCreditButton
    )
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

  @on.click.at('.edit-item-save-button')
  @emits(Action.SAVE_TRADE)
  @emits(HIDE)
  onSave (e) {
    e.preventDefault()

    return {
      id: this.id.value,
      date: this.date.dataset.date,
      desc: this.desc.value,
      debitArray: this.createDebitArray(),
      creditArray: this.createCreditArray()
    }
  }

  @on.click.at('.edit-item-cancel-button')
  @emits(HIDE)
  onCancel (e) {
    e.preventDefault()
  }

  @on.click.at('.edit-item-card__delete-button')
  @emits(SHOW_CONFIRM_MODAL)
  onClickAtDelete (e) {
    e.preventDefault()

    return {
      message: 'Delete this trade?',
      onOk: () => this.deleteTrade()
    }
  }

  @emits(Action.DELETE_TRADE)
  @emits(HIDE)
  deleteTrade () {
    return { id: this.id.value }
  }

  @on('input')
  adjustPopper () {
    capsidPopper.updateAll()
  }

  @on.change.at('.edit-item-card__account-type')
  @on.input.at('.edit-item-card__account-amount')
  @notifies('field-error', '.js-form')
  onAccountChange () {
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

    el.querySelector('.edit-item-card__account-type-wrapper').classList.toggle(
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
   * @param {Object[]} accountArray
   * @return {number}
   */
  accountTotal (accountArray) {
    return accountArray.reduce((sum, account) => sum + account.amount, 0)
  }

  /**
   * @param {NodeList} accountRows
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
      type: el.querySelector('.edit-item-card__account-type').value,
      amount: +el.querySelector('.edit-item-card__account-amount').dataset
        .amount
    }
  }

  createDebitArray () {
    return this.createAccountArray(this.debits)
  }

  createCreditArray () {
    return this.createAccountArray(this.credits)
  }
}
