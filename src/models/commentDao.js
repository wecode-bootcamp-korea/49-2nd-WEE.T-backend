const { AppDataSource } = require ("./AppdataSource")

// 댓글 조회 
const getComment = async (nickname, userId, feedId, content, createAt, isMyComment) => {
    await AppDataSource.query (`
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
   comments.created_at DESC;
  

    `)

}
// 댓글 작성 
const createComment = async (feedId, content) => {
    await AppDataSource.query(`
    INSERT INTO comments 
     (content, user_id, feed_id, created_at) 
    VALUES 
     (?, ?, ?, ?);
`)

}

// 댓글 수정 
const editComment = async (userId, feedId) => {
    await AppDataSource.query(`
    UPDATE 
     comments 
    SET 
     content = ?
    WHERE 
     id = ?
    AND
     user_id = ?
    `)
}

// 댓글 삭제
const deletComment = async (userId) => {
    await AppDataSource.query(`
    DELETE FROM 
    comments 
    WHERE id = ?
  `)  
} 

module.export = {
  getComment,
  createComment,
  editComment,
  deletComment
}; 