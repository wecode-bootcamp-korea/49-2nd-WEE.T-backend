const request = require("supertest");
const jwt = require("jsonwebtoken");

const { createApp } = require("../app");
const { AppDataSource, client } = require("../src/models/dataSource");

describe("View diet information", () => {
  let app;
  let userId;
  let accessToken;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
    await client.connect();

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
      INSERT INTO gender (
        name
        ) VALUES ("male")
        `
    );

    const user = await AppDataSource.query(
      `
      INSERT INTO users (
        email,
        sns_id,
        social_id
      ) VALUES ("test@email.com", 13123214, ${socialId})
      `
    );
    userId = user.insertId;

    await AppDataSource.query(
      `
      INSERT INTO health_infos (
        weight,
        skeletal_muscle_mass,
        bmi,
        body_fat,
        user_id
      ) VALUES (80, 35, 23, 20, ${userId})
      `
    );

    accessToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
  });

  afterAll(async () => {
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await AppDataSource.query(`TRUNCATE health_infos`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE socials`);
    await AppDataSource.query(`TRUNCATE gender`);
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");
    await client.flushDb();

    await client.disconnect();
    await AppDataSource.destroy();
  });

  test("SUCCESS: get diet information", async () => {
    const res = await request(app).get("/diets").set("authorization", accessToken).expect(200);

    expect(res.body.message).toEqual("READ_SUCCESS");
    expect(res.body.data).toHaveProperty("nickname");
    expect(res.body.data).toHaveProperty("dailyCalorieIntake");
    expect(res.body.data).toHaveProperty("carbohydrate");
    expect(res.body.data).toHaveProperty("protein");
    expect(res.body.data).toHaveProperty("fat");
    expect(res.body.data).toHaveProperty("today");
    expect(res.body.data).toHaveProperty("tomorrow");
  });

  test("FAILED: no token", async () => {
    await request(app).get("/diets").expect(401).expect({ message: "UNAUTHORIZED" });
  });

  test("FAILED: jwt expires", async () => {
    const expiredToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "0s" });

    await request(app).get("/diets").set("authorization", expiredToken).expect(401).expect({ message: "JWT_EXPIRED" });
  });
});
