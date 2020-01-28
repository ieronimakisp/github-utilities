const { port } = require("./config");
const { createServer } = require("./router");
const httpClient = require("./utils/httpClient");
const { createStatsService } = require("./domain/stats/service");
const githubStore = require("./data/githubRESTStore").createGithubRESTStore(
  httpClient
);
const statsService = createStatsService(githubStore);

const server = createServer({
  statsService
});

server.listen(port, () => {
  console.log(`Listening on *:${port}`);
});
