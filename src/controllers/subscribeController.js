const { subscribeService } = require("../services");
const { subscriptionCheck, showSubscription } = subscribeService;

const showSubscriptionPlans = async (req, res) => {
  const subscription = await showSubscription();

  res.status(200).json({
    status: await subscriptionCheck(req.user.id),
    data: subscription.map((item) => {
      return {
        subscribeId: item.id,
        month: parseInt(item.month),
        price: item.price,
      };
    }),
  });
};
module.exports = { showSubscriptionPlans };
