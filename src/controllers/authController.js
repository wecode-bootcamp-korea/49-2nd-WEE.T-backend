const socialLogin = async (req, res) => {
  const token = req.user;

  res.status(200).json({
    message: "LOGIN_SUCCESS",
    accessToken: token,
  });
};

module.exports = {
  socialLogin,
};
