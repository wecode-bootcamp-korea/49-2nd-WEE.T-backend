const { AppDataSource } = require("./dataSource");

  const getTrainingList = async(userId) => {
    const getTrainingList = await AppDataSource.query(`
    SELECT
      u.nickname AS nickName,
      (SELECT 
        weight 
      FROM 
        health_infos h 
      WHERE 
        h.user_id = u.id 
      ORDER BY 
        created_at 
      ASC 
        LIMIT 1) AS startWeight,
      (SELECT
          weight
        FROM
          health_infos h
        WHERE
          h.user_id = u.id
        ORDER BY
          created_at
        DESC
          LIMIT 1) AS currentWeight,
      u.goal_weight AS targetWeight,
      p.name AS partName,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'name', e.name,
          'link', e.youtube_url,
          'content', e.content
        )
      ) AS exercises
      FROM
        users u
      LEFT JOIN
        health_infos h ON u.id = h.user_id
      CROSS JOIN
        parts p
      LEFT JOIN
        exercises e ON p.id = e.part_id
      WHERE
        u.id = ?
      GROUP BY u.id, u.nickname, u.goal_weight, p.id, p.name
      ORDER BY p.id ASC
      LIMIT 5
    `,
      [userId]
    );
    console.log("확인" , getTrainingList);
    return getTrainingList;
  };

module.exports = {
  getTrainingList,
}