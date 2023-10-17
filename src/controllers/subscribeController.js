const subscribeService = require("../services/subscribeService");
const { subscriprionCheck, showSubscription } = subscribeService;

const showSubscriptionPlans = async (req, res, next) => {
  try {
    const usersubscriptionCheck = await subscriprionCheck(req.userId);
    const subscription = await showSubscription();

    res.status(200).json({
      status: `${usersubscriptionCheck}`,
      data: subscription.map((item) => {
        return {
          subscribeId: item.id,
          month: parseInt(item.month),
          price: item.price,
        };
      }),
    });
  } catch (err) {
    console.log(err);
    next();
  }
};
module.exports = { showSubscriptionPlans };
