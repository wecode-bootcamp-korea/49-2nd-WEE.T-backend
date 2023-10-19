const { AppDataSource } = require ("./dataSource")

// 댓글 조회 
const getCommentByUser  = async (nickname, userId, feedId, content, createAt, isMyComment) => {
    return await AppDataSource.query (`
SELECT 
   c.id AS id,
   u.nickname AS nickname,
   c.content AS content,
   c.created_at AS createAt,
   b.image_url AS badge,
   c.user_id = users.id AS isMyComment
FROM
  	comments 
INNER JOIN 
   users u ON comments.user_id = u.id 
INNER JOIN
   badges b ON u.badge_id = b.id
WHERE 
    comments.feed_id = feeds.id 
ORDER BY
   comments.created_at DESC;`
   ,
   [nickname, userId, feedId, content, createAt, isMyComment]
    );
};

// 댓글 작성 
const writeUserComment = async (content, userId, feedId) => {
    await AppDataSource.query(`
    INSERT INTO comments 
     (content, user_id, feed_id) 
    VALUES 
     (?, ?, ?);
     `
     ,
     [content, userId, feedId]

);

};

// 댓글 수정 
const updateEditComment = async (userId, feedId) => {
    await AppDataSource.query(`
    UPDATE 
     comments 
    SET 
     content = ?
    WHERE 
     id = ?
    AND
     user_id = ?
    `
    ,
    [userId, feedId]
    );
};

// 댓글 삭제
const userDeletComment = async (userId) => {
    await AppDataSource.query(`
    DELETE FROM 
    comments 
    WHERE id = ?
    `
    ,
    [userId]
    ); 
};

module.exports = {
  writeUserComment,
  getCommentByUser ,
  updateEditComment,
  userDeletComment,
}; 