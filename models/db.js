const logger = require("../logger/index_logger");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "test.db",
  logging: (msg) => logger.info(msg),
});

// ++++++++++++ORM class Entry +++++++++++++++++++++++++
const Entry = sequelize.define(
  "entries",
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    username: { type: Sequelize.STRING },
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING },
  },
  { timestamps: false }
);
// ++++++++++++ORM class User +++++++++++++++++++++++++
const User = sequelize.define(
  "users",
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    age: { type: Sequelize.INTEGER },
  },
  { timestamps: false }
);
module.exports = {Entry, User, sequelize};

