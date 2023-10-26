const { trainingService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

const workoutPlan = async(req, res) => {
  const user = req.user.id;
  console.log("controller" ,user);

  const workoutPlanForUser = await trainingService.workoutPlan(user)

  keyCheck({ user });

  return res.status(200).json({
    message : "READ_SUCCESS",
    data : workoutPlanForUser,
});
}

module.exports = {
  workoutPlan,
}