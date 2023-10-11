const { AppDataSource } = require("./dataSource");

const createHealthInfo = async (weight, skeletalMuscleMass, bmi, bodyFat, userId) => {
  return AppDataSource.query(
    `
    INSERT INTO health_infos (
      weight,
      skeletal_muscle_mass,
      bmi,
      body_fat,
      user_id
    ) VALUES (?, ?, ?, ?, ?)    
    `,
    [weight, skeletalMuscleMass, bmi, bodyFat, userId]
  );
};

module.exports = {
  createHealthInfo,
};
