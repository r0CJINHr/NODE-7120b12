const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dbApp.db");
  const sql =
    "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT,title TEXT, content TEXT)";
  db.run(sql);

class Entry {
  //выборка
  static selectAll(cb) {
    db.all("SELECT * FROM entries",cb);
  }

  //запись
  static create(data) {
    const sql = "INSERT INTO entries (username, title, content) VALUES (?,?,?)";
    db.run(sql, data.username, data.title, data.content);
  }
}
module.exports = Entry;
