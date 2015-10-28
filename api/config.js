module.exports = {

  db: {
    url: require("./creds.json").db.url,
    user: process.env.DB_USER || require("./creds.json").db.user,
    password: process.env.PASSWORD || require("./creds.json").db.password
  }
}
