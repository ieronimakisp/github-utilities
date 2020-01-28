const config = require('../config');
const { toGithubLanguage } = require('./mappers');
const LanguageStats = require('../domain/stats/model');

function createGithubRESTStore(httpClient) {
  async function getIssuesForLanguages(languages) {
    // Map each language to a promise, which will resolve into an array of the top repositories (stars count)
    // for this language
    const languageRepoDataListPromises = languages.map(l =>
      getTopRepositories(l),
    );
    const languageRepoDataList = await Promise.all(
      languageRepoDataListPromises,
    );
    // For each language repositories group, accumulate the count of open issues and return a Languagestats instance
    const stats = languageRepoDataList.map((languageRepoData, index) => {
      const openIssuesCount = languageRepoData.reduce((acc, repoData) => {
        return acc + Number(repoData.open_issues_count);
      }, 0);
      return new LanguageStats({
        language: languages[index],
        openIssuesCount,
      });
    });
    return stats;
  }

  async function getTopRepositories(language) {
    const githubLanguage = toGithubLanguage(language);
    const queryUri = `${config.github.apiBaseUri}${config.github.searchPath}repositories?q=language:${githubLanguage}&sort=stars&per_page=${config.github.queryLimit}`;
    const response = await httpClient.get(queryUri);
    return response.data.items;
  }

  return {
    getIssuesForLanguages,
  };
}

module.exports = {
  createGithubRESTStore,
};
