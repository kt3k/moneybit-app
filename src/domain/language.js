/**
 * Represents the display language of the app.
 */
class Language {
  constructor ({ code }) {
    this.code = code
  }
}

Language.EN = new Language({ code: 'en' })
Language.JA = new Language({ code: 'ja' })

module.exports = Language
