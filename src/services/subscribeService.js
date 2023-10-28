const { subscribeDao } = require("../models");
const { throwError } = require("../utils/throwError");

const subscriptionCheck = async (id) => {
  const [subscriptionDuration] = await subscribeDao.getSubscribeInfoByUserId(id);
  const today = new Date();
  const usersubscriprion = new Date(subscriptionDuration.end_date);

  return usersubscriprion > today ? 1 : 0;
};

const showSubscription = async () => {
  return await subscribeDao.getSubscription();
};

const createOrder = async (userId) => {
  const generateOrderNumber = () => {
    const isSingleDigit = (number, length) => {
      const stringifyNumber = number.toString();
      return stringifyNumber.length < length
        ? "0".repeat(length - stringifyNumber.length) + stringifyNumber
        : stringifyNumber;
    };

    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hour = isSingleDigit(currentDate.getHours(), 2);
    const minute = isSingleDigit(currentDate.getMinutes(), 2);
    const seconds = isSingleDigit(currentDate.getSeconds(), 2);
    const milliSeconds = isSingleDigit(currentDate.getMilliseconds(), 3);

    return `${year}${month}${day}${hour}${minute}${seconds}${milliSeconds}`;
  };

  const orderNumber = generateOrderNumber();
  return await subscribeDao.createOrder(userId, orderNumber);
};

const updateOrder = async (userId, req) => {
  const exiestOrderId = await subscribeDao.getOrderById(userId, req.orderId);

  if (!exiestOrderId) {
    throwError(400, "NOT_FOUNDED_ORDER_ID");
  }
  return await subscribeDao.updateOrder(userId, req);
};

module.exports = { subscriptionCheck, showSubscription, createOrder, updateOrder };
