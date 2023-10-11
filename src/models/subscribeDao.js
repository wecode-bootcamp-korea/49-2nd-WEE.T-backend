const { AppDataSource } = require("./dataSource");

const createSubscribe = async (startDate, endDate) => {
  return await AppDataSource.query(
    `
    INSERT INTO subscribes (
      start_date,
      end_date
    ) VALUES (?, ?);
    `,
    [startDate, endDate]
  );
};

module.exports = {
  createSubscribe,
};
