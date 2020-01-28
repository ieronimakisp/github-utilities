const domainLanguages = require('../domain/languages')

function toDomainLanguage(routingLanguage) {
    switch (routingLanguage) {
        case 'js':
            return domainLanguages.JS;
        case 'java':
            return domainLanguages.JAVA;
        default:
            return ''
    }
}

function toRoutingLanguage(domainLanguage) {
    switch (domainLanguage) {
        case domainLanguages.JS:
            return 'js';
        case domainLanguages.JAVA:
            return 'java';
        default:
            return ''
    }
}

module.exports = {
    toDomainLanguage,
    toRoutingLanguage
}