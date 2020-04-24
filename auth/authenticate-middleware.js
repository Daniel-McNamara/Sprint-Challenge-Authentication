const jwe = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "invalid credentials", error: err });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  }
  res.status(401).json({ you: "shall not pass!" });
};
