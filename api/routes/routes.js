"use strict";

var express = require("express");
var router = express.Router();
var handler = require("../handlers/handlers.js")

router.get("/", function(req, res) {
  handler.home(req, res);
});

router.get("/api/todos", function(req, res, next) {
  handler.getTodos(req, res, next);
});

router.post("/api/todos", function(req, res, next) {
  handler.createTodo(req, res, next);
});

router.delete("/api/todos/:todo_id", function(req, res, next) {
  handler.removeTodo(req, res, next);
});

module.exports = router;
