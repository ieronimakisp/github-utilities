function createStatsService(githubReposRepository) {
  function compareLanguagesByIssues(languages = []) {
    return githubReposRepository.getIssuesForLanguages(languages);
  }

  return {
    compareLanguagesByIssues,
  };
}

module.exports = {
  createStatsService,
};
