"use strict";

var mongoose = require("mongoose");
var config = require("../config.js");
var Schema = mongoose.Schema;
var Todo = require("../model/schema").Todo;

mongoose.connect(config.db.url);
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
