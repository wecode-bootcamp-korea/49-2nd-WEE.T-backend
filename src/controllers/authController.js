const { userService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

const socialLogin = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    message: "LOGIN_SUCCESS",
    data: {
      accessToken: user.accessToken,
      isNew: user.isNew,
    },
  });
};

const signup = async (req, res) => {
  const { nickname, height, weight, skeletalMuscleMass, goalWeight, bodyFat, age, gender } = req.body;
  const user = req.user;

  keyCheck({
    nickname,
    height,
    weight,
    skeletalMuscleMass,
    goalWeight,
    bodyFat,
    age,
    gender,
  });

  await userService.signup(nickname, height, weight, skeletalMuscleMass, goalWeight, bodyFat, age, gender, user);

  res.status(200).json({
    message: "MODIFIED_SUCCESS",
  });
};

module.exports = {
  socialLogin,
  signup,
};
