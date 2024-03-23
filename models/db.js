const logger = require("../logger/index_logger");
const Sequelize = require("sequelize");

const SequelizeCreate = new Sequelize({
  dialect: "sqlite",
  storage: "./test.db",
  logging: (msg) => logger.info(msg),
});
// ===============================ORM класс Entry==================================
const Entry = SequelizeCreate.define(
    "entries",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  
      username: { type: Sequelize.STRING },
      title: { type: Sequelize.STRING },
      content: { type: Sequelize.STRING },
    },
    { timestamps: false }
  );
  
//   ============================ORM класс User=========================================
const User = SequelizeCreate.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: {
        type: Sequelize.STRING,
        allowNull: false, // не может быть пустым (не принимает NULL)
      },
      age: { type: Sequelize.INTEGER},
    },
    { timestamps: false }
    ) 

module.exports = { SequelizeCreate, User, Entry };
