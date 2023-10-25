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
    JOIN users ON subscribes.id = users.id
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

module.exports = { createSubscribe, getSubscribeInfoByUserId, getSubscription, createOrder };
