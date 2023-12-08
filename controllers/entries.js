// const Entry = require("../models/entry");

exports.list = (req, res) => {
  res.render("entries", { title: "List" });
};
