"use strict";

var express = require("express");
var router = express.Router();
var handler = require("../handlers/handlers.js")

router.get("/", function(req, res) {
  handler.home(req, res);
});

router.get("/api/bikeDockData", function(req, res, next) {
  handler.getBikeDockData(req, res, next);
});

module.exports = router;
