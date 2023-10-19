const { userService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

const updateUser = async (req, res) => {
  const {
    nickname,
    height,
    weight,
    skeletalMuscleMass,
    goalWeight,
    goalBodyFat,
    goalSkeletalMuscleMass,
    bodyFat,
    age,
    gender,
  } = req.body;
  const user = req.user;

  keyCheck({
    nickname,
    height,
    weight,
    skeletalMuscleMass,
    goalWeight,
    goalBodyFat,
    goalSkeletalMuscleMass,
    bodyFat,
    age,
    gender,
  });

  await userService.updateUser(
    nickname,
    height,
    weight,
    skeletalMuscleMass,
    goalWeight,
    goalBodyFat,
    goalSkeletalMuscleMass,
    bodyFat,
    age,
    gender,
    user
  );

  res.status(200).json({
    message: "MODIFIED_SUCCESS",
  });
};

const duplicateNicknameCheck = async (req, res) => {
  const { nickname } = req.body;

  keyCheck({
    nickname,
  });

  await userService.duplicateNicknameCheck(nickname);

  res.status(200).json({
    message: "AVAILABLE_NICKNAME",
  });
};

module.exports = {
  updateUser,
  duplicateNicknameCheck,
};
