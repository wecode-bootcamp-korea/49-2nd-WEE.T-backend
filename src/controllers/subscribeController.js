const { subscribeService } = require("../services");
const { subscriptionCheck, showSubscription } = subscribeService;

const getSubscriptionPlans = async (req, res) => {
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

const createOrder = async (req, res) => {
  const { id } = req.user;

  res.status(200).json({
    orderId: await subscribeService.createOrder(id),
    message: "CREATE_ORDER_SUCCESS",
  });
};

module.exports = { getSubscriptionPlans, createOrder };
