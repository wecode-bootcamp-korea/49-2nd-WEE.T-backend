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
    await AppDataSource.query(
      `
      INSERT INTO socials (
        name
      ) VALUES ("test")
      `
    );
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
      ) VALUES ("test@email.com", 13123214, 1)
      `
    );

    await AppDataSource.query(
      `
      INSERT INTO users (
        email,
        nickname,
        sns_id,
        social_id
      ) VALUES ("test2@email.com", "중복된 닉네임", 13123214, 1)
      `
    );

    userId = user.insertId;
    accessToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
  });

  afterAll(async () => {
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await AppDataSource.query(`TRUNCATE socials`);
    await AppDataSource.query(`TRUNCATE gender`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await AppDataSource.destroy();
  });

  test("SUCCESS: update user", async () => {
    await request(app)
      .put("/users")
      .set("Authorization", accessToken)
      .send({
        nickname: "변경된 닉네임",
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
      .put("/users")
      .send({
        nickname: "변경된 닉네임",
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
    expiredToken = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "1s" });

    await new Promise((callback) => setTimeout(callback, 1001));

    await request(app)
      .put("/users")
      .set("Authorization", expiredToken)
      .send({
        nickname: "변경된 닉네임",
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
      .put("/users")
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
      .put("/users")
      .set("Authorization", accessToken)
      .send({
        nickname: "중복된 닉네임",
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
      .put("/users")
      .set("Authorization", accessToken)
      .send({
        nickname: "닉네임 8글자이상",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        bodyFat: 11,
        age: 24,
        gender: "male",
      })
      .expect(400)
      .expect({ message: "NICKNAME_LENGTH_EXCEEDS_8" });
  });

  test("FAILED: gender does not exist", async () => {
    await request(app)
      .put("/users")
      .set("Authorization", accessToken)
      .send({
        nickname: "변경된 닉네임",
        height: 20,
        weight: 11,
        skeletalMuscleMass: 11,
        goalWeight: 11,
        bodyFat: 11,
        age: 24,
        gender: "존재하지 않는 성별",
      })
      .expect(404)
      .expect({ message: "GENDER_NOT_FOUND" });
  });
});
