const request = require("supertest");
const jwt = require("jsonwebtoken");

const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");

describe("Get payment history", () => {
  let app;
  let token;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();

    await AppDataSource.query(`
      INSERT INTO subscription (month, price)
      VALUES (1, 4900);
    `);

    const subscribes = await AppDataSource.query(`
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

    const payments = await AppDataSource.query(`
      INSERT INTO payments (name)
      VALUES ("카카오페이");
    `);

    const subscription = await AppDataSource.query(`
      INSERT INTO subscription (month, price)
      VALUES (1, 4900);
    `);

    await AppDataSource.query(`
      INSERT INTO orders (user_id, payment_id, subscription_id, order_id, subscribes_id)
      VALUES (${createUser.insertId}, ${payments.insertId}, ${subscription.insertId}, 231022123, ${subscribes.insertId});
    `);

    token = await jwt.sign({ id: createUser.insertId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
  });
  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE subscription`);
    await AppDataSource.query(`TRUNCATE subscribes`);
    await AppDataSource.query(`TRUNCATE socials`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE payments`);
    await AppDataSource.query(`TRUNCATE subscription`);
    await AppDataSource.query(`TRUNCATE orders`);
    await AppDataSource.destroy();
  });
  test("SUCCESS: Get payment history", async () => {
    await request(app).get("/users/orders").set("Authorization", token).expect(200);
  });
  test("FAILED: Token not found", async () => {
    await request(app).get("/users/orders").expect(401, { message: "UNAUTHORIZED" });
  });
});
