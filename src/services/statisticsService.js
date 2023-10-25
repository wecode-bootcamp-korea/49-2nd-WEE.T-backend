const { statisticsDao } = require("../models");

const getStatistics = async () => {
  return await statisticsDao.findCounts();
};

module.exports = {
  getStatistics,
};
