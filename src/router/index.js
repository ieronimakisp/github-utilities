const helmet = require('helmet');
const express = require('express');
const errorHandler = require('./errors');
const compress = require('compression')();
const bodyParser = require('body-parser');
const statsRoutes = require('./stats/routes');
const notFoundMiddleware = require('./errors/notFound');

const app = express();

app
  .use(helmet())
  .use(bodyParser.json())
  .use(compress);

function create({ statsService }) {
  app.get('/', (req, res) => {res.json("Hello")})
  app.use('/stats', statsRoutes.create(statsService));
  app.use(errorHandler);
  app.use(notFoundMiddleware);
  return app;
}

module.exports = {
  createServer: create,
};
