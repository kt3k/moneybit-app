/**
 * Represents the display language of the app.
 */
class Language {
  constructor ({ name }) {
    this.name = name
  }
}

Language.EN = new Language({ name: 'en' })
Language.JA = new Language({ name: 'ja' })

module.exports = Language
