const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { errorHandler } = require("./src/utils/errorHandler");

const { routes } = require("./src/routes");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("combined"));

  app.use(routes);
  app.use(errorHandler);

  return app;
};

module.exports = { createApp };
