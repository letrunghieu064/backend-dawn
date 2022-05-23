const { verifySignUp2 } = require("../middleware/index");
const express = require("express");
const auth_router = express.Router();
const auth = require("../controllors/auth.controllor");
auth_router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
auth_router.post("/api/Users/signup", verifySignUp2, auth.signup);
auth_router.post("/api/Users/signin", auth.signin);

module.exports = auth_router;
