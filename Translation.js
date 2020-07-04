import { lang, files } from './TranslationEnum'
import TranslationError from './TranslationError'
import { flatObject, getDeepProperty } from './utils'
class Translation {
  constructor (language = lang.fr) {
    this.files = files
    this.language = 'fr'
    this.commonFile = this.commonFile = require(`./${language}/${this.files.common}.json`)
    this.changeTo(language)
  }

  changeTo (language) {
    this.language = language
    this.commonFile = require(`./${language}/${this.files.common}.json`)
  }

  t (word = '', file = this.files.common) {
    if (word === '') {
      console.warn('Translation: No word provided')
      return ''
    }
    try {
      const translationFile = file === file.common ? this.commonFile : require(`./${this.language}/${file}.json`)
      const translation = getDeepProperty(translationFile, word)
      if (!translation) console.warn(`Translation: "${word}" not found`)
      return translation || ''
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') throw new TranslationError('Translation file not found')
      else throw new TranslationError(e.message)
    }
  }

  static checkFiles () {
    let diff = {}
    const langArray = Object.keys(lang)
    const filesArray = Object.keys(files)

    filesArray.forEach(fileName => {
      diff = {
        ...diff,
        [fileName]: {}
      }
      for (let i = 0; i < langArray.length; i++) {
        const aFile = require(`./${langArray[i]}/${fileName}`)
        for (let j = i + 1; j < langArray.length; j++) {
          if (!Object.keys(diff[fileName]).includes(`${langArray[i]}-${langArray[j]}`)) {
            const bFile = require(`./${langArray[j]}/${fileName}`)
            const missingWords = this.getMissingKeys(aFile, bFile)

            if (missingWords.a.length > 0 || missingWords.b.length > 0) {
              diff = {
                ...diff,
                [fileName]: {
                  ...diff[fileName],
                  [`${langArray[i]}-${langArray[j]}`]: missingWords
                }
              }
            }
          }
        }
      }
    })

    const isClean = !Object.keys(diff).some(fileName => Object.keys(diff[fileName]).length > 0)
    const report = {
      isClean
    }
    if (!isClean) report.diff = diff
    return report
  }

  static getMissingKeys (aFile, bFile) {
    const aObjectFlatten = flatObject(aFile)
    const bObjectFlatten = flatObject(bFile)
    const missingKeys = {
      a: [],
      b: []
    }

    Object.keys(aObjectFlatten).forEach(key => {
      if (bObjectFlatten[key] === undefined) missingKeys.b.push(key)
    })

    Object.keys(bObjectFlatten).forEach(key => {
      if (aObjectFlatten[key] === undefined) missingKeys.a.push(key)
    })

    return missingKeys
  }
}

export default Translation
