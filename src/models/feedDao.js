const { AppDataSource } = require("./dataSource");

    const getFeeds = async (userId, limit, page) => {
        const Feeds = await AppDataSource.query(`
            SELECT
                feeds.id AS id,
                u.nickname AS userNickname,
                b.image_url AS badge,
                imgurl,
                feeds.content,
                CASE
                    WHEN comment IS NOT NULL THEN comment
                    ELSE 0
                END AS comment,
                is_challenge AS challenge, 
                DATE_FORMAT(feeds.created_at, '%Y-%m-%d') AS created_at,
                CASE
                    WHEN feeds.user_id = ? THEN true
                    ELSE false
                END AS isMyPost
            FROM 
                feeds 
            LEFT JOIN 
                users u ON feeds.user_id = u.id
            LEFT JOIN 
                badges b ON u.badge_id = b.id
            LEFT JOIN (
                SELECT
                    feed_id,
                    COUNT(id) AS comment
                FROM
                    comments
                GROUP BY feed_id
                    ) AS comments ON feeds.id = comments.feed_id
            LEFT JOIN (
                SELECT
                    feed_id,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "id" , id,
                        "url" , url
                    )
                ) AS imgurl
                FROM
                    feed_images
                GROUP BY feed_id
            ) AS feed_images ON feeds.id = feed_images.feed_id
            ORDER BY
                feeds.created_at DESC
            LIMIT ? OFFSET ?
            `,
            [userId, limit, (page - 1) * 10]
        );
        console.log('확인', Feeds);
        return Feeds;
    }

    // 총 피드 갯수
    const getFeedCount = async () => {
        const feedCount = await AppDataSource.query(`
            SELECT COUNT(*) 
            AS total 
            FROM 
                feeds
        `);
        return feedCount[0].total;
      }

    // 피드 작성
    const addFeeds = async(userId, content, challenge, imageUrl) => {
        // 중복 이미지
        imageUrl = Array.from(new Set(imageUrl)).slice(0, 3);
        // challenge 체크박스 값
        // const isChallenge = challenge === '0';

        return await AppDataSource.transaction(async (transactionManager) => {
            const{ insertId:feedId } = await transactionManager.query(`
                INSERT INTO feeds (
                    user_id,
                    content,
                    is_challenge
                ) VALUES (?, ?, ?)`,
                [userId, content, challenge]
            );
            for (let i = 0; i < imageUrl.length; i++){
                    await transactionManager.query(`
                        INSERT INTO feed_images (
                            url,
                            feed_id
                        ) VALUES (?, ?)`,
                        [imageUrl[i], feedId]
                    );
                }
                return { id: feedId, content, challenge, imageUrl };
            });
          }   

    // 작성한 피드 개별 삭제
    const deleteFeeds = async(feedId) => {
        const deleteFeeds = await AppDataSource.query(`
        DELETE FROM 
            feeds
        WHERE 
            id = ?
        `,
            [feedId]
        );
        return deleteFeeds;
    }

    const getByFeedId = async(feedId) => {
        const [feed] = await AppDataSource.query(`
            SELECT
                id, 
                user_id,
                is_challenge
            FROM
                feeds
            WHERE id = ?
        `,
            [feedId]
        );
        return feed;
    }

    // 글 수정
    const updateFeeds = async(feedId, newContent) => {
        await AppDataSource.query(`
                UPDATE
                    feeds
                SET
                    content = ?
                WHERE
                    id = ?
                `,
                [newContent, feedId]
        );
    }
    
    // 이미지 추가  
    const updateImages = async(newImage, feedId) => {
        for (let i = 0; i < newImage.length; i++) {
            const existingImage = await AppDataSource.query(`
                SELECT
                    id
                FROM
                    feed_images
                WHERE
                    url = ? AND feed_id = ?
            `,
                [newImage[i], feedId]
            );
        
            if (existingImage.length === 0) {
                await AppDataSource.query(`
                    INSERT INTO
                        feed_images (url, feed_id)
                    VALUES (?, ?)
                    `,
                    [newImage[i], feedId]
                );
            }
        }   
    }

    // 기존 이미지 삭제
    const deleteFeedImages = async(feedId, imageId) => {
        const [imageCount] = await AppDataSource.query(`
            SELECT COUNT(*)
            AS imgCount
            FROM 
                feed_images
            WHERE
                feed_id = ?
        `,
            [feedId]
        );
        
        await AppDataSource.query(`
        DELETE FROM
        feed_images
        WHERE
        feed_id = ?
        AND
        id = ?
        `,
        [feedId, imageId]
        );
        return imageCount;
    }

    // 글 작성 랭킹
    const feedRankingByFeedCount = async () => {
        const ranking = await AppDataSource.query(`
            SELECT
                users.nickname AS nickname,
                b.image_url AS badge,
                COUNT(feeds.id) AS feed_count
            FROM
                users
            LEFT JOIN
                feeds ON users.id = feeds.user_id
            LEFT JOIN
                badges b ON users.badge_id = b.id
            GROUP BY
                users.id
            ORDER BY
                feed_count DESC;
        `)
        return ranking;
    }

module.exports = {
    getFeeds,
    getFeedCount,
    addFeeds,
    deleteFeeds,
    getByFeedId,
    updateFeeds,
    deleteFeedImages,
    updateImages,
    feedRankingByFeedCount,
}