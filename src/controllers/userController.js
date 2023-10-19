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

const checkDuplicatedNickname = async (req, res) => {
  const { nickname } = req.body;

  keyCheck({
    nickname,
  });

  await userService.checkDuplicatedNickname(nickname);

  res.status(200).json({
    message: "AVAILABLE_NICKNAME",
  });
};

const getUserInfo = async (req, res) => {
  const { id: userId } = req.user;

  const user = await userService.getUserInfo(userId);

  res.status(200).json({
    message: "READ_SUCCESS",
    data: user,
  });
};

const getUserGrade = async (req, res) => {
  const { id: userId } = req.user;

  const user = await userService.getUserGrade(userId);

  res.status(200).json({
    message: "READ_SUCCESS",
    data: user,
  });
};

module.exports = {
  updateUser,
  checkDuplicatedNickname,
  getUserInfo,
  getUserGrade,
};
