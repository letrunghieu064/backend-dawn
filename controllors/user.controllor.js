const db = require("../models/index.js");
const Project = db.project;

exports.createproject = async (req, res) => {
  console.log(req.userId);
  if (
    req.body.projectName &&
    req.userId &&
    req.body.description &&
    req.body.categoryId
  ) {
    await Project.create({
      name: req.body.projectName,
      creator: req.userId,
      desription: req.body.description,
      category: req.body.categoryId,
    })
      .then((project) => {
        if (project) {
          res.status(200).send({
            statusCode: 200,
            message: "xử lý thành công!",
            content: project,
          });
        } else {
          res.send({ statusCode: 404, message: "xử lý không thành công!" });
        }
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  } else {
    res.send({ statusCode: 404, message: "chưa có input !" });
  }
};
exports.getproject = async (req, res) => {
  await db.project_category.findAll().then((project_category) => {
    res.json(project_category);
  });
};
exports.getAllProject = async (req, res) => {
  try {
    await db.project.findAll().then((projects) => {
      res.json({
        statusCode: 200,
        message: "xử lý thành công",
        content: projects,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
exports.AddUserProject = async (req, res) => {
  try {
    await db.user_projects
      .create({
        projectId: req.body.projectId,
        userId: req.body.userId,
      })
      .then((user_project) => {
        if (user_project) {
          res.status(200).send({
            statusCode: 200,
            message: "xử lý thành công!",
            content: user_project,
          });
        } else {
          res.send({ statusCode: 404, message: "xử lý không thành công!" });
        }
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  } catch (err) {
    console.log(err);
  }
};
