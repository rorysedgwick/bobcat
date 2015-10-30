module.exports = {

  db: {
    url: process.env.DB_URL || require("./creds.json").db.url,
    user: process.env.DB_USER || require("./creds.json").db.user,
    password: process.env.PASSWORD || require("./creds.json").db.password
  }
}
