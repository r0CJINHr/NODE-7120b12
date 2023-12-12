const express = require("express");
const router = express.Router();

const register = require("../controllers/register");
const entries = require("../controllers/entries");

router.get("/a", entries.list);
// router.post("/entry", entry.?);

// router.get("/login", login.form);
// router.post("/login", login.submit);

router.get("/register", register.form);
router.post("/register", register.submit);

module.exports = router;
