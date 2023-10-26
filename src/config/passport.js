const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const NaverStrategy = require("passport-naver").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

const { userDao } = require("../models");

const socialType = {
  kakao: 1,
  naver: 2,
};

const jwtStrategyConfig = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: process.env.SECRET_KEY,
  },
  async (jwt_payload, done) => {
    const existingUser = await userDao.findUserById(jwt_payload.id);

    console.log(existingUser);
    if (!existingUser) {
      return done(null, false);
    }

    existingUser.isNew = jwt_payload.isNew;

    return done(null, existingUser);
  }
);

passport.use("jwt", jwtStrategyConfig);

const kakaoStrategyConfig = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: process.env.KAKAO_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.kakao_account.email;
    const snsId = profile.id;
    const socialId = socialType.kakao;

    const existingUser = await userDao.findUserBySNS(snsId, socialId);

    let id = existingUser?.id;
    let isNew = false;

    if (!existingUser) {
      const result = await userDao.createUser(email, snsId, socialId);
      id = result.insertId;
      isNew = true;
    }

    accessToken = jwt.sign({ id, isNew }, process.env.SECRET_KEY, { expiresIn: "12h" });

    return done(null, { accessToken, isNew });
  }
);

passport.use("kakao", kakaoStrategyConfig);

const naverStrategyConfig = new NaverStrategy(
  {
    clientID: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    callbackURL: process.env.NAVER_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const snsId = profile.id;
    const socialId = socialType.naver;

    const existingUser = await userDao.findUserBySNS(snsId, socialId);

    let id = existingUser?.id;
    let isNew = false;

    if (!existingUser) {
      const result = await userDao.createUser(email, snsId, socialId);
      id = result.insertId;
      isNew = true;
    }

    accessToken = jwt.sign({ id, isNew }, process.env.SECRET_KEY, { expiresIn: "1h" });

    return done(null, { accessToken, isNew });
  }
);

passport.use("naver", naverStrategyConfig);
