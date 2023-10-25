const moment = require("moment");
const jwt = require("jsonwebtoken");

const { client } = require("../models/dataSource");

const logout = async (token) => {
  const { exp } = jwt.verify(token, process.env.SECRET_KEY);

  const now = moment();
  const todayDate = now.format("YYYY.MM.DD HH:mm:ss");
  await client.PSETEX(token, exp, todayDate);
};

module.exports = {
  logout,
};
