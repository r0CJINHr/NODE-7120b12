const Entry = require("../models/entry");

exports.list = (req, res) => {
  res.render("entries", { title: "List" });
};


exports.form = (req, res) => {
  res.render("post", { title: "Post" });
};