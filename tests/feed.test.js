const request = require('supertest');
const jwt = require("jsonwebtoken");

const { creatApp } = require('../app');
const { AppDataSource } = require('../src/models/dataSource');

describe("getFeedList", () => {
  let app;
  let userId;
  let accessToken;

  beforeAll(async () => {
    app = creatApp();
    await AppDataSource.initialize();
    const social = await AppDataSource.query(
      `
      INSERT INTO socials (
        name
      ) VALUES ("test")
      `   
    );
    const socialId = social.insertId;

    await AppDataSource.query(
      `
      INSERT INTO badges (
        level,
        image_url
      ) VALUES (1, "https://cdn2.iconfinder.com/data/icons/shopping-11/512/Badge-1024.png")
      `
    );

    const user = await AppDataSource.query(
      `
      INSERT INTO users (
        nickname,
        email,
        sns_id,
        social_id,
        badge_id
      ) VALUES ("cutewe", "test@wecode.com", 1, ${socialId})
      `
    );

    userId = user.insertId;
    accessToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
    
    await AppDataSource.query(
      `
      INSERT INTO feeds (
        content,
        is_challenge,
        user_id
      ) VALUES ("오늘의 식단", 1, 1)
      `
    )
    
    await AppDataSource.query(
      `
      INSERT INTO feed_images (
        url,
        feed_id
      ) VALUES ("https://s3-weet.s3.ap-northeast-2.amazonaws.com/diet1.jpeg", 1)
      `
    )
  });

  afterAll(async () => {
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await AppDataSource.query(`TRUNCATE feed_images`);
    await AppDataSource.query(`TRUNCATE feeds`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE badges`);
    await AppDataSource.query(`TRUNCATE socials`);
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await AppDataSource.destroy();
  });

  test("SUCCESS : duplicate check", async () => {
    await request(app)
      .post("/user")
  })

});