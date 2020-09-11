#!/usr/bin/env node

const minimist = require('minimist')
const fs = require('fs')
const args = minimist(process.argv.slice(2))
const TranslationChecks = require('./TranslationChecks')
const command = args._[0]

const excludeArgsList = ['_', 'file']


if (command === 'check') {
    const filesPath = args._.slice(1)
    const keyList = Object.keys(args).filter(arg => !excludeArgsList.includes(arg))
    const filesWithIdentifiers = keyList.map(key => require(process.cwd() + args[key]))
    const files = filesPath.map(path => require(process.cwd() + path)).concat(filesWithIdentifiers)

    TranslationChecks.getMissingKeys(files, keyList).then(result => {
        if (args.file) {
            fs.writeFile('compare_report.json', JSON.stringify(result, null, 4), err => {
                if (err) return console.log(err)
            })
        } else {
            console.log(result)
        }
    })
}
