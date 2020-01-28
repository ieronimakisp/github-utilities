const domainLanguages = require('../domain/languages')

function toDomainLanguage(githubLanguage) {
    switch (githubLanguage) {
        case 'JavaScript':
            return domainLanguages.JS;
        case 'Java':
            return domainLanguages.JAVA;
        default:
            return ''
    }
}

function toGithubLanguage(domainLanguage) {
    switch (domainLanguage) {
        case domainLanguages.JS:
            return 'JavaScript';
        case domainLanguages.JAVA:
            return 'Java';
        default:
            return ''
    }
}

module.exports = {
    toDomainLanguage,
    toGithubLanguage
}