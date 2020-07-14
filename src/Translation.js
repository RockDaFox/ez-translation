const path = require('path')
const {options} = require('./TranslationEnum')
const TranslationError = require('./TranslationError')
const { getDeepProperty } = require('./utils')

class Translation {
  constructor (opts = options) {

      this.defaultFileName = opts.defaultFileName
      this.filesDir = path.resolve(opts.filesDir)
      this.language = null
      this.defaultFile = null

      this.changeTo(opts.language)

  }

  changeTo (language) {
    this.language = language
    this.defaultFile = require(`${this.filesDir}/${language}/${this.defaultFileName}.json`)
    console.log(this.defaultFile)
  }

  t (word = '', fileName = this.defaultFileName) {
    if (word === '') {
      console.warn('Translation: No word provided')
      return ''
    }
    try {
      const translationFile = fileName === this.defaultFileName ? this.defaultFile : require(`${this.filesDir}/${this.language}/${fileName}.json`)
      const translation = getDeepProperty(translationFile, word)
      if (!translation) console.warn(`Translation: "${word}" not found`)
      return translation || ''
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') throw new TranslationError('Translation file not found')
      else throw new TranslationError(e.message)
    }
  }
}

module.exports = Translation
