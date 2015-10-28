"use strict";

var mongoose = require("mongoose");
var uriUtil = require('mongodb-uri');
var config = require("../config.js");

var mongooseUri;

if (process.env.NODE_ENV === "test") {
  mongooseUri = uriUtil.formatMongoose(config.test_db.url);
} else {
  mongooseUri = uriUtil.formatMongoose(config.db.url);
}

mongoose.connect(mongooseUri);

var db = mongoose.connection;


db.once("open", function() {
  console.log("database connected");
});

process.on("SIGINT", function() {
  db.close(function() {
    console.log(" Mongoose connection closed");
    process.exit(0);
  });
});

module.exports = db;
