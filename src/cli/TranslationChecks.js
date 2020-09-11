const {flatObject} = require('../utils')
// const path = require('path')

// async function checkFiles (langArray = [], filesArray = [], filesPath = '', useFetch = false) {
//   let diff = {}
//
//   for (const fileName of filesArray) {
//     diff = {
//       ...diff,
//       [fileName]: {}
//     }
//     for (let i = 0; i < langArray.length; i++) {
//       const aFile = await getFile(`${filesPath}/${langArray[i]}/${fileName}`, useFetch)
//
//       for (let j = i + 1; j < langArray.length; j++) {
//         if (!Object.keys(diff[fileName]).includes(`${langArray[i]}-${langArray[j]}`)) {
//           const bFile = await getFile(`${filesPath}/${langArray[j]}/${fileName}`, useFetch)
//           const missingWords = getMissingKeys(aFile, bFile)
//
//           if (missingWords.a.length > 0 || missingWords.b.length > 0) {
//             diff = {
//               ...diff,
//               [fileName]: {
//                 ...diff[fileName],
//                 [`${langArray[i]}-${langArray[j]}`]: missingWords
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//
//   const isClean = !Object.keys(diff).some(fileName => Object.keys(diff[fileName]).length > 0)
//   const report = {
//     isClean
//   }
//   if (!isClean) report.diff = diff
//   return report
// }

// async function getFile (path = '', useFetch = false) {
//   if (useFetch) return fetch(path)
//   else return require(path)
// }

async function getMissingKeys (files = [], identifiers = []) {

  const flattenFiles = files.map(file => flatObject(file))

  const missingKeys = {}
  for (let i = 0; i < flattenFiles.length; i++) {
    for (let j = 0; j < flattenFiles.length; j++) {
      if (i !== j && !missingKeys[`${identifiers[j] || j}-${identifiers[i] || i}`]) {
        const aFile = flattenFiles[i]
        const bFile = flattenFiles[j]
        missingKeys[`${identifiers[i] || i}-${identifiers[j] || j}`] = await compare(aFile, bFile)
      }
    }
  }

  return missingKeys
}

async function compare (a, b) {
  const missingKeys = {
    a: [],
    b: []
  }

  const result = await Promise.all([checkKeys(a, b), checkKeys(b, a)])

  missingKeys.b = result[0]
  missingKeys.a = result[1]

  return missingKeys
}

function checkKeys (a, b) {
  const missingForB = []
  Object.keys(a).forEach(key => {
    if (b[key] === undefined) missingForB.push(key)
  })

  return missingForB
}

// module.exports.checkFiles = checkFiles
module.exports.getMissingKeys = getMissingKeys
// module.exports.getFile = getFile
