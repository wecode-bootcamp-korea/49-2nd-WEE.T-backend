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
      gender_id = ?
    WHERE
      id = ?
    `,
    [nickname, height, goalWeight, goalBodyFat, goalSkeletalMuscleMass, birthYear, genderId, userId]
  );
};

const updateUserForSignup = async (nickname, height, goalWeight, birthYear, genderId, subscribeId, userId) => {
  await AppDataSource.query(
    `
    UPDATE 
      users
    SET 
      nickname = ?,
      height = ?,
      goal_weight = ?,
      birth_year = ?,
      gender_id = ?,
      subscribe_id = ?
    WHERE
      id = ?
    `,
    [nickname, height, goalWeight, birthYear, genderId, subscribeId, userId]
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
    LIMIT 1
    `,
    [nickname]
  );

  return user;
};

const findUserByIdWithHealthInfo = async (userId) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      u.nickname,
      u.height,
      h.weight,
      h.skeletal_muscle_mass AS skeletalMuscleMass,
      u.goal_weight AS goalWeight,
      u.goal_body_fat AS goalBodyFat,
      u.goal_skeletal_muscle_mass AS goalSkeletalMuscleMass,
      h.body_fat AS bodyFat,
      YEAR(CURDATE()) - CAST(u.birth_year AS SIGNED) AS age,
      g.name AS gender,
      IF(s.end_date >= CURDATE(), 1, 0) AS isSubscribe,
      b.level AS badgeLevel,
      b.image_url AS badgeImageUrl
    FROM
      users u
    LEFT JOIN (
      SELECT 
        weight,
        skeletal_muscle_mass, 
        body_fat
      FROM 
        health_infos
      WHERE 
        user_id = ?
      ORDER BY 
        id DESC
      LIMIT 1
    ) h
    ON
      1 = 1
    LEFT JOIN
      gender g
    ON 
      g.id = gender_id
    LEFT JOIN
      subscribes s
    ON 
      s.id = u.subscribe_id
    LEFT JOIN
      badges b
    ON 
      b.id = badge_id
    WHERE
      u.id = ?
    LIMIT 1
    `,
    [userId, userId]
  );

  return user;
};

const findUserByIdWithBadge = async (userId) => {
  const [user] = await AppDataSource.query(
    `
    SELECT
      u.nickname,
      b.image_url AS badgeImageUrl
    FROM
      users u
    LEFT JOIN
      badges b
    ON
      b.id = u.badge_id
    WHERE
      u.id = ?
    LIMIT 1
    `,
    [userId]
  );

  return user;
};

module.exports = {
  createUser,
  findUserBySNS,
  updateUser,
  updateUserForSignup,
  findUserById,
  findUserByNickname,
  findUserByIdWithHealthInfo,
  findUserByIdWithBadge,
};
