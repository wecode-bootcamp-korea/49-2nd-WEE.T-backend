const { AppDataSource } = require("./dataSource");

const findGenderByName = async (genderId) => {
  const [gender] = await AppDataSource.query(
    `
    SELECT
      id
    FROM
      gender
    WHERE
      name = ?
    LIMIT 1
    `,
    [genderId]
  );

  return gender;
};

module.exports = {
  findGenderByName,
};
