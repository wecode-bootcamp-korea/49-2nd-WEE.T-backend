const { subscribeDao } = require("../models");

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

module.exports = { subscriptionCheck, showSubscription, createOrder };
