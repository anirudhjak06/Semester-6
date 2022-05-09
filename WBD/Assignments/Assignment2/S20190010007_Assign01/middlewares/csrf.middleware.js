const csurfMiddleware = (req, res, next) => {
  const token = req.csrfToken();
  console.log(token)
  res.cookie("XSRF-TOKEN", token);
  res.locals.csrfToken = token;
  next();
};

module.exports = { csurfMiddleware };
