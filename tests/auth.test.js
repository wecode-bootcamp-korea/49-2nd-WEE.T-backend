const request = require("supertest");
const nock = require("nock");

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
    expect(res.body).toHaveProperty("accessToken");
  });
});
