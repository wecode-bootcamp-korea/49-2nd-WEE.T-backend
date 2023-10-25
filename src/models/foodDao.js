const { AppDataSource } = require("./dataSource");

const findFoodByNutrition = async (nutrition) => {
  return await AppDataSource.query(
    `
    SELECT
      n.name AS nutrient,
      f.image_url AS imageUrl,
      f.name,
      f.gram,
      f.nutrient_content AS nutrientContent,
      f.information
    FROM 
      foods f
    LEFT JOIN
      nutrition n
    ON
      n.id = f.nutrition_id
    WHERE
      n.name = ?
    ORDER BY RAND()
    LIMIT 3
    `,
    [nutrition]
  );
};

module.exports = {
  findFoodByNutrition,
};
