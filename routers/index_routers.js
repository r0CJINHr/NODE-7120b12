const express = require("express");
const router = express.Router();

const register = require("../controllers/register");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
router.post("/", function (req, res) {});

router.get("/register", register.form);
router.post("/register", register.submit);

// app.post("/test", (req, res) => {
//     addLine("Пинганули /test");
//     console.log("прошли по пути post test");
//     res.end("прошли post test");
//   });

// app.get("/", (req, res) => {
//     addLine("Пинганули /");
//     res.sendFile(path.join(__dirname + "/public/index.html"));
//   });

//   app.get("/test", (req, res) => {
//     addLine("Пинганули /test");

//     console.log("прошли по пути test");
//     res.end("прошли ");
//   });

module.exports = router;
