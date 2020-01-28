const helmet = require("helmet");
const express = require("express");
const compress = require("compression")();
const bodyParser = require("body-parser");
const statsRoutes = require("./stats/routes");

const app = express();

app
  .use(helmet())
  .use(bodyParser.json())
  .use(compress);

function create({ statsService }) {
  app.use("/stats", statsRoutes.create(statsService));
  return app;
}

module.exports = {
  createServer: create
};
