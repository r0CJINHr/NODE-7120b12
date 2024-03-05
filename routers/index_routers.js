const express = require("express");
const router = express.Router();
const passport= require("passport");

const register = require("../controllers/register");
const login = require("../controllers/login");
const entries = require("../controllers/entries");
const validate = require("../middleware/validate");

router.get("/", entries.list);
router.get("/post", entries.form);

router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  validate.required("entry[title]"),
  validate.required("entry[content]"),
  validate.lengthAbove("entry[title]", 4),
  entries.submit
);

router.get("/login", login.form);
router.post("/login", login.submit);

router.get("/register", register.form);
router.post("/register", register.submit);

router.get("/logout", login.logout);

module.exports = router;
