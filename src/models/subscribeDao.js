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

const userSubscriprionCheck = async (id) => {
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
    SELECT * FROM subscription;
  `);
  return query;
};

module.exports = { createSubscribe, userSubscriprionCheck, getSubscription };
