const { AppDataSource } = require ("./dataSource")

// 댓글 조회 
const getCommentByUser  = async (userId, feedId) => {
const getComment = await AppDataSource.query (`
SELECT 
 c.id AS id,
 u.nickname AS nickname,
 c.content AS content,
 c.created_at AS createAt,
 b.image_url AS badge,
 c.user_id AS isMyComment
FROM
  comments AS c  
LEFT JOIN 
 users AS u ON c.user_id = u.id 
 LEFT JOIN
 feeds AS f ON c.feed_id = f.id
 LEFT JOIN
 badges AS b ON u.badge_id = b.id
 WHERE c.user_id = ? AND c.feed_id = ?`,
    [userId, feedId],
    );
    return getComment;
};

// 댓글 작성 
const writeUserComment = async (content, userId, feedId) => {
    return await AppDataSource.query(`
    INSERT INTO comments 
     (content, user_id, feed_id) 
    VALUES 
     (?, ?, ?);
     `
     ,
     [content, userId, feedId]
);
};

//피드아이디 불러오기
const findFeedById = async (feedId) => {
  const [feed] = await AppDataSource.query(
    `
    SELECT 
     id
    FROM
    feeds
    WHERE
    id = ? 
    `,
    [feedId]
  )
  return feed;
}

// 댓글 수정 
const updateEditComment = async (content, contentId, userId) => {
    await AppDataSource.query(`
    UPDATE 
     comments c
    SET
      c.content = ?
    WHERE 
      c.id = ?
    AND
      c.user_id = ?
    `
    ,
    [content,contentId,userId]
    );
};

// 댓글 삭제
const userDeletComment = async (feedId) => {
    await AppDataSource.query(`
    DELETE FROM 
     comments 
    WHERE 
     id = ?
    `
    ,
    [feedId]
    ); 
};

module.exports = {
  writeUserComment,
  getCommentByUser ,
  updateEditComment,
  userDeletComment,
  findFeedById,
}; 