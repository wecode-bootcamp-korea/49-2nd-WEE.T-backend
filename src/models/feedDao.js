const { AppDataSource } = require("./dataSource");

    const getFeeds = async (userId, page) => {
        const Feeds = await AppDataSource.query(`
            SELECT
                u.nickname AS nickname,
                b.id AS badge,
                images,
                content,
                is_challenge,
                DATE_FORMAT(feeds.created_at, '%Y-%m-%d') AS created_at,
                EXISTS (SELECT id FROM feeds WHERE user_id = ? AND id = feeds.id) AS isMyFeed
            FROM 
                feeds 
            LEFT JOIN 
                users u ON feeds.user_id = u.id
            LEFT JOIN 
                badges b ON u.badge_id = b.id
            LEFT JOIN (
                SELECT
                    feed_id,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "id" , id,
                        "url" , url
                    )
                ) AS images
                FROM
                    feed_images
                GROUP BY feed_id
            ) AS images ON feeds.id = feed_images.feed_id
            WHERE 
                feeds.user_id = ?
            LIMIT 10 OFFSET ?
            `,
            [userId, userId, (page - 1) * 10],
        );
        return Feeds;
    }

    // 피드 작성
    const addFeeds = async(userId, content, challenge, imageUrl) => {
        if (imageUrl.length === 0 || imageUrl.length > 4) {
            throw new Error("이미지는 1개에서 3개 사이어야 합니다.")
        }
        // 중복 이미지
        imageUrl = Array.from(new Set(imageUrl)).slice(0, 3);
        // challenge 체크박스 값
        const isChallenge = challenge === '0';

        await AppDataSource.transaction(async (transactionManager) => {
            const{ insertId:feedId } = await transactionManager.query(`
                INSERT INTO feeds (
                    user_id,
                    content,
                    is_challenge
                ) VALUES (?, ?, ?)`,
                [userId, content, isChallenge]
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
        })
    }

    // 글 삭제
    const deleteFeeds = async(feedId, userId) => {
        const deleteFeeds = await AppDataSource.query(`
            DELETE FROM 
                feeds
            WHERE 
                id = ? 
            AND 
                feeds.user_id = ?
        `,
            [feedId, userId]
        );
        return deleteFeeds;
    }

    // 글 수정
    const updateFeeds = async(userId, feedId, newContent, newImage) => {
        await AppDataSource.query(async (transactionManager) => {
            // 사용자 일치 여부
            const [existingFeed] = await transactionManager.query(`
                SELECT
                    user_id 
                FROM 
                    feeds 
                WHERE
                    id = ? 
                `,
                [feedId]
            );

            if(!existingFeed || existingFeed.user_id !== userId) {
                throw Error("글을 수정할 수 없습니다.");
            }
       
            // 글 업데이트
            await transactionManager.query(`
                UPDATE
                    feeds
                SET
                    content = ?
                WHERE
                    id = ?
                `,
                [newContent, feedId]
            );

            // 이미지 업데이트 (기존 이미지 삭제 후 새 이미지 추가)
            await transactionManager.query(`
                DELETE FROM
                    feed_images
                WHERE
                    feed_id = ?
                `,
                [feedId]
            );

            // 이미지 추가
            for (let i = 0; i < newImage.length; i++) {
                await transactionManager.query(`
                    INSERT INTO
                        feed_images (url, feed_id)
                    VALEUS (?, ?)
                    `,
                    [newImage[i], feedId]
                );
            }
       });
    }

    // 글 작성 랭킹
    const feedRanking = async () => {
        const ranking = await AppDataSource.query(`
            SELECT
                users.nicknmae AS nickname,
                COUNT(feed.id) AS feed_count
            FROM
                users
            LEFT JOIN
                feeds ON users.id = feeds.user_id
            GROUP BY
                users.id
            ORDER BY
                feed_count DESC;
        `)
        return ranking;
    }


module.exports = {
    getFeeds,
    addFeeds,
    deleteFeeds,
    updateFeeds,
    feedRanking
}