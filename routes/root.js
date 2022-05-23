const express = require("express");
const router = express.Router();
const auth_router = require("./auth.router");
const user_router = require("./user.router");
router.use(auth_router);
router.use(user_router);
module.exports = router;
