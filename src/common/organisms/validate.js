const matango = require('matango')
const { component, on, emits, wire, pub } = capsid

const ERROR_CLASS = 'is-error'
const EVENT_VALIDATION_UPDATE = 'validation-update'

@component('js-form')
export default class Form {
  @wire.elAll(`.${ERROR_CLASS}`)
  get errors () {}

  hasError () {
    return this.errors.length > 0
  }

  @on('input')
  @on('change')
  @pub(EVENT_VALIDATION_UPDATE, 'button, input[type="submit"], input[type="image"]')
  onInput () {
    return { error: this.hasError() }
  }
}

@component('js-disable-on-error')
export class DisableOnError {
  @on(EVENT_VALIDATION_UPDATE)
  onValidationUpdate (e) {
    const { error } = e.detail

    if (error) {
      this.el.setAttribute('disabled', 'disabled')
    } else {
      this.el.removeAttribute('disabled')
    }
  }
}

@component('js-field')
export class Field {
  @emits('input')
  __init__ () {
  }

  @on('input')
  @on('change')
  onInput () {
    const errors = this.getValidationErrors()

    this.el.classList.toggle(ERROR_CLASS, errors.length > 0)
  }

  /**
   * @return {ValidationError[]}
   */
  getValidationErrors () {
    const rules = this.getValidationRules()

    return rules.map(rule => rule.getError(this.el.value, this.el)).filter(Boolean)
  }

  /**
   * @return {Rule[]}
   */
  getValidationRules () {
    return this.getValidationArgs().map(arg => Rule[arg.key](arg.value))
  }

  /**
   * @return {Object[]}
   */
  getValidationArgs () {
    return matango.parse(this.el.dataset.validate || '')
  }
}

class Rule {
  /**
   * @param {Function} condition
   * @param {Function} messager
   * @param {any} arg
   */
  constructor (condition, message, arg) {
    this.condition = condition
    this.message = message
    this.arg = arg
  }

  getError (value, el) {
    const params = { value, arg: this.arg, el }
    if (!this.condition(params)) {
      return new ValidationError(this.message(params))
    }
  }

  /**
   * Returns a generator of rule by the given condition and message
   * @param {Function} condition The condition
   * @param {Function} message The message
   * @return {Function}
   */
  static generate (condition, message) {
    return arg => new Rule(condition, message, arg)
  }
}

Rule.required = Rule.generate(
  ({ value }) => value !== '',
  () => 'This field is required.'
)

class ValidationError {
  /**
   * @param {string} message
   */
  constructor (message) {
    this.message = message
  }
}
