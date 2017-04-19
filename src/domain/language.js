/**
 * Represents the display language of the app.
 */
class Language {
  constructor ({ name }) {
    this.name = name
  }
}

Language.EN = Language({ name: 'en' })
Language.JA = Language({ name: 'ja' })

module.exports = Language
