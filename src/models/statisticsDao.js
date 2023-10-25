const { AppDataSource } = require("./dataSource");

const findCounts = async () => {
  const [statistics] = await AppDataSource.query(
    `
    SELECT 
      (SELECT COUNT(*) FROM subscribes) AS subscriberCount,
      (SELECT COUNT(*) FROM feeds) AS feedCount,
      (SELECT COUNT(*) FROM users) AS userCount
    `
  );

  return statistics;
};

module.exports = {
  findCounts,
};
