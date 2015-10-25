module.exports = {

  db: {
    url: process.env.URL || require("./creds.json").db.url,
    user: process.env.DB_USER || require("./creds.json").db.db_user,
    password: process.env.PASSWORD || require("./creds.json").db.password
  }
}
