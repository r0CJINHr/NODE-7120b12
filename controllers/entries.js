const Entry = require("../models/entry");
const logger = require("../logger/index_logger");

exports.list = (req, res, next) => {
  Entry.selectAll((err, entries) => {
    if (err) return next(err);
    res.render("entries", { title: "List", entries: entries });
    logger.info("Зашли на главную страницу");
  });
};

exports.form = (req, res) => {
  res.render("post", { title: "Post" });
  logger.warn("Зашли на страницу создания постов");
};

exports.submit = (req, res, next) => {
  try {
    const username = req.user ? req.user.name : null;
    const data = req.body.entry;

    const entry = {
      username: username,
      title: data.title,
      content: data.content,
    };

    Entry.create(entry);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};
