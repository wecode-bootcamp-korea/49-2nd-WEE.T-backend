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

const getOrderList = async (req, res) => {
  const before = req.query.before;

  const paymentsHistory = await userService.getOrderList(req.user.id, before);

  res.status(200).json({
    data: paymentsHistory.map((item) => {
      return {
        orderId: item.order_id,
        payment: item.name,
        subscriptionMonth: parseInt(item.month),
        orderDate: item.orderDate,
        serviceStartDate: item.start_date,
        serviceEndDate: item.end_date,
        price: item.price,
      };
    }),
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
  getOrderList,
  getUserGrade,
};
