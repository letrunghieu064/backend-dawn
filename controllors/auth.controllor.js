const db = require("../models/index.js");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = async (req, res) => {
  console.log(req.body);
  // Save User to Database
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phonenumber: req.body.phonenumber,
    })
      .then((user) => {
        if (user) {
          res.status(200).send({
            statusCode: 200,
            message: "User was registered successfully!",
            content: user,
          });
        } else {
          res.send({ message: "Usrer was not registeed successfully!" });
        }
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  } catch (err) {
    console.log(err.message);
  }
};
exports.signin = async (req, res) => {
  console.log(req.body);
  await User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      console.log("user", user);
      if (!user) {
        return res.status(400).send({
          statusCode: 400,
          message: "Email not found.",
          content: req.body.email,
        });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          statusCode: 400,
          message: "Invalid Password!",
          content: "password ",
        });
      }
      if (user) {
        var token = jwt.sign(user.id, "mk");
        return res.status(200).send({
          statusCode: 200,
          message: "dang nhap  thanh cong",
          content: {
            id: user.id,
            email: user.email,
            phonenumber: user.phonenumber,
            name: user.name,
            accessToken: token,
          },
        });
      }
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};
