const Translation = require('../src/Translation')
const {getMissingKeys} = require('../src/cli/TranslationChecks')
const { expect } = require('chai')
const frFile = require('./mocks/fr/common.json')
const enFile = require('./mocks/en/common.json')

describe('Translation module', () => {

    it('translate file missing', () => {
        const Translate = new Translation()
        const word = Translate.t('password')
        expect(word).to.equal('')
    })

    it('translate word missing', () => {
        const Translate = new Translation(frFile)
        const word = Translate.t('password')
        expect(word).to.equal('')
    })

    it('translate form.password', () => {
        const Translate = new Translation(frFile)
        const word = Translate.t('login-form.label.password')
        expect(word).to.equal('Mot de passe')
    })

    it('compare fr & en file', () => {
        getMissingKeys([frFile, enFile], ['fr', 'en']).then(result => {
            expect(result).to.have.property('fr-en').to.have.property('a').with.length(0)

            expect(result).to.have.property('fr-en').to.have.property('b')
                .with.lengthOf(1).include('cta.play')
        })
    })

    it('compare fr & en file with no identifiers', () => {
        getMissingKeys([frFile, enFile]).then(result => {
            expect(result).to.have.property('0-1').to.have.property('a').with.length(0)

            expect(result).to.have.property('0-1').to.have.property('b')
                .with.lengthOf(1).include('cta.play')
        })
    })
})
