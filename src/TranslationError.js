class TranslationError extends Error {
  constructor (message) {
    super(message)
    this.message = message
    this.name = 'TranslationError'
  }
}

module.exports =  TranslationError
