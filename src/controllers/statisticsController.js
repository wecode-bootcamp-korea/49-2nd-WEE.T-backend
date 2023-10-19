const { statisticsService } = require("../services");

const getStatistics = async (req, res) => {
  const statistics = await statisticsService.getStatistics();

  res.status(200).json({
    message: "READ_SUCCESS",
    data: statistics,
  });
};

module.exports = {
  getStatistics,
};
