const moment = require("moment");

const { userDao, subscribeDao, healthInfoDao, genderDao } = require("../models");
const { AppDataSource } = require("../models/dataSource");

const { throwError } = require("../utils/throwError");
const { validateUserInfo } = require("../utils/validateInput");

const updateUser = async (
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
) => {
  await AppDataSource.transaction(async () => {
    validateUserInfo(
      nickname,
      height,
      weight,
      skeletalMuscleMass,
      goalWeight,
      bodyFat,
      age,
      goalBodyFat,
      goalSkeletalMuscleMass
    );

    if (user.nickname !== nickname) {
      const existingUser = await userDao.findUserByNickname(nickname);
      if (existingUser) throwError(409, "DUPLICATED_NICKNAME");
    }

    const existingGender = await genderDao.findGenderByName(gender);
    if (!existingGender) throwError(404, "GENDER_NOT_FOUND");

    const now = moment();
    const birthYear = now.format("YYYY") - age;
    const userId = user.id;
    await userDao.updateUser(
      nickname,
      height,
      goalWeight,
      goalBodyFat,
      goalSkeletalMuscleMass,
      birthYear,
      existingGender.id,
      userId
    );

    const bmi = (weight / (height / 100) ** 2).toFixed(2);
    await healthInfoDao.createHealthInfo(weight, skeletalMuscleMass, bmi, bodyFat, userId);
  });
};

const signup = async (nickname, height, weight, skeletalMuscleMass, goalWeight, bodyFat, age, gender, user) => {
  await AppDataSource.transaction(async () => {
    if (!user.isNew) throwError(401, "NOT_NEW_USER");

    validateUserInfo(nickname, height, weight, skeletalMuscleMass, goalWeight, bodyFat, age);

    const existingUser = await userDao.findUserByNickname(nickname);
    if (existingUser) throwError(409, "DUPLICATED_NICKNAME");

    const existingGender = await genderDao.findGenderByName(gender);
    if (!existingGender) throwError(404, "GENDER_NOT_FOUND");

    const now = moment();
    const startDate = now.format("YYYY-MM-DD");
    const subscriptionPeriod = 7;
    const endDate = now.clone().add(subscriptionPeriod, "days").format("YYYY-MM-DD");
    const subscribe = await subscribeDao.createSubscribe(startDate, endDate);

    const subscribeId = subscribe.insertId;
    const birthYear = now.format("YYYY") - age;
    const userId = user.id;
    await userDao.updateUserForSignup(nickname, height, goalWeight, birthYear, existingGender.id, subscribeId, userId);

    const bmi = (weight / (height / 100) ** 2).toFixed(2);
    await healthInfoDao.createHealthInfo(weight, skeletalMuscleMass, bmi, bodyFat, userId);
  });
};

module.exports = {
  updateUser,
  signup,
};
