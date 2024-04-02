const {Entry} = require("../models/db");
const logger = require("../logger/index_logger");

exports.list = async (req, res, next) => {
  try {
    const entries = await Entry.findAll();
    res.render("entries", { title: "List", entries: entries });
    logger.info("Зашли на главную страницу");
  } catch (err) {
    return next(err);
  }
};
exports.form = (req, res) => {
  res.render("post", { title: "Post" });
  logger.warn("Зашли на страницу создания постов");
};

exports.submit = async (req, res, next) => {
  try {
    const username = req.user ? req.user.name : null;
    const data = req.body.entry;
    logger.warn("создан пост " + username);

    const entry = {
      username: username,
      title: data.title,
      content: data.content,
    };

    await Entry.create(entry);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};
