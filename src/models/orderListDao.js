const { AppDataSource } = require("./dataSource");

const orderListDao = async (id, before) => {
  let query = `
    SELECT o.order_id, p.name, s.month, DATE_FORMAT(o.created_at, '%Y-%m-%d') AS orderDate, b.start_date, b.end_date, s.price
    FROM orders o
    INNER JOIN payments p ON o.payment_id = p.id
    INNER JOIN subscription s ON o.subscription_id = s.id
    INNER JOIN subscribes b ON o.subscribes_id = b.id
    WHERE o.user_id = ?
  `;
  let queryParams = [id];

  if (before !== null) {
    query += `AND o.created_at >= ?`;
    queryParams.push(before);
  }

  const result = await AppDataSource.query(query, queryParams);
  return result;
};

module.exports = orderListDao;
