"use strict";

var express = require("express");
var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo");

var Todo = mongoose.model("Todo", {title: String});

app.get("/", function(req, res) {
  res.render("index.html.ejs");
});

app.use(require("body-parser").json());

app.get("/api/todos", function(req, res, next) {
  Todo.find()
  .exec(function(err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

app.post("/api/todos", function(req, res, next) {
  var todo = new Todo({title: req.body.title});
  todo.save(function(err) {
    if (err) return next(err);
    res.sendStatus(201);
    console.log("added " + todo.title);
  });
});

app.delete("/api/todos/:todo_id", function(req, res, next) {
  Todo.remove({_id: req.params.todo_id}, function(err, todo) {
    if (err) return next(err);
    res.sendStatus(200);
  });
});

app.use(express.static("public"));

app.listen(Number(process.env.PORT) || 8000, console.log("server listening at port 8000"));
