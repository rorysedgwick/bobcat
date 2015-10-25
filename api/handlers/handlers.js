"use strict";

var mongoose = require("mongoose");
var uriUtil = require('mongodb-uri');
var config = require("../config.js");
var Todo = require("../model/schema").Todo;

var mongodbUri = "mongodb://" + config.db.user + ":" + config.db.password + "@ds041484.mongolab.com:41484/bobcat";
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri);
var db = mongoose.connection;

db.once("open", function() {
  console.log("database connected");
});

var handler = {

  home: function(req, res) {
    console.log("home handler called");
    res.render("index.html.ejs");
  },

  getTodos: function(req, res, next) {
    Todo.find()
      .exec(function(err, todos) {
        if (err) return next(err);
        res.json(todos);
      });
    },

  createTodo: function(req, res, next) {
    var todo = new Todo({title: req.body.title});
    todo.save(function(err) {
      if (err) return next(err);
      res.sendStatus(201);
      console.log("added " + todo.title);
    });
  },

  removeTodo: function(req, res, next) {
    Todo.remove({_id: req.params.todo_id}, function(err, todo) {
      if (err) return next(err);
      res.sendStatus(200);
    });
  }
}


module.exports = handler;
