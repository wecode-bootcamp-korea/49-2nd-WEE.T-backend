const { throwError } = require("./throwError");

const validatePositive = (value, valueName) => {
  if (value === undefined) return;

  if (value <= 0) throwError(400, `${valueName.toUpperCase()}_SHOULD_BE_POSITIVE`);
};

const validateMaxValue = (value, valueName, maxValue) => {
  if (value === undefined) return;

  if (value >= maxValue) throwError(400, `${valueName.toUpperCase()}_SHOULD_BE_LESS_THAN_${maxValue}`);
};

const validateMaxOrEqualValue = (value, valueName, maxValue) => {
  if (value === undefined) return;

  if (value > maxValue) throwError(400, `${valueName.toUpperCase()}_SHOULD_BE_LESS_THAN_OR_EQUAL_TO_${maxValue}`);
};

const validateUserInfo = (
  nickname,
  height,
  weight,
  skeletalMuscleMass,
  goalWeight,
  bodyFat,
  age,
  goalBodyFat,
  goalSkeletalMuscleMass
) => {
  validateMaxOrEqualValue(nickname.length, "nickname", 8);

  validatePositive(height, "height");
  validateMaxValue(height, "height", 300);

  validatePositive(weight, "weight");
  validateMaxValue(weight, "weight", 500);

  validatePositive(skeletalMuscleMass, "skeletalMuscleMass");
  validateMaxValue(skeletalMuscleMass, "skeletalMuscleMass", 100);

  validatePositive(goalWeight, "goalWeight");
  validateMaxValue(goalWeight, "goalWeight", 500);

  validatePositive(goalBodyFat, "goalBodyFat");
  validateMaxValue(goalBodyFat, "goalBodyFat", 100);

  validatePositive(goalSkeletalMuscleMass, "goalSkeletalMuscleMass");
  validateMaxValue(goalSkeletalMuscleMass, "goalSkeletalMuscleMass", 500);

  validatePositive(bodyFat, "bodyFat");
  validateMaxValue(bodyFat, "bodyFat", 100);

  validatePositive(age, "age");
  validateMaxOrEqualValue(age, "age", 120);
};

module.exports = {
  validatePositive,
  validateMaxValue,
  validateMaxOrEqualValue,
  validateUserInfo,
};
