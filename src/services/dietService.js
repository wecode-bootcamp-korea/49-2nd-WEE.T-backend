const moment = require("moment");

const { client } = require("../models/dataSource");
const { userDao, foodDao } = require("../models");

const calculateTdee = (gender, weight, height, age) => {
  const bmr =
    gender === "male"
      ? 66.47 + 13.75 * weight + 5 * height - 6.76 * age
      : 655.1 + 9.56 * weight + 1.85 * height - 4.68 * age;

  const dietCalorie = 500;

  return parseInt(bmr * 1.555 - dietCalorie);
};

const calculateFraction = (number) => {
  integer = parseInt(number);
  decimal = Number((number - integer).toFixed(1));
  let denominator = 0;
  let numerator = 0;

  if (decimal >= 0.75) {
    denominator = 4;
  } else if (decimal >= 0.666) {
    denominator = 3;
  } else if (decimal >= 0.5) {
    denominator = 2;
  } else if (decimal >= 0.333) {
    denominator = 3;
  } else if (decimal >= 0.25) {
    denominator = 4;
  } else {
    denominator = 0;
  }

  numerator = Math.round(decimal * denominator);

  if (numerator === 4) {
    return {
      integer: integer + 1,
      denominator: 0,
      numerator: 0,
    };
  }

  return {
    integer,
    denominator,
    numerator,
  };
};

const createDietMenus = (calculatedCarbohydrateFoods, calculatedProteinFoods, calculatedFatFoods, mealCount, date) => {
  const meals = ["breakfast", "lunch", "dinner"];
  const dayMeals = {};
  for (let i = 0; i < mealCount; i++) {
    const carbohydrateFood = calculatedCarbohydrateFoods[i];
    const proteinFood = calculatedProteinFoods[i];
    const fatFood = calculatedFatFoods[i];
    dayMeals[meals[i]] = [carbohydrateFood, proteinFood, fatFood];
  }

  return {
    date,
    ...dayMeals,
  };
};

const calculateFoodsByNutrient = (foods, nutrientPerMeal) => {
  return foods.map((food) => {
    const nutrientContent = food.nutrientContent;
    const ratio = Number((nutrientPerMeal / nutrientContent).toFixed(1));
    const grams = parseInt(food.gram * ratio);
    const { integer, denominator, numerator } = calculateFraction(ratio);

    return {
      ...food,
      gram: grams,
      count: {
        integer,
        denominator,
        numerator,
      },
    };
  });
};

const setDietMenu = async (menuKey, dietMenu) => {
  const now = moment();
  const midnightTomorrow = now.clone().add(1, "days").endOf("day");
  const timeUntilMidnight = midnightTomorrow.diff(now);
  await client.PSETEX(menuKey, timeUntilMidnight, JSON.stringify(dietMenu));
};

const getDietInfo = async (userId) => {
  const { nickname, gender, weight, height, age } = await userDao.findUserByIdWithHealthInfo(userId);
  const tdee = calculateTdee(gender, weight, height, age);

  const mealCount = 3;
  const carbohydratePerMeal = parseInt((tdee * 0.5) / 4 / mealCount);
  const proteinPerMeal = parseInt((tdee * 0.3) / 4 / mealCount);
  const fatPerMeal = parseInt((tdee * 0.2) / 9 / mealCount);

  const now = moment();
  const todayDate = now.format("YYYY.MM.DD");
  const tomorrowDate = now.clone().add(1, "days").format("YYYY.MM.DD");
  const todayDietMenuKey = `${userId}_${tdee}_${todayDate}`;
  const tomorrowDietMenuKey = `${userId}_${tdee}_${tomorrowDate}`;
  let todayDietMenu = JSON.parse(await client.get(todayDietMenuKey));
  let tomorrowDietMenu = JSON.parse(await client.get(tomorrowDietMenuKey));

  if (!todayDietMenu || !tomorrowDietMenu) {
    if (!todayDietMenu) {
      const carbohydrateFoods = await foodDao.findFoodByNutrition("탄수화물");
      const proteinFoods = await foodDao.findFoodByNutrition("단백질");
      const fatFoods = await foodDao.findFoodByNutrition("지방");

      todayDietMenu = createDietMenus(
        calculateFoodsByNutrient(carbohydrateFoods, carbohydratePerMeal),
        calculateFoodsByNutrient(proteinFoods, proteinPerMeal),
        calculateFoodsByNutrient(fatFoods, fatPerMeal),
        mealCount,
        todayDate
      );
      await setDietMenu(todayDietMenuKey, todayDietMenu);
    }

    if (!tomorrowDietMenu) {
      const carbohydrateFoods = await foodDao.findFoodByNutrition("탄수화물");
      const proteinFoods = await foodDao.findFoodByNutrition("단백질");
      const fatFoods = await foodDao.findFoodByNutrition("지방");

      tomorrowDietMenu = createDietMenus(
        calculateFoodsByNutrient(carbohydrateFoods, carbohydratePerMeal),
        calculateFoodsByNutrient(proteinFoods, proteinPerMeal),
        calculateFoodsByNutrient(fatFoods, fatPerMeal),
        mealCount,
        tomorrowDate
      );
      await setDietMenu(tomorrowDietMenuKey, tomorrowDietMenu);
    }
  }

  return {
    nickname,
    dailyCalorieIntake: tdee,
    carbohydrate: carbohydratePerMeal,
    protein: proteinPerMeal,
    fat: fatPerMeal,
    today: todayDietMenu,
    tomorrow: tomorrowDietMenu,
  };
};

module.exports = {
  getDietInfo,
};
