const { userService, authService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

const socialLogin = async (req, res) => {
  const user = req.user;
  const isNew = user.isNew;

  const HTTP_STATUS_CREATED = 201;
  const HTTP_STATUS_OK = 200;

  const statusCode = isNew ? HTTP_STATUS_CREATED : HTTP_STATUS_OK;

  res.status(statusCode).json({
    message: "LOGIN_SUCCESS",
    data: {
      accessToken: user.accessToken,
      isNew,
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

const logout = async (req, res) => {
  const accessToken = req.headers.authorization;

  await authService.logout(accessToken);

  res.status(200).json({
    message: "LOGOUT_SUCCESS",
  });
};

module.exports = {
  socialLogin,
  signup,
  logout,
};
