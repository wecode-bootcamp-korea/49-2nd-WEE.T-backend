const request = require("supertest");
const jwt = require("jsonwebtoken");

const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");

describe("Update user info", () => {
  let app;
  let userId;
  let accessToken;

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

    await AppDataSource.query(
      `
      INSERT INTO users (
        email,
        nickname,
        sns_id,
        social_id
      ) VALUES ("test2@email.com", "testNick", 13123214, ${socialId})
      `
    );

    userId = user.insertId;
    accessToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
  });

  afterAll(async () => {
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await AppDataSource.query(`TRUNCATE health_infos`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE socials`);
    await AppDataSource.query(`TRUNCATE gender`);
    await AppDataSource.query(`TRUNCATE subscribes`);
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await AppDataSource.destroy();
  });

  test("SUCCESS: update user", async () => {
    await request(app)
      .put("/users")
      .set("authorization", accessToken)
      .send({
        nickname: "tester",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        goalBodyFat: 11,
        goalSkeletalMuscleMass: 21,
        bodyFat: 11,
        age: 24,
        gender: "male",
      })
      .expect(200)
      .expect({ message: "MODIFIED_SUCCESS" });
  });

  test("FAILED: no token", async () => {
    await request(app)
      .put("/users")
      .send({
        nickname: "tester",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        goalBodyFat: 11,
        goalSkeletalMuscleMass: 21,
        bodyFat: 11,
        age: 24,
        gender: "male",
      })
      .expect(401)
      .expect({ message: "UNAUTHORIZED" });
  });

  test("FAILED: jwt expires", async () => {
    const expiredToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "0s" });

    await request(app)
      .put("/users")
      .set("authorization", expiredToken)
      .send({
        nickname: "tester",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        goalBodyFat: 11,
        goalSkeletalMuscleMass: 21,
        bodyFat: 11,
        age: 24,
        gender: "male",
      })
      .expect(401)
      .expect({ message: "JWT_EXPIRED" });
  });

  test("FAILED: key error", async () => {
    await request(app)
      .put("/users")
      .set("authorization", accessToken)
      .send({
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        goalBodyFat: 11,
        goalSkeletalMuscleMass: 21,
        bodyFat: 11,
        age: 24,
        gender: "male",
      })
      .expect(400)
      .expect({ message: "KEY_ERROR: nickname" });
  });

  test("FAILED: nickname duplicate", async () => {
    await request(app)
      .put("/users")
      .set("authorization", accessToken)
      .send({
        nickname: "testNick",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        goalBodyFat: 11,
        goalSkeletalMuscleMass: 21,
        bodyFat: 11,
        age: 24,
        gender: "male",
      })
      .expect(409)
      .expect({ message: "DUPLICATED_NICKNAME" });
  });

  test("FAILED: nickname length exceeds 8", async () => {
    await request(app)
      .put("/users")
      .set("authorization", accessToken)
      .send({
        nickname: "asdfghjkl",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        goalBodyFat: 11,
        goalSkeletalMuscleMass: 21,
        bodyFat: 11,
        age: 24,
        gender: "male",
      })
      .expect(400)
      .expect({ message: "NICKNAME_SHOULD_BE_LESS_THAN_OR_EQUAL_TO_8" });
  });

  test("FAILED: gender does not exist", async () => {
    await request(app)
      .put("/users")
      .set("authorization", accessToken)
      .send({
        nickname: "testr",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        goalBodyFat: 11,
        goalSkeletalMuscleMass: 21,
        bodyFat: 11,
        age: 24,
        gender: "test gender",
      })
      .expect(404)
      .expect({ message: "GENDER_NOT_FOUND" });
  });
});

describe("Nickname duplicate check", () => {
  let app;
  let userId;
  let accessToken;

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

    const user = await AppDataSource.query(
      `
      INSERT INTO users (
        email,
        nickname,
        sns_id,
        social_id
      ) VALUES ("test@email.com", "testNick", 13123214, ${socialId})
      `
    );

    userId = user.insertId;
    accessToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
  });

  afterAll(async () => {
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE socials`);
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await AppDataSource.destroy();
  });

  test("SUCCESS: duplicate check", async () => {
    await request(app)
      .post("/users/nickname")
      .set("authorization", accessToken)
      .send({
        nickname: "tester",
      })
      .expect(200)
      .expect({ message: "AVAILABLE_NICKNAME" });
  });

  test("FAILED: no token", async () => {
    await request(app)
      .post("/users/nickname")
      .send({
        nickname: "tester",
      })
      .expect(401)
      .expect({ message: "UNAUTHORIZED" });
  });

  test("FAILED: jwt expires", async () => {
    const expiredToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "0s" });

    await request(app)
      .post("/users/nickname")
      .set("authorization", expiredToken)
      .send({
        nickname: "tester",
      })
      .expect(401)
      .expect({ message: "JWT_EXPIRED" });
  });

  test("FAILED: key error", async () => {
    await request(app)
      .post("/users/nickname")
      .set("authorization", accessToken)
      .expect(400)
      .expect({ message: "KEY_ERROR: nickname" });
  });

  test("FAILED: nickname duplicate", async () => {
    await request(app)
      .post("/users/nickname")
      .set("authorization", accessToken)
      .send({
        nickname: "testNick",
      })
      .expect(409)
      .expect({ message: "DUPLICATED_NICKNAME" });
  });

  test("FAILED: nickname length exceeds 8", async () => {
    await request(app)
      .post("/users/nickname")
      .set("authorization", accessToken)
      .send({
        nickname: "asdfghjkl",
      })
      .expect(400)
      .expect({ message: "NICKNAME_SHOULD_BE_LESS_THAN_OR_EQUAL_TO_8" });
  });
});

describe("View user information", () => {
  let app;
  let userId;
  let accessToken;

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

    const badge = await AppDataSource.query(
      `
      INSERT INTO badges (
        level,
        image_url
      ) VALUES (1, "urlurlurl")
      `
    );
    const badgeId = badge.insertId;

    const subscribe = await AppDataSource.query(
      `
      INSERT INTO subscribes (
        start_date,
        end_date
      ) VALUES ("1234-12-12", "1234-13-13")
      `
    );
    const subscribeId = subscribe.insertId;

    const gender = await AppDataSource.query(
      `
      INSERT INTO gender (
        name
      ) VALUES ("male")
      `
    );
    const genderId = gender.insertId;

    const user = await AppDataSource.query(
      `
      INSERT INTO users (
        email,
        nickname,
        sns_id,
        social_id,
        height,
        goal_weight,
        birth_year,
        subscribe_id,
        badge_id,
        goal_body_fat,
        goal_skeletal_muscle_mass,
        gender_id
      ) VALUES ("test@email.com", "testNick", 13123214, ${socialId}, 190, 90, "1997", ${subscribeId}, ${badgeId}, 10, 40, ${genderId})
      `
    );
    userId = user.insertId;

    const healthInfo = await AppDataSource.query(
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
    await AppDataSource.query(`TRUNCATE badges`);
    await AppDataSource.query(`TRUNCATE subscribes`);
    await AppDataSource.query(`TRUNCATE badges`);
    await AppDataSource.query(`TRUNCATE gender`);
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await AppDataSource.destroy();
  });

  test("SUCCESS: view user information", async () => {
    const res = await request(app).get("/users").set("authorization", accessToken).expect(200);
    expect(res.body.message).toEqual("READ_SUCCESS");
    expect(res.body.data).toEqual({
      age: 26,
      badgeImageUrl: "urlurlurl",
      badgeLevel: 1,
      bodyFat: 20,
      gender: "male",
      goalBodyFat: 10,
      goalSkeletalMuscleMass: 40,
      goalWeight: 90,
      height: 190,
      isSubscribe: 0,
      nickname: "testNick",
      skeletalMuscleMass: 35,
      weight: 80,
    });
  });

  test("FAILED: no token", async () => {
    await request(app).get("/users").expect(401).expect({ message: "UNAUTHORIZED" });
  });

  test("FAILED: jwt expires", async () => {
    const expiredToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "0s" });

    await request(app).get("/users").set("authorization", expiredToken).expect(401).expect({ message: "JWT_EXPIRED" });
  });
});
