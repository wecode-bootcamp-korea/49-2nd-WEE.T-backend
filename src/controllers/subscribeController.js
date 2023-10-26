const { subscribeService } = require("../services");
const { throwError } = require("../utils/throwError");

const getSubscriptionPlans = async (req, res) => {
  const subscription = await subscribeService.showSubscription();

  res.status(200).json({
    status: await subscribeService.subscriptionCheck(req.user.id),
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

const updateOrder = async (req, res) => {
  if (
    !req.body.orderId ||
    !req.body.paymentsId ||
    !req.body.subscribeId ||
    !req.body.requestedAt ||
    !req.body.approvedAt
  ) {
    throwError(400, "INVALID_KEY");
  }

  await subscribeService.updateOrder(req.user.id, req.body);

  res.status(200).json({
    message: "CREATE_CHECKOUT_SUCCESS",
  });
};

module.exports = { getSubscriptionPlans, createOrder, updateOrder };
