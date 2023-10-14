const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

const { errorHandler } = require("./src/utils/errorHandler");
require("./src/config/passport");

const routes = require("./src/routes");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(passport.initialize());

  app.use(routes);
  app.use(errorHandler);

  return app;
};

module.exports = { createApp };
