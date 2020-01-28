// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const { createServer } = require('../index');
const { createStatsService } = require('../../domain/stats/service');

const mockData = [
  {
    language: 'JavaScript',
    openIssuesCount: 4790,
  },
  {
    language: 'Java',
    openIssuesCount: 3311,
  },
];

const expectedData = {
  stats: [
    {
      language: 'JavaScript',
      openIssuesCount: 4790,
    },
    {
      language: 'Java',
      openIssuesCount: 3311,
    },
  ],
};

const mockGithubStore = {
  getIssuesForLanguages: jest.fn(),
};
const statsService = createStatsService(mockGithubStore);
const app = createServer({
  statsService,
});

describe('Stats route test', () => {
  describe('GET /stats test', () => {
    beforeEach(() => {
      mockGithubStore.getIssuesForLanguages.mockReset();
    });

    it('should return 200 with an array of stats for the selected languages', async () => {
      mockGithubStore.getIssuesForLanguages.mockResolvedValue(mockData);

      const { body: stats } = await request(app)
        .get('/stats?languages=js,java')
        .expect(200);

      expect(stats).toEqual(expectedData);
    });

    it('should return 500 if github api fails', async () => {
      mockGithubStore.getIssuesForLanguages.mockRejectedValue(
        new Error('Github failure.'),
      );

      return request(app)
        .get('/stats?languages=js,java')
        .expect(500);
    });
  });
});
