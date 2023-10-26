const passport = require("passport");

const { client } = require("../models/dataSource");

const permitUrls = {
  "/feeds": "GET",
};

const permitCheck = (method, endPoint) => {
  endPoint = endPoint.split("?")[0];
  const pathIdx = endPoint.lastIndexOf("/") + 1;
  if (pathIdx === endPoint.length) endPoint = endPoint.slice(0, pathIdx - 1);

  const paths = endPoint.split("/");

  const parsePaths = paths.map((path) => {
    const parseIntPath = parseInt(path);
    return isNaN(parseIntPath) ? path : ":id";
  });

  const resultEndPoint = parsePaths.join("/");

  return permitUrls[resultEndPoint] === method;
};

const validateToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const isNotValidToken = await client.get(accessToken ?? "");
  if (isNotValidToken) return res.status(401).json({ message: "UNAUTHORIZED" });
  
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    const message = info?.expiredAt ? info.message.toUpperCase().replaceAll(" ", "_") : "UNAUTHORIZED";

    if(!user) {
      if (permitCheck(req.method, req.originalUrl)){
        return next();
      }
      
      return res.status(401).json({ message });
    }
    
    req.user = user;
    
    next();
  })(req, res, next);
};

module.exports = {
  validateToken,
};
