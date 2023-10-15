const { userDao, subscribeDao, healthInfoDao, genderDao } = require("../models");
const { AppDataSource } = require("../models/dataSource");

const { throwError } = require("../utils/throwError");

const updateUser = async (nickname, height, weight, skeletalMuscleMass, goalWeight, bodyFat, age, gender, user) => {
  await AppDataSource.transaction(async () => {
    if (nickname.length > 8) throwError(400, "NICKNAME_LENGTH_EXCEEDS_8");

    if (user.nickname !== nickname) {
      const existingUser = await userDao.findUserByNickname(nickname);
      if (existingUser) throwError(409, "DUPLICATED_NICKNAME");
    }

    const startDate = new Date();
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);
    const formattedEndDate = endDate.toISOString().slice(0, 10);
    const subscribe = await subscribeDao.createSubscribe(formattedStartDate, formattedEndDate);

    const existingGender = await genderDao.findGenderByName(gender);
    if (!existingGender) throwError(404, "GENDER_NOT_FOUND");
    const subscribeId = subscribe.insertId;
    const birthYear = +startDate.getFullYear() - age;
    const userId = user.id;
    await userDao.updateUser(nickname, height, goalWeight, birthYear, existingGender.id, subscribeId, userId);

    const bmi = (weight / (height / 100) ** 2).toFixed(2);
    await healthInfoDao.createHealthInfo(weight, skeletalMuscleMass, bmi, bodyFat, userId);
  });
};

module.exports = {
  updateUser,
};
