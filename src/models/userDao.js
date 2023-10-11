const { AppDataSource } = require("./dataSource");

const createUser = async (email, snsId, socialId) => {
  return await AppDataSource.query(
    `
    INSERT INTO users (
      email,
      sns_id,
      social_id
    ) VALUES (?, ?, ?)
    `,
    [email, snsId, socialId]
  );
};

const findUserBySNS = async (snsId, socialId) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      u.id
    FROM
      users u
    INNER JOIN
      socials s
    ON
      u.social_id = s.id
    WHERE
      u.sns_id = ?
    AND
      u.social_id = ?
    LIMIT 1
    `,
    [snsId, socialId]
  );

  return user;
};

const updateUser = async (
  nickname,
  height,
  goalWeight,
  goalBodyFat,
  goalSkeletalMuscleMass,
  birthYear,
  genderId,
  subscribeId,
  userId
) => {
  await AppDataSource.query(
    `
    UPDATE 
      users
    SET 
      nickname = ?,
      height = ?,
      goal_weight = ?,
      goal_body_fat = ?,
      goal_skeletal_muscle_mass = ?,
      birth_year = ?,
      gender_id = ?,
      subscribe_id = ?
    WHERE
      id = ?
    `,
    [nickname, height, goalWeight, goalBodyFat, goalSkeletalMuscleMass, birthYear, genderId, subscribeId, userId]
  );
};

const findUserById = async (userId) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      id,
      nickname
    FROM
      users
    WHERE
      id = ?
    LIMIT 1
    `,
    [userId]
  );

  return user;
};

const findUserByNickname = async (nickname) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      id
    FROM
      users
    WHERE
      nickname = ?
    `,
    [nickname]
  );

  return user;
};

module.exports = {
  createUser,
  findUserBySNS,
  updateUser,
  findUserById,
  findUserByNickname,
};
