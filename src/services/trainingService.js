const { userDao, trainingDao } = require("../models");
const { findUserById } = require("../models/userDao");
const { throwError } = require("../utils/throwError");

const workoutPlan = async(user) => {
  const userInfo = await userDao.findUserByIdWithHealthInfo(user);
  const exercises = await trainingDao.getTrainingList(user);

  if (exercises.length === 0) {
    throwError(404, "NO DATA USER");
  }

  const firstExercise = exercises[0]

  const workoutData = {};

  exercises.forEach((exercise) => {
    if (!workoutData[exercise.partName]) {
      workoutData[exercise.partName] = [];
    }
    
    const exercisesArray = exercise.exercises;

    for (let i = 0; i < 3; i++) {
      const selectedExercise = exercisesArray[i];
      
      workoutData[exercise.partName].push({
        name: selectedExercise.name,
        count: Math.floor(Math.random() * 10) + 5,
        set: Math.floor(Math.random() * 3) + 3,
        link : selectedExercise.link,
        content : selectedExercise.content,
      });
    }
  });

  Object.keys(workoutData).forEach((partName) => {
    workoutData[partName] = workoutData[partName].slice(0.3);
  });
  return {
    nickName: userInfo.nickname,
    startWeight: firstExercise.startWeight,
    currentWeight: firstExercise.currentWeight,
    targetWeight: userInfo.goalWeight,
    ...workoutData,
  }
}

module.exports = {
  workoutPlan,
}