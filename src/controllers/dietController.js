const { dietService } = require("../services");

const getDietInfo = async (req, res) => {
  const userId = req.user.id;

  const diet = await dietService.getDietInfo(userId);

  res.status(200).json({
    message: "READ_SUCCESS",
    data: diet,
  });
};

module.exports = {
  getDietInfo,
};
