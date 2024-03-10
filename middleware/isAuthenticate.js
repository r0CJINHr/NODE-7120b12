// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
const express = require("express");
const logger = require("../logger/index_logger");

module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    logger.info("Работает клиент авторизованный от PassportJS ");
    return next();
  }
  logger.warn("Незарегистрированный клиент");
  res.redirect("/login");
};
