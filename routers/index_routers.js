const express = require("express");
const router = express.Router();
const passport = require("passport");

const register = require("../controllers/register");
const login = require("../controllers/login");
const entries = require("../controllers/entries");
const validate = require("../middleware/validate");
const ensureAuthenticated = require("../middleware/isAuthenticate");

router.get("/", entries.list);

router.get("/post", ensureAuthenticated, entries.form);
router.post(
  "/post",
  //   passport.authenticate("jwt", { session: false }),
  ensureAuthenticated,
  validate.required("entry[title]"),
  validate.required("entry[content]"),
  validate.lengthAbove("entry[title]", 4),
  entries.submit
);

router.get("/login", login.form);
router.post("/login", login.submit);

router.get("/register", register.form);
router.post("/register", register.submit);

router.get(
  "/auth/yandex",
  passport.authenticate("yandex"),
  function (req, res) {
    // The request will be redirected to Yandex for authentication, so this
    // function will not be called.
  }
);
router.get(
  "/auth/yandex/callback",
  passport.authenticate("yandex", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.get("/logout", login.logout);

module.exports = router;
