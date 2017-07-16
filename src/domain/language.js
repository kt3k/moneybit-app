/**
 * Represents the display language of the app.
 */
class Language {
  constructor ({ code }) {
    this.code = code
  }

  static getByCode (code) {
    if (code === EN.code) {
      return EN
    } else if (code === JA.code) {
      return JA
    }

    return null
  }
}

const EN = Language.EN = new Language({ code: 'en' })
const JA = Language.JA = new Language({ code: 'ja' })

module.exports = Language
