const {
  Action: {
    CREATE_JOURNAL_DOCUMENT
  }
} = require('~')

const { component, on, emits, wire } = capsid

/**
 * The form component which creates journal with `.is-primary` button.
 */
@component('js-create-journal-form')
class CreateJournalForm {
  @wire.el('[name="title"]') get title () {}
  @wire.el('[name="currencyCode"]') get currencyCode () {}
  @wire.el('[name="commaPeriodSetting"]') get commaPeriodSetting () {}
  @wire.el('[name="startDate"]') get startDate () {}
  @wire.el('[name="endDate"]') get endDate () {}
  @wire.el('button.is-primary') get primaryButton () {}
  @wire.el('button.is-danger') get cancelButton () {}

  @on('click', { at: 'button.is-primary' })
  @emits(CREATE_JOURNAL_DOCUMENT)
  createJournal (e) {
    e.preventDefault()

    this.primaryButton.setAttribute('disabled', true)
    this.cancelButton.setAttribute('disabled', true)

    return {
      title: this.title.value,
      currencyCode: this.currencyCode.value,
      commaPeriodSetting: this.commaPeriodSetting.value,
      start: this.startDate.dataset.date,
      end: this.endDate.dataset.date
    }
  }

  @on('click', { at: 'button.is-danger' })
  cancel (e) {
    e.preventDefault()
    history.back()
  }
}

module.exports = CreateJournalForm
