const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const jwt = require("jsonwebtoken");

const { userDao } = require("../models");

const kakaoStrategyConfig = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: process.env.KAKAO_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.kakao_account.email;
    const snsId = profile.id;
    const socialId = 1;

    const existingUser = await userDao.findUserBySNS(snsId, socialId);

    let id = existingUser?.id;

    if (!existingUser) {
      const result = await userDao.createUser(email, snsId, socialId);
      id = result.insertId;
    }

    accessToken = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h", issuer: "JeYeong" });
    refreshToken = jwt.sign({}, process.env.SECRET_KEY, { expiresIn: "14d", issuer: "JeYeong" });

    return done(null, { accessToken, refreshToken });
  }
);

passport.use("kakao", kakaoStrategyConfig);
