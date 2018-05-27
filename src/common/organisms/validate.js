const matango = require('matango')
const genel = require('genel')
const { component, on, emits, unmount, wired, notifies } = capsid

export const ERROR_CLASS = 'is-error'
export const EVENT_VALIDATION_UPDATE = 'validation-update'
export const CLASS_DISABLE_ON_ERROR = 'disable-on-error'

@component('js-form')
export class Form {
  @wired.all(`.${ERROR_CLASS}`)
  get errors () {}

  hasError () {
    return this.errors.length > 0
  }

  @on('field-error')
  @notifies(EVENT_VALIDATION_UPDATE, `.${CLASS_DISABLE_ON_ERROR}`)
  onInput () {
    return { error: this.hasError() }
  }
}

@component(CLASS_DISABLE_ON_ERROR)
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

@component('error-tooltip')
export class ErrorTooltip {
  @on('field-error')
  onFieldError ({ detail: { errors } }) {
    this.el.innerHTML = ''

    errors.forEach(error => {
      this.el.appendChild(genel.p`${error.message}`)
    })
  }
}

@component('js-field-wrapper')
export class FieldWrapper {
  @on('field-error')
  @notifies('field-error', '.error-tooltip')
  onFieldError ({ detail: { errors } }) {
    this.el.classList.toggle(ERROR_CLASS, errors.length > 0)
    return { errors }
  }
}

@component('pure')
export class Pure {
  @on('input')
  @on('change')
  onInput () {
    unmount('pure', this.el)
  }
}

@component('js-field')
export class Field {
  __mount__ () {
    this.onInput()
  }

  @on('input')
  @on('change')
  @emits('field-error')
  onInput () {
    const errors = this.getValidationErrors()

    this.el.classList.toggle(ERROR_CLASS, errors.length > 0)

    return { errors }
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
   * Parse data-validate attribute by https://github.com/kt3k/matango rule.
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

  /**
   * Returns validation error from the give value and element. Returns null if it doesn't have an error.
   * @return {ValidationError?}
   */
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

Rule.required = Rule.generate(({ value }) => value !== '', () => 'This field is required') // TODO: i18n
Rule.number = Rule.generate(({ value }) => {
  if (!value) {
    return true
  }

  const number = +value

  if (-Infinity < number && number < Infinity) {
    return true
  }

  return false
}, () => 'Not a valid number') // TODO: i18n

class ValidationError {
  /**
   * @param {string} message
   */
  constructor (message) {
    this.message = message
  }
}
