const { subscribeDao } = require("../models");
const { getSubscribeInfoByUserId, getSubscription } = subscribeDao;

const subscriptionCheck = async (id) => {
  const [subscriptionDuration] = await getSubscribeInfoByUserId(id);
  const today = new Date();
  const usersubscriprion = new Date(subscriptionDuration.end_date);

  return usersubscriprion > today ? 1 : 0;
};

const showSubscription = async () => {
  return await getSubscription();
};

module.exports = { subscriptionCheck, showSubscription };
