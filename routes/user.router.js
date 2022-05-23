const { authJwt2 } = require("../middleware/index");
const express = require("express");
const user_router = express.Router();
const user = require("../controllors/user.controllor");
user_router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
user_router.post("/api/project/create-project", authJwt2, user.createproject);
user_router.get("/api/project-category", user.getproject);
user_router.get("/api/all-project", authJwt2, user.getAllProject);
user_router.post(
  "/api/Project/assignUserProject",
  authJwt2,
  user.AddUserProject
);
module.exports = user_router;
