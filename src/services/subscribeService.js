const subscripbeDao = require("../models/subscribeDao");
const { userSubscriprionCheck, getSubscription } = subscripbeDao;

const subscriptionCheck = async (id) => {
  const [subscriptionDuration] = await userSubscriprionCheck(id);
  const today = new Date();
  const usersubscriprion = new Date(subscriptionDuration.end_date);

  return usersubscriprion > today ? 1 : 0;
};

const showSubscription = async () => {
  return await getSubscription();
};

module.exports = { subscriptionCheck, showSubscription };
