const {
  Action: { CREATE_JOURNAL_DOCUMENT }
} = require('~')

const { component, on, emits, wired } = capsid

/**
 * The form component which creates journal with `.is-primary` button.
 */
@component('js-create-journal-form')
class CreateJournalForm {
  @wired('[name="title"]') title

  @wired('[name="currencyCode"]') currencyCode

  @wired('[name="commaPeriodSetting"]') commaPeriodSetting

  @wired('[name="startDate"]') startDate

  @wired('[name="endDate"]') endDate

  @wired('button.is-primary') primaryButton

  @wired('button.is-danger') cancelButton

  @on('click', { at: '.create-journal-form__create-button' })
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

  @on('click', { at: '.create-journal-form__cancel-button' })
  cancel (e) {
    e.preventDefault()
    history.back()
  }
}

module.exports = CreateJournalForm
