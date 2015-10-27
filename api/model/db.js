"use strict";

var mongoose = require("mongoose");
var uriUtil = require('mongodb-uri');
var config = require("../config.js");

var testMongodbUri = "mongodb://bobcat_test:testcat@ds047124.mongolab.com:47124/test_bobcat"
var mongodbUri = "mongodb://" + config.db.user + ":" + config.db.password + "@ds041484.mongolab.com:41484/bobcat";

var mongooseUri;

if (process.env.NODE_ENV === "test") {
  mongooseUri = uriUtil.formatMongoose(testMongodbUri);
} else {
  mongooseUri = uriUtil.formatMongoose(mongodbUri);
}

mongoose.connect(mongooseUri);

var db = mongoose.connection;

console.log("dbConnection: ", mongooseUri);

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
