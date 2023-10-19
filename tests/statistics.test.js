const request = require("supertest");

const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");

describe("View statistics", () => {
  let app;
  let subscriberCount = 1;
  let feedCount = 2;
  let userCount = 3;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
    const social = await AppDataSource.query(
      `
      INSERT INTO socials (
        name
      ) VALUES ("test")
      `
    );
    const socialId = social.insertId;

    const subscribe = await AppDataSource.query(
      `
      INSERT INTO subscribes (
        start_date,
        end_date
      ) VALUES ("1234-12-12", "1234-13-13")
      `
    );
    const subscribeId = subscribe.insertId;

    const user = await AppDataSource.query(
      `
      INSERT INTO users (
        email,
        sns_id,
        social_id,
        subscribe_id
      ) VALUES ("test@email.com", 13123214, ${socialId}, ${subscribeId})
      `
    );
    const userId = user.insertId;

    for (let i = 0; i < userCount - subscriberCount; i++) {
      await AppDataSource.query(
        `
        INSERT INTO users (
          email,
          sns_id,
          social_id
        ) VALUES ("test${i}@email.com", 13123214, ${socialId})
        `
      );
    }

    for (let i = 0; i < feedCount; i++) {
      await AppDataSource.query(
        `
        INSERT INTO feeds (
          is_challenge,
          user_id
        ) VALUES (1, ${userId})
        `
      );
    }
  });

  afterAll(async () => {
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await AppDataSource.query(`TRUNCATE feeds`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE socials`);
    await AppDataSource.query(`TRUNCATE subscribes`);
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await AppDataSource.destroy();
  });

  test("SUCCESS: get statistics", async () => {
    const res = await request(app).get("/statistics").expect(200);
    expect(res.body.message).toEqual("READ_SUCCESS");
    expect(res.body.data).toEqual({
      subscriberCount,
      feedCount,
      userCount,
    });
  });
});
