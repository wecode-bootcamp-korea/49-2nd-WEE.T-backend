const request = require("supertest");
const jwt = require("jsonwebtoken");

const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");

describe("Get subscription", () => {
  let app;
  let token;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();

    await AppDataSource.query(`
      INSERT INTO subscription (month, price)
      VALUES (1, 4900);
    `);

    await AppDataSource.query(`
      INSERT INTO subscribes (start_date, end_date)
      VALUES (2023-10-01, 2023-10-30);
    `);

    await AppDataSource.query(`
      INSERT INTO socials (name)
      VALUES ("test");
    `);

    const createUser = await AppDataSource.query(`
      INSERT INTO users (email, nickname, sns_id, social_id)
      VALUES ("test@gmail.com", "nickname", 123123123, 1);
    `);

    token = await jwt.sign(
      { id: createUser.insertId },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    console.log("토큰: ", token);
  });
  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE subscription`);
    await AppDataSource.query(`TRUNCATE subscribes`);
    await AppDataSource.query(`TRUNCATE socials`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.destroy();
  });
  test("SUCCESS: Get subscription", async () => {
    await request(app)
      .get("/subscribe/")
      .set("Authorization", token)
      .expect(200);
  });
  test("FAILED: Token not found", async () => {
    await request(app)
      .get("/subscribe/")
      .expect(401, { message: "UNAUTHORIZED" });
  });
});
