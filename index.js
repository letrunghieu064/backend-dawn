const express = require("express");
const multer = require("multer");
const router = require("./routes/root.js");
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("/uploads"));
const PORT = 5000;
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  // nơi lưu file ảnh
  destination: function (req, file, callback) {
    callback(null, "/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// parse application/json
app.use(bodyParser.json());
app.use(router);

app.post("/upload-image", upload.single("file"), (req, res) => {
  console.log("file", req.file);
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received");
    return res.send({
      success: true,
    });
  }
});

const db = require("./models/index");
const Project_Category = db.project_category;
//db.sequelize.sync().then(() => {
//console.log("Drop and Resync Db");
//initial();
//});
function initial() {
  Project_Category.create({
    id: 0,
    name: "dư án web",
  });

  Project_Category.create({
    id: 1,
    name: "Dự án phần mềm",
  });

  Project_Category.create({
    id: 2,
    name: "Dự án di động",
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`); //http://localhost:5000
});
