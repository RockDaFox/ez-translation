const {flatObject} = require('./utils')

module.exports = {
  checkFiles: (langArray = [], filesArray = [], filesPath = '') => {
    let diff = {}

    filesArray.forEach(fileName => {
      diff = {
        ...diff,
        [fileName]: {}
      }
      for (let i = 0; i < langArray.length; i++) {
        const aFile = `${filesPath}/${langArray[i]}/${fileName}`
        for (let j = i + 1; j < langArray.length; j++) {
          if (!Object.keys(diff[fileName]).includes(`${langArray[i]}-${langArray[j]}`)) {
            const bFile = `${filesPath}/${langArray[j]}/${fileName}`
            const missingWords = getMissingKeys(aFile, bFile)

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
  },

  getMissingKeys: (aFile = '', bFile = '') => {
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
