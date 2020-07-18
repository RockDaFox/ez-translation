const {options} = require('./TranslationEnum')
const TranslationError = require('./TranslationError')
const { getDeepProperty } = require('./utils')
const axios = require('axios')

class Translation {
  constructor (opts = options) {

    this.defaultFileName = opts.defaultFileName
    this.filesUrl = opts.filesUrl
    this.language = opts.language
    this.defaultFile = axios.get(`${this.filesUrl}/${opts.language}/${this.defaultFileName}.json`).then(response => response.data)

  }

  changeTo (language) {
    this.language = language
    try {
      this.defaultFile = axios.get(`${this.filesUrl}/${language}/${this.defaultFileName}.json`)
    } catch (e) {
      console.log(e)
    }
  }

  async t (word = '', fileName = this.defaultFileName) {

    if (word === '') {
      console.warn('Translation: No word provided')
      return ''
    }
    try {
      let translationFile
      if (fileName === this.defaultFileName) {
        translationFile = await this.defaultFile
      } else {
        const response = await axios.get(`${this.filesUrl}/${this.language}/${fileName}.json`)
        translationFile = response.data
      }
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
