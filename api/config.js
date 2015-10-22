module.exports = {

  db: {
    url: process.env.URL || require("./creds.json").db.url
  }
}
