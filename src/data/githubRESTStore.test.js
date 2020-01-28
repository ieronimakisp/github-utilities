const mockHttpClient = {
  get: jest.fn(),
};
const githubStore = require('./githubRESTStore').createGithubRESTStore(
  mockHttpClient,
);

const mockHttpClientJavaScriptResponse = {
  data: {
    items: [
      {
        id: 36260787,
        open_issues_count: 2,
        language: 'JavaScript',
      },
      {
        id: 36260788,
        open_issues_count: 5,
        language: 'JavaScript',
      },
    ],
  },
};

const mockHttpClientJavaResponse = {
  data: {
    items: [
      {
        id: 36260787,
        open_issues_count: 25,
        language: 'Java',
      },
      {
        id: 36260788,
        open_issues_count: 15,
        language: 'Java',
      },
    ],
  },
};

describe('Github REST Store', () => {
  describe('getIssuesForLanguages test', () => {
    it('should return the accumulated sum of open issues count when two languages are provided', async () => {
      const languages = ['JavaScript', 'Java'];
      const expected = [
        {
          language: 'JavaScript',
          openIssuesCount: 7,
        },
        {
          language: 'Java',
          openIssuesCount: 40,
        },
      ];
      mockHttpClient.get
        .mockReturnValueOnce(mockHttpClientJavaScriptResponse)
        .mockReturnValueOnce(mockHttpClientJavaResponse);
      const stats = await githubStore.getIssuesForLanguages(languages);
      expect(stats).toEqual(expected);
    });

    it('should return no stats instances when no languages are provided', async () => {
      const languages = [];
      const expected = [];
      mockHttpClient.get
        .mockReturnValueOnce(mockHttpClientJavaScriptResponse)
        .mockReturnValueOnce(mockHttpClientJavaResponse);
      const stats = await githubStore.getIssuesForLanguages(languages);
      expect(stats).toEqual(expected);
    });
  });
});
