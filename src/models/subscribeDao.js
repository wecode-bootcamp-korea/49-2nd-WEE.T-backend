const { AppDataSource } = require("./dataSource");

const createSubscribe = async (startDate, endDate) => {
  return await AppDataSource.query(
    `
      INSERT INTO subscribes (start_date, end_date)
      VALUES (?, ?);
    `,
    [startDate, endDate]
  );
};

const getSubscribeInfoByUserId = async (id) => {
  const query = await AppDataSource.query(
    `
    SELECT subscribes.end_date
    FROM subscribes
    JOIN users ON subscribes.id = users.subscribe_id
    WHERE users.id = ?
  `,
    [id]
  );
  return query;
};

const getSubscription = async () => {
  const query = await AppDataSource.query(`
    SELECT s.id, s.month, s.price FROM subscription s;
  `);
  return query;
};

const getOrderById = async (userID, orderId) => {
  const [query] = await AppDataSource.query(
    `
    SELECT o.user_id, o.order_id
    FROM orders o
    WHERE o.user_id = ? AND o.order_id = ?;
  `,
    [userID, orderId]
  );
  return query;
};

const createOrder = async (userId, orderNumber) => {
  const query = await AppDataSource.query(
    `
    INSERT INTO orders (user_id, order_id)
    VALUES (?, ?);
  `,
    [userId, orderNumber]
  );
  return orderNumber;
};

const updateOrder = async (userId, { orderId, paymentsId, subscribeId }) => {
  await AppDataSource.query(
    `
    UPDATE orders
    SET payment_id = ?, subscribes_id = ?
    WHERE user_id = ? AND order_id = ?;
  `,
    [paymentsId, subscribeId, userId, orderId]
  );
};

module.exports = {
  createSubscribe,
  getSubscribeInfoByUserId,
  getSubscription,
  createOrder,
  updateOrder,
  getOrderById,
};
