const request = require("supertest");
const nock = require("nock");
const jwt = require("jsonwebtoken");

const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");

describe("Sign in social", () => {
  let app;
  const mockAccessToken = "fake_access_token";

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
    await AppDataSource.query(
      `
      INSERT INTO socials (
        name
      ) VALUES ("test")
      `
    );

    nock("https://kauth.kakao.com").post("/oauth/token").reply(200, {
      access_token: mockAccessToken,
    });
    nock("https://kapi.kakao.com")
      .get("/v2/user/me")
      .query({
        access_token: mockAccessToken,
      })
      .reply(200, {
        id: 123,
        kakao_account: {
          email: "fake@email.com",
        },
      });
  });

  afterAll(async () => {
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE socials`);
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await AppDataSource.destroy();
  });

  test("SUCCESS: login kakao", async () => {
    const res = await request(app)
      .get("/auth/kakao/login")
      .query({
        code: "fakecode",
      })
      .expect(200);
    expect(res.body.message).toEqual("LOGIN_SUCCESS");
    expect(res.body.data).toHaveProperty("accessToken");
    expect(res.body.data).toHaveProperty("isNew");
  });
});

describe("Sign in social Enter additional information", () => {
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
    accessToken = jwt.sign({ id: userId, isNew: true }, process.env.SECRET_KEY, { expiresIn: "1h" });
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

  test("SUCCESS: update user additional information", async () => {
    await request(app)
      .put("/auth/signup")
      .set("Authorization", accessToken)
      .send({
        nickname: "tester",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        bodyFat: 11,
        age: 24,
        gender: "male",
      })
      .expect(200)
      .expect({ message: "MODIFIED_SUCCESS" });
  });

  test("FAILED: no token", async () => {
    await request(app)
      .put("/auth/signup")
      .send({
        nickname: "tester",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
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
      .put("/auth/signup")
      .set("Authorization", expiredToken)
      .send({
        nickname: "tester",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        bodyFat: 11,
        age: 24,
        gender: "male",
      })
      .expect(401)
      .expect({ message: "JWT_EXPIRED" });
  });

  test("FAILED: key error", async () => {
    await request(app)
      .put("/auth/signup")
      .set("Authorization", accessToken)
      .send({
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        bodyFat: 11,
        age: 24,
        gender: "male",
      })
      .expect(400)
      .expect({ message: "KEY_ERROR: nickname" });
  });

  test("FAILED: nickname duplicate", async () => {
    await request(app)
      .put("/auth/signup")
      .set("Authorization", accessToken)
      .send({
        nickname: "testNick",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        bodyFat: 11,
        age: 24,
        gender: "male",
      })
      .expect(409)
      .expect({ message: "DUPLICATED_NICKNAME" });
  });

  test("FAILED: nickname length exceeds 8", async () => {
    await request(app)
      .put("/auth/signup")
      .set("Authorization", accessToken)
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
      .put("/auth/signup")
      .set("Authorization", accessToken)
      .send({
        nickname: "testr",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        bodyFat: 11,
        age: 24,
        gender: "test gender",
      })
      .expect(404)
      .expect({ message: "GENDER_NOT_FOUND" });
  });

  test("FAILED: not a new user", async () => {
    const notNewUserToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "1h" });

    await request(app)
      .put("/auth/signup")
      .set("Authorization", notNewUserToken)
      .send({
        nickname: "testr",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        bodyFat: 11,
        age: 24,
        gender: "test gender",
      })
      .expect(401)
      .expect({ message: "NOT_NEW_USER" });
  });
});
