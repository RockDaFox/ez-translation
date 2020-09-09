const TranslationError = require('./TranslationError')
const { getDeepProperty } = require('./utils')

class Translation {
  constructor (file) {
    this.file = file
  }

  t (word = '') {
    if (!this.file) {
      console.warn('Translation: No file provided')
      return ''
    }
    if (word === '') {
      console.warn('Translation: No word provided')
      return ''
    }
    try {
      const translation = getDeepProperty(this.file, word)
      if (!translation) console.warn(`Translation: "${word}" not found`)
      return translation || ''
    } catch (e) {
      throw new TranslationError(e.message)
    }
  }
}

module.exports = Translation
